import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.routes.js";
import { ApiError } from "./utils/ApiError.js";

dotenv.config();

const app = express();

// Build the allowed-origin list from the env var.
// Strip trailing slashes so "https://gen-d.onrender.com/" and
// "https://gen-d.onrender.com" are treated the same.
const rawOrigins = process.env.FRONTEND_ORIGINS || "";
const originList = rawOrigins
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

// Always allow the known Render static-site URL and the custom domain
// as a safety net, even if the env var was not updated.
const ALWAYS_ALLOW = [
  "https://gen-d.onrender.com",
  "https://gendtechnologies.in",
  "https://www.gendtechnologies.in",
];

ALWAYS_ALLOW.forEach((origin) => {
  if (!originList.includes(origin)) {
    originList.push(origin);
  }
});

const corsOptions = {
  origin: (incomingOrigin, callback) => {
    // Allow server-to-server requests (no Origin header)
    if (!incomingOrigin) return callback(null, true);
    if (originList.includes(incomingOrigin)) return callback(null, true);
    callback(new Error(`CORS: origin '${incomingOrigin}' is not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware — this handles both regular requests AND preflight (OPTIONS)
app.use(cors(corsOptions));
// Explicitly handle OPTIONS pre-flight for all routes using the same config
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.status(200).json({ ok: true, service: "Gen-D API" });
});

app.use("/api", apiRoutes);

app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    statusCode,
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export default app;
