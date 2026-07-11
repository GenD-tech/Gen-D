<div align="center">

#  GEN-D — Next-Gen Creative Agency Website

### A full-stack, production-ready agency website with AI chatbot, lead capture, and an admin dashboard.

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-gendtechnologies.in-ff4a22?style=for-the-badge)](https://gendtechnologies.in)
[![Frontend](https://img.shields.io/badge/Frontend-gen--d.onrender.com-6366f1?style=for-the-badge)](https://gen-d.onrender.com)
[![Backend API](https://img.shields.io/badge/Backend%20API-gend.onrender.com-10b981?style=for-the-badge)](https://gend.onrender.com/health)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)

</div>

---

##  Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment (Render)](#-deployment-render)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)

---

##  About the Project

**Gen-D** is a premium, full-stack digital agency website built for **GEND** — a next-generation design studio that bridges traditional branding with modern digital strategy, targeting Gen-Z, Millennial, and high-growth markets.

The site is more than a portfolio — it is a **complete business platform** with real-time lead capture, an AI-powered chatbot, and a password-protected admin dashboard for managing enquiries.

---

##  Features

| Feature | Description |
|---|---|
|  **Premium UI/UX** | Dark-mode first design with glassmorphism, micro-animations (Framer Motion), and a curated color palette |
|  **AI Chatbot** | Floating chatbot powered by Google Gemini API — acts as a digital strategist for GEND |
|  **Lead Capture Form** | Contact form that saves leads directly to MongoDB Atlas |
|  **Admin Dashboard** | Password-protected panel to view, manage, and delete all submitted leads |
|  **Fully Responsive** | Mobile-first layout — works on all screen sizes |
|  **Dark / Light Mode** | Toggle between dark and light themes with smooth transitions |
|  **Smooth Navigation** | Scroll-spy header with section-level navigation |
|  **FAQ Section** | Animated, expandable FAQ accordion |
|  **Pricing Cards** | Interactive pricing matrix with CTA wired to the contact form |
|  **Projects Portfolio** | Curated work showcase section |

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript 5.8** | Type safety |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion (motion)** | Animations & transitions |
| **Lucide React** | Icon library |
| **Express (server.ts)** | Dev-proxy server — forwards `/api/*` to the backend in local dev |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **Google Gemini API** | AI chatbot responses |
| **crypto (built-in)** | Secure admin password hashing (scrypt + timing-safe compare) |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |

### Infrastructure

| Service | Role |
|---|---|
| **Render Static Site** | Frontend hosting (`gen-d.onrender.com`) |
| **Render Web Service** | Backend API hosting (`gend.onrender.com`) |
| **MongoDB Atlas** | Cloud database |
| **GitHub** | Source control & CI/CD trigger |

---

##  Project Structure

```
Gen-D/
├── 📂 frontend/                      # React + TypeScript SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx            # Sticky nav with dark mode toggle & admin trigger
│   │   │   ├── Hero.tsx              # Landing hero section
│   │   │   ├── Stats.tsx             # Agency achievement metrics
│   │   │   ├── ExtraordinaryBanner.tsx
│   │   │   ├── Projects.tsx          # Portfolio / selected work
│   │   │   ├── Services.tsx          # Service offerings with CTAs
│   │   │   ├── About.tsx             # Team & philosophy
│   │   │   ├── Pricing.tsx           # Pricing plans
│   │   │   ├── FAQ.tsx               # Accordion FAQ
│   │   │   ├── ContactForm.tsx       # Lead capture form → POST /api/leads
│   │   │   ├── Chatbot.tsx           # Floating Gemini AI chatbot
│   │   │   └── AdminPanel.tsx        # Password-protected admin dashboard
│   │   ├── lib/
│   │   │   └── api.ts                # Smart fetch helper (auto-detects backend URL)
│   │   ├── App.tsx                   # Root component & layout
│   │   ├── main.tsx                  # React entry point
│   │   ├── types.ts                  # Shared TypeScript types
│   │   └── index.css                 # Global styles
│   ├── server.ts                     # Express dev-proxy server (local dev only)
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── 📂 backend/                       # Node.js REST API
│   └── src/
│       ├── app.js                    # Express app + CORS configuration
│       ├── index.js                  # Server entry point
│       ├── controller/
│       │   └── user.controller.js    # All route handlers (leads, admin, chat)
│       ├── models/
│       │   ├── user.model.js         # Contact / Lead Mongoose schema
│       │   └── admin.model.js        # Admin settings schema (hashed password)
│       ├── routes/
│       │   └── api.routes.js         # Route definitions
│       ├── db/
│       │   └── db.js                 # MongoDB connection
│       └── utils/
│           ├── ApiError.js
│           ├── ApiResponse.js
│           └── asyncHandler.js
│
├── .gitignore
└── README.md
```

---

##  Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or later — [Download](https://nodejs.org/)
- **npm** v9 or later (comes with Node.js)
- A **MongoDB Atlas** account (free tier works) — [Sign up](https://www.mongodb.com/atlas)
- A **Google Gemini API key** (optional, for the chatbot) — [Get key](https://aistudio.google.com/)

---

### Local Development

**1. Clone the repository**

```bash
git clone https://github.com/GenD-tech/Gen-D.git
cd Gen-D
```

---

**2. Set up the Backend**

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxx.mongodb.net/

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=8d

FRONTEND_ORIGINS=http://localhost:3000,http://localhost:5173
ADMIN_PASSWORD=your_admin_password
```

Start the backend dev server:

```bash
npm run dev
```

> Backend runs at **http://localhost:8000**  
> Test it: `http://localhost:8000/health` should return `{ "ok": true }`

---

**3. Set up the Frontend**

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
# Used by the local dev proxy (server.ts) to forward /api/* requests
BACKEND_URL=http://localhost:8000

# Leave empty in local dev — the proxy handles routing
VITE_API_BASE_URL=

# Optional: enables the AI chatbot
GEMINI_API_KEY=your_gemini_api_key
```

Start the frontend dev server:

```bash
npm run dev
```

> Frontend runs at **http://localhost:3000**

---

##  Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | ✅ | Port the Express server listens on (default: `8000`) |
| `MONGODB_URI` | ✅ | Full MongoDB Atlas connection string |
| `ACCESS_TOKEN_SECRET` | ✅ | Secret key for signing JWT access tokens |
| `ACCESS_TOKEN_EXPIRY` | ✅ | Expiry for access tokens (e.g. `1d`) |
| `REFRESH_TOKEN_SECRET` | ✅ | Secret key for signing JWT refresh tokens |
| `REFRESH_TOKEN_EXPIRY` | ✅ | Expiry for refresh tokens (e.g. `8d`) |
| `FRONTEND_ORIGINS` | ✅ | Comma-separated list of allowed CORS origins |
| `ADMIN_PASSWORD` | ⬜ | Initial admin password (default: `admin123`) — **change this in production!** |
| `GEMINI_API_KEY` | ⬜ | Google Gemini API key for the AI chatbot |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `BACKEND_URL` | ✅ | Backend URL used by the local Express proxy (`server.ts`) |
| `VITE_API_BASE_URL` | ⬜ | Backend URL baked into the Vite build bundle. Required on Render. |
| `GEMINI_API_KEY` | ⬜ | Gemini key used by the frontend proxy chat route |

---

##  API Reference

**Production Base URL:** `https://gend.onrender.com`

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/api/leads` | Submit a contact / lead form |
| `POST` | `/api/chat` | Send a message to the Gemini chatbot |

### Admin Endpoints

> Require `Authorization: Bearer <password>` header on every request.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Verify admin password |
| `GET` | `/api/admin/contracts` | Fetch all submitted leads |
| `DELETE` | `/api/admin/contracts/:id` | Delete a lead by MongoDB ID |
| `POST` | `/api/admin/password` | Change the admin password |

---

#### `POST /api/leads` — Submit Contact Form

```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Web Development",
  "message": "We need a new website for our startup."
}

// Response — 201 Created
{
  "statusCode": 201,
  "success": true,
  "message": "Lead successfully captured! Our team will contact you within 2 hours.",
  "data": {
    "_id": "6687abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "service": "Web Development",
    "message": "We need a new website for our startup.",
    "createdAt": "2025-07-10T12:00:00.000Z"
  }
}
```

#### `POST /api/admin/login` — Admin Login

```json
// Request Body
{ "password": "your_admin_password" }

// Response — 200 OK
{
  "statusCode": 200,
  "success": true,
  "message": "Admin access granted",
  "data": { "authenticated": true }
}
```

---

##  Deployment (Render)

This project deploys as **two separate Render services**.

---

### 1. Backend — Web Service

Go to [Render Dashboard](https://dashboard.render.com) → **New Web Service** → Connect your GitHub repo.

| Setting | Value |
|---|---|
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

**Set these environment variables on Render:**

```
MONGODB_URI          = mongodb+srv://...
ACCESS_TOKEN_SECRET  = <strong_random_secret>
REFRESH_TOKEN_SECRET = <strong_random_secret>
ACCESS_TOKEN_EXPIRY  = 1d
REFRESH_TOKEN_EXPIRY = 8d
FRONTEND_ORIGINS     = https://gen-d.onrender.com,https://gendtechnologies.in
ADMIN_PASSWORD       = <your_secure_admin_password>
```

---

### 2. Frontend — Static Site

Go to Render Dashboard → **New Static Site** → Connect the same repo.

| Setting | Value |
|---|---|
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `frontend/dist` |

**Set this environment variable on Render (before building):**

```
VITE_API_BASE_URL = https://gend.onrender.com
```

>  **Important:** `VITE_*` variables are embedded into the JS bundle at **build time** by Vite. Always set them before triggering a deploy, then redeploy if you update them.

---

### Deployment Flow

```
Push to main branch on GitHub
        │
        ├──▶ Render builds & deploys Backend  (Web Service)
        │
        └──▶ Render builds & deploys Frontend (Static Site)
                    npm run build → dist/
```

---

##  Architecture

```
                    ┌──────────────────────────────────┐
                    │         Browser (Client)          │
                    │   gen-d.onrender.com              │
                    │   gendtechnologies.in             │
                    └──────────────┬───────────────────┘
                                   │  HTTPS
                    ┌──────────────▼───────────────────┐
                    │      Render Static Site           │
                    │   React + Vite SPA (dist/)        │
                    │                                   │
                    │  apiFetch() auto-detects host:    │
                    │  gen-d.onrender.com               │
                    │     → https://gend.onrender.com  │
                    └──────────────┬───────────────────┘
                                   │  HTTPS (CORS-allowed)
                    ┌──────────────▼───────────────────┐
                    │      Render Web Service           │
                    │   Node.js + Express REST API      │
                    │   gend.onrender.com               │
                    └──────┬──────────────┬────────────┘
                           │              │
              ┌────────────▼──┐   ┌───────▼──────────┐
              │ MongoDB Atlas │   │  Google Gemini   │
              │  (Leads + Admin│  │  API (Chatbot)   │
              │   Settings DB)│   │                  │
              └───────────────┘   └──────────────────┘
```

### How the Local Dev Proxy Works

In local development, `server.ts` runs on port **3000** and proxies all `/api/*` requests to the backend at port **8000**:

```
Browser → localhost:3000/api/leads
              │
          server.ts (proxy)
              │
        localhost:8000/api/leads
              │
         Express → MongoDB
```

This eliminates CORS issues in development and perfectly mirrors the production routing.

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m "feat: add your feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request** against `main`

### Commit Convention

| Prefix | When to use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes only |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructure without feature change |
| `perf:` | Performance improvement |
| `chore:` | Build / tooling / dependency changes |

---

##  License

This project is proprietary and maintained by **GEND Technologies**.  
All rights reserved © 2025 GEND.

---

<div align="center">

**Built with ❤️ by the GEND team**

[![Website](https://img.shields.io/badge/website-gendtechnologies.in-ff4a22?style=flat-square)](https://gendtechnologies.in)
[![GitHub](https://img.shields.io/badge/github-GenD--tech-181717?style=flat-square&logo=github)](https://github.com/GenD-tech)

</div>
