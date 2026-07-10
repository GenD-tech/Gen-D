import { useState } from "react";
import { Laptop, TrendingUp, Sparkles, Calendar, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Service } from "../types";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [, setHoveredIndex] = useState<number | null>(null);

  const servicesList: Service[] = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "We build ultra-fast, visually mesmerizing, and high-converting bespoke digital products engineered for seamless interactions across all screen sizes.",
      iconName: "laptop",
      color: "from-[#ff4a22] to-[#e03d16]",
      hoverBg: "hover:border-[#ff4a22]/30",
      features: [
        "Headless CMS Integration",
        "Interactive UI/UX Prototypes",
        "SEO-Optimized Tech Architecture",
        "E-Commerce & High-Conversion Funnels"
      ],
      metricValue: "+42%",
      metricLabel: "Conversion Rate Increase"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Hyper-targeted content strategies, creative paid ad setups, and multi-channel SEO frameworks built specifically to maximize ROI and retain user focus.",
      iconName: "marketing",
      color: "from-[#ff4a22] to-[#e03d16]",
      hoverBg: "hover:border-[#ff4a22]/30",
      features: [
        "Meta, Google & TikTok Paid Campaigns",
        "Viral Short-Form Content Creation",
        "Predictive Audience Demographics",
        "Comprehensive SEO Alignment"
      ],
      metricValue: "+180%",
      metricLabel: "Organic CTR Amplification"
    },
    {
      id: "branding",
      title: "Strategic Branding",
      description: "We carve unique identity guidelines, visual languages, and premium digital asset kits that reflect your values and command market attention.",
      iconName: "branding",
      color: "from-[#ff4a22] to-[#e03d16]",
      hoverBg: "hover:border-[#ff4a22]/30",
      features: [
        "Vector Logo Systems & Typography Schemes",
        "Brand Guidelines & Tone Formulas",
        "Interactive Asset Design Kits",
        "Market and Competitor Positioning Audits"
      ],
      metricValue: "3.5x",
      metricLabel: "Brand Recognition Uplift"
    },
    {
      id: "events",
      title: "Event Management",
      description: "Experiential brand launches, creative hybrid activations, and influencer-led community integrations designed for peak digital visibility and social buzz.",
      iconName: "events",
      color: "from-[#ff4a22] to-[#e03d16]",
      hoverBg: "hover:border-[#ff4a22]/30",
      features: [
        "Experiential Popup Activations",
        "Social-First Launch Strategy",
        "Influencer Outreach & Integration",
        "High-Fidelity Virtual Event Streams"
      ],
      metricValue: "94%",
      metricLabel: "Audience Engagement Score"
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "laptop":
        return <Laptop className="w-5 h-5 text-[#ff4a22]" />;
      case "marketing":
        return <TrendingUp className="w-5 h-5 text-[#ff4a22]" />;
      case "branding":
        return <Sparkles className="w-5 h-5 text-[#ff4a22]" />;
      case "events":
        return <Calendar className="w-5 h-5 text-[#ff4a22]" />;
      default:
        return <Laptop className="w-5 h-5 text-[#ff4a22]" />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    onSelectService(serviceTitle);
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
    <section id="services" className="py-24 bg-white text-zinc-950 border-b border-zinc-150">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 space-y-6 lg:space-y-0 pb-6 border-b border-zinc-150">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest block">
              ↳ CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tighter uppercase font-syne leading-tight">
              Growth Suite For Dominance.
            </h2>
          </div>
          <p className="text-zinc-500 max-w-md text-sm sm:text-base leading-relaxed font-medium">
            We don't do generic services. Every channel we build is engineered specifically around driving verified customer conversion and establishing long-term branding equity.
          </p>
        </div>

        {/* Grid of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-zinc-200 transition-all duration-300 shadow-sm relative overflow-hidden group flex flex-col justify-between h-full hover:border-zinc-350 hover:shadow-md"
            >
              <div className="space-y-6">
                {/* Icon & Metric */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#ff4a22]/10 flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>
                  
                  {/* Performance Badge */}
                  <div className="text-right">
                    <span className="text-2xl font-black text-zinc-950 tracking-tighter block leading-none">
                      {service.metricValue}
                    </span>
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mt-1.5">
                      {service.metricLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tight group-hover:text-[#ff4a22] transition-colors font-syne">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="pt-6 border-t border-zinc-100 space-y-3">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Capabilities included:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#ff4a22] shrink-0" />
                        <span className="text-xs font-semibold text-zinc-600 truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Link */}
              <button
                onClick={() => handleInquire(service.title)}
                className="pt-6 mt-6 border-t border-zinc-100 w-full flex items-center justify-between text-zinc-950 group-hover:text-[#ff4a22] transition-colors text-left font-black text-[10px] uppercase tracking-widest cursor-pointer"
                id={`inquire-${service.id}`}
              >
                <span>Inquire Now ↳</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
