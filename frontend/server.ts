import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/api", async (req, res, next) => {
    try {
      const upstream = await fetch(`${backendUrl}${req.originalUrl}`, {
        method: req.method,
        headers: {
          "Content-Type": req.headers["content-type"] || "application/json",
          ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
        },
        body: ["GET", "HEAD"].includes(req.method) ? undefined : JSON.stringify(req.body ?? {}),
      });

      const payload = await upstream.text();
      res.status(upstream.status);

      const contentType = upstream.headers.get("content-type");
      if (contentType) {
        res.setHeader("content-type", contentType);
      }

      return res.send(payload);
    } catch (error) {
      next(error);
    }
  });

  // Vite integration middleware for dev environment, static routing for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GEND Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
