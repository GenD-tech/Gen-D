import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic Plan",
      price: 999,
      description: "Establish a robust, consistent brand presence with tailored social media content schedules.",
      features: [
        "Competitor analysis",
        "Keyword research",
        "Weekly reports",
        "5 custom social posts / month"
      ],
      popular: false,
      tag: "Basic"
    },
    {
      name: "Professional Plan",
      price: 2499,
      originalPrice: 2999,
      description: "Scale attention through rich video assets, SEO-optimized landing pages, and performance ads.",
      features: [
        "Everything in Basic",
        "15 custom posts / month",
        "Paid search campaigns",
        "A/B creative testing",
        "Monthly strategy alignment call"
      ],
      popular: true,
      tag: "Most popular"
    },
    {
      name: "Premium Plan",
      price: 4999,
      description: "Complete omnichannel takeover, custom web engineering, and physical brand activations.",
      features: [
        "Everything in Professional",
        "Dedicated creative manager",
        "Custom web development support",
        "Experiential activations support",
        "Unlimited custom posts"
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
      // Apply 20% discount
      return Math.round(basePrice * 0.8);
    }
    return basePrice;
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
            Choose the plan that best fits your needs. From a solid foundation to a fully optimized solution. No lock-in contracts.
          </p>

          {/* Monthly / Yearly Custom Selector */}
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
                <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded-full text-white font-mono">
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
                        ${plan.originalPrice}
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
                    <span className="text-4xl sm:text-5xl font-black tracking-tighter">
                      ${finalPrice.toLocaleString()}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ml-2 ${
                      plan.popular ? "text-white/70" : "text-zinc-400"
                    }`}>
                      / month
                    </span>
                  </div>

                  <hr className={`my-6 ${plan.popular ? "border-white/15" : "border-zinc-200/80"}`} />

                  {/* Feature lists using ↳ arrows */}
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

                {/* Call to Action button */}
                <div className="pt-8 mt-8 border-t border-transparent">
                  <button
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 border shadow-sm ${
                      plan.popular
                        ? "bg-white text-zinc-950 border-transparent hover:bg-zinc-100"
                        : "bg-zinc-950 text-white border-transparent hover:bg-zinc-850"
                    }`}
                  >
                    <span>Choose this plan</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
