import { useState } from "react";
import { Laptop, TrendingUp, Sparkles, Calendar, Camera, Video, PenTool, Search, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  metricValue: string;
  metricLabel: string;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [, setHoveredIndex] = useState<number | null>(null);

  const servicesList: Service[] = [
    {
      id: "web-dev",
      title: "Website Development",
      description: "We build ultra-fast, visually stunning, and high-converting websites engineered for the Indian market — from landing pages to full e-commerce platforms.",
      iconName: "laptop",
      features: [
        "Custom UI/UX Design",
        "SEO-Optimised Architecture",
        "E-Commerce & Payment Integration",
        "Mobile-First Responsive Design"
      ],
      metricValue: "+42%",
      metricLabel: "Conversion Rate Increase"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Data-driven campaigns on Google, Meta, and beyond — crafted to maximise ROI for Indian brands targeting local and national audiences.",
      iconName: "marketing",
      features: [
        "Google & Meta Paid Campaigns",
        "Conversion Funnel Optimisation",
        "Audience Targeting & Retargeting",
        "Performance Analytics & Reporting"
      ],
      metricValue: "+180%",
      metricLabel: "Organic CTR Growth"
    },
    {
      id: "social-media",
      title: "Social Media Management",
      description: "End-to-end social presence — from content calendars and community management to viral posts that grow your followers and brand engagement.",
      iconName: "social",
      features: [
        "Content Calendar & Strategy",
        "Instagram, LinkedIn & Facebook",
        "Community Management",
        "Growth Hacking & Analytics"
      ],
      metricValue: "3x",
      metricLabel: "Avg. Follower Growth"
    },
    {
      id: "events",
      title: "Event Management",
      description: "Brand launches, product reveals, influencer-led activations, and hybrid events — designed for maximum social buzz and real-world impact across India.",
      iconName: "events",
      features: [
        "Brand Launch Events",
        "Influencer Outreach & Management",
        "On-Ground Logistics & Execution",
        "Live Social Coverage & Amplification"
      ],
      metricValue: "94%",
      metricLabel: "Audience Engagement Score"
    },
    {
      id: "branding",
      title: "Strategic Branding",
      description: "We craft unique brand identities — from logos and colour palettes to complete visual language systems that make your brand instantly recognisable.",
      iconName: "branding",
      features: [
        "Logo Design & Brand Guidelines",
        "Colour, Typography & Visual Systems",
        "Brand Tone & Messaging Strategy",
        "Digital Asset Kits"
      ],
      metricValue: "3.5x",
      metricLabel: "Brand Recognition Uplift"
    },
    {
      id: "seo",
      title: "SEO Services",
      description: "Rank higher on Google and drive consistent organic traffic with our proven on-page, off-page, and technical SEO strategies tailored for Indian businesses.",
      iconName: "seo",
      features: [
        "On-Page & Technical SEO",
        "Local SEO for Indian Markets",
        "Keyword Research & Content Strategy",
        "Monthly SEO Reports"
      ],
      metricValue: "↑65%",
      metricLabel: "Avg. Organic Traffic Gain"
    },
    {
      id: "video",
      title: "Video & Reels Production",
      description: "High-quality short-form videos, Instagram Reels, YouTube content, and brand films — shot, edited, and optimised to stop the scroll and drive action.",
      iconName: "video",
      features: [
        "Reels & Short-Form Videos",
        "Brand Films & Ad Creatives",
        "Professional Editing & Colour Grading",
        "Platform-Optimised Formats"
      ],
      metricValue: "5x",
      metricLabel: "Avg. Reel Reach vs. Static"
    },
    {
      id: "photography",
      title: "Graphic Design & Photography",
      description: "Premium visual content — product photography, lifestyle shoots, social media creatives, and graphic design that elevates every touchpoint of your brand.",
      iconName: "photography",
      features: [
        "Product & Lifestyle Photography",
        "Social Media Creatives",
        "Marketing Collateral Design",
        "Brand Visual Consistency"
      ],
      metricValue: "2x",
      metricLabel: "Engagement vs. Stock Photos"
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
      case "seo":
        return <Search className="w-5 h-5 text-[#ff4a22]" />;
      case "video":
        return <Video className="w-5 h-5 text-[#ff4a22]" />;
      case "photography":
        return <Camera className="w-5 h-5 text-[#ff4a22]" />;
      case "social":
        return <PenTool className="w-5 h-5 text-[#ff4a22]" />;
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
              Everything your brand needs to dominate digital.
            </h2>
          </div>
          <p className="text-zinc-500 max-w-md text-sm sm:text-base leading-relaxed font-medium">
            From idea to execution — we handle every aspect of your digital presence so you can focus on running your business.
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
              transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                <span>Get a Quote ↳</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
