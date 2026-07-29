import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// In-memory lead storage for demonstration
interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
}

const leads: Lead[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;
  const BACKEND_URL = process.env.BACKEND_URL;

  app.use(express.json());

  const proxyApiRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const targetUrl = new URL(req.originalUrl, BACKEND_URL);
      const headers = new Headers();

      Object.entries(req.headers).forEach(([key, value]) => {
        const headerValue = Array.isArray(value) ? value.join(",") : value;

        if (!headerValue) {
          return;
        }

        const normalizedKey = key.toLowerCase();
        if (normalizedKey === "host" || normalizedKey === "content-length") {
          return;
        }

        headers.set(key, headerValue);
      });

      let body: string | undefined;
      if (!["GET", "HEAD"].includes(req.method)) {
        body = req.body === undefined ? undefined : JSON.stringify(req.body);

        if (body && !headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
      }

      const backendResponse = await fetch(targetUrl, {
        method: req.method,
        headers,
        body,
      });

      res.status(backendResponse.status);
      backendResponse.headers.forEach((value, key) => {
        const normalizedKey = key.toLowerCase();
        if (["transfer-encoding", "content-encoding", "connection", "keep-alive"].includes(normalizedKey)) {
          return;
        }

        res.setHeader(key, value);
      });

      const responseText = await backendResponse.text();
      res.send(responseText);
    } catch (error) {
      next(error);
    }
  };

  // Initialize Gemini client lazily to avoid crashing if API key is missing
  let ai: GoogleGenAI | null = null;
  const getGeminiClient = (): GoogleGenAI => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY environment variable is not configured.");
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  };

  // 1. API: Chatbot proxy using Gemini API
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `You are "GEND Bot", the brilliant, friendly, and ultra-creative digital strategist and AI assistant for GEND, a premier next-gen design studio and creative product agency.
GEND specializes in bridging traditional branding with modern attention, capturing the Gen-Z, Millennial, and high-growth markets.

Our Agency Offerings:
1. Web Development: Immersive, fast, high-converting interactive web designs and digital interfaces.
2. Digital Marketing: Hyper-targeted social campaigns, performance marketing (Google, Meta, TikTok ads), SEO, and conversion optimization.
3. Strategic Branding: Complete visual identities, style guides, logo design, tone-of-voice formulas, and digital asset kits.
4. Event Management: Creative influencer-led events, experiential popups, interactive launch experiences, and hybrid activations.

Our Pricing Packages:
- Core Social Boost ($1,499/mo): Social media setup, 10 bespoke posts/mo, basic analytics, and community engagement. Perfect for early-stage startups.
- Growth Acceleration ($3,299/mo) [Most Popular]: 20 bespoke posts/mo, reels/short-form videos, full paid ads management, SEO audits, and premium landing page optimization.
- Enterprise Dominance ($6,499/mo): Complete digital take-over, full custom web development, brand overhaul, multichannel strategy, ongoing funnel engineering, bi-weekly growth consulting, and experiential event activation support.

Your Persona:
- Professional, yet modern, energetic, creative, and witty. Speak directly, dynamically, and with confident digital-native poise.
- Be extremely helpful. Guide users on how to grow their brand.
- If they express interest in starting or scheduling a consultation, offer to take their details (Name, Email, Service of interest) and promise a strategist will reach out in under 2 hours. Also encourage them to fill out the lead capture form directly on our page.
- Keep responses relatively concise, scannable, using bullet points for formatting, and easy to read. Avoid dry jargon.

Important Fallback:
If asked about other things, politely steer them back to how GEND can elevate their business.`;

    try {
      const client = getGeminiClient();
      
      // Structure contents with history for full conversational context
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((turn: { role: 'user' | 'model'; text: string }) => {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "I'm here to help you supercharge your digital presence! What can I consult you on today?";
      return res.json({ response: text });

    } catch (error: any) {
      console.error("Gemini API Error:", error.message);
      
      // Polish fallback experience when API key is missing or fails
      let fallbackText = "I would love to help you build your digital brand! Right now, my advanced AI strategist engine is running on offline mode, but I can tell you that GEND offers Web Development, Digital Marketing, Strategic Branding, and Event Management. Our popular 'Growth Acceleration' package at $3,299/mo is perfect for maximizing ROI! Feel free to submit our contact form right on this page, and a human strategist will call you shortly!";
      
      if (message.toLowerCase().includes("pricing") || message.toLowerCase().includes("cost")) {
        fallbackText = "GEND offers three premium flexible plans:\n\n1. **Core Social Boost ($1,499/mo)**: Ideal for startups starting out.\n2. **Growth Acceleration ($3,299/mo)**: [Most Popular] Advanced social + video + paid ads management.\n3. **Enterprise Dominance ($6,499/mo)**: Complete digital takeover with full web development and experiential activations.\n\nWhich of these matches your business stage? Drop your details in the contact form, and we'll send a custom proposal!";
      } else if (message.toLowerCase().includes("service") || message.toLowerCase().includes("branding") || message.toLowerCase().includes("marketing")) {
        fallbackText = "We offer a suite of high-impact digital services:\n\n- **Web Development**: Interactive, fast, high-performance web experiences.\n- **Digital Marketing**: Paid ads, SEO, social management, and TikTok/Reels creation.\n- **Strategic Branding**: Modern logos, design styles, and brand kits.\n- **Event Management**: Hybrid activations, experiential launch events, and influencer meets.\n\nWhich service can we help you launch?";
      } else if (message.toLowerCase().includes("contact") || message.toLowerCase().includes("hire") || message.toLowerCase().includes("call")) {
        fallbackText = "Excellent! The best way to get started is to use the interactive contact form on our page to submit your name, email, and project goals. A GEND creative director will reach out to you within 2 hours!";
      }

      return res.json({ 
        response: fallbackText, 
        isOfflineMode: true,
        note: "Configuring the GEMINI_API_KEY secret will unlock full-powered AI generation."
      });
    }
  });

  // Catch-all API proxy for all other /api routes (must be defined AFTER specific /api routes)
  app.use("/api", proxyApiRequest);

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
