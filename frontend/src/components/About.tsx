import { Sparkles, Trophy, Flame, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import vpImg from "../assets/vp.jpg";
import dpImg from "../assets/dp.jpg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  metric: string;
  metricLabel: string;
  avatarInitials: string;
  avatarGradient: string;
  imageUrl: string;
  objectPosition?: string;
}

export default function About() {
  const team: TeamMember[] = [
    {
      name: "Varsha Pande",
      role: "Founder",
      bio: "A digital strategist and creative leader passionate about building brands that connect. Varsha founded Gen-D & Co. with the mission to bring cutting-edge digital solutions to Indian businesses of all sizes.",
      metric: "20+",
      metricLabel: "Brands Elevated",
      avatarInitials: "VP",
      avatarGradient: "from-zinc-900 via-orange-500 to-[#ff4a22]",
      imageUrl: vpImg,
      objectPosition: "object-top"
    },
    {
      name: "Deepanshu Pande",
      role: "Co-Founder",
      bio: "A tech-driven creative who bridges design and development. Deepanshu leads the technical and content production side of Gen-D & Co., ensuring every deliverable is built to perform and built to last.",
      metric: "3+",
      metricLabel: "Years of Expertise",
      avatarInitials: "DP",
      avatarGradient: "from-zinc-950 via-[#ff4a22] to-amber-500",
      imageUrl: dpImg,
      objectPosition: "object-[center_20%]"
    },
    {
      name: "Our Team",
      role: "Creative & Technical Specialists",
      bio: "Beyond our founders, Gen-D & Co. works with a curated network of talented designers, developers, photographers, videographers, and marketing specialists — each a specialist in their domain.",
      metric: "8+",
      metricLabel: "Service Verticals",
      avatarInitials: "GT",
      avatarGradient: "from-zinc-900 via-zinc-800 to-[#ff4a22]",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const pillars = [
    {
      icon: Flame,
      title: "Digital-Native Mindset",
      description: "We were born in the digital era. We understand what grabs attention online and build strategies that move at the speed of the internet."
    },
    {
      icon: Target,
      title: "Results Over Aesthetics",
      description: "Great design means nothing without results. Every campaign, page, and post we create is engineered to drive real, measurable business outcomes."
    },
    {
      icon: Trophy,
      title: "India-First Approach",
      description: "We understand the Indian consumer. Our strategies are built around local culture, language nuances, and the platforms that dominate the Indian digital landscape."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white text-zinc-950 border-b border-zinc-150 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Description Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest block">
              ↳ WHO WE ARE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-zinc-950 tracking-tighter leading-none uppercase font-syne">
              Creators, Strategists & Digital Natives.
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-medium">
              Gen-D stands for the digital generation — a team of young, passionate professionals who grew up in the digital world and know exactly how to make brands thrive in it.
            </p>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
              Based in New Delhi, we help Indian businesses of all sizes — from early-stage startups to established enterprises — achieve their full potential online. We operate at the intersection of creative design, performance marketing, and technology to build digital experiences that convert and last.
            </p>
          </div>

          {/* Quote Panel */}
          <div className="lg:col-span-5">
            <div className="relative p-8 sm:p-10 rounded-2xl bg-white border border-zinc-200 bg-grid-light shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4a22]/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Quote marks */}
              <span className="absolute -top-4 -left-2 text-[120px] font-serif text-[#ff4a22]/10 select-none">"</span>
              
              <div className="relative z-10 space-y-6">
                <blockquote className="text-lg sm:text-xl font-medium text-zinc-800 leading-relaxed italic">
                  Gen-D & Co. helped us establish a professional digital presence we're proud of. They understood our brand from day one and delivered results that exceeded our expectations.
                </blockquote>

                <div className="flex items-center space-x-4 pt-4 border-t border-zinc-100">
                  {/* Client avatar */}
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-md border border-zinc-100 overflow-hidden shrink-0">
                    <img 
                      src="/src/assets/kostume-logo.jpg" 
                      alt="Kostume County Logo" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image isn't named exactly as expected
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = "/src/assets/kostume-logo.png";
                      }}
                    />
                  </div>
                  <div>
                    <cite className="not-italic font-black uppercase text-zinc-950 block text-xs tracking-wide">Kostume County</cite>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block">Client — Website & Marketing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pillars / Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {pillars.map((p, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white border border-zinc-200 flex flex-col space-y-4 shadow-sm hover:border-zinc-300 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#ff4a22]/10 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-[#ff4a22]" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-zinc-950">{p.title}</h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest block">
              ↳ THE TEAM
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tighter leading-none uppercase font-syne whitespace-nowrap">
              Meet GEN-D
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base font-medium">
              A collective of designers, developers, marketers, and creatives dedicated to building brands that stand out in the digital era.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-zinc-350 transition-all duration-300"
              >
                {/* Visual Header */}
                <div className="space-y-4">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden shadow-sm border border-zinc-200 bg-zinc-50">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className={`absolute inset-0 w-full h-full object-cover ${member.objectPosition || "object-center"} group-hover:scale-105 transition-transform duration-500 ease-out`}
                    />
                  </div>

                  {/* Name and Role */}
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950 group-hover:text-[#ff4a22] transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs font-bold text-[#ff4a22] uppercase tracking-widest mt-1 block">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="inline-flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-100 w-fit">
                    <span className="text-sm font-black text-zinc-900">{member.metric}</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{member.metricLabel}</span>
                  </div>
                </div>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 h-5 text-[#ff4a22]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
