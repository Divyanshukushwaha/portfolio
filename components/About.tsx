"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award, Code2, Users, MessageSquare, ShieldAlert, Sparkles, BrainCircuit,
  GraduationCap, Smartphone, Lightbulb, MapPin
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "4+",
    label: "Certificates",
    desc: "Google Python, Azure Vision, IBM, Deloitte",
    icon: Code2,
  },
  {
    value: "1",
    label: "Live App",
    desc: "SafeAura published APK on LinkedIn",
    icon: Award,
  },
  {
    value: "2",
    label: "Events Coordinated",
    desc: "Technoxian WC & Techfest Ambassador",
    icon: Users,
  },
];

const SOFT_ASSETS = [
  {
    title: "Communication",
    desc: "Articulating technical concepts clearly, syncing team goals, and managing developer relations.",
    icon: MessageSquare,
  },
  {
    title: "Leadership",
    desc: "Coordinating logistics for robotics championships and student bodies at Amity University.",
    icon: ShieldAlert,
  },
  {
    title: "Teamwork",
    desc: "Working alongside international delegates and students under high-pressure event schedules.",
    icon: Sparkles,
  },
  {
    title: "Problem Solving",
    desc: "Structuring clean algorithms in Python, Dart, and configuring API cloud pathways.",
    icon: BrainCircuit,
  },
];

const QUICK_FACTS = [
  { text: "Diploma CSE Student", icon: GraduationCap },
  { text: "Flutter Developer", icon: Smartphone },
  { text: "AI Enthusiast", icon: Lightbulb },
  { text: "Based in Uttar Pradesh, India", icon: MapPin },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text blocks on scroll
      gsap.from(".about-fade", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Float the image slightly on scroll
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { y: 50 },
          {
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 bg-secondary-bg overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Asymmetrical Floating Portrait (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <div
            ref={imageFrameRef}
            className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] rounded-3xl overflow-hidden bg-card-bg border border-white/5 shadow-2xl p-4 transition-all duration-700"
          >
            {/* Outline highlight frame */}
            <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none translate-x-2 translate-y-2 z-0" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-soft-black z-10">
              <Image
                src="/assets/divyanshu_mountain.jpg"
                alt="Divyanshu Kushwaha"
                fill
                className="object-cover object-[center_35%] scale-103 hover:scale-106 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-muted-foreground leading-relaxed text-left">
          <span className="about-fade text-[10px] font-semibold tracking-[0.2em] uppercase text-primary">
            Who I Am
          </span>
          
          <h2 className="about-fade font-display text-4xl sm:text-5xl font-bold text-warm-white mb-2 leading-none">
            Grounded logic, <br />
            elevated <span className="italic text-primary font-serif font-normal">perspectives</span>.
          </h2>
          
          <div className="about-fade w-12 h-[2px] bg-primary my-2" />

          <p className="about-fade text-lg text-warm-white font-medium">
            I'm Divyanshu, a Diploma student in Computer Science Engineering at Amity University, Greater Noida. I'm passionate about building practical digital solutions using Flutter, Firebase, and modern AI tools.
          </p>

          <p className="about-fade">
            I enjoy solving real-world problems through app development and a vibe coding approach, where I leverage AI tools to design, build, debug, and improve applications more efficiently.
          </p>

          <p className="about-fade">
            Alongside technology, I'm interested in HR, leadership, recruitment, communication, and event management. I enjoy working with people, learning continuously, and contributing to impactful projects.
          </p>

          <p className="about-fade text-sm text-soft-gray">
            Currently, I'm seeking internship opportunities where I can apply my technical skills, creativity, and AI-assisted development workflow while continuing to grow as a software professional.
          </p>

          {/* Social Row matching template style */}
          <div className="about-fade flex flex-wrap gap-4 mt-4">
            <a
              href="https://www.linkedin.com/in/mr-divyanshu-314572242"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 text-xs text-primary font-bold tracking-wider uppercase transition-all cursor-none"
            >
              🔗 LinkedIn
            </a>
            <a
              href="mailto:divyanshukushawha39@gmail.com"
              className="px-5 py-2.5 rounded-full bg-stone-gray/25 border border-white/5 hover:bg-white/5 text-xs text-warm-white font-bold tracking-wider uppercase transition-all cursor-none"
            >
              ✉️ Email
            </a>
            <a
              href="tel:+919911432688"
              className="px-5 py-2.5 rounded-full bg-stone-gray/25 border border-white/5 hover:bg-white/5 text-xs text-warm-white font-bold tracking-wider uppercase transition-all cursor-none"
            >
              📞 Call
            </a>
          </div>
        </div>
      </div>

      {/* Core Soft Asset Cards Grid (Communication, Leadership, Teamwork, Problem Solving) */}
      <div className="max-w-6xl mx-auto px-6 mt-20">
        <h4 className="font-display text-[10px] uppercase tracking-[0.25em] text-center text-muted-gray mb-12 font-bold">
          Core Professional Attributes
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOFT_ASSETS.map((asset, idx) => {
            const Icon = asset.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-card-bg border border-white/5 hover:border-primary/20 shadow-xl transition-all duration-300 text-left group"
              >
                <div className="p-3 rounded-xl bg-soft-black text-primary border border-white/5 w-fit mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon size={18} />
                </div>
                <h5 className="font-display text-sm font-bold text-warm-white uppercase tracking-wider mb-2">
                  {asset.title}
                </h5>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  {asset.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Info, Quick Facts & Stats Row */}
      <div className="max-w-6xl mx-auto px-6 mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/5 pt-12">
          {/* Left Side: Stats cards */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            {STATS.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card-bg border border-white/5 hover:border-primary/20 shadow-xl transition-all duration-300 flex items-center gap-4 h-24 text-left"
                >
                  <div className="p-3.5 rounded-xl bg-soft-black text-primary border border-white/5">
                    <StatIcon size={18} />
                  </div>
                  <div>
                    <span className="font-display text-2xl font-bold text-warm-white block leading-none mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-semibold text-primary uppercase tracking-wider block mb-1">
                      {stat.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground block leading-tight">
                      {stat.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Quick Facts (New Request) */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-card-bg border border-white/5 shadow-2xl h-80 flex flex-col justify-between">
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary text-left mb-6">
                Quick Facts
              </h4>
              <div className="flex flex-col gap-5 text-left">
                {QUICK_FACTS.map((fact, idx) => {
                  const FactIcon = fact.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-soft-gray">
                      <div className="p-2 rounded-lg bg-soft-black border border-white/5 text-primary">
                        <FactIcon size={14} />
                      </div>
                      <span className="font-medium">{fact.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Info Box */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-card-bg border border-white/5 shadow-2xl h-80 flex flex-col justify-between">
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary text-left mb-6">
                Quick Information
              </h4>
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-left">
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-muted-gray text-[11px]">Name</span>
                  <span className="text-warm-white font-semibold text-xs">Divyanshu</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-muted-gray text-[11px]">University</span>
                  <span className="text-warm-white font-semibold text-xs">Amity University, GN</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-muted-gray text-[11px]">Degree</span>
                  <span className="text-warm-white font-semibold text-xs">Diploma CSE</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-1">
                  <span className="text-muted-gray text-[11px]">Languages</span>
                  <span className="text-warm-white font-semibold text-xs">English, Hindi</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-muted-gray text-[11px]">Status</span>
                  <span className="flex items-center gap-1.5 text-green-500 font-bold uppercase tracking-wider text-[9px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
