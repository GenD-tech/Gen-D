import React from "react";
import { motion } from "motion/react";

export default function ExtraordinaryBanner() {
  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#fafafa] border-b border-zinc-200/80 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* Overlapping Text and Mockup Container */}
        <div className="relative w-full max-w-3xl flex flex-col items-center select-none my-8">

          {/* Top text */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-950 font-syne uppercase leading-none z-20 translate-y-4 sm:translate-y-8 text-center"
          >
            From ordinary
          </motion.h2>

          {/* Central Mockup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-[200px] h-[260px] sm:w-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl relative z-10 border border-zinc-300"
          >
            {/* Creative agency workspace image */}
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800"
              alt="Creative digital workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay with brand accent */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/95 rounded-xl px-3 py-2.5 backdrop-blur-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Gen-D & Co.</p>
                <p className="text-xs font-black text-zinc-950">Digital Excellence</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom text overlapping */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-950 font-syne uppercase leading-none z-20 -translate-y-4 sm:-translate-y-8 text-center"
          >
            to extraordinary
          </motion.h2>

        </div>

        {/* Brand descriptor */}
        <div className="pt-4 text-center space-y-4 max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Built by the digital generation, for the digital world
          </p>
          <div className="text-sm font-black tracking-widest text-zinc-950 uppercase font-syne">
            GEN-D & CO.®
          </div>
        </div>

        {/* Scroll button */}
        <div className="pt-8">
          <button
            onClick={handleScrollToProjects}
            className="w-12 h-12 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white flex items-center justify-center mx-auto hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md border border-zinc-800"
            aria-label="Scroll to projects"
          >
            <span className="text-xs font-bold">↓</span>
          </button>
        </div>

      </div>
    </div>
  );
}
