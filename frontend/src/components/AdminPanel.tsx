import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, LockKeyhole, LogOut, Mail, Menu, ShieldCheck, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { apiFetch } from "../lib/api";

interface AdminPanelProps {
  onClose: () => void;
}

interface ContractRecord {
  _id: string;
  name: string;
  email: string;
  service: string;
  message?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

type AdminView = "dashboard" | "change-password";

const ADMIN_SESSION_KEY = "gend-admin-password";

const formatDate = (value?: string) => {
  if (!value) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [adminPassword, setAdminPassword] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) || "");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [view, setView] = useState<AdminView>("dashboard");
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(sessionStorage.getItem(ADMIN_SESSION_KEY)));
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoadingContracts, setIsLoadingContracts] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [deletingContractId, setDeletingContractId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const clearSession = (message = "") => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setContracts([]);
    setView("dashboard");
    setSuccessMessage("");
    setErrorMessage(message);
  };

  const authHeaders = (password: string) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${password}`,
  });

  const parseResponse = async (response: Response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  };

  const loadContracts = async (password: string) => {
    setIsLoadingContracts(true);
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/admin/contracts", {
        headers: authHeaders(password),
      });

      const data = await parseResponse(response);
      setContracts(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error(error);
      clearSession("Admin session expired. Enter the password again.");
    } finally {
      setIsLoadingContracts(false);
    }
  };

  const verifySession = async (password: string) => {
    setIsCheckingSession(true);

    try {
      const response = await apiFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      await parseResponse(response);
      setAdminPassword(password);
      setCurrentPassword(password);
      setView("dashboard");
      await loadContracts(password);
    } catch (error) {
      console.error(error);
      clearSession("Admin session expired. Enter the password again.");
    } finally {
      setIsCheckingSession(false);
    }
  };

  useEffect(() => {
    const savedPassword = sessionStorage.getItem(ADMIN_SESSION_KEY);

    if (savedPassword) {
      void verifySession(savedPassword);
    } else {
      setIsCheckingSession(false);
    }
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const password = loginPassword.trim();

    if (!password) {
      setErrorMessage("Enter the admin password first.");
      return;
    }

    setIsAuthenticating(true);
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      await parseResponse(response);
      sessionStorage.setItem(ADMIN_SESSION_KEY, password);
      setAdminPassword(password);
      setCurrentPassword(password);
      setLoginPassword("");
      setView("dashboard");
      await loadContracts(password);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Invalid password.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleForgotPassword = async () => {
    const confirmed = window.confirm(
      "Reset admin password?\n\nA brand-new password will be generated and sent to info@gendtechnologies.in immediately. Your current password will stop working.\n\nClick OK to confirm."
    );
    if (!confirmed) return;

    setIsForgotPassword(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await apiFetch("/api/admin/forgot-password", { method: "POST" });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSuccessMessage(
          data.data?.emailSent
            ? "✓ New password sent to info@gendtechnologies.in. Check your inbox and log in with the new password."
            : "Password was reset but the email could not be delivered. Please check the server SMTP configuration."
        );
      } else {
        setErrorMessage(data.message || "Failed to reset password. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsForgotPassword(false);
    }
  };

  const handleDelete = async (contractId: string) => {
    if (!adminPassword) {
      return;
    }

    const confirmed = window.confirm("Delete this contract from the database?");
    if (!confirmed) {
      return;
    }

    setDeletingContractId(contractId);
    setErrorMessage("");

    try {
      const response = await apiFetch(`/api/admin/contracts/${contractId}`, {
        method: "DELETE",
        headers: authHeaders(adminPassword),
      });

      await parseResponse(response);
      setContracts((currentContracts) => currentContracts.filter((contract) => contract._id !== contractId));
      setSuccessMessage("Contract removed successfully.");
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Unable to remove contract.");
    } finally {
      setDeletingContractId("");
    }
  };

  const handlePasswordUpdate = async (event: FormEvent) => {
    event.preventDefault();

    if (!adminPassword) {
      setErrorMessage("Please log in again before changing the password.");
      return;
    }

    if (!currentPassword.trim() || !newPassword.trim()) {
      setErrorMessage("Fill in both the current and new passwords.");
      return;
    }

    setIsSavingPassword(true);
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/admin/password", {
        method: "POST",
        headers: authHeaders(adminPassword),
        body: JSON.stringify({
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
        }),
      });

      await parseResponse(response);
      sessionStorage.setItem(ADMIN_SESSION_KEY, newPassword.trim());
      setAdminPassword(newPassword.trim());
      setCurrentPassword(newPassword.trim());
      setNewPassword("");
      setView("dashboard");
      setSuccessMessage("Admin password updated.");
      await loadContracts(newPassword.trim());
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Unable to change password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAdminPassword("");
    setLoginPassword("");
    setCurrentPassword("");
    setNewPassword("");
    setContracts([]);
    setView("dashboard");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const contractCount = contracts.length;
  const pendingCount = contracts.filter((contract) => (contract.status || "new") === "new").length;

  if (isCheckingSession) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="fixed inset-0 z-80 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,74,34,0.18),transparent_38%),linear-gradient(180deg,#090909_0%,#121212_100%)] text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(195,255,46,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,74,34,0.08),transparent_35%)]" />
        <div className="relative flex flex-col items-center gap-4 rounded-4xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur-2xl shadow-2xl shadow-black/40">
          <Loader2 className="h-10 w-10 animate-spin text-[#ff4a22]" />
          <div className="space-y-1">
            <h2 className="text-xl font-black uppercase tracking-tight">Verifying session</h2>
            <p className="text-sm text-zinc-400">Checking the stored admin password before opening the dashboard.</p>
          </div>
        </div>
      </motion.section>
    );
  }

return (
  <motion.section
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 16 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
    className="fixed inset-0 z-80 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.06),transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eef1f6_100%)] text-slate-900"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.05),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.04),transparent_35%)]" />
    <div className="relative min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600">Admin Access</span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Contract control room</h1>
            <p className="max-w-2xl text-sm text-slate-500">
              Review every stored contract, remove entries from MongoDB, and rotate the admin password from a dedicated page.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to site
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>

        {!adminPassword ? (
          <div className="grid flex-1 place-items-center py-8">
            <motion.form
              key="admin-login"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
              onSubmit={handleLogin}
            >
              <div className="mb-8 space-y-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">Enter admin password</h2>
                <p className="text-sm text-slate-500">Use the current admin password to unlock the dashboard.</p>
              </div>

              <div className="space-y-4">
                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="admin-password" className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-600">
                    Password
                  </label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="admin-password"
                      type="password"
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(event) => setLoginPassword(event.target.value)}
                      placeholder="Enter admin password"
                      className="w-full rounded-xl border border-slate-300 bg-white px-11 py-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isAuthenticating ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  {isAuthenticating ? "Checking..." : "Open admin page"}
                </button>

                {/* Forgot password */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    id="admin-forgot-password-btn"
                    onClick={() => void handleForgotPassword()}
                    disabled={isForgotPassword}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isForgotPassword ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <KeyRound className="h-3 w-3" />
                    )}
                    {isForgotPassword ? "Sending new password..." : "Forgot password? Send to email"}
                  </button>
                </div>

                {/* Feedback for forgot-password action */}
                {successMessage && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-start gap-2">
                    <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </div>
            </motion.form>
          </div>
        ) : (
          <div className="grid flex-1 gap-6 xl:grid-cols-[1.28fr_0.72fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-[linear-gradient(135deg,#eff6ff,#ffffff_60%)] p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Total: {contractCount}</span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">New: {pendingCount}</span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Session active</span>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Stored contracts</h2>
                      <p className="max-w-2xl text-sm text-slate-600">
                        This is the live lead inbox. Each card can be removed immediately from the database.
                      </p>
                    </div>
                  </div>

                  <div className="min-w-60">
                    <label htmlFor="admin-mode" className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-600">
                      Admin actions
                    </label>
                    <select
                      id="admin-mode"
                      value={view}
                      onChange={(event) => {
                        const nextView = event.target.value as AdminView;
                        if (nextView === "change-password") {
                          setCurrentPassword(adminPassword);
                        }
                        setView(nextView);
                      }}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-colors focus:border-blue-500"
                    >
                      <option value="dashboard">Dashboard</option>
                      <option value="change-password">Change password</option>
                    </select>
                  </div>
                </div>
              </div>

              {successMessage && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}

              <AnimatePresence mode="wait">
                {view === "change-password" ? (
                  <motion.form
                    key="change-password"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    onSubmit={handlePasswordUpdate}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                  >
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                          <LockKeyhole className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-600">Change Password</span>
                          <h2 className="text-lg font-bold tracking-tight text-slate-900">Verification page</h2>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setView("dashboard")}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                        Back to dashboard
                      </button>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                      <p className="text-sm text-slate-600">
                        To set a new password, verify the old one first. The new password becomes the only admin key once saved.
                      </p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="current-password" className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-600">
                            Old password
                          </label>
                          <input
                            id="current-password"
                            type="password"
                            autoComplete="current-password"
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="new-password" className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-600">
                            New password
                          </label>
                          <input
                            id="new-password"
                            type="password"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <button
                          type="submit"
                          disabled={isSavingPassword}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isSavingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                          {isSavingPassword ? "Saving..." : "Save new password"}
                        </button>

                        <span className="text-xs font-medium text-slate-500">
                          Password must be at least 6 characters.
                        </span>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                      <div className="mb-6 flex items-center justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-bold tracking-tight text-slate-900">Stored contracts</h2>
                          <p className="text-sm text-slate-500">Delete any contract entry and it will be removed from MongoDB immediately.</p>
                        </div>
                        {isLoadingContracts && <Loader2 className="h-5 w-5 animate-spin text-blue-500" />}
                      </div>

                      <div className="space-y-3">
                        {contracts.length === 0 && !isLoadingContracts ? (
                          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                            No contracts have been stored yet.
                          </div>
                        ) : (
                          contracts.map((contract) => (
                            <article
                              key={contract._id}
                              className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
                            >
                              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-2.5">
                                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{contract.service || "General Inquiry"}</span>
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{contract.status || "new"}</span>
                                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">{formatDate(contract.createdAt)}</span>
                                  </div>

                                  <div>
                                    <h3 className="text-base font-semibold text-slate-900">{contract.name}</h3>
                                    <p className="text-sm text-slate-500">{contract.email}</p>
                                  </div>

                                  <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                                    {contract.message?.trim() ? contract.message : "No project note provided."}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => void handleDelete(contract._id)}
                                  disabled={deletingContractId === contract._id}
                                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {deletingContractId === contract._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                  Remove
                                </button>
                              </div>
                            </article>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                    <Menu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Admin summary</h3>
                    <p className="text-sm text-slate-500">Quick readout of what is stored right now.</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-xs font-medium text-slate-500">Contracts</span>
                    <p className="mt-1.5 text-2xl font-bold text-slate-900">{contractCount}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-xs font-medium text-slate-500">New items</span>
                    <p className="mt-1.5 text-2xl font-bold text-slate-900">{pendingCount}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-xs font-medium text-slate-500">Password</span>
                    <p className="mt-1.5 text-sm font-semibold text-emerald-600">Protected</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-slate-900">Access notes</h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
                  <li>• The admin password is required for every admin request.</li>
                  <li>• Changing the password updates the only credential used by this page.</li>
                  <li>• Removing a contract deletes the matching MongoDB document immediately.</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  </motion.section>
);
}