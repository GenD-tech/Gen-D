/**
 * api.ts — central fetch helper for Gen-D frontend.
 *
 * Priority order for the backend base URL:
 *  1. VITE_API_BASE_URL  — set as an environment variable on Render before build
 *  2. VITE_BACKEND_URL   — alternative env name (fallback)
 *  3. Auto-detected from window.location: if the page is served from
 *     gen-d.onrender.com (the static frontend), we know the backend is at
 *     gend.onrender.com (the web service), so we hard-wire it.
 *  4. Empty string       — local dev; relative paths hit the server.ts proxy.
 */

const getBase = (): string => {
  // 1 & 2: Env vars baked in at build time by Vite
  const fromEnv =
    (import.meta.env.VITE_API_BASE_URL ?? "") ||
    (import.meta.env.VITE_BACKEND_URL ?? "");

  if (fromEnv) return fromEnv.replace(/\/$/, "");

  // 3: Runtime auto-detect for Render deployment
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // Frontend static site  → gen-d.onrender.com
    // Backend web service   → gend.onrender.com
    if (host === "gen-d.onrender.com") {
      return "https://gend.onrender.com";
    }
    // Handle custom domains: if the site is served from gendtechnologies.in
    // the backend lives at the same Render web service URL.
    if (host === "gendtechnologies.in" || host === "www.gendtechnologies.in") {
      return "https://gend.onrender.com";
    }
  }

  // 4: Local dev — use empty string so relative paths hit the proxy
  return "";
};

const BASE = getBase();

/**
 * Thin wrapper around fetch that prefixes the backend URL when needed.
 * Usage is identical to the native fetch API.
 */
export function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const url = BASE ? `${BASE}${path}` : path;
  return fetch(url, init);
}
