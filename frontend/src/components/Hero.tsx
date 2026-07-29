import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const services = [
    "Website Dev",
    "Digital Marketing",
    "Social Media",
    "Event Mgmt",
    "Branding",
    "SEO",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-zinc-950 overflow-hidden flex flex-col pt-24"
    >
      {/* Decorative background circles */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#ff4a22]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#c3ff2e]/5 pointer-events-none" />

      {/* Top meta row */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex justify-between items-start">
        <div className="text-xs font-black text-white/70 tracking-widest uppercase">©2026</div>
        <div className="text-right text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/70 space-y-0.5 hidden sm:block">
          <div>Event Management · Digital Marketing</div>
          <div>Social Media · Website Development</div>
        </div>
      </div>

      {/* Main hero content */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex-1 flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-20">

        {/* Left — Typography & CTA */}
        <div className="flex-1 flex flex-col space-y-6 lg:space-y-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 w-fit backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff4a22] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/90">New Delhi, India · Est. 2022</span>
          </motion.div>

          {/* Main headline */}
          <div className="select-none">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic font-black text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            >
              Digital
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne font-black uppercase text-white leading-none tracking-tighter"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
            >
              Generation
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/85 text-sm sm:text-base leading-relaxed font-medium max-w-md"
          >
            We're a team of young digital-native professionals helping Indian businesses achieve their full potential online — from strategy to execution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => handleScrollTo("#contact")}
              className="flex items-center space-x-2 px-6 py-3.5 bg-[#ff4a22] hover:bg-[#e03a15] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 shadow-lg cursor-pointer"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScrollTo("#projects")}
              className="flex items-center space-x-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              <span>See Our Work</span>
            </button>
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-2 pt-2"
          >
            {services.map((s, i) => (
              <span
                key={i}
                className="px-4 py-1.5 bg-white/10 border border-white/15 rounded-full text-[10px] font-black uppercase tracking-wider text-white/80 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                {s}
              </span>
            ))}
          </motion.div>
      </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex justify-between items-center pb-10">
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest hidden sm:block">
          info@gendtechnologies.in · +91 99109 52431
        </p>
        <button
          onClick={() => handleScrollTo("#services")}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-105 active:scale-95 ml-auto"
          aria-label="Scroll to services"
        >
          <span className="text-sm font-bold">↓</span>
        </button>
      </div>
    </section>
  );
}
