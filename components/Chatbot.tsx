"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Send, X, Briefcase, Calendar, Download,
  User, Cpu, Award, Phone, ArrowUpRight, Check, ShieldCheck, Mail
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  type?: "text" | "project" | "resume" | "hire-form" | "schedule" | "skills" | "certificates" | "instagram";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [showHireForm, setShowHireForm] = useState(false);
  const [showScheduleSlot, setShowScheduleSlot] = useState(false);

  // Hire Form States
  const [hireData, setHireData] = useState({
    name: "",
    company: "",
    email: "",
    role: "",
    message: "",
  });
  const [hireStatus, setHireStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Welcome message matching the requested text
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Hi! I'm Divyanshu's AI Assistant. Ask me anything about my skills, projects, certifications, education, or contact details.",
        timestamp: new Date(),
        type: "text",
      },
    ]);
  }, []);

  // Scroll window on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, showHireForm, showScheduleSlot]);

  const addBotMessage = (text: string, type: Message["type"] = "text", delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text,
          timestamp: new Date(),
          type,
        },
      ]);
    }, delay);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
      type: "text",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Process reply
    processResponse(text.toLowerCase());
  };

  // Conversational response logic matching the requested facts
  const processResponse = (query: string) => {
    setIsTyping(true);

    // 1. Instagram triggers: "instagram", "follow you", "social media", "socials", "ig"
    if (
      query.includes("instagram") || query.includes("follow") || 
      query.includes("social media") || query.includes("socials") || 
      query.includes("ig")
    ) {
      addBotMessage(
        "You can connect and follow my photography, video editing creations, and daily updates directly on Instagram here: @divyan_shu_kushwaha.",
        "instagram"
      );
      return;
    }

    // 2. About Me triggers
    if (query.includes("about") || query.includes("who are you") || query.includes("who is divyanshu") || query.includes("background")) {
      addBotMessage(
        "Divyanshu is a Diploma student in Computer Science Engineering at Amity University, Greater Noida. He is passionate about building practical digital solutions using Flutter, Firebase, and modern AI tools. He enjoys solving real-world problems through app development and a vibe coding approach.",
        "text"
      );
      return;
    }

    // 3. Skills trigger
    if (query.includes("skills") || query.includes("technologies") || query.includes("tools") || query.includes("know")) {
      addBotMessage(
        "Divyanshu specializes in the following fields:\n\n* **Mobile Development:** Flutter, Dart, Firebase.\n* **AI & Cloud:** Generative AI, Azure AI Services.\n* **Programming:** Python, HTML & CSS.\n* **Soft Skills:** Communication, Teamwork, Leadership, Problem Solving.\n* **Creative Skills:** Social Media Content, Photography, Video Editing.",
        "skills"
      );
      return;
    }

    // 4. Projects trigger
    if (query.includes("safeaura") || query.includes("project") || query.includes("app") || query.includes("build") || query.includes("work")) {
      addBotMessage(
        "Divyanshu's featured application project is **SafeAura**.",
        "project"
      );
      return;
    }

    // 5. Resume trigger
    if (query.includes("resume") || query.includes("cv") || query.includes("experience")) {
      addBotMessage(
        "Divyanshu's professional Resume details his Flutter apps, Google Python and Azure vision certificates, and Amity education. Click below to download.",
        "resume"
      );
      return;
    }

    // 6. Certifications trigger
    if (query.includes("certifications") || query.includes("certificates") || query.includes("credentials")) {
      addBotMessage(
        "Divyanshu has **6 verified certifications**:\n\n1. **Getting Started with Generative AI** (IBM SkillsBuild)\n2. **Introduction to Generative AI** (Google Cloud)\n3. **Build a Computer Vision App** (Microsoft + Coursera)\n4. **Cyber Security Simulation** (Deloitte · Forage)\n5. **Certificate of Appreciation** (Technoxian WC)\n6. **Foundations of Python** (Google Career Certificates)",
        "certificates"
      );
      return;
    }

    // 7. Contact / Phone / Email trigger
    if (
      query.includes("contact") || query.includes("call") || query.includes("email") || 
      query.includes("phone") || query.includes("meeting") || query.includes("book") ||
      query.includes("whatsapp")
    ) {
      addBotMessage(
        "You can contact Divyanshu directly via email (divyanshukushawha39@gmail.com), phone/WhatsApp (+91 9911432688), or book a call slot.",
        "schedule"
      );
      return;
    }

    // 8. General Greetings
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      addBotMessage(
        "Hello! I am Divyanshu AI. How can I assist you with his skills, projects, certifications, or contact details today?",
        "text"
      );
      return;
    }

    // 9. Recruiter / Hire Me triggers
    if (query.includes("hire") || query.includes("recruiter") || query.includes("job") || query.includes("opportunity")) {
      setIsRecruiterMode(true);
      addBotMessage(
        "💼 **Hiring Mode Activated!**\n\nDivyanshu is looking for Software Engineering and Flutter Developer internships. What professional details would you like to review? (Click 'Hire Me' to submit a direct proposal).",
        "text"
      );
      return;
    }

    // 10. Fallback: Answer only using portfolio details. Otherwise return strict fallback.
    addBotMessage(
      "I don't have that information yet. Please contact Divyanshu directly.",
      "text"
    );
  };

  const handleSuggestionClick = (text: string) => {
    handleSendMessage(text);
  };

  // Submit Recruiter Proposal Form
  const handleHireFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHireStatus("sending");

    if (!hireData.name.trim() || !hireData.email.trim() || !hireData.message.trim() || !hireData.role.trim()) {
      setHireStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: hireData.name,
          email: hireData.email,
          subject: `[HIRE PROPOSAL] ${hireData.role} at ${hireData.company || "Direct Recruiter"}`,
          message: hireData.message,
        }),
      });

      if (response.ok) {
        setHireStatus("success");
        
        // WhatsApp Redirect
        const whatsappNumber = "919911432688";
        const msgText = `*Hiring Proposal from Portfolio* 💼\n\n*Recruiter:* ${hireData.name}\n*Company:* ${hireData.company}\n*Email:* ${hireData.email}\n*Role:* ${hireData.role}\n\n*Proposal Message:* ${hireData.message}`;
        const encoded = encodeURIComponent(msgText);
        const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encoded}`;
        window.open(url, "_blank");

        setTimeout(() => {
          setShowHireForm(false);
          setHireData({ name: "", company: "", email: "", role: "", message: "" });
          setHireStatus("idle");
          addBotMessage("Thank you! Your hiring proposal has been logged and opened in your WhatsApp tab. Divyanshu will connect with you soon! 🤝");
        }, 1000);
      } else {
        setHireStatus("error");
      }
    } catch {
      setHireStatus("error");
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary hover:bg-bronze text-background transition-all shadow-xl hover:shadow-primary/30 cursor-none"
          aria-label="Toggle AI Assistant Chat"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white text-[9px] font-bold text-background items-center justify-center">1</span>
          </span>
        </button>
      </div>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-card-bg/85 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
            role="dialog"
            aria-label="AI Assistant Chat window"
          >
            {/* Header row */}
            <div className="p-4 bg-soft-black/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-full bg-primary/20 border border-primary/45 flex items-center justify-center text-primary font-bold font-display text-sm">
                  D
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border border-card-bg" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-warm-white tracking-wide">Divyanshu AI</h4>
                  <span className="text-[9px] text-green-500 font-bold uppercase tracking-wider block">Portfolio Assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-muted-gray hover:text-warm-white transition-colors cursor-none"
                aria-label="Close Chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message History Panel */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed text-left whitespace-pre-wrap select-text ${
                      msg.sender === "user"
                        ? "bg-primary text-background rounded-tr-none font-medium shadow-md"
                        : "bg-soft-black/55 border border-white/5 text-soft-gray rounded-tl-none"
                    }`}
                  >
                    {msg.text}

                    {/* Rich UI: Instagram Card */}
                    {msg.type === "instagram" && (
                      <div className="mt-3">
                        <a
                          href="https://www.instagram.com/divyan_shu_kushwaha"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-none w-full shadow-lg shadow-primary/10"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                          <span>Instagram Profile</span>
                          <ArrowUpRight size={12} />
                        </a>
                      </div>
                    )}

                    {/* Rich UI: Project Card (SafeAura) */}
                    {msg.type === "project" && (
                      <div className="mt-4 p-3 bg-card-bg rounded-xl border border-white/5 flex flex-col gap-3">
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-soft-black">
                          <Image
                            src="/assets/projects/safeaura_main.jpg"
                            alt="SafeAura Main Screen"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-primary font-bold block mb-1">Flutter &amp; Firebase</span>
                          <h5 className="font-bold text-warm-white mb-1">SafeAura — Mobile Safety</h5>
                          <p className="text-[10px] text-muted-gray leading-normal mb-2.5">
                            <strong>Problem:</strong> Lack of quick panic dispatches.<br/>
                            <strong>Solution:</strong> Red SOS trigger, GPS location, and caller simulation tools (Papa, Bhaiya).
                          </p>
                          <div className="flex gap-2">
                            <a
                              href="https://www.linkedin.com/in/mr-divyanshu-314572242"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-primary text-background text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-none"
                            >
                              <span>Demo</span>
                              <ArrowUpRight size={10} />
                            </a>
                            <a
                              href="https://github.com/Divyanshukushwaha"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-stone-gray/25 border border-white/5 text-warm-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-none"
                            >
                              <span>Code</span>
                              <ArrowUpRight size={10} />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Rich UI: Resume Download Button */}
                    {msg.type === "resume" && (
                      <div className="mt-3">
                        <a
                          href="/assets/resume_original.jpg"
                          download="Divyanshu_Resume.jpg"
                          className="px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-none w-full shadow-lg shadow-primary/10"
                        >
                          <Download size={13} />
                          <span>Download CV / Resume</span>
                        </a>
                      </div>
                    )}

                    {/* Rich UI: Certificates Action */}
                    {msg.type === "certificates" && (
                      <div className="mt-3">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            const el = document.getElementById("certificates");
                            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-xl bg-stone-gray/25 border border-white/5 text-warm-white hover:text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-none w-full"
                        >
                          <Award size={13} className="text-primary" />
                          <span>View Certifications</span>
                        </button>
                      </div>
                    )}

                    {/* Rich UI: Skills scroll trigger action */}
                    {msg.type === "skills" && (
                      <div className="mt-3">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            const el = document.getElementById("skills");
                            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
                          }}
                          className="px-4 py-2 rounded-xl bg-stone-gray/25 border border-white/5 text-warm-white hover:text-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-none w-full"
                        >
                          <Cpu size={13} className="text-primary" />
                          <span>View Skills Bars</span>
                        </button>
                      </div>
                    )}

                    {/* Rich UI: Schedule Option Panel */}
                    {msg.type === "schedule" && (
                      <div className="mt-3 flex flex-col gap-2">
                        <button
                          onClick={() => setShowScheduleSlot(true)}
                          className="px-4 py-2 rounded-xl bg-primary text-background text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-none w-full shadow-md"
                        >
                          <Calendar size={13} />
                          <span>Book Call Slot</span>
                        </button>
                        <a
                          href="mailto:divyanshukushawha39@gmail.com"
                          className="px-4 py-2 rounded-xl bg-stone-gray/25 border border-white/5 text-warm-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-none w-full"
                        >
                          <Mail size={13} className="text-primary" />
                          <span>Email Direct</span>
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-muted-gray mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="bg-soft-black/55 border border-white/5 text-soft-gray p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  </div>
                </div>
              )}

              {/* Inline Hire Me Form */}
              {showHireForm && (
                <div className="p-4 rounded-2xl bg-soft-black/80 border border-primary/20 text-left flex flex-col gap-3.5 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <Briefcase size={12} />
                      Hire Divyanshu
                    </span>
                    <button
                      onClick={() => setShowHireForm(false)}
                      className="text-muted-gray hover:text-warm-white cursor-none"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <form onSubmit={handleHireFormSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="recruiter-name" className="text-[8px] uppercase tracking-widest text-muted-gray font-bold">Your Name</label>
                      <input
                        type="text"
                        id="recruiter-name"
                        required
                        value={hireData.name}
                        onChange={(e) => setHireData({ ...hireData, name: e.target.value })}
                        placeholder="Name"
                        className="bg-card-bg border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-warm-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="recruiter-comp" className="text-[8px] uppercase tracking-widest text-muted-gray font-bold">Company</label>
                        <input
                          type="text"
                          id="recruiter-comp"
                          value={hireData.company}
                          onChange={(e) => setHireData({ ...hireData, company: e.target.value })}
                          placeholder="Company"
                          className="bg-card-bg border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-warm-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="recruiter-role" className="text-[8px] uppercase tracking-widest text-muted-gray font-bold">Job Role</label>
                        <input
                          type="text"
                          id="recruiter-role"
                          required
                          value={hireData.role}
                          onChange={(e) => setHireData({ ...hireData, role: e.target.value })}
                          placeholder="e.g. Developer"
                          className="bg-card-bg border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-warm-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="recruiter-mail" className="text-[8px] uppercase tracking-widest text-muted-gray font-bold">Email</label>
                      <input
                        type="email"
                        id="recruiter-mail"
                        required
                        value={hireData.email}
                        onChange={(e) => setHireData({ ...hireData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="bg-card-bg border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-warm-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="recruiter-msg" className="text-[8px] uppercase tracking-widest text-muted-gray font-bold">Message Details</label>
                      <textarea
                        id="recruiter-msg"
                        required
                        rows={2}
                        value={hireData.message}
                        onChange={(e) => setHireData({ ...hireData, message: e.target.value })}
                        placeholder="Proposal details..."
                        className="bg-card-bg border border-white/5 rounded-lg px-2.5 py-1.5 text-xs text-warm-white focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={hireStatus === "sending"}
                      className="px-4 py-2 mt-2 rounded-lg bg-primary text-background font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-none"
                    >
                      <span>{hireStatus === "sending" ? "Dispatching..." : "Submit to WhatsApp 🚀"}</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Inline Call Slots */}
              {showScheduleSlot && (
                <div className="p-4 rounded-2xl bg-soft-black/80 border border-primary/20 text-left flex flex-col gap-3 shadow-xl">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                      <Calendar size={12} />
                      Request slots
                    </span>
                    <button
                      onClick={() => setShowScheduleSlot(false)}
                      className="text-muted-gray hover:text-warm-white cursor-none"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 text-xs">
                    <p className="text-muted-gray text-[11px] leading-relaxed">
                      Select your preferred slots and email your invite. General hours: Mon-Fri, 10:00 AM - 6:00 PM IST.
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href="tel:+919911432688"
                        className="p-2.5 bg-card-bg border border-white/5 rounded-xl hover:border-primary/20 flex items-center gap-3 group transition-all"
                      >
                        <div className="p-2 bg-soft-black text-primary rounded-lg">
                          <Phone size={13} />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-gray uppercase tracking-widest block font-bold">Call Phone</span>
                          <span className="font-semibold text-warm-white group-hover:text-primary transition-colors">+91 9911432688</span>
                        </div>
                      </a>
                      
                      <a
                        href="mailto:divyanshukushawha39@gmail.com?subject=Meeting Request - Software Engineering Role&body=Hi Divyanshu, I'd like to schedule an interview for..."
                        className="p-2.5 bg-card-bg border border-white/5 rounded-xl hover:border-primary/20 flex items-center gap-3 group transition-all"
                      >
                        <div className="p-2 bg-soft-black text-primary rounded-lg">
                          <Mail size={13} />
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-gray uppercase tracking-widest block font-bold">Email Invite</span>
                          <span className="font-semibold text-warm-white group-hover:text-primary transition-colors">divyanshukushawha39@gmail.com</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Smart Suggestions bubbles (About, Skills, Projects, Resume, Certifications, Contact, Hire Me) */}
            <div data-lenis-prevent className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto select-none bg-soft-black/20 scrollbar-none">
              <button
                onClick={() => setShowHireForm(!showHireForm)}
                className="px-3 py-1.5 rounded-full bg-primary text-background text-[10px] font-bold uppercase tracking-wider whitespace-nowrap cursor-none"
              >
                Hire Me 🤝
              </button>
              {[
                { name: "About Me", query: "About Me" },
                { name: "Skills", query: "Show Skills" },
                { name: "Projects", query: "SafeAura app details" },
                { name: "Resume", query: "Download Resume" },
                { name: "Certifications", query: "Show certifications" },
                { name: "Contact", query: "How to contact" },
              ].map((s) => (
                <button
                  key={s.name}
                  onClick={() => handleSuggestionClick(s.query)}
                  className="px-3 py-1.5 rounded-full bg-stone-gray/10 hover:bg-stone-gray/20 border border-white/5 text-muted-gray hover:text-warm-white text-[10px] font-semibold whitespace-nowrap cursor-none transition-colors"
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Message input panel */}
            <div className="p-3 bg-soft-black/40 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                placeholder="Ask Divyanshu AI..."
                className="flex-1 bg-card-bg border border-white/5 focus:border-primary focus:outline-none rounded-xl px-4 py-2.5 text-xs text-warm-white placeholder-muted-gray transition-colors"
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="p-2.5 bg-primary text-background rounded-xl hover:bg-bronze transition-colors flex items-center justify-center cursor-none"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
