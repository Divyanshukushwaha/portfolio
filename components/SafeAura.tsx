"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, ShieldAlert, PhoneCall, MapPin, Database, Moon, ArrowUpRight } from "lucide-react";

const SCREENS = [
  {
    id: "splash",
    title: "App Startup",
    image: "/assets/projects/safeaura_splash.jpg",
    desc: "A clean, modern splash screen designed with the Flutter branding to initialize credentials and fetch user settings asynchronously.",
  },
  {
    id: "home",
    title: "Control Home",
    image: "/assets/projects/safeaura_home.jpg",
    desc: "The primary control dashboard featuring large, high-target buttons (SOS, Fake Call, Contacts) designed for quick accessibility under stress.",
  },
  {
    id: "sos",
    title: "SOS Active",
    image: "/assets/projects/safeaura_sos.jpg",
    desc: "SOS activated state featuring a prominent 60-second countdown and a simple white pill button to cancel false alarms instantly.",
  },
  {
    id: "incoming",
    title: "Fake Call",
    image: "/assets/projects/safeaura_fakecall_incoming.jpg",
    desc: "Simulates a native incoming call screen (customized for 'Bhai 😎') to help users defuse uncomfortable or threatening situations.",
  },
  {
    id: "active",
    title: "Active Call",
    image: "/assets/projects/safeaura_fakecall_active.jpg",
    desc: "A fully functional active call simulator complete with Record, Hold, Mute, and AI Call Assistant panel icons for high realism.",
  },
];

const FEATURES = [
  {
    title: "SOS Panic Alert",
    desc: "Single-tap critical trigger that starts an immediate countdown and dispatches emergency alerts.",
    icon: ShieldAlert,
  },
  {
    title: "Fake Call Simulation",
    desc: "Triggers a mock native incoming phone call with realistic caller metadata and audio loop integration.",
    icon: PhoneCall,
  },
  {
    title: "Trusted Contacts Sync",
    desc: "Anonymous pairing and syncing of key safety hotlines to dispatch location data during an emergency.",
    icon: Shield,
  },
  {
    title: "Live GPS Location Map",
    desc: "Continuously tracks and uploads geolocations via Firebase to keep verified contacts updated on maps.",
    icon: MapPin,
  },
  {
    title: "Firebase Infrastructure",
    desc: "Uses Firebase for anonymous authentication, cloud firestore, and real-time database transactions.",
    icon: Database,
  },
  {
    title: "Dark Mode Interface",
    desc: "A low-light, high-contrast dark user interface designed to protect battery life and remain discreet.",
    icon: Moon,
  },
];

export default function SafeAura() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(1); // default to Home screen

  return (
    <section
      id="projects"
      className="relative py-24 bg-soft-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-accent-terracotta mb-2">
            Case Study
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            SafeAura — Personal Safety App
          </h2>
          <div className="w-10 h-[2px] bg-accent-terracotta mt-4" />
        </div>

        {/* Showcase Grid (Split layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Side: Interactive Phone Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[570px] bg-[#151515] border-[10px] border-[#222] rounded-[45px] shadow-2xl p-3 flex flex-col overflow-hidden ring-1 ring-white/10">
              {/* Speaker / Dynamic Island notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-center">
                <div className="w-12 h-1 bg-[#1a1a1a] rounded-full" />
              </div>
              
              {/* Screen Content Wrapper */}
              <div className="relative flex-1 w-full h-full rounded-[32px] overflow-hidden bg-black z-20">
                <Image
                  src={SCREENS[activeScreenIndex].image}
                  alt={SCREENS[activeScreenIndex].title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />
              </div>

              {/* Home Indicator line */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/20 rounded-full z-30" />
            </div>

            {/* Screen Cycle Tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-8 max-w-sm">
              {SCREENS.map((scr, idx) => (
                <button
                  key={scr.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeScreenIndex === idx
                      ? "bg-accent-terracotta text-warm-white"
                      : "bg-stone-gray/20 text-muted-gray hover:text-warm-white"
                  }`}
                >
                  {scr.title}
                </button>
              ))}
            </div>
            
            <p className="text-xs text-muted-gray text-center italic mt-4 max-w-xs">
              {SCREENS[activeScreenIndex].desc}
            </p>
          </div>

          {/* Right Side: Case Study Narrative (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-sm sm:text-base text-soft-gray leading-relaxed">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-warm-white">
              The Engineering Behind SafeAura
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-accent-terracotta font-semibold mb-1">
                  Problem & Objective
                </h4>
                <p>
                  Emergency interfaces are often bloated or buried behind lock screens. When a user is in crisis, cognitive and physical motor skills deteriorate rapidly. SafeAura solves this by providing a zero-friction, dark-adapted safety layout designed for immediate muscle-memory triggers.
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-accent-terracotta font-semibold mb-1">
                  Design & Research
                </h4>
                <p>
                  We researched panic behavior. SafeAura incorporates a massive, centered target button for SOS and simplified triggers. To prevent accidental alerts, a 60-second countdown handles cancelations easily. The Fake Call module replicates native caller ID metadata to help users disengage from uncomfortable events seamlessly.
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-accent-terracotta font-semibold mb-1">
                  Technology Stack
                </h4>
                <p>
                  Built with <strong className="text-warm-white">Flutter and Dart</strong> to leverage native canvas rendering speed. The app integrates with <strong className="text-warm-white">Firebase Suite</strong> to safely cache contact preferences, manage real-time locations, and handle database transfers with minimum power consumption.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/mr-divyanshu-314572242"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-terracotta hover:bg-accent-terracotta-dark text-warm-white flex items-center gap-2 border border-white/10 transition-all shadow-md"
              >
                <span>Download APK (LinkedIn)</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-stone-gray/25 border border-white/5 hover:border-white/10 hover:bg-stone-gray/40 text-warm-white flex items-center gap-2 transition-all"
              >
                {/* Inline GitHub SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-terracotta"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>Source Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div>
          <h4 className="font-display text-lg font-bold text-warm-white text-center mb-8 uppercase tracking-widest">
            Core Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, index) => {
              const FeatIcon = feat.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-stone-gray/20 border border-white/5 hover:border-accent-terracotta/20 shadow-xl transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-stone-gray/30 text-accent-terracotta w-fit mb-4">
                    <FeatIcon size={18} />
                  </div>
                  <h5 className="font-display text-base font-semibold text-warm-white mb-2">
                    {feat.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
