import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { apiFetch } from "../lib/api";

/** Renders a simple subset of markdown: **bold**, - bullets, 1. numbered, \n breaks */
function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let keyCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line → spacer
    if (line.trim() === "") {
      elements.push(<div key={keyCounter++} className="h-1" />);
      continue;
    }

    // Numbered list item: "1. text" or "2. text"
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      elements.push(
        <div key={keyCounter++} className="flex items-start space-x-2 my-0.5">
          <span className="text-[#ff4a22] font-black text-xs shrink-0 mt-0.5">{numberedMatch[1]}.</span>
          <span className="text-xs leading-relaxed">{renderInline(numberedMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Bullet list item: "- text"
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    if (bulletMatch) {
      elements.push(
        <div key={keyCounter++} className="flex items-start space-x-2 my-0.5">
          <span className="text-[#ff4a22] font-black text-xs shrink-0 mt-1">›</span>
          <span className="text-xs leading-relaxed">{renderInline(bulletMatch[1])}</span>
        </div>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={keyCounter++} className="text-xs leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

/** Renders inline **bold** and *italic* within a string */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-black text-zinc-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste! 👋 I'm the Gen-D & Co. AI assistant.\n\nI can help you with information about our services, pricing, timelines, and how we can help your business grow digitally. What are you looking to achieve today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Structure chat history for full Gemini Conversational Context (excluding the introductory welcome message)
    const history = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({
        role: m.sender === "user" ? ("user" as const) : ("model" as const),
        text: m.text
      }));

    try {
      const response = await apiFetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history })
      });

      const data = await response.json();

      setIsTyping(false);

      if (response.ok && data.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Math.random().toString(36).substr(2, 9)}`,
            sender: "bot",
            text: data.response,
            timestamp: new Date(),
            isOfflineMode: data.isOfflineMode
          }
        ]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Math.random().toString(36).substr(2, 9)}`,
          sender: "bot",
          text: "My apologies, I'm having a brief connection issue. You can reach us directly at info@gendtechnologies.in or call +91 99109 52431. Alternatively, fill out the contact form on this page!",
          timestamp: new Date()
        }
      ]);
    }
  };

  const suggestionChips = [
    "What services do you offer?",
    "Tell me about your pricing",
    "How fast can you build a website?",
    "Do you work with small businesses?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating launcher bubble button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-[#ff4a22] text-white flex items-center justify-center shadow-xl hover:shadow-[#ff4a22]/30 hover:scale-105 transition-all duration-300 relative group cursor-pointer focus:outline-none"
            aria-label="Open AI Assistant"
            id="chat-launcher-bubble"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
            
            {/* Hover tooltip */}
            <span className="absolute right-16 scale-0 group-hover:scale-100 bg-zinc-950 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all duration-200 uppercase tracking-wider shadow-md shrink-0 whitespace-nowrap">
              Talk to AI Strategist
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[360px] sm:w-[400px] h-[520px] sm:h-[580px] bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            
            {/* Header section */}
            <div className="px-5 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#ff4a22] flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white flex items-center space-x-1.5">
                    <span>Gen-D AI Assistant</span>
                  </h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Active Consultation</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
                id="close-chat-panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat message history body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-zinc-50/30">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                      m.sender === "user"
                        ? "bg-zinc-950 text-white font-semibold rounded-tr-none"
                        : "bg-white text-zinc-800 rounded-tl-none border border-zinc-200"
                    }`}
                  >
                    {m.sender === "bot" ? renderMarkdown(m.text) : m.text}
                    
                    {/* Timestamp / Status */}
                    <div className={`text-[9px] font-black uppercase tracking-wider mt-1.5 block text-right ${
                      m.sender === "user" ? "text-zinc-400" : "text-zinc-400"
                    }`}>
                      {m.isOfflineMode && (
                        <span className="text-amber-500 mr-1.5 font-bold uppercase tracking-wider">⚡ Offline Assist Mode</span>
                      )}
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-zinc-500 px-4 py-3 rounded-lg rounded-tl-none border border-zinc-200 flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#ff4a22]" />
                    <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">Formulating strategy...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer containing quick suggestions and text input */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200 space-y-3.5">
              
              {/* Suggestion Chips */}
              {messages.length < 3 && (
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-wider text-zinc-600 hover:border-[#ff4a22] hover:bg-zinc-50 transition-all shrink-0 cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Text Area / Input box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about capabilities, costs, timelines..."
                  className="flex-1 px-4 py-3 rounded-lg bg-white border border-zinc-200 focus:border-[#ff4a22] focus:ring-1 focus:ring-[#ff4a22]/30 text-xs sm:text-sm font-semibold text-zinc-900 placeholder-zinc-400 outline-none transition-all"
                  id="chat-input-text"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
                  id="chat-send-btn"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
