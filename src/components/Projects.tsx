import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  category: string;
  pills: string[];
  imageUrl: string;
}

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: "Radiant skincare branding",
      description: "Visual identity and packaging design for a skincare line.",
      category: "BRANDING, WEB DESIGN",
      pills: ["BRANDING", "WEB DESIGN"],
      imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Apex clothing Co. rebrand",
      description: "Bold new look for an eco-conscious apparel brand.",
      category: "BRANDING",
      pills: ["BRANDING"],
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Vero app development",
      description: "Full-stack development for a social media platform.",
      category: "BRANDING, DEVELOPMENT, WEB DESIGN",
      pills: ["BRANDING", "DEVELOPMENT", "WEB DESIGN"],
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Timeless Impressions redesign",
      description: "Brand digital architecture and responsive interactive interfaces.",
      category: "BRANDING, DEVELOPMENT",
      pills: ["BRANDING", "DEVELOPMENT"],
      imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const handleProjectClick = (e: React.MouseEvent) => {
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
        
        {/* Section Header with top-right link */}
        <div className="flex flex-row justify-between items-end gap-6 mb-16 pb-6 border-b border-zinc-150">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">
              ↳ SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tighter uppercase font-syne">
              Proven results,<br />stunning designs
            </h2>
            <div className="text-xl font-bold text-zinc-950 font-syne mt-4">2K24</div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <a 
              href="#contact"
              onClick={handleProjectClick}
              className="inline-flex items-center space-x-1 text-sm font-black text-zinc-900 hover:text-[#ff4a22] transition-colors"
            >
              <span>→ All cases</span>
              <span className="text-xs font-bold text-zinc-400 align-super ml-0.5">(17)</span>
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="flex flex-col space-y-4"
            >
              {/* Image Box */}
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200/80 cursor-pointer group"
                onClick={handleProjectClick}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                />
                
                {/* Visual red tag in top right */}
                <div className="absolute top-4 right-4 w-4 h-4 text-[#ff4a22]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info exactly like Reference Image 4 */}
              <div className="space-y-3 pt-2">
                <h3 
                  className="text-xl sm:text-2xl font-black text-zinc-950 hover:text-[#ff4a22] transition-colors cursor-pointer"
                  onClick={handleProjectClick}
                >
                  {project.title}
                </h3>
                
                <p className="text-sm text-zinc-500 max-w-md font-medium leading-normal">
                  {project.description}
                </p>

                {/* Pill Badges exactly like Reference Image 4 */}
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
