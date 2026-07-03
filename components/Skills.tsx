"use client";

import { Cpu, Eye, Globe, Sparkles, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const MARQUEE_1 = [
  "Python", "HTML & CSS", "Flutter", "Dart", "Firebase", 
  "Generative AI", "Azure AI Services", "Photography", "Video Editing",
  "Python", "HTML & CSS", "Flutter", "Dart", "Firebase", 
  "Generative AI", "Azure AI Services", "Photography", "Video Editing"
];

const MARQUEE_2 = [
  "Communication", "Teamwork", "Leadership", "Time Management", "Problem Solving", 
  "HR & Recruitment", "Event Management", "International Networking", "Cybersecurity Basics",
  "Communication", "Teamwork", "Leadership", "Time Management", "Problem Solving", 
  "HR & Recruitment", "Event Management", "International Networking", "Cybersecurity Basics"
];

const SKILL_CATEGORIES = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: [
      { name: "Flutter", level: 90 },
      { name: "Dart", level: 88 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    title: "AI & Cloud",
    icon: Cpu,
    skills: [
      { name: "Generative AI", level: 85 },
      { name: "Azure AI Services", level: 80 },
    ],
  },
  {
    title: "Programming",
    icon: Globe,
    skills: [
      { name: "Python", level: 80 },
      { name: "HTML & CSS", level: 85 },
    ],
  },
  {
    title: "Soft Skills",
    icon: Sparkles,
    skills: [
      { name: "Teamwork & Collaboration", level: 95 },
      { name: "Communication", level: 90 },
      { name: "Leadership", level: 88 },
      { name: "Problem Solving", level: 88 },
    ],
  },
  {
    title: "Creative Skills",
    icon: Eye,
    skills: [
      { name: "Social Media Content", level: 90 },
      { name: "Photography", level: 85 },
      { name: "Video Editing", level: 80 },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 bg-soft-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">
            Skills
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            What I Know
          </h2>
          <div className="w-10 h-[2px] bg-primary mt-4" />
        </div>
      </div>

      {/* Infinite Marquees looping skills */}
      <div className="flex flex-col gap-6 w-full select-none overflow-hidden py-4">
        {/* Marquee 1 */}
        <div className="flex gap-4 w-[200%] md:w-[150%] animate-marquee">
          {MARQUEE_1.map((item, idx) => (
            <div
              key={idx}
              className="px-8 py-3 rounded-full bg-card-bg border border-white/5 text-xs uppercase tracking-widest text-warm-white font-semibold shadow-md whitespace-nowrap min-w-[140px] w-fit text-center block"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Marquee 2 */}
        <div className="flex gap-4 w-[200%] md:w-[150%] animate-marquee [animation-direction:reverse]">
          {MARQUEE_2.map((item, idx) => (
            <div
              key={idx}
              className="px-8 py-3 rounded-full bg-card-bg border border-white/5 text-xs uppercase tracking-widest text-warm-white font-semibold shadow-md whitespace-nowrap min-w-[140px] w-fit text-center block"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Proficiency categories with indicator bars */}
      <div className="max-w-6xl mx-auto px-6 mt-24">
        <h4 className="font-display text-[10px] uppercase tracking-[0.25em] text-center text-muted-gray mb-12 font-bold">
          Proficiency Levels & categories
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-card-bg border border-white/5 hover:border-primary/20 shadow-2xl flex flex-col justify-start min-h-[250px] transition-all duration-300 relative group"
              >
                {/* visual border accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/30 to-transparent rounded-t-3xl" />
                
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4 text-left">
                  <div className="p-2.5 rounded-xl bg-soft-black text-primary border border-white/5 group-hover:bg-primary/10 transition-colors">
                    <Icon size={18} />
                  </div>
                  <h4 className="font-display text-sm font-bold text-warm-white uppercase tracking-wider">
                    {cat.title}
                  </h4>
                </div>

                {/* Skill Bars List */}
                <div className="flex flex-col gap-4 text-left">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      {/* Glassmorphic progress bar */}
                      <div className="w-full bg-soft-black h-1.5 rounded-full overflow-hidden border border-white/5 relative">
                        <div
                          className="bg-gradient-to-r from-primary to-bronze h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
