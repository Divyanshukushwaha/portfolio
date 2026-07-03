"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Users, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_DATA = [
  {
    year: "Late 2025",
    title: "SafeAura — Personal Safety App",
    subtitle: "Flutter & Firebase Mobile Developer",
    summary: "Designed, structured, and compiled a personal safety APK using Flutter and Firebase database hooks. Implemented SOS count alert cancellations, contact syncing, and shared the APK live on LinkedIn.",
    bullets: [
      "Designed modular widget trees inside Flutter for high-frame-rate UI rendering.",
      "Implemented emergency SOS cancellation grace-period timers using RxDart/Streams.",
      "Built database structures mapping real-time coordinate tracking updates directly to Firebase document paths.",
      "Packaged, optimized, and published the production APK, coordinating testing loops."
    ],
    icon: Shield,
  },
  {
    year: "Aug – Sep 2025",
    title: "International Volunteer",
    subtitle: "Technoxian World Cup 9.0 — Noida, Delhi NCR",
    summary: "Supported management and logistics for the global robotics championship, coordinating with international delegates. Developed team communication, networking, and event operations skills. Awarded official Certificate of Appreciation by WORSO.",
    bullets: [
      "Assisted delegation operations and logistical queries for robotics teams from over 10 different countries.",
      "Managed coordination and resolved schedule conflicts inside high-density tournament fields.",
      "Supported international networking syncs and delegate registrations for WORSO.",
      "Awarded official Certificate of Appreciation for logistics execution under high pressure."
    ],
    icon: Users,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale vertical spine progress line on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 40%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // Animate timeline nodes
      const items = gsap.utils.toArray(".timeline-node-item");
      items.forEach((item: any) => {
        gsap.from(item.querySelector(".timeline-node-card"), {
          opacity: 0,
          x: item.classList.contains("left-item") ? -50 : 50,
          duration: 1.0,
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
        
        gsap.from(item.querySelector(".timeline-node-dot"), {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleExpand = (idx: number) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-28 bg-soft-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">
            Experience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            Where I've Contributed
          </h2>
          <div className="w-10 h-[2px] bg-primary mt-4" />
        </div>

        {/* Timeline Spine */}
        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Vertical Base Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-[1px]" />
          
          {/* Active Progress Scroll Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-[1px] origin-top"
          />

          {/* Timeline Nodes */}
          <div className="space-y-16">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              const isExpanded = expandedIdx === index;

              return (
                <div
                  key={index}
                  className={`timeline-node-item relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse left-item" : "right-item"
                  }`}
                >
                  {/* Spine Icon Dot */}
                  <div className="timeline-node-dot absolute left-4 md:left-1/2 top-6 w-8 h-8 rounded-full bg-deep-graphite border-2 border-primary flex items-center justify-center -translate-x-1/2 z-10 text-primary shadow-lg">
                    <Icon size={14} />
                  </div>

                  {/* Card Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div
                      onClick={() => toggleExpand(index)}
                      className="timeline-node-card relative p-6 rounded-2xl bg-stone-gray/20 border border-white/5 hover:border-primary/20 shadow-xl transition-all duration-300 cursor-none text-left select-none"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                            {item.year}
                          </span>
                          <h3 className="font-display text-lg font-bold text-warm-white mb-1">
                            {item.title}
                          </h3>
                          <span className="text-xs uppercase tracking-wider font-semibold text-muted-gray block mb-4">
                            {item.subtitle}
                          </span>
                        </div>
                        <div className="text-primary mt-1">
                          {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-soft-gray leading-relaxed mb-1">
                        {item.summary}
                      </p>

                      {/* Expandable Bullet Lists */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-white/5"
                          >
                            <span className="text-[9px] uppercase tracking-widest text-primary block mb-3 font-bold">
                              Key Achievements &amp; Scope
                            </span>
                            <ul className="flex flex-col gap-2.5 text-xs text-soft-gray">
                              {item.bullets.map((bullet, bIdx) => (
                                <li key={bIdx} className="flex items-start gap-2">
                                  <span className="h-1 w-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-4 flex justify-end">
                        <span className="text-[8px] uppercase tracking-widest text-primary font-bold flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          {isExpanded ? "Click to Collapse" : "Click to Expand Details"}
                          {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
