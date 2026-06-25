import React from "react";

export default function ExtraordinaryBanner() {
  const handleScrollToProjects = () => {
    const element = document.querySelector("#projects");
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
    <div className="bg-[#fafafa] border-b border-zinc-200/80 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Overlapping Text and Mockup Container */}
        <div className="relative w-full max-w-full sm:max-w-2xl flex flex-col items-center select-none my-8">
          
          {/* Top text */}
          <h2 className="text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-zinc-950 font-syne uppercase leading-none z-20 translate-y-4 sm:translate-y-8 text-center">
            From ordinary
          </h2>
          
          {/* Central Mockup Container */}
          <div className="w-[180px] h-[240px] sm:w-[320px] sm:h-[420px] rounded-xl overflow-hidden bg-black shadow-2xl relative z-10 border border-zinc-200">
            <img
              src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=600"
              alt="Premium product mockup"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 opacity-90 contrast-125"
            />
          </div>

          {/* Bottom text overlapping */}
          <h2 className="text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-zinc-950 font-syne uppercase leading-none z-20 -translate-y-4 sm:-translate-y-8 text-center">
            to extraordinary
          </h2>

        </div>

        {/* Brand Logo and descriptor */}
        <div className="pt-4 text-center space-y-4 max-w-md mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Design that's built to last and grow with your business
          </p>
          <div className="text-sm font-black tracking-widest text-zinc-950 uppercase font-syne">
            GEND®
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
