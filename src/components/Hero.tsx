import React from "react";
import { motion } from "motion/react";

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] bg-[#009ee2] overflow-hidden flex flex-col justify-between pt-28 pb-12 transition-colors duration-300">
      
      {/* Background Graphic: Double exposure face with custom css filters & mask overlay to match reference exactly */}
      <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#009ee2] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#009ee2] via-transparent to-transparent z-10" />
        
        {/* Artistic pink/purple gradient overlay acting as dual exposure */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/40 via-purple-600/30 to-indigo-600/40 mix-blend-color-dodge z-10" />
        
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"
          alt="Artistic face representation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 opacity-80 mix-blend-luminosity filter saturate-150 contrast-125"
        />
      </div>

      {/* Top Meta info row inside the blue canvas */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-wrap justify-between items-start gap-4">
        {/* Year indicator */}
        <div className="text-sm font-black text-white/90 tracking-wider">
          ©2026
        </div>
        
        {/* Scope list on the right */}
        <div className="text-right text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/90 space-y-1">
          <div>UI/UX Design</div>
          <div>Development</div>
          <div>Brand Identity Design</div>
          <div>Ongoing Support</div>
        </div>
      </div>

      {/* Main Giant Typography Area */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 my-auto py-12">
        <div className="flex flex-col space-y-2 select-none">
          
          {/* DIGITAL with serif font, italicized and styled like the image */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic font-black text-[#c3ff2e] text-[16vw] sm:text-[14vw] lg:text-[13vw] leading-[0.8] tracking-tighter"
          >
            Digital
          </motion.h1>

          {/* DESIGN STUDIO with thick sans, uppercase */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-syne font-black uppercase text-white text-[12vw] sm:text-[10vw] lg:text-[9.5vw] leading-[0.85] tracking-tighter"
          >
            Design Studio
          </motion.h1>

        </div>
      </div>

      {/* Bottom Subtitle / Info Area */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row justify-between items-end gap-6 pt-6">
        
        {/* Intro text */}
        <p className="text-white/90 text-xs sm:text-sm max-w-md font-medium leading-normal">
          We create digital designs that help brands move faster and convert better. Your business deserves more than just a website. It needs results.
        </p>

        {/* Scroll arrow / action indicator */}
        <button 
          onClick={() => handleScrollTo("#services")}
          className="w-12 h-12 rounded-full bg-zinc-950/25 hover:bg-zinc-950/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-105 active:scale-95"
          aria-label="Scroll to services"
        >
          <span className="text-lg font-bold">↓</span>
        </button>

      </div>

    </section>
  );
}
