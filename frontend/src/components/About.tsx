import { Sparkles, Trophy, Flame, Target } from "lucide-react";
import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  metric: string;
  metricLabel: string;
  avatarGradient: string; // Dynamic modern gradients
  imageUrl: string; // Real Unsplash portrait
}

export default function About() {
  const team: TeamMember[] = [
    {
      name: "Sarah Miller",
      role: "Executive Creative Director",
      bio: "Crafted identities for leading tech and consumer giants. Obsessed with high-contrast, bold display typography and micro-interactions.",
      metric: "12+",
      metricLabel: "Design Awards",
      avatarGradient: "from-zinc-900 via-orange-500 to-[#ff4a22]",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Marcus Chen",
      role: "Head of Growth & Advertising",
      bio: "Ex-Stripe growth engineer. Managed over $40M in aggregate paid media spend with an average CTR exceeding standard benchmarks by 3x.",
      metric: "$45M+",
      metricLabel: "Ad Spend Managed",
      avatarGradient: "from-zinc-950 via-[#ff4a22] to-amber-500",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Elena Rostova",
      role: "Lead Digital Architect",
      bio: "Full-stack designer and next-gen developer. Specializes in building headless, lightweight static products with near-instant load speeds.",
      metric: "0.4s",
      metricLabel: "Avg Page Load Speed",
      avatarGradient: "from-zinc-900 via-zinc-800 to-[#ff4a22]",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const pillars = [
    {
      icon: Flame,
      title: "Impact-First Mindset",
      description: "We don't build quiet designs. We create highly striking visuals and attention-grabbing experiences that convert."
    },
    {
      icon: Target,
      title: "Obsessive Optimization",
      description: "Every CTA, headline, and speed block is measured, A/B tested, and continuously enhanced using predictive metrics."
    },
    {
      icon: Trophy,
      title: "Future-Proof Tech",
      description: "We deploy modern stack combinations, fast caching endpoints, and responsive animations that stay relevant."
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
              CREATORS, STRATEGISTS & HYBRIDS.
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed font-medium">
              GEND was born out of a simple frustration: agencies building static, uninspired products that fail to capture the speed of digital culture.
            </p>
            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed">
              We operate at the convergence of high-contrast design, hyper-targeted digital media algorithms, and lightweight frontend architecture. Our mission is to transform standard business footprints into highly interactive pipelines that capture and retain attention.
            </p>
          </div>

          {/* Large Quote Panel inspired by the provided layout design */}
          <div className="lg:col-span-5">
            <div className="relative p-8 sm:p-10 rounded-2xl bg-white border border-zinc-200 bg-grid-light shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4a22]/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Quote marks */}
              <span className="absolute -top-4 -left-2 text-[120px] font-serif text-[#ff4a22]/10 select-none">“</span>
              
              <div className="relative z-10 space-y-6">
                <blockquote className="text-lg sm:text-xl font-medium text-zinc-800 leading-relaxed italic">
                  GEND helps brands establish visually striking and strategically sound digital experiences. They work incredibly closely with your team to guarantee that every detail reflects absolute conversion precision.
                </blockquote>

                <div className="flex items-center space-x-4 pt-4 border-t border-zinc-100">
                  {/* Founder avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-[#ff4a22] flex items-center justify-center font-black text-white text-sm shadow-md">
                    AB
                  </div>
                  <div>
                    <cite className="not-italic font-black uppercase text-zinc-950 block text-xs tracking-wide">Annie Bassett</cite>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 block">Lead Creative Strategist & Founder</span>
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

        {/* Team Grid "Meet our team" */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-black text-[#ff4a22] uppercase tracking-widest block">
              ↳ THE TEAM
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tighter leading-none uppercase font-syne">
              MEET THE DIRECTORS
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base font-medium">
              An elite collective of designers, programmers, and growth specialists dedicated to crafting unforgettable user impressions.
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
                {/* Visual Header - Real Unsplash Portrait image with subtle gradient overlay */}
                <div className="space-y-4">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden flex items-end p-4 shadow-sm border border-zinc-200 bg-zinc-50">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                    />
                    {/* Dark gradient overlay for text readability inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-0" />
                    
                    {/* Glass-overlay hover effect */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 z-0" />
                    
                    {/* High impact metric card inside avatar */}
                    <div className="relative z-10 bg-white/95 px-3.5 py-2 rounded-lg shadow-sm border border-zinc-100">
                      <span className="text-base font-black text-zinc-950 block leading-none">{member.metric}</span>
                      <span className="text-[9px] font-black text-zinc-400 block leading-none mt-1.5 uppercase tracking-widest">{member.metricLabel}</span>
                    </div>
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
                </div>

                {/* Decorative border elements */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="w-5 h-5 text-[#ff4a22] animate-spin-slow" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
