"use client";

import { useRef, useState } from "react";
import { Cpu, Eye, Globe, Sparkles } from "lucide-react";
import { motion, useMotionValue } from "framer-motion";

const MARQUEE_1 = [
  "Python (Beginner)", "HTML & CSS", "Flutter", "Dart", "Firebase", 
  "AI Prompt Engineering", "Azure Cognitive Services", "Photography", "Video Editing",
  "Python (Beginner)", "HTML & CSS", "Flutter", "Dart", "Firebase", 
  "AI Prompt Engineering", "Azure Cognitive Services", "Photography", "Video Editing"
];

const MARQUEE_2 = [
  "Communication", "Teamwork", "Leadership", "Time Management", "Problem Solving", 
  "HR & Recruitment", "Event Management", "International Networking", "Cybersecurity Basics",
  "Communication", "Teamwork", "Leadership", "Time Management", "Problem Solving", 
  "HR & Recruitment", "Event Management", "International Networking", "Cybersecurity Basics"
];

const CORE_SKILLS = [
  {
    title: "Technical Skills",
    desc: "Python (Beginner), HTML & CSS, Flutter, Dart, Firebase, AI Prompt Engineering, Azure Cognitive Services.",
    tags: ["Python", "HTML/CSS", "Flutter", "Dart", "Firebase", "AI Prompts", "Azure"],
    icon: Cpu,
  },
  {
    title: "Creative Skills",
    desc: "Photography, Video Editing, Social Media Content Creation, Small Brand Influencing.",
    tags: ["Photography", "Video Editing", "Content", "Influencer"],
    icon: Eye,
  },
  {
    title: "Soft Skills",
    desc: "Communication, Teamwork & Collaboration, Leadership, Time Management, Problem Solving.",
    tags: ["Communication", "Teamwork", "Leadership", "Time Management", "Algorithms"],
    icon: Globe,
  },
  {
    title: "Professional Interests",
    desc: "HR & Recruitment, Event Management, International Networking, App Development, Cybersecurity Basics.",
    tags: ["HR", "Events", "Networking", "App Dev", "Cybersecurity"],
    icon: Sparkles,
  }
];

function TiltCard({ skill }: { skill: typeof CORE_SKILLS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D rotation
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative mouse coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Degrees
    const rotX = ((y / rect.height) - 0.5) * -15;
    const rotY = ((x / rect.width) - 0.5) * 15;

    rotateX.set(rotX);
    rotateY.set(rotY);

    setGlowPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const Icon = skill.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-6 sm:p-8 rounded-3xl bg-card-bg border border-white/5 shadow-2xl flex flex-col justify-between min-h-[280px] transition-all duration-100 overflow-hidden cursor-none"
    >
      {/* Glow border spotlight */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full blur-2xl z-0"
          style={{
            width: "140px",
            height: "140px",
            background: "radial-gradient(circle, rgba(212, 163, 115, 0.12) 0%, rgba(212, 163, 115, 0) 70%)",
            left: `${glowPos.x - 70}px`,
            top: `${glowPos.y - 70}px`,
          }}
        />
      )}

      {/* Card Content with 3D offset */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        <div className="p-3 rounded-2xl bg-soft-black border border-white/5 text-primary w-fit mb-4">
          <Icon size={20} />
        </div>
        
        <h4 className="font-display text-base sm:text-lg font-bold text-warm-white mb-2 uppercase tracking-wider">
          {skill.title}
        </h4>
        
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          {skill.desc}
        </p>
      </div>

      {/* Tags wrapper */}
      <div style={{ transform: "translateZ(10px)" }} className="flex flex-wrap gap-1 relative z-10">
        {skill.tags.map(t => (
          <span key={t} className="px-2.5 py-0.5 rounded-full bg-soft-black border border-white/5 text-[9px] uppercase tracking-wider text-muted-gray">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

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

      {/* Opposite Infinite Marquees */}
      <div className="flex flex-col gap-6 w-full select-none overflow-hidden py-4">
        {/* Marquee 1 */}
        <div className="flex gap-4 w-[200%] md:w-[150%] animate-marquee">
          {MARQUEE_1.map((item, idx) => (
            <div
              key={idx}
              className="px-6 py-3 rounded-full bg-card-bg border border-white/5 text-xs uppercase tracking-widest text-warm-white font-semibold shadow-md whitespace-nowrap min-w-[120px] text-center"
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
              className="px-6 py-3 rounded-full bg-card-bg border border-white/5 text-xs uppercase tracking-widest text-warm-white font-semibold shadow-md whitespace-nowrap min-w-[120px] text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 3D tilt categories */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h4 className="font-display text-[10px] uppercase tracking-[0.25em] text-center text-muted-gray mb-12 font-bold">
          Core Focus Domains
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SKILLS.map((skill, index) => (
            <TiltCard key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
