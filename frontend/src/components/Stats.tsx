import React from "react";

export default function Stats() {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector("#contact");
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

  const items = [
    { value: "20+", label: "Brands served", desc: "Helping Indian businesses establish a powerful digital presence." },
    { value: "5L+", label: "People reached", desc: "Our campaigns and content connect brands with real audiences." },
    { value: "98%", label: "Client satisfaction", desc: "We build long-term partnerships through consistent results." },
    { value: "3+", label: "Years of expertise", desc: "A young, focused team with deep digital-native experience." }
  ];

  return (
    <div className="bg-white dark:bg-[#060606] border-b border-zinc-100 dark:border-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-12 border-b border-zinc-150 dark:border-zinc-850">
          <div className="md:col-span-4">
            <a 
              href="#contact" 
              onClick={handleScrollToContact}
              className="inline-flex items-center space-x-1.5 text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity"
            >
              <span>↳ Let's talk</span>
            </a>
          </div>
          <div className="md:col-span-8">
            <p className="text-sm font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Our work speaks through numbers. Here's what we've achieved so far.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {items.map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="text-4xl sm:text-5xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter">
                {item.value}
              </div>
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
