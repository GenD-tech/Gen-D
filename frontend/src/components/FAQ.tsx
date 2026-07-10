import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQItem } from "../types";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "What is your typical turnaround time for a custom project?",
      answer: "For standard high-converting landing pages and marketing hubs, we typically design, build, and deploy in 3 to 4 weeks. For more complex platforms, we usually require 6 to 8 weeks which includes rigorous testing and search engine optimization.",
      category: "Services"
    },
    {
      id: "faq-2",
      question: "How do you manage and report paid digital advertising campaigns?",
      answer: "We set up live real-time reporting dashboards so you don't have to wait for monthly PDFs. We manage your direct pixel setups, build segmented A/B testing creative loops, and adjust bids twice daily based on peak attention times.",
      category: "Marketing"
    },
    {
      id: "faq-3",
      question: "Can we transition between different pricing packages as we grow?",
      answer: "Absolutely! Our services operate on month-to-month retainers. You can scale your tier up or downsize at any time with a simple 30-day notice. There are no locking long-term contracts.",
      category: "Account"
    },
    {
      id: "faq-4",
      question: "What makes GEND different from a standard branding or marketing agency?",
      answer: "Most traditional agencies specialize in either static designs or dry media buying. GEND operates as a developer-creator hybrid. We write sub-second fast web code, custom engineer modern lead funnels, and design visuals that actually resonate with modern audiences. We bridge aesthetic and technology.",
      category: "Philosophy"
    }
  ];

  const blogPosts = [
    {
      title: "Designing for conversion: A deep dive into user behavior",
      excerpt: "How minor changes in typography tracking and button placement can increase form conversions by up to 45%.",
      date: "JUN 2026",
      category: "DESIGN",
      readTime: "5 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "The psychology of luxury digital consumer branding",
      excerpt: "Why minimal grids, high-contrast layouts, and generous negative space command higher premium positioning.",
      date: "MAY 2026",
      category: "BRANDING",
      readTime: "7 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Maximizing paid media ROI using custom interactive landing pages",
      excerpt: "Why routing cold paid traffic to interactive application funnels beats standard SaaS homepages every single time.",
      date: "APR 2026",
      category: "MARKETING",
      readTime: "4 MIN READ",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const toggleFaq = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const handleAskQuestionClick = (e: React.MouseEvent) => {
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

  return (
    <div id="blog" className="bg-white border-b border-zinc-150">
      
      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* FAQ Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
              ↳ FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tighter uppercase font-syne leading-tight">
              We've heard it all.<br />Here's everything you need to know before working with us
            </h2>
            <div className="pt-4">
              <a
                href="#contact"
                onClick={handleAskQuestionClick}
                className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#ff4a22] hover:text-[#e03d16] transition-colors"
              >
                <span>↳ Ask a question</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* FAQ Right Column Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-zinc-200 overflow-hidden transition-all duration-300 hover:border-zinc-350"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                    id={`faq-btn-${faq.id}`}
                  >
                    <span className="font-black text-sm sm:text-base text-zinc-950 leading-snug">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 ml-4">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#ff4a22]" />
                      ) : (
                        <Plus className="w-4 h-4 text-zinc-500" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-4 bg-zinc-50/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Latest Insights Section exactly like Reference Image 11 */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-150">
        
        {/* Insights Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 pb-6 border-b border-zinc-150">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">
              ↳ LATEST INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tighter uppercase font-syne">
              Knowledge & Strategy
            </h2>
          </div>
          <div>
            <a
              href="#contact"
              onClick={handleAskQuestionClick}
              className="inline-flex items-center space-x-1 text-xs font-black uppercase tracking-widest text-zinc-900 hover:text-[#ff4a22] transition-colors"
            >
              <span>↳ Read our publications</span>
              <span className="text-[10px] text-zinc-400 ml-1">(42)</span>
            </a>
          </div>
        </div>

        {/* Insights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-350 transition-all duration-300 h-full shadow-sm"
            >
              <div className="space-y-4">
                {/* Image */}
                <div className="aspect-[16/10] w-full rounded-xl overflow-hidden border border-zinc-200/50 bg-zinc-50 relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-zinc-950 text-white font-mono text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md">
                    {post.category}
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-zinc-950 group-hover:text-[#ff4a22] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-zinc-500 font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Read button link */}
              <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-zinc-900 group-hover:text-[#ff4a22] transition-colors">
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Read Article ↳
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
