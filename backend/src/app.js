import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.routes.js";
import { ApiError } from "./utils/ApiError.js";

dotenv.config();

const app = express();

const rawOrigins = process.env.FRONTEND_ORIGINS || "";
const originList = rawOrigins
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);


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
    if (!incomingOrigin) return callback(null, true);
    if (originList.includes(incomingOrigin)) return callback(null, true);
    callback(new Error(`CORS: origin '${incomingOrigin}' is not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
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
