import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onAdminClick: () => void;
}

export default function Header({ darkMode, setDarkMode, onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Case Studies (17)", href: "#projects", isBadge: true },
    { name: "Blog", href: "#blog" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of header
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-150 py-4 text-zinc-900 shadow-sm"
          : "bg-transparent py-6 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, "#home")} className="flex items-center space-x-1 group">
          <span className={`text-xl sm:text-2xl font-black tracking-tight uppercase font-syne flex items-center transition-colors duration-300 ${scrolled ? "text-zinc-950" : "text-white"}`}>
            GEND<span className="text-xs font-bold align-super ml-0.5 opacity-80">®</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-[11px] uppercase tracking-widest font-black transition-colors duration-200 py-1 ${
                link.isBadge
                  ? scrolled ? "text-[#ff4a22] hover:opacity-85" : "text-[#c3ff2e] hover:opacity-85"
                  : scrolled ? "text-zinc-900 hover:text-[#ff4a22]" : "text-white/90 hover:text-[#c3ff2e]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Menu trigger only, no theme toggler) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onAdminClick}
            className={`hidden sm:inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-sm ${
              scrolled
                ? "border-zinc-200 bg-white text-zinc-950 hover:border-[#ff4a22] hover:text-[#ff4a22]"
                : "border-white/20 bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>

          {/* Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 text-[10px] font-black uppercase tracking-widest cursor-pointer shadow-sm ${
              scrolled
                ? "bg-zinc-950 text-white hover:bg-zinc-800"
                : "bg-white text-zinc-950 hover:bg-white/90"
            }`}
            id="mobile-menu-trigger"
          >
            <span>Menu</span>
            {isMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Full Width Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 border-b border-zinc-200 bg-white text-zinc-900 shadow-xl overflow-hidden z-40"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-4">
                <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Navigation</span>
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-2xl font-black uppercase tracking-tight text-zinc-950 hover:text-[#ff4a22] transition-colors"
                  >
                    {link.name} {link.isBadge && <span className="text-xs text-[#ff4a22] font-serif align-middle ml-1">★</span>}
                  </a>
                ))}
              </div>
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-zinc-400 block mb-2">Our Mission</span>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                    We turn standard business models into digital experiences that command attention, maximize user retention, and convert traffic into scalable growth.
                  </p>
                </div>
                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, "#contact")}
                    className="px-6 py-3 rounded-lg bg-[#ff4a22] hover:bg-[#e03d16] text-white font-black text-[10px] uppercase tracking-widest transition-all duration-200"
                  >
                    Schedule Consultation ↳
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onAdminClick();
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-950 transition-colors hover:border-[#ff4a22] hover:text-[#ff4a22]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </button>
                  <span className="text-xs font-mono text-zinc-400">GEND STUDIO ©2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
