"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Landmark } from "lucide-react";

const EDUCATION_DATA = [
  {
    year: "2024 – 2027",
    school: "Amity University, Greater Noida",
    degree: "Diploma in Computer Science Engineering",
    desc: "Focusing on software engineering principles, core data structures, object-oriented concepts, and Flutter application design architectures.",
    icon: Landmark,
  },
  {
    year: "2023 – 2024",
    school: "Fair Child Public School",
    degree: "10th Class — CBSE Board",
    desc: "Completed core secondary syllabus with an interest in scientific principles and logical mathematics, establishing foundations for software engineering.",
    icon: GraduationCap,
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-28 bg-secondary-bg overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">
            Education
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            Academic Journey
          </h2>
          <div className="w-10 h-[2px] bg-primary mt-4" />
        </div>

        {/* Education Grid layout using reliable Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {EDUCATION_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                className="p-8 rounded-3xl bg-card-bg border border-white/5 hover:border-primary/20 shadow-2xl relative group overflow-hidden transition-all duration-300"
              >
                {/* Visual accent top line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-transparent" />
                
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-soft-black text-primary border border-white/5 group-hover:bg-primary/10 transition-colors">
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                    <span className="font-display text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">
                      {item.year}
                    </span>
                    <h3 className="font-display text-lg font-bold text-warm-white mb-1 group-hover:text-primary transition-colors">
                      {item.school}
                    </h3>
                    <span className="text-xs uppercase tracking-wider font-semibold text-muted-gray block mb-4">
                      {item.degree}
                    </span>
                    <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
