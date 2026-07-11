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
![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-22B573?logo=gmail&logoColor=white)
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
| **Nodemailer** | SMTP email delivery (OTP, confirmation, notifications) |
| **crypto (built-in)** | Secure admin password hashing (scrypt + timing-safe compare), OTP & token generation |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |

### Infrastructure

| Service | Role |
|---|---|
| **Render Static Site** | Frontend hosting (`gen-d.onrender.com`) |
| **Render Web Service** | Backend API hosting (`gend.onrender.com`) |
| **MongoDB Atlas** | Cloud database |
| **Gmail SMTP** | Transactional email delivery via App Password |
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
│           └── mailer.js             # Nodemailer: OTP, confirmation & lead notification emails
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
- A **Gmail account** with an App Password for SMTP email delivery — [Setup guide](#-email-system-smtp-setup)

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

# SMTP / Email settings (Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@gendtechnologies.in
SMTP_PASS=your_gmail_app_password
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
| `SMTP_HOST` | ✅ | SMTP server hostname (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | ✅ | SMTP port — `587` for STARTTLS, `465` for SSL |
| `SMTP_USER` | ✅ | Gmail address used to send emails |
| `SMTP_PASS` | ✅ | Gmail App Password (not your regular Gmail password) |
| `MAIL_FROM` | ⬜ | Friendly sender name + address (default: `Gen-D Technologies <info@gendtechnologies.in>`) |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `BACKEND_URL` | ✅ | Backend URL used by the local Express proxy (`server.ts`) |
| `VITE_API_BASE_URL` | ⬜ | Backend URL baked into the Vite build bundle. Required on Render. |
| `GEMINI_API_KEY` | ⬜ | Gemini key used by the frontend proxy chat route |

---

##  Email System (SMTP Setup)

The project uses **Nodemailer** with Gmail SMTP to send three types of transactional emails. All emails use a branded dark-themed HTML template.

### Email Types

| Email | Trigger | Recipient | Subject |
|---|---|---|---|
| **OTP Verification** | User clicks "Verify" on the contact form | The user's email address | `Your Gen-D Verification Code` |
| **Submission Confirmation** | User successfully submits the contact form | The user's email address | `We received your request, [Name] — Gen-D Technologies` |
| **Lead Notification** | User successfully submits the contact form | `info@gendtechnologies.in` | `New Lead: [Name] is interested in [Service]` |
| **Password Reset** | Admin clicks "Forgot password?" on the login page | `info@gendtechnologies.in` | `Your New GEN-D Admin Password` |

### Gmail SMTP Setup (App Password)

> **Important:** Gmail requires an **App Password** — your regular Gmail password will not work.

1. Go to your Google Account → **Security**
2. Enable **2-Step Verification** (required for App Passwords)
3. Go to **Security → App Passwords**
4. Select **App: Mail**, **Device: Other** → type `Gen-D Server` → click **Generate**
5. Copy the 16-character App Password
6. Set it as `SMTP_PASS` in `backend/.env`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@gendtechnologies.in
SMTP_PASS=xxxx xxxx xxxx xxxx    # 16-char App Password (spaces are fine)
MAIL_FROM=Gen-D Technologies <info@gendtechnologies.in>
```

---

##  API Reference

**Production Base URL:** `https://gend.onrender.com`

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/api/otp/send` | Send a 6-digit OTP to an email address |
| `POST` | `/api/otp/verify` | Verify OTP and receive a short-lived verification token |
| `POST` | `/api/leads` | Submit a verified contact form lead |
| `POST` | `/api/chat` | Send a message to the Gemini chatbot |

### Admin Endpoints

> Require `Authorization: Bearer <password>` header on every protected request.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/admin/login` | ❌ | Verify admin password |
| `POST` | `/api/admin/forgot-password` | ❌ | Reset admin password & email new one to team inbox |
| `GET` | `/api/admin/contracts` | ✅ | Fetch all submitted leads |
| `DELETE` | `/api/admin/contracts/:id` | ✅ | Delete a lead by MongoDB ID |
| `POST` | `/api/admin/password` | ✅ | Change the admin password |

---

#### `POST /api/otp/send` — Send OTP

```json
// Request Body
{ "email": "user@example.com" }

// Response — 200 OK
{
  "statusCode": 200,
  "success": true,
  "message": "OTP sent to user@example.com. Valid for 10 minutes."
}
```

---

#### `POST /api/otp/verify` — Verify OTP

```json
// Request Body
{ "email": "user@example.com", "otp": "482910" }

// Response — 200 OK
{
  "statusCode": 200,
  "success": true,
  "message": "Email verified successfully.",
  "data": {
    "verified": true,
    "verifiedToken": "uuid-token-here"
  }
}
```

---

#### `POST /api/leads` — Submit Contact Form

> Requires a valid `verifiedToken` obtained from `POST /api/otp/verify`.
> On success, fires a confirmation email to the user and a lead notification to `info@gendtechnologies.in`.

```json
// Request Body
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "service": "Web Development",
  "message": "We need a new website for our startup.",
  "verifiedToken": "uuid-token-from-verify-endpoint"
}

// Response — 201 Created
{
  "statusCode": 201,
  "success": true,
  "message": "Lead successfully captured! Our team will contact you within 2 hours.",
  "data": {
    "_id": "6687abc123...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "service": "Web Development",
    "message": "We need a new website for our startup.",
    "createdAt": "2025-07-11T14:30:00.000Z"
  }
}
```

---

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

#### `POST /api/admin/forgot-password` — Reset Admin Password

> No authentication required. Generates a secure 12-character alphanumeric password, saves the hash to MongoDB, and sends the new password to `info@gendtechnologies.in`.

```json
// Response — 200 OK
{
  "statusCode": 200,
  "success": true,
  "message": "New password sent to info@gendtechnologies.in.",
  "data": { "emailSent": true }
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
FRONTEND_ORIGINS     = https://gen-d.onrender.com,https://gendtechnologies.in
ADMIN_PASSWORD       = <your_secure_admin_password>
GEMINI_API_KEY       = <your_gemini_api_key>
SMTP_HOST            = smtp.gmail.com
SMTP_PORT            = 587
SMTP_USER            = info@gendtechnologies.in
SMTP_PASS            = <your_gmail_app_password>
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
                    └──────┬─────────────┬─────────────┘
                           │             │             │
              ┌────────────▼──┐  ┌───────▼──────┐  ┌──▼────────────────┐
              │ MongoDB Atlas │  │ Google Gemini│  │  Gmail SMTP        │
              │ Leads + Admin │  │ API (Chatbot)│  │  Nodemailer        │
              │ OTP Store     │  │              │  │  OTP / Confirm /   │
              └───────────────┘  └──────────────┘  │  Lead Notify /     │
                                                    │  Password Reset    │
                                                    └────────────────────┘
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

##  Changelog

### v2.0.0 — July 2026

#### ✨ New Features

**Email OTP Verification**
- Users must verify their email address before submitting the contact form
- A 6-digit OTP is sent via Gmail SMTP and expires in **10 minutes**
- OTPs are stored in MongoDB with TTL auto-deletion (`otpStore.model.js`)
- After successful OTP entry, a short-lived **verified token** (30-minute expiry) is issued
- The contact form only accepts submissions paired with a valid verified token

**Automated Transactional Emails** (`mailer.js`)
- `sendOtpEmail` — branded dark-theme OTP email to the user
- `sendConfirmationEmail` — confirmation email sent to the user on form submission, includes a summary of their request
- `sendNewLeadNotification` — instant internal alert to `info@gendtechnologies.in` with full client details and a `Reply-To` header for quick responses
- All emails are fire-and-forget — failures are logged but **never block** the user's form submission

**Admin Forgot Password**
- "Forgot password? Send to email" link added to the admin login screen
- Clicking shows a browser `confirm()` dialog explaining the action
- A cryptographically secure 12-character alphanumeric password is generated, hashed with `scrypt`, saved to MongoDB, and emailed to `info@gendtechnologies.in`
- New API endpoint: `POST /api/admin/forgot-password`

#### 🎨 UI / Branding

- **Navbar logo** updated from `GEND` → `GEN-D`
- **Footer** updated:
  - Logo: `GEND®` → `GEN-D®`
  - Callback line: `(510) 895-6500` → `991-095-2431`
  - Inquiry email: `hello@gendstudio.com` → `info@gendtechnologies.in`
  - Copyright: `GEND Studio` → `GEN-D Technologies`
- **Verify button** in the contact form changed from dim ghost style to solid orange — consistent with the rest of the form's design language
- **Menu panel** footer text updated to `GEN-D STUDIO ©2026`

#### 🔧 Backend

- New model: `otpStore.model.js` — stores OTPs with TTL index for automatic MongoDB cleanup
- New utility: `mailer.js` — Nodemailer-based SMTP email system with three branded email templates
- New routes: `POST /api/otp/send`, `POST /api/otp/verify`, `POST /api/admin/forgot-password`
- `submitLead` handler updated to fire confirmation + notification emails on successful lead save
- `forgotAdminPassword` handler added with secure password generation and email delivery

#### 📦 Dependencies Added

| Package | Version | Purpose |
|---|---|---|
| `nodemailer` | latest | SMTP email delivery |

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

This project is proprietary and maintained by **GEN-D Technologies**.
All rights reserved © 2026 GEN-D.

---

<div align="center">

**Built with ❤️ by the GEN-D team**

[![Website](https://img.shields.io/badge/website-gendtechnologies.in-ff4a22?style=flat-square)](https://gendtechnologies.in)
[![GitHub](https://img.shields.io/badge/github-GenD--tech-181717?style=flat-square&logo=github)](https://github.com/GenD-tech)

</div>
