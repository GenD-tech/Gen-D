/**
 * api.ts — central fetch helper for Gen-D frontend.
 *
 * Local dev  : VITE_API_BASE_URL is "" (empty), so paths like "/api/leads"
 *              are relative and hit the server.ts proxy which forwards to the
 *              Node backend.
 *
 * Production : VITE_API_BASE_URL is set to the Render backend URL
 *              (e.g. "https://gend.onrender.com"), so all API calls go
 *              directly to the backend from the browser.
 */

const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

/**
 * Thin wrapper around fetch that prefixes the backend URL when needed.
 * Usage is identical to the native fetch API.
 */
export function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const url = BASE ? `${BASE}${path}` : path;
  return fetch(url, init);
}
