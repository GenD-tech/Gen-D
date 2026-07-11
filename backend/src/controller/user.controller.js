import crypto from "crypto";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";
import { AdminSetting } from "../models/admin.model.js";
import { Contact } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

let aiClient = null;

const ADMIN_SETTINGS_KEY = "primary-admin";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const normalizePassword = (password) => String(password ?? "").trim();

const extractBearerToken = (authorization = "") => {
  const value = String(authorization ?? "").trim();

  if (!value) {
    return "";
  }

  const [scheme, token] = value.split(" ");
  if (scheme?.toLowerCase() === "bearer" && token) {
    return token.trim();
  }

  return value;
};

const hashAdminPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => ({
  passwordSalt: salt,
  passwordHash: crypto.scryptSync(normalizePassword(password), salt, 64).toString("hex"),
});

const verifyAdminPassword = (password, settings) => {
  if (!settings?.passwordSalt || !settings?.passwordHash) {
    return false;
  }

  const candidateHash = crypto.scryptSync(normalizePassword(password), settings.passwordSalt, 64);
  const storedHash = Buffer.from(settings.passwordHash, "hex");

  if (candidateHash.length !== storedHash.length) {
    return false;
  }

  return crypto.timingSafeEqual(candidateHash, storedHash);
};

const getOrCreateAdminSettings = async () => {
  let settings = await AdminSetting.findOne({ key: ADMIN_SETTINGS_KEY });

  if (!settings) {
    const { passwordSalt, passwordHash } = hashAdminPassword(DEFAULT_ADMIN_PASSWORD);
    settings = await AdminSetting.create({
      key: ADMIN_SETTINGS_KEY,
      passwordSalt,
      passwordHash,
    });
  }

  return settings;
};

const requireAdmin = asyncHandler(async (req, _res, next) => {
  const providedPassword = extractBearerToken(req.headers.authorization);

  if (!providedPassword) {
    throw new ApiError(401, "Admin password is required");
  }

  const settings = await getOrCreateAdminSettings();

  if (!verifyAdminPassword(providedPassword, settings)) {
    throw new ApiError(401, "Invalid admin password");
  }

  return next();
});

const getGeminiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new ApiError(503, "GEMINI_API_KEY is not configured");
    }

    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  return aiClient;
};

const chatWithAssistant = asyncHandler(async (req, res) => {
  const { message, history } = req.body;

  if (!message || !String(message).trim()) {
    throw new ApiError(400, "Message is required");
  }

  const systemInstruction =
    'You are the GEND website assistant. Answer concisely about the agency\'s services, pricing, timelines, and contact process. Keep answers commercial and helpful. If users ask about hiring or starting a project, direct them to the contact form.';

  try {
    const client = getGeminiClient();
    const contents = Array.isArray(history)
      ? history
          .filter((turn) => turn?.text)
          .map((turn) => ({
            role: turn.role === "model" ? "model" : "user",
            parts: [{ text: String(turn.text) }],
          }))
      : [];

    contents.push({
      role: "user",
      parts: [{ text: String(message) }],
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: { systemInstruction, temperature: 0.6 },
    });

    return res.status(200).json({ response: response.text || "How can I help with your project?" });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return res.status(200).json({
      response:
        "I can help with service details, pricing, and project planning. Share your name, email, and requirements in the contact form and the team will reply within 2 hours.",
      isOfflineMode: true,
    });
  }
});

const submitLead = asyncHandler(async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email || !service) {
    throw new ApiError(400, "Name, email, and service are required");
  }

  const contact = await Contact.create({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    service: String(service).trim(),
    message: message ? String(message).trim() : "",
    source: "commercial-website-contact-form",
  });
  console.log("New lead captured:", contact);
  return res.status(201).json(
    new ApiResponse(201, contact, "Lead successfully captured! Our team will contact you within 2 hours.")
  );
});

const loginAdmin = asyncHandler(async (req, res) => {
  const password = normalizePassword(req.body?.password);

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const settings = await getOrCreateAdminSettings();

  if (!verifyAdminPassword(password, settings)) {
    throw new ApiError(401, "Invalid admin password");
  }

  return res.status(200).json(new ApiResponse(200, { authenticated: true }, "Admin access granted"));
});

const getLeads = asyncHandler(async (_req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, contacts, "Leads fetched successfully"));
});

const getAdminContracts = asyncHandler(async (_req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, contacts, "Contracts fetched successfully"));
});

const deleteAdminContract = asyncHandler(async (req, res) => {
  const { contractId } = req.params;

  if (!mongoose.isValidObjectId(contractId)) {
    throw new ApiError(400, "Invalid contract id");
  }

  const deletedContract = await Contact.findByIdAndDelete(contractId);

  if (!deletedContract) {
    throw new ApiError(404, "Contract not found");
  }

  return res.status(200).json(new ApiResponse(200, deletedContract, "Contract removed successfully"));
});

const updateAdminPassword = asyncHandler(async (req, res) => {
  const currentPassword = normalizePassword(req.body?.currentPassword);
  const newPassword = normalizePassword(req.body?.newPassword);
  const providedPassword = extractBearerToken(req.headers.authorization);

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Current and new passwords are required");
  }

  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters long");
  }

  if (!providedPassword || providedPassword !== currentPassword) {
    throw new ApiError(401, "Current password does not match the active session");
  }

  const settings = await getOrCreateAdminSettings();

  if (!verifyAdminPassword(currentPassword, settings)) {
    throw new ApiError(401, "Invalid current password");
  }

  const { passwordSalt, passwordHash } = hashAdminPassword(newPassword);
  const updatedSettings = await AdminSetting.findOneAndUpdate(
    { key: ADMIN_SETTINGS_KEY },
    { key: ADMIN_SETTINGS_KEY, passwordSalt, passwordHash },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      { authenticated: true, updatedAt: updatedSettings.updatedAt },
      "Admin password updated successfully"
    )
  );
});

export {
  chatWithAssistant,
  submitLead,
  getLeads,
  loginAdmin,
  requireAdmin,
  getAdminContracts,
  deleteAdminContract,
  updateAdminPassword,
};
