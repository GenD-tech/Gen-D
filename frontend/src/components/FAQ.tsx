import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FAQItem } from "../types";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "What is the typical turnaround time for a website project?",
      answer: "For a standard business website or landing page, we typically design, build, and deliver in 3 to 4 weeks. For more complex platforms with custom features or e-commerce integrations, we usually require 6 to 8 weeks. We'll give you a clear timeline after an initial consultation.",
      category: "Services"
    },
    {
      id: "faq-2",
      question: "How do your social media management plans work?",
      answer: "We start with an in-depth brand and competitor audit, then build a monthly content calendar tailored to your business goals. Our team handles everything — content creation, scheduling, community management, and monthly performance reporting. You stay informed without having to manage the day-to-day.",
      category: "Marketing"
    },
    {
      id: "faq-3",
      question: "Can we upgrade or change our pricing plan as we grow?",
      answer: "Absolutely. All our plans are month-to-month with no long-term lock-in contracts. You can scale up or downgrade at any time with a 30-day notice. We want to grow with your business, not hold you back.",
      category: "Account"
    },
    {
      id: "faq-4",
      question: "Do your prices include GST?",
      answer: "All prices listed on our website are exclusive of GST (18%). The applicable GST will be added to your invoice. We provide proper GST invoices for all services, making it fully compliant for your business expense claims.",
      category: "Billing"
    },
    {
      id: "faq-5",
      question: "What makes Gen-D & Co. different from other digital agencies?",
      answer: "Most agencies are generalists or are stuck in outdated approaches. Gen-D & Co. is built by the digital generation — we grew up online, we understand how platforms work, what audiences respond to, and how to create content that actually performs. We combine creative thinking with data-driven execution and a genuine passion for growing Indian businesses digitally.",
      category: "Philosophy"
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
    <div className="bg-white border-b border-zinc-150">
      
      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* FAQ Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
              ↳ FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tighter uppercase font-syne leading-tight">
              Got questions?<br />We've got answers.
            </h2>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              Everything you need to know before working with us. Can't find what you're looking for?
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                onClick={handleAskQuestionClick}
                className="inline-flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-[#ff4a22] hover:text-[#e03d16] transition-colors"
              >
                <span>↳ Ask us directly</span>
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

    </div>
  );
}
