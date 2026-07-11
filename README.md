<div align="center">

#  GEN-D — Next-Gen Creative Agency Website

### A full-stack, production-ready agency website with AI chatbot, email OTP verification, lead capture, automated emails, and a secure admin dashboard.

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-gendtechnologies.in-ff4a22?style=for-the-badge)](https://gendtechnologies.in)
[![Frontend](https://img.shields.io/badge/Frontend-gen--d.onrender.com-6366f1?style=for-the-badge)](https://gen-d.onrender.com)
[![Backend API](https://img.shields.io/badge/Backend%20API-gend.onrender.com-10b981?style=for-the-badge)](https://gend.onrender.com/health)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-SMTP-22B573?logo=gmail&logoColor=white)
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
- [Email System (SMTP Setup)](#-email-system-smtp-setup)
- [API Reference](#-api-reference)
- [Deployment (Render)](#-deployment-render)
- [Architecture](#-architecture)
- [Changelog](#-changelog)
- [Contributing](#-contributing)
- [License](#-license)

---

##  About the Project

**GEN-D** is a premium, full-stack digital agency website built for **GEN-D Technologies** — a next-generation design studio that bridges traditional branding with modern digital strategy, targeting Gen-Z, Millennial, and high-growth markets.

The site is more than a portfolio — it is a **complete business platform** with real-time lead capture, email OTP verification, automated transactional emails, an AI-powered chatbot, and a password-protected admin dashboard for managing enquiries.

**Contact:** info@gendtechnologies.in | 991-095-2431

---

##  Features

| Feature | Description |
|---|---|
|  **Premium UI/UX** | Dark-mode first design with glassmorphism, micro-animations (Framer Motion), and a curated color palette |
|  **AI Chatbot** | Floating chatbot powered by Google Gemini API — acts as a digital strategist for GEN-D |
|  **Email OTP Verification** | Users must verify their email via a 6-digit OTP before submitting the contact form |
|  **Lead Capture Form** | Contact form saves verified leads directly to MongoDB Atlas |
|  **Automated Confirmation Email** | User receives a branded confirmation email with their submission summary upon form submit |
|  **Internal Lead Notification** | Team inbox (info@gendtechnologies.in) gets an instant lead alert email with full client details |
|  **Admin Dashboard** | Password-protected panel to view, manage, and delete all submitted leads |
|  **Forgot Admin Password** | Admin can trigger a password reset — a new password is auto-generated and emailed to the team inbox |
|  **Fully Responsive** | Mobile-first layout — works on all screen sizes |
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
| **Resend** | Transactional email delivery via API key |
| **crypto (built-in)** | Secure admin password hashing (scrypt + timing-safe compare), OTP & token generation |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |

### Infrastructure

| Service | Role |
|---|---|
| **Render Static Site** | Frontend hosting (`gen-d.onrender.com`) |
| **Render Web Service** | Backend API hosting (`gend.onrender.com`) |
| **MongoDB Atlas** | Cloud database |
| **Resend** | Transactional email delivery via API key |
| **GitHub** | Source control & CI/CD trigger |

---

##  Project Structure

```
Gen-D/
├── 📂 frontend/                      # React + TypeScript SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx            # Sticky nav with admin trigger & GEN-D branding
│   │   │   ├── Hero.tsx              # Landing hero section
│   │   │   ├── Stats.tsx             # Agency achievement metrics
│   │   │   ├── ExtraordinaryBanner.tsx
│   │   │   ├── Projects.tsx          # Portfolio / selected work
│   │   │   ├── Services.tsx          # Service offerings with CTAs
│   │   │   ├── About.tsx             # Team & philosophy
│   │   │   ├── Pricing.tsx           # Pricing plans
│   │   │   ├── FAQ.tsx               # Accordion FAQ
│   │   │   ├── ContactForm.tsx       # Lead form with email OTP verification → POST /api/leads
│   │   │   ├── Footer.tsx            # Footer with GEN-D contact info & branding
│   │   │   ├── Chatbot.tsx           # Floating Gemini AI chatbot
│   │   │   └── AdminPanel.tsx        # Password-protected admin dashboard + forgot password
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
│       │   └── user.controller.js    # All route handlers (leads, OTP, admin, chat)
│       ├── models/
│       │   ├── user.model.js         # Contact / Lead Mongoose schema
│       │   ├── admin.model.js        # Admin settings schema (hashed password)
│       │   └── otpStore.model.js     # OTP storage schema with TTL auto-expiry
│       ├── routes/
│       │   └── api.routes.js         # Route definitions
│       ├── db/
│       │   └── db.js                 # MongoDB connection
│       └── utils/
│           ├── ApiError.js
│           ├── ApiResponse.js
│           ├── asyncHandler.js
│           └── mailer.js             # Resend: OTP, confirmation & lead notification emails
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
- A **Resend API key** (for transactional email delivery) — [Get key](https://resend.com/api-keys)

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

FRONTEND_ORIGINS=http://localhost:3000,http://localhost:5173
ADMIN_PASSWORD=your_admin_password

GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
MAIL_FROM=Gen-D Technologies <info@gendtechnologies.in>
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
| `FRONTEND_ORIGINS` | ✅ | Comma-separated list of allowed CORS origins |
| `ADMIN_PASSWORD` | ⬜ | Initial admin password (default: `admin123`) — **change this in production!** |
| `GEMINI_API_KEY` | ⬜ | Google Gemini API key for the AI chatbot |
| `RESEND_API_KEY` | ⬜ | Resend API key for transactional email delivery |
| `MAIL_FROM` | ⬜ | Friendly sender name + address (default: `Gen-D Technologies <info@gendtechnologies.in>`) |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `BACKEND_URL` | ✅ | Backend URL used by the local Express proxy (`server.ts`) |
| `VITE_API_BASE_URL` | ⬜ | Backend URL baked into the Vite build bundle. Required on Render. |
| `GEMINI_API_KEY` | ⬜ | Gemini key used by the frontend proxy chat route |


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
FRONTEND_ORIGINS     = https://gen-d.onrender.com,https://gendtechnologies.in
ADMIN_PASSWORD       = <your_secure_admin_password>
GEMINI_API_KEY       = <your_gemini_api_key>
RESEND_API_KEY       = <your_resend_api_key>
MAIL_FROM            = Gen-D Technologies <info@gendtechnologies.in>
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
                    └──────┬─────────────┬─────────────┘
                           │             │             │
              ┌────────────▼──┐  ┌───────▼──────┐  ┌──▼────────────────┐
              │ MongoDB Atlas │  │ Google Gemini│  │  Resend HTTP API    │
              │ Leads + Admin │  │ API (Chatbot)│  │  Email Delivery     │
              │ OTP Store     │  │              │  │  OTP / Confirm /   │
              └───────────────┘  └──────────────┘  │  Lead Notify /     │
                                                    │  Password Reset    │
                                                    └────────────────────┘
```



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

This project is proprietary and maintained by **GEN-D Technologies**.
All rights reserved © 2026 GEN-D.

---

<div align="center">

**Built with ❤️ by the GEN-D team**

[![Website](https://img.shields.io/badge/website-gendtechnologies.in-ff4a22?style=flat-square)](https://gendtechnologies.in)
[![GitHub](https://img.shields.io/badge/github-GenD--tech-181717?style=flat-square&logo=github)](https://github.com/GenD-tech)

</div>
