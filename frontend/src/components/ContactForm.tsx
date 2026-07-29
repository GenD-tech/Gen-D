import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { apiFetch } from "../lib/api";

interface ContactFormProps {
  prefilledService: string;
}

export default function ContactForm({ prefilledService }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update selected service if pre-filled service changes from parent CTAs
  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      countdownRef.current = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [resendCountdown]);

  // Reset OTP state when email changes
  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (otpVerified || otpSent) {
      setOtpSent(false);
      setOtpVerified(false);
      setVerifiedToken("");
      setOtp("");
      setOtpError("");
      setOtpSuccess("");
      setResendCountdown(0);
    }
  };

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    if (!isValidEmail(email)) {
      setOtpError("Please enter a valid email address first.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await apiFetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setOtpSuccess(`OTP sent to ${email}. Check your inbox.`);
        setResendCountdown(60);
      } else {
        setOtpError(data.error || data.message || "Failed to send OTP. Try again.");
      }
    } catch {
      setOtpError("Network error. Please check your connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Verify OTP ────────────────────────────────────────────────────────────
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }
    setOtpLoading(true);
    setOtpError("");

    try {
      const response = await apiFetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok && data.success && data.data?.verified) {
        setOtpVerified(true);
        setVerifiedToken(data.data.verifiedToken);
        setOtpSuccess("Email verified successfully!");
        setOtpSent(false);
        setOtp("");
      } else {
        setOtpError(data.error || data.message || "Invalid OTP. Please try again.");
      }
    } catch {
      setOtpError("Network error. Please check your connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Submit form ───────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Please provide both your name and email.");
      return;
    }
    if (!otpVerified) {
      setErrorMessage("Please verify your email address before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message, verifiedToken }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Unable to connect to the server. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Reset everything ──────────────────────────────────────────────────────
  const resetForm = () => {
    setIsSuccess(false);
    setName("");
    setEmail("");
    setMessage("");
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
    setVerifiedToken("");
    setOtpError("");
    setOtpSuccess("");
    setResendCountdown(0);
  };

  return (
    <section id="contact" className="py-24 bg-[#0d0d0d] text-white border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest block">
                ↳ GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase font-syne leading-none">
                Let's bring your<br />vision to life.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-medium">
                Our team is here to ensure your experience with us is smooth and successful. Reach out anytime - we're here to make sure you feel confident and supported throughout your journey with us.
              </p>
            </div>
          </div>

          {/* Right Side Form Panel */}
          <div className="lg:col-span-7 bg-[#121212] border border-zinc-800 rounded-2xl p-8 sm:p-12 relative shadow-2xl">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-base font-black uppercase tracking-widest text-[#ff4a22] mb-1">
                      ↳ Project coordinates
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      Fill out the form below and we will get back to you within 2 hours.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3 text-xs font-bold text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name */}
                    <div className="relative group">
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name *"
                        className="w-full py-4 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-500 focus:border-[#ff4a22] focus:placeholder-zinc-400 focus:ring-0 rounded-none outline-none text-sm font-semibold transition-colors duration-200"
                      />
                    </div>

                    {/* ── Email + Verify button ── */}
                    <div className="space-y-3">
                      <div className="relative group flex items-center gap-3">
                        <div className="relative flex-1">
                          <input
                            id="form-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            placeholder="Email Address *"
                            disabled={otpVerified}
                            className="w-full py-4 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-500 focus:border-[#ff4a22] focus:placeholder-zinc-400 focus:ring-0 rounded-none outline-none text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                          />
                          {/* Green verified badge */}
                          {otpVerified && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-wider"
                            >
                              <ShieldCheck className="w-4 h-4" />
                              Verified
                            </motion.span>
                          )}
                        </div>

                        {/* Verify / Resend button */}
                        {!otpVerified && (
                          <button
                            type="button"
                            id="otp-send-btn"
                            onClick={handleSendOtp}
                            disabled={otpLoading || !isValidEmail(email) || resendCountdown > 0}
                            className="shrink-0 px-4 py-2 bg-[#ff4a22] hover:bg-[#e03d16] text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-200 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-[#ff4a22]/20"
                          >
                            {otpLoading && !otp ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <MailCheck className="w-3 h-3" />
                            )}
                            {otpSent && resendCountdown > 0
                              ? `Resend (${resendCountdown}s)`
                              : otpSent
                              ? "Resend"
                              : "Verify"}
                          </button>
                        )}
                      </div>

                      {/* OTP sent success / error feedback */}
                      <AnimatePresence>
                        {otpSuccess && !otpVerified && (
                          <motion.p
                            key="otp-success-msg"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5 pl-0.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {otpSuccess}
                          </motion.p>
                        )}
                        {otpError && (
                          <motion.p
                            key="otp-error-msg"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-400 text-[11px] font-semibold flex items-center gap-1.5 pl-0.5"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                            {otpError}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* OTP input row */}
                      <AnimatePresence>
                        {otpSent && !otpVerified && (
                          <motion.div
                            key="otp-input-row"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-center gap-3 pt-1">
                              <div className="relative flex-1">
                                <input
                                  id="form-otp"
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={6}
                                  value={otp}
                                  onChange={(e) => {
                                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                                    setOtpError("");
                                  }}
                                  placeholder="Enter 6-digit OTP"
                                  className="w-full py-3.5 bg-[#1a1a1a] border border-zinc-700 focus:border-[#ff4a22] text-white placeholder-zinc-500 rounded-xl outline-none text-sm font-mono font-bold tracking-[6px] text-center transition-colors duration-200"
                                />
                              </div>
                              <button
                                type="button"
                                id="otp-verify-btn"
                                onClick={handleVerifyOtp}
                                disabled={otpLoading || otp.length < 6}
                                className="shrink-0 px-5 py-3.5 bg-[#ff4a22] hover:bg-[#e03d16] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-200 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#ff4a22]/10"
                              >
                                {otpLoading ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                )}
                                Confirm
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* ── End email section ── */}

                    {/* Dropdown */}
                    <div className="space-y-2 pt-2">
                      <label htmlFor="form-service" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">
                        Capabilities required
                      </label>
                      <div className="relative">
                        <select
                          id="form-service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full py-3.5 bg-transparent border-b border-zinc-800 text-white focus:border-[#ff4a22] focus:ring-0 rounded-none outline-none text-xs font-black uppercase tracking-widest cursor-pointer appearance-none"
                        >
                          <option value="Web Development" className="bg-[#121212] text-white">Web Development</option>
                          <option value="Digital Marketing" className="bg-[#121212] text-white">Digital Marketing</option>
                          <option value="Strategic Branding" className="bg-[#121212] text-white">Strategic Branding</option>
                          <option value="Event Management" className="bg-[#121212] text-white">Event Management</option>
                          <option value="General Inquiry" className="bg-[#121212] text-white">General Consultation</option>
                          <option value="Basic Plan" className="bg-[#121212] text-white">Basic Plan ($999/mo)</option>
                          <option value="Professional Plan" className="bg-[#121212] text-white">Professional Plan ($2,499/mo)</option>
                          <option value="Premium Plan" className="bg-[#121212] text-white">Premium Plan ($4,999/mo)</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">▼</div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <textarea
                        id="form-message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your project *"
                        className="w-full py-4 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-500 focus:border-[#ff4a22] focus:placeholder-zinc-400 focus:ring-0 rounded-none outline-none text-sm font-semibold transition-colors duration-200 resize-none"
                      />
                    </div>
                  </div>

                  {/* Email verification notice if not verified */}
                  {!otpVerified && (
                    <p className="text-zinc-600 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3 text-zinc-700" />
                      Email verification required before submitting
                    </p>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !otpVerified}
                      className="w-full py-4 bg-[#ff4a22] hover:bg-[#e03d16] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-250 shadow-lg shadow-[#ff4a22]/10 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      id="lead-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Establishing Link...</span>
                        </>
                      ) : (
                        <>
                          <span>↳ Get in touch</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-10 space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 animate-bounce shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white font-syne">
                      Coordinates Received!
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed font-medium">
                      Thank you <span className="font-bold text-white">{name}</span>! We have registered your inquiry about <span className="font-semibold text-[#ff4a22]">{service}</span>.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#161616] border border-zinc-800 max-w-sm text-xs leading-normal">
                    <span className="font-bold text-white block uppercase tracking-wider mb-1">Response Protocol:</span>
                    <p className="text-zinc-400 font-medium">
                      A GEND growth strategist will evaluate your domain and send a custom UX breakdown directly to <span className="font-semibold text-white">{email}</span> in under 120 minutes.
                    </p>
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200"
                    id="submit-another-lead"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
