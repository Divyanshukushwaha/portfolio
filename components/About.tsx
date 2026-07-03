"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Code2, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "4+",
    label: "Certificates",
    desc: "Google Python, Azure vision, Deloitte",
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
            I'm Divyanshu Kushwaha, a Computer Science Engineering diploma student at Amity University, Greater Noida. I'm passionate about communication, technology, leadership, and continuously learning new skills.
          </p>

          <p className="about-fade">
            I gained hands-on experience as an international volunteer at the Technoxian World Championship, where I worked alongside people from different countries, strengthening my teamwork and global networking skills.
          </p>

          <p className="about-fade">
            I'm interested in HR, technical internships, app development, recruitment, and event management. I focus on growing both technically and professionally — building leadership and communication skills to excel in corporate and tech environments.
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

      {/* Quick Info & Stats Row */}
      <div className="max-w-6xl mx-auto px-6 mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-white/5 pt-12">
          {/* Stats grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className="about-fade p-6 rounded-2xl bg-card-bg border border-white/5 hover:border-primary/20 shadow-xl transition-all duration-300 flex flex-col justify-between h-40"
                >
                  <div className="p-3 rounded-xl bg-soft-black text-primary border border-white/5 w-fit">
                    <StatIcon size={18} />
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-warm-white block leading-none mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[9px] font-semibold text-primary uppercase tracking-wider block mb-1">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground block leading-tight">
                      {stat.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="lg:col-span-5 about-fade p-8 rounded-3xl bg-card-bg border border-white/5 shadow-2xl">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
              Quick Information
            </h4>
            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">Full Name</span>
                <span className="text-warm-white font-semibold">Divyanshu Kushwaha</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">Location</span>
                <span className="text-warm-white font-semibold">Harish Nagar, UP</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">University</span>
                <span className="text-warm-white font-semibold">Amity University, GN</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">Degree</span>
                <span className="text-warm-white font-semibold">Diploma CSE</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">Batch</span>
                <span className="text-warm-white font-semibold">2024 – 2027</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">Phone</span>
                <span className="text-warm-white font-semibold">+91 9911432688</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-muted-gray">Languages</span>
                <span className="text-warm-white font-semibold">English, Hindi</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-muted-gray">Status</span>
                <span className="flex items-center gap-1.5 text-green-500 font-bold uppercase tracking-wider text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Open to Work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
