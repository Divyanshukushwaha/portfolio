"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  // Screens for the interactive phone mockup
  const screens = [
    {
      id: "main-ui",
      title: "Main SOS Screen",
      image: "/assets/projects/safeaura_main.jpg",
      description: "Main dashboard displaying the Emergency SOS button, Fake Call triggers, and Trusted Contacts management.",
    },
    {
      id: "incoming-call",
      title: "Incoming Fake Call",
      image: "/assets/projects/safeaura_incoming_call.jpg",
      description: "Incoming call mockup showing customized caller credentials (e.g. Papa) with decline/accept controls.",
    },
    {
      id: "active-call",
      title: "Active Call Interface",
      image: "/assets/projects/safeaura_active_call.jpg",
      description: "Simulated active call interface displaying caller state, call duration timer, and mock mute/speaker options.",
    },
  ];

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  return (
    <section
      id="projects"
      className="relative py-28 bg-soft-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">
            Showcase
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            What I've Built
          </h2>
          <div className="w-10 h-[2px] bg-primary mt-4" />
        </div>

        {/* SafeAura Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-5xl mx-auto relative z-10">
          
          {/* Left Column: Copy details (7 Cols) */}
          <div className="lg:col-span-7 text-left flex flex-col items-start gap-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
              Mobile Application Project
            </span>
            
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-warm-white mb-2 leading-none">
              SafeAura — Personal Safety
            </h3>
            
            <span className="text-xs uppercase tracking-wider font-semibold text-muted-gray mb-4">
              Flutter, Dart &amp; Firebase
            </span>

            <p className="text-xs sm:text-sm text-soft-gray leading-relaxed mb-4">
              A personal safety application engineered with Flutter and Firebase. Designed to provide users with a fast, reliable way to dispatch emergency alerts, coordinate live locations, and simulate incoming calls to escape stressful environments.
            </p>

            {/* Features lists */}
            <div className="flex flex-col gap-2.5 mb-6 text-xs text-muted-gray">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span><strong>SOS Emergency Alert</strong>: Triggers rapid notifications with a cancel grace-period.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span><strong>Fake Call Simulator</strong>: Generates realistic mock calls with customizable caller data (e.g. Papa, Bhaiya).</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span><strong>Trusted Contacts Integration</strong>: Syncs core contact lists for instant alerts.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span><strong>Live GPS Coordinates</strong>: Captures and sends precise location coordinates.</span>
              </div>
            </div>

            {/* Tech tag list */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {["Flutter", "Dart", "Firebase", "State Management", "Mobile UI", "GPS API"].map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-stone-gray/10 border border-white/5 text-[9px] uppercase tracking-wider text-muted-gray font-semibold">
                  {t}
                </span>
              ))}
            </div>

            {/* LinkedIn + Code Buttons - No Live Demo */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/mr-divyanshu-314572242"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-primary hover:bg-bronze text-background text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg hover:shadow-primary/20 cursor-none"
              >
                <span>LinkedIn Post</span>
                <ArrowUpRight size={13} />
              </a>
              
              <a
                href="https://github.com/Divyanshukushwaha"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-stone-gray/20 border border-white/5 hover:border-white/10 text-xs text-warm-white font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>Source Code</span>
              </a>
            </div>
          </div>

          {/* Right Column: Smartphone frame with active screen toggles (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6 justify-center">
            
            {/* Phone Mockup Frame */}
            <div className="relative w-[240px] h-[480px] bg-stone-gray border-4 border-white/15 rounded-[36px] shadow-2xl p-1 bg-black overflow-hidden flex items-center justify-center">
              {/* Phone notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full mr-4" />
                <div className="w-6 h-0.5 bg-zinc-800 rounded-full" />
              </div>
              
              {/* Screen Image Container */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-zinc-950">
                <Image
                  src={screens[activeScreenIndex].image}
                  alt={screens[activeScreenIndex].title}
                  fill
                  className="object-cover scale-102 hover:scale-104 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 240px"
                  priority
                />
              </div>
            </div>

            {/* Interactive Screen Toggles */}
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex gap-2">
                {screens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider border cursor-none transition-all ${
                      activeScreenIndex === idx
                        ? "bg-primary border-primary text-background shadow-lg shadow-primary/10"
                        : "bg-stone-gray/10 border-white/5 text-muted-gray hover:border-white/10"
                    }`}
                  >
                    {screen.title.split(" ")[1] || screen.title}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-gray text-center max-w-xs leading-relaxed italic mt-1">
                "{screens[activeScreenIndex].description}"
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
