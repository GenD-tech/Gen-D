import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ExtraordinaryBanner from "./components/ExtraordinaryBanner";
import Projects from "./components/Projects";
import Services from "./components/Services";
import About from "./components/About";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import AdminPanel from "./components/AdminPanel";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [prefilledService, setPrefilledService] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Sync state with HTML document root for dark selector
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Check URL for admin route
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setShowAdminPanel(true);
      // Clean up URL visually if they used hash
      if (window.location.hash === '#admin') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-zinc-50 dark:bg-[#050505] bg-grid-light dark:bg-grid text-zinc-900 dark:text-zinc-50 transition-colors duration-300 selection:bg-purple-500/20 antialiased font-sans">
      
      {/* Dynamic Header */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Achievements / Stats Block */}
        <Stats />

        {/* Transition Banner */}
        <ExtraordinaryBanner />

        {/* Selected Work Portfolio */}
        <Projects />
        
        {/* Animated Services Cards */}
        <Services onSelectService={(serviceName) => setPrefilledService(serviceName)} />
        
        {/* Philosophy & Team About block */}
        <About />
        
        {/* Pricing Matrix */}
        <Pricing onSelectPlan={(planName) => setPrefilledService(planName)} />
        
        {/* Frequently Asked Questions */}
        <FAQ />
        
        {/* Interactive Lead Capture form */}
        <ContactForm prefilledService={prefilledService} />
      </main>

      {/* Footer Branding Area */}
      <Footer />

      {/* Floating Interactive Chatbot assistant */}
      {!showAdminPanel && <Chatbot />}

      {showAdminPanel && <AdminPanel onClose={() => setShowAdminPanel(false)} />}
      
    </div>
  );
}
