import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update selected service if pre-filled service changes from parent CTAs
  useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Please provide both your name and email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await apiFetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message })
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

  return (
    <section id="contact" className="py-24 bg-[#0d0d0d] text-white border-b border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Form Left Side Information exactly like Reference Image 12 */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest block">
                ↳ GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase font-syne leading-none">
                Let's bring your<br />vision to life.
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-medium">
                John is here to ensure your experience with us is smooth and successful. Reach out anytime - he's here to make sure you feel confident and supported throughout your journey with us.
              </p>
            </div>

            {/* Client Success Manager Profile Card exactly like Reference Image 12 */}
            <div className="flex items-center space-x-4 pt-6 border-t border-zinc-800">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#ff4a22]/30 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="John Taylor"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-white">
                  John Taylor
                </h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Client Success Manager
                </p>
              </div>
            </div>
          </div>

          {/* Lead Form Right Side Panel with elegant Underline fields */}
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
                    {/* Name input - Underline Style */}
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

                    {/* Email input - Underline Style */}
                    <div className="relative group">
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *"
                        className="w-full py-4 bg-transparent border-b border-zinc-800 text-white placeholder-zinc-500 focus:border-[#ff4a22] focus:placeholder-zinc-400 focus:ring-0 rounded-none outline-none text-sm font-semibold transition-colors duration-200"
                      />
                    </div>

                    {/* Dropdown Selection - Underline Style */}
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
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Message input - Underline Style */}
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

                  {/* Submit CTA */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#ff4a22] hover:bg-[#e03d16] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-250 shadow-lg shadow-[#ff4a22]/10 flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
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
                    onClick={() => {
                      setIsSuccess(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
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
