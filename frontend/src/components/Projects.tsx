import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  category: string;
  pills: string[];
  imageUrl: string;
  link?: string;
  isPlaceholder?: boolean;
}

export default function Projects() {

  const projects: Project[] = [
    {
      title: "Kostume County",
      description: "End-to-end website design & development plus influencer marketing strategy for a fast-growing fashion & costume brand. Helped them establish a strong digital storefront and social buzz.",
      category: "WEB DESIGN, MARKETING",
      pills: ["WEB DESIGN", "DEVELOPMENT", "INFLUENCER MARKETING"],
      imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000",
      link: "https://kostumecounty.com"
    },
    {
      title: "Aveya IVF",
      description: "Full-scale Instagram content strategy, professional photo shoots, and ongoing account management for a leading IVF & fertility clinic in India.",
      category: "SOCIAL MEDIA, CONTENT CREATION",
      pills: ["SOCIAL MEDIA", "PHOTOGRAPHY", "CONTENT CREATION"],
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const handleProjectClick = (e: React.MouseEvent, link?: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="projects" className="py-24 bg-white border-b border-zinc-150">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-row justify-between items-end gap-6 mb-16 pb-6 border-b border-zinc-150">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">
              ↳ SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tighter uppercase font-syne">
              Proven results,<br />stunning work
            </h2>
            <div className="text-xl font-bold text-zinc-950 font-syne mt-4">2K25</div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <a 
              href="#contact"
              onClick={(e) => handleProjectClick(e)}
              className="inline-flex items-center space-x-1 text-sm font-black text-zinc-900 hover:text-[#ff4a22] transition-colors"
            >
              <span>→ Start your project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col space-y-4"
            >
              {/* Image Box */}
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 cursor-pointer group"
                onClick={(e) => handleProjectClick(e, project.link)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Arrow indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-[#ff4a22]" />
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-3 pt-2">
                <h3 
                  className="text-xl sm:text-2xl font-black text-zinc-950 hover:text-[#ff4a22] transition-colors cursor-pointer"
                  onClick={(e) => handleProjectClick(e, project.link)}
                >
                  {project.title}
                </h3>
                
                <p className="text-sm text-zinc-500 max-w-md font-medium leading-normal">
                  {project.description}
                </p>

                {/* Pill Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.pills.map((pill, pIdx) => (
                    <span 
                      key={pIdx}
                      className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-600 border border-zinc-200/50"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
