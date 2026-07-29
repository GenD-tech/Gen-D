import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter Plan",
      price: 14999,
      description: "Establish a strong, consistent brand presence with tailored social media content and foundational digital marketing.",
      features: [
        "Competitor analysis",
        "Keyword research",
        "Weekly performance reports",
        "5 custom social posts / month",
        "Basic SEO setup"
      ],
      popular: false,
      tag: "Starter"
    },
    {
      name: "Growth Plan",
      price: 29999,
      originalPrice: 34999,
      description: "Scale your brand through rich video content, SEO-optimised pages, and targeted performance ad campaigns.",
      features: [
        "Everything in Starter",
        "15 custom posts / month",
        "Google & Meta paid campaigns",
        "A/B creative testing",
        "Monthly strategy call",
        "Instagram Reels / Short Videos"
      ],
      popular: true,
      tag: "Most Popular"
    },
    {
      name: "Premium Plan",
      price: 59999,
      description: "Complete omnichannel digital takeover — custom web development, full content production, events, and beyond.",
      features: [
        "Everything in Growth",
        "Dedicated creative manager",
        "Custom website development",
        "Event management support",
        "Unlimited custom posts",
        "Professional photography shoots"
      ],
      popular: false,
      tag: "Premium"
    }
  ];

  const handleSelectPlan = (planName: string) => {
    onSelectPlan(planName);
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

  const calculatePrice = (basePrice: number) => {
    if (isAnnual) {
      // Apply 20% discount for annual
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
  };

  const formatINR = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  return (
    <section id="pricing" className="py-24 bg-[#fafafa] border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
            ↳ INVESTMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tighter uppercase font-syne">
            Flexible pricing
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-medium">
            Choose the plan that fits your business goals. All prices in Indian Rupees (₹). No lock-in contracts — scale up or down anytime.
          </p>

          {/* Monthly / Yearly Selector */}
          <div className="pt-6 flex justify-center">
            <div className="bg-zinc-100 p-1.5 rounded-full inline-flex items-center space-x-1 border border-zinc-200 shadow-sm">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                  !isAnnual 
                    ? "bg-[#ff4a22] text-white shadow-md" 
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center space-x-1 ${
                  isAnnual 
                    ? "bg-[#ff4a22] text-white shadow-md" 
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <span>Yearly</span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-mono ${isAnnual ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-500"}`}>
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const finalPrice = calculatePrice(plan.price);
            return (
              <div
                key={plan.name}
                className={`p-8 sm:p-10 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full relative ${
                  plan.popular 
                    ? "bg-[#ff4a22] text-white border-transparent shadow-xl shadow-[#ff4a22]/15 scale-102 lg:scale-105 z-10" 
                    : "bg-white text-zinc-950 border-zinc-200 hover:border-zinc-350 shadow-sm"
                }`}
              >
                <div>
                  {/* Card Pill Tag */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                      plan.popular 
                        ? "bg-white/10 text-white border-white/25" 
                        : "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }`}>
                      {plan.tag}
                    </span>
                    {plan.originalPrice && !isAnnual && (
                      <span className={`text-xs font-mono line-through ${plan.popular ? "text-white/60" : "text-zinc-400"}`}>
                        ₹{formatINR(plan.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Plan Name & Desc */}
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-syne mb-2">
                    {plan.name}
                  </h3>
                  <p className={`text-xs leading-relaxed font-medium mb-6 ${
                    plan.popular ? "text-white/80" : "text-zinc-500"
                  }`}>
                    {plan.description}
                  </p>

                  {/* Pricing Display */}
                  <div className="mb-8 flex items-baseline">
                    <span className="text-sm font-black mr-1 opacity-80">₹</span>
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter">
                      {formatINR(finalPrice)}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ml-2 ${
                      plan.popular ? "text-white/70" : "text-zinc-400"
                    }`}>
                      / month
                    </span>
                  </div>

                  <hr className={`my-6 ${plan.popular ? "border-white/15" : "border-zinc-200/80"}`} />

                  {/* Feature lists */}
                  <div className="space-y-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      plan.popular ? "text-white/70" : "text-zinc-400"
                    }`}>
                      ↳ Capabilities Included:
                    </span>
                    <ul className="space-y-3.5">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2 text-xs font-bold uppercase tracking-wider">
                          <span className={plan.popular ? "text-white" : "text-[#ff4a22]"}>↳</span>
                          <span className={plan.popular ? "text-white/95" : "text-zinc-800"}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-8 mt-8 border-t border-transparent">
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 border shadow-sm ${
                      plan.popular
                        ? "bg-white text-zinc-950 border-transparent hover:bg-zinc-100"
                        : "bg-zinc-950 text-white border-transparent hover:bg-zinc-800"
                    }`}
                  >
                    <span>Get started</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <p className={`text-center text-[9px] font-bold uppercase tracking-widest mt-3 ${plan.popular ? "text-white/50" : "text-zinc-400"}`}>
                    No long-term contracts
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-xs text-zinc-400 font-medium mt-12">
          All prices are exclusive of GST. Custom packages available — <a href="#contact" className="text-[#ff4a22] hover:underline font-bold" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>contact us</a> for a tailored quote.
        </p>

      </div>
    </section>
  );
}
