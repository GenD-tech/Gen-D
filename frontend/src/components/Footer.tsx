import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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

  return (
    <>
    <footer className="bg-white text-zinc-950 border-t border-zinc-200/80 pt-24 pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Footer Links & Newsletter Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-zinc-200/80">

          {/* Logo & Contact Info */}
          <div className="md:col-span-4 space-y-6">
            <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="inline-flex items-center space-x-1 group">
              <span className="text-4xl sm:text-5xl font-black tracking-tighter text-zinc-950 uppercase font-syne flex items-center">
                GEN-D<span className="text-sm font-bold align-super ml-0.5 text-zinc-400">®</span>
              </span>
            </a>

            <div className="space-y-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <p>Callback line: <a href="tel:+919910952431" className="text-zinc-950 hover:text-[#ff4a22] transition-colors">991-095-2431</a></p>
              <p>Inquiry: <a href="mailto:info@gendtechnologies.in" className="text-zinc-950 hover:text-[#ff4a22] transition-colors">info@gendtechnologies.in</a></p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest">
              ↳ STAY CONNECTED
            </h4>
            <p className="text-xs text-zinc-500 font-medium leading-normal max-w-sm">
              Join our newsletter and stay updated on the latest trends in digital design, interactive branding, and paid media strategies.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center space-x-2 pt-2 max-w-sm relative">
              <input
                type="email"
                required
                placeholder="Enter email address"
                className="w-full pb-3 bg-transparent border-b border-zinc-300 text-xs font-semibold text-zinc-900 placeholder-zinc-400 outline-none focus:border-[#ff4a22] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 w-8 h-8 rounded-full bg-[#ff4a22] hover:bg-[#e03d16] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Directory Links */}
          <div className="md:col-span-2 md:col-start-9 space-y-4">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              ↳ DIRECTORY
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
              <li><a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-[#ff4a22] transition-colors">About us</a></li>
              <li><a href="#projects" onClick={(e) => handleScrollTo(e, "#projects")} className="hover:text-[#ff4a22] transition-colors">Selected Work</a></li>
              <li><a href="#blog" onClick={(e) => handleScrollTo(e, "#blog")} className="hover:text-[#ff4a22] transition-colors">Publications</a></li>
              <li><a href="#pricing" onClick={(e) => handleScrollTo(e, "#pricing")} className="hover:text-[#ff4a22] transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              ↳ CONNECT
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
              <li><a href="#" className="hover:text-[#ff4a22] transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-[#ff4a22] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#ff4a22] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#ff4a22] transition-colors">Dribbble</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-zinc-400 font-medium">
          <p className="max-w-md leading-relaxed">
            With GEN-D, your company gets more than just a website. We design experiences that resonate with your customers and drive meaningful digital engagement.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
            <span>© 2026 GEN-D Technologies. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-[#ff4a22] transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#ff4a22] transition-colors">Terms</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
    </>
  );
}
