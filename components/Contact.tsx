"use client";

import React, { useState, useEffect } from "react";
import { Send, Mail, Phone, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  // Rate Limiting countdown timer
  useEffect(() => {
    if (retryAfter === null) return;
    if (retryAfter <= 0) {
      setRetryAfter(null);
      setErrorMessage("");
      setStatus("idle");
      return;
    }

    const timer = setInterval(() => {
      setRetryAfter((prev) => (prev ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [retryAfter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    // Client-side validations
    if (formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Name must be at least 2 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Invalid email address format.");
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Message details must be at least 10 characters.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong.");

        // Handle rate limiting Retry-After header
        if (response.status === 429) {
          const retryHeader = response.headers.get("Retry-After");
          if (retryHeader) {
            setRetryAfter(parseInt(retryHeader, 10));
          } else {
            setRetryAfter(600);
          }
        }
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-soft-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">
            Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            Let's Connect
          </h2>
          <div className="w-10 h-[2px] bg-primary mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-12">
          {/* Left Column: Details & Socials (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-sm sm:text-base text-muted-foreground leading-relaxed text-left z-10">
            <h3 className="font-display text-xl font-bold text-warm-white uppercase tracking-wider">
              Start a Conversation
            </h3>
            
            <p>
              I'm open to internships, app development collaborations, HR opportunities, and event management roles. Drop me a message — I'd love to connect!
            </p>

            <div className="flex flex-col gap-6 mt-4">
              {/* Email */}
              <a
                href="mailto:divyanshukushawha39@gmail.com"
                className="flex items-center gap-4 group cursor-none"
              >
                <div className="p-3.5 rounded-full bg-card-bg border border-white/5 text-primary group-hover:bg-primary/10 transition-colors">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-muted-gray block font-bold">Email</span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-warm-white group-hover:text-primary transition-colors">
                    divyanshukushawha39@gmail.com
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+919911432688"
                className="flex items-center gap-4 group cursor-none"
              >
                <div className="p-3.5 rounded-full bg-card-bg border border-white/5 text-primary group-hover:bg-primary/10 transition-colors">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-muted-gray block font-bold">Call</span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-warm-white group-hover:text-primary transition-colors">
                    +91 9911432688
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-full bg-card-bg border border-white/5 text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-muted-gray block font-bold">Location</span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-warm-white">
                    Harish Nagar, Uttar Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 mt-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/mr-divyanshu-314572242"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic p-3 rounded-full bg-card-bg border border-white/5 hover:border-primary/20 text-muted-gray hover:text-warm-white transition-all cursor-none"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Divyanshukushwaha"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic p-3 rounded-full bg-card-bg border border-white/5 hover:border-primary/20 text-muted-gray hover:text-warm-white transition-all cursor-none"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              {/* Resume download */}
              <a
                href="/assets/resume_original.jpg"
                download="Divyanshu_Resume.jpg"
                className="magnetic p-3 rounded-full bg-card-bg border border-white/5 hover:border-primary/20 text-muted-gray hover:text-warm-white transition-all cursor-none"
                aria-label="Download Resume"
              >
                <Download size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Glass Form */}
          <div className="lg:col-span-7 bg-card-bg/40 border border-white/5 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[9px] uppercase tracking-widest text-muted-gray font-bold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" राहुल शर्मा"
                    className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-primary focus:outline-none py-2.5 text-sm text-warm-white transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[9px] uppercase tracking-widest text-muted-gray font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-primary focus:outline-none py-2.5 text-sm text-warm-white transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[9px] uppercase tracking-widest text-muted-gray font-bold">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunity details"
                  className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-primary focus:outline-none py-2.5 text-sm text-warm-white transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[9px] uppercase tracking-widest text-muted-gray font-bold">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Divyanshu, I'd love to connect about..."
                  className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-primary focus:outline-none py-2.5 text-sm text-warm-white transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending" || retryAfter !== null}
                className="magnetic mt-4 w-full sm:w-fit px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-bronze disabled:bg-stone-gray/30 text-background flex items-center justify-center gap-2 border border-white/10 transition-all cursor-none shadow-lg hover:shadow-primary/20"
              >
                <span>
                  {status === "sending"
                    ? "Dispatching..."
                    : retryAfter !== null
                    ? `Locked (${retryAfter}s)`
                    : "Send Message 🚀"}
                </span>
                <Send size={12} />
              </button>

              {/* Success / Error messages */}
              {status === "success" && (
                <p className="text-xs text-green-500 font-semibold text-center mt-2 animate-fade-in">
                  ✅ Message Sent!
                </p>
              )}

              {status === "error" && (
                <p className="text-xs text-red-500 font-semibold text-center mt-2 animate-fade-in">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
