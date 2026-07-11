import crypto from "crypto";
import mongoose from "mongoose";
import { GoogleGenAI } from "@google/genai";
import { AdminSetting } from "../models/admin.model.js";
import { Contact } from "../models/user.model.js";
import { OtpStore } from "../models/otpStore.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendOtpEmail, sendConfirmationEmail, sendNewLeadNotification } from "../utils/mailer.js";

let aiClient = null;

const verifiedTokenStore = new Map(); 

const OTP_EXPIRY_MINUTES = 10;
const VERIFIED_TOKEN_EXPIRY_MINUTES = 30;

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


const sendOtp = asyncHandler(async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(400, "A valid email address is required");
  }

  
  const otp = String(crypto.randomInt(100000, 999999));
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  
  await OtpStore.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  try {
    await sendOtpEmail(email, otp);
  } catch (mailError) {
    console.error("[mailer] Failed to send OTP email:", mailError.message);
    throw new ApiError(503, "Failed to send OTP email. Please check SMTP configuration.");
  }

  return res.status(200).json(
    new ApiResponse(200, { email }, `OTP sent to ${email}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`)
  );
});

const verifyOtp = asyncHandler(async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const otp   = String(req.body?.otp   ?? "").trim();

  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  const record = await OtpStore.findOne({ email });

  if (!record) {
    throw new ApiError(400, "No OTP found for this email. Please request a new one.");
  }

  if (new Date() > record.expiresAt) {
    await OtpStore.deleteOne({ email });
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }

  if (record.otp !== otp) {
    throw new ApiError(400, "Invalid OTP. Please check the code and try again.");
  }


  await OtpStore.deleteOne({ email });

  const verifiedToken = crypto.randomUUID();
  const tokenExpiresAt = new Date(Date.now() + VERIFIED_TOKEN_EXPIRY_MINUTES * 60 * 1000);
  verifiedTokenStore.set(verifiedToken, { email, expiresAt: tokenExpiresAt });

  for (const [token, data] of verifiedTokenStore) {
    if (new Date() > data.expiresAt) verifiedTokenStore.delete(token);
  }

  return res.status(200).json(
    new ApiResponse(200, { verified: true, verifiedToken }, "Email verified successfully.")
  );
});


const submitLead = asyncHandler(async (req, res) => {
  const { name, email, service, message, verifiedToken } = req.body;

  if (!name || !email || !service) {
    throw new ApiError(400, "Name, email, and service are required");
  }

  if (!verifiedToken) {
    throw new ApiError(403, "Email verification is required before submitting.");
  }

  const tokenData = verifiedTokenStore.get(verifiedToken);

  if (!tokenData) {
    throw new ApiError(403, "Invalid or expired verification token. Please verify your email again.");
  }

  if (new Date() > tokenData.expiresAt) {
    verifiedTokenStore.delete(verifiedToken);
    throw new ApiError(403, "Verification session expired. Please verify your email again.");
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  if (tokenData.email !== normalizedEmail) {
    throw new ApiError(403, "Verified email does not match the submitted email.");
  }

  verifiedTokenStore.delete(verifiedToken);

  const contact = await Contact.create({
    name: String(name).trim(),
    email: normalizedEmail,
    service: String(service).trim(),
    message: message ? String(message).trim() : "",
    source: "commercial-website-contact-form",
  });

  const leadData = {
    name: contact.name,
    email: contact.email,
    service: contact.service,
    message: contact.message,
  };

  // Fire both emails concurrently — silent failures don't block the response
  Promise.all([
    sendConfirmationEmail(leadData).catch((err) =>
      console.error("[mailer] Confirmation email failed:", err.message)
    ),
    sendNewLeadNotification(leadData).catch((err) =>
      console.error("[mailer] Lead notification email failed:", err.message)
    ),
  ]);

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

const ADMIN_RECOVERY_EMAIL = "info@gendtechnologies.in";

const forgotAdminPassword = asyncHandler(async (_req, res) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomBytes = crypto.randomBytes(12);
  const newPassword = Array.from(randomBytes)
    .map((byte) => charset[byte % charset.length])
    .join("");

  const { passwordSalt, passwordHash } = hashAdminPassword(newPassword);
  await AdminSetting.findOneAndUpdate(
    { key: ADMIN_SETTINGS_KEY },
    { key: ADMIN_SETTINGS_KEY, passwordSalt, passwordHash },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Password Reset – Gen-D Technologies</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#121212;border:1px solid #222;border-radius:16px;overflow:hidden;max-width:520px;">
          <tr>
            <td style="background:#2563eb;padding:28px 36px;">
              <p style="margin:0;color:#fff;font-size:11px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">↳ GEN-D TECHNOLOGIES</p>
              <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:900;letter-spacing:-0.5px;text-transform:uppercase;">Admin Password Reset</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 36px 28px;">
              <p style="color:#a1a1aa;font-size:14px;line-height:1.6;margin:0 0 24px;">
                A password reset was requested for the Gen-D admin panel. Your new temporary password is below. Log in and change it immediately.
              </p>
              <div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
                <p style="margin:0 0 8px;color:#71717a;font-size:10px;font-weight:900;letter-spacing:4px;text-transform:uppercase;">New Admin Password</p>
                <p style="margin:0;color:#60a5fa;font-size:28px;font-weight:900;letter-spacing:4px;font-family:'Courier New',monospace;">${newPassword}</p>
              </div>
              <p style="color:#71717a;font-size:12px;line-height:1.6;margin:0 0 12px;">
                ⚠️ For security, please change this password immediately after logging in.
              </p>
              <p style="color:#52525b;font-size:11px;line-height:1.5;margin:0;">
                If you did not request this reset, your account may be at risk. Change the password immediately.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;color:#3f3f46;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Gen-D Technologies · info@gendtechnologies.in</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const from = process.env.MAIL_FROM || "Gen-D Technologies <info@gendtechnologies.in>";
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: parseInt(process.env.SMTP_PORT || "587", 10) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from,
      to: ADMIN_RECOVERY_EMAIL,
      subject: "Gen-D Admin Panel — New Password",
      html,
      text: `Your new Gen-D admin panel password is: ${newPassword}\n\nPlease log in and change it immediately.`,
    });
  } catch (mailError) {
    console.error("[mailer] Failed to send password reset email:", mailError.message);
    return res.status(200).json(
      new ApiResponse(
        200,
        { emailSent: false },
        "Password reset but email delivery failed. Check server logs for the SMTP error."
      )
    );
  }

  return res.status(200).json(
    new ApiResponse(200, { emailSent: true }, `New password sent to ${ADMIN_RECOVERY_EMAIL}.`)
  );
});

export {
  chatWithAssistant,
  sendOtp,
  verifyOtp,
  submitLead,
  getLeads,
  loginAdmin,
  requireAdmin,
  getAdminContracts,
  deleteAdminContract,
  updateAdminPassword,
  forgotAdminPassword,
};

