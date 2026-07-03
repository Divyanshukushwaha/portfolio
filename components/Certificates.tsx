"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, ShieldCheck, Share2, Clipboard, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  earnedStory: string;
  learnedStory: string;
  skills: string[];
  linkedinUrl: string;
  postCaption: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: "ibm-genai",
    title: "Getting Started with Generative AI",
    issuer: "IBM SkillsBuild",
    date: "June 27, 2026",
    image: "/assets/certificates/ibm_genai_cert.jpg",
    earnedStory: "Earned by completing the comprehensive IBM Generative AI track on SkillsBuild, passing evaluations on tokenization models, parameters adjustments, and prompt strategies.",
    learnedStory: "Learned the foundational mechanics of large language models, structured parameter tunings, temperature adjustments, and responsible deployment parameters.",
    skills: ["Generative AI", "IBM SkillsBuild", "LLM Mechanics", "Prompt Architecture"],
    linkedinUrl: "https://www.credly.com/go/06Uj1X2l",
    postCaption: "Excited to share that I have completed the 'Getting Started with Generative AI' course by IBM SkillsBuild! 🚀 Grounding my software engineering skills in LLM architectures, prompting paradigms, and model parameter tunings to create intelligent applications. \n\nVerify credential: https://www.credly.com/go/06Uj1X2l \n\n#GenerativeAI #IBM #SoftwareEngineering #AIAutomation",
  },
  {
    id: "google-genai",
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    date: "August 29, 2024",
    image: "/assets/certificates/google_genai_cert.jpg",
    earnedStory: "Earned this completion badge from Google Cloud by passing assessment workflows focused on generative AI foundations, transformer configurations, and machine learning structures.",
    learnedStory: "Gained a clear understanding of Google Cloud's AI infrastructure, model parameters, semantic token weights, and prompt configurations.",
    skills: ["Google Cloud", "Responsible AI", "Generative Foundations", "Machine Learning"],
    linkedinUrl: "https://www.linkedin.com/in/mr-divyanshu-314572242",
    postCaption: "Completed Google Cloud's 'Introduction to Generative AI' track! 🤖 Expanding my engineering logic to cover responsible AI pipelines, transformer structures, and semantic classifications. Excited to weave these prompt structures into next-gen software systems. \n\n#GoogleCloud #GenerativeAI #SoftwareEngineering #Chatbots",
  },
  {
    id: "azure-vision",
    title: "Build a Computer Vision App with Azure Cognitive Services",
    issuer: "Microsoft + Coursera",
    date: "January 4, 2026",
    image: "/assets/certificates/microsoft_cognitive_cert.jpg",
    earnedStory: "Earned by designing a computer vision app flow on Azure, configuring API pipelines, routing payload coordinates, and parsing metadata responses.",
    learnedStory: "Learned how to hook cloud-hosted OCR engines, classification models, and object categorizers into functional user-facing interfaces.",
    skills: ["Azure Cognitive Services", "Computer Vision", "OCR API", "Cloud App Flow"],
    linkedinUrl: "https://www.linkedin.com/in/mr-divyanshu-314572242",
    postCaption: "Completed the Microsoft & Coursera program on building Computer Vision Apps with Azure Cognitive Services! 👁️ Configured real-time OCR pipelines and object tagging structures using Azure cloud-hosted cognitive endpoints. \n\n#Azure #Microsoft #ComputerVision #SoftwareEngineer",
  },
  {
    id: "deloitte-cyber",
    title: "Cyber Job Simulation — Cybersecurity Practical Tasks",
    issuer: "Deloitte · Forage",
    date: "June 23, 2025",
    image: "/assets/certificates/deloitte_cyber_cert.jpg",
    earnedStory: "Completed Deloitte's Cybersecurity simulation on Forage, executing threat log forensics, scanning server logs, and detailing vulnerability patch guidelines.",
    learnedStory: "Learned to audit network accesses, map vulnerability vectors, and apply secure-coding constraints to protect API payloads.",
    skills: ["Vulnerability Assessment", "Log Forensics", "Threat Modeling", "Secure Coding"],
    linkedinUrl: "https://www.linkedin.com/in/mr-divyanshu-314572242",
    postCaption: "Successfully completed Deloitte's Cybersecurity Job Simulation! 🔒 Conducted practical tasks in server log forensics, scanning server ports for vulnerabilities, and detailing secure configurations. Practical insight into corporate security pipelines. \n\n#Deloitte #Cybersecurity #SecOps #Forage",
  },
  {
    id: "technoxian",
    title: "Certificate of Appreciation — International Volunteer",
    issuer: "Technoxian World Robotics Championship",
    date: "Aug 30 – Sep 2, 2025",
    image: "/assets/certificates/technoxian_cert.jpg",
    earnedStory: "Awarded by WORSO for outstanding logistics management and delegates coordination during the Technoxian World Cup 9.0 robotics tournament.",
    learnedStory: "Developed cross-functional communications, international networking coordinates, and critical logistical problem solving under density.",
    skills: ["Logistics Coordination", "Delegate Management", "Team Collaboration", "Interpersonal Communication"],
    linkedinUrl: "https://www.linkedin.com/in/mr-divyanshu-314572242",
    postCaption: "Proud to receive my Certificate of Appreciation as an International Volunteer at the Technoxian World Cup 9.0! 🤖 Managed logistical operations and team communications for global robotics participants across multiple tournament days. \n\n#Technoxian #WORSO #Robotics #Leadership",
  },
  {
    id: "google-python",
    title: "Foundations of Python by Google Career Certificates",
    issuer: "Google Career Certs · Cursa",
    date: "October 8, 2025",
    image: "/assets/certificates/python_google_cert.jpg",
    earnedStory: "Completed the Google Foundations of Python curriculum, passing all object-oriented coding exercises and script automation tasks.",
    learnedStory: "Mastered programmatic structures, file I/O operations, scripting automations, and basic data structures configuration.",
    skills: ["Python Scripting", "Data Management", "Terminal Automations", "Logic Structure"],
    linkedinUrl: "https://www.linkedin.com/in/mr-divyanshu-314572242",
    postCaption: "Earned the Google Foundations of Python certificate under the Google Career Certificates program! 🐍 Building clean data scripting utilities, file organization loops, and object-oriented logic. \n\n#Python #GoogleCareerCertificates #Coding #SoftwareEngineer",
  },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="certificates"
      className="relative py-24 bg-deep-graphite overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-2">
            Credentials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-warm-white">
            My Achievements
          </h2>
          <div className="w-10 h-[2px] bg-primary mt-4" />
        </div>

        {/* Certificates Grid (6 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative cursor-none bg-stone-gray/20 border border-white/5 hover:border-primary/20 rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
            >
              {/* Image Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-soft-black">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                {/* View Overlay */}
                <div className="absolute inset-0 bg-soft-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-warm-white font-semibold px-4 py-2 bg-primary/80 border border-white/10 rounded-full shadow-lg">
                    <ExternalLink size={12} />
                    <span>LinkedIn Story</span>
                  </div>
                </div>
              </div>

              {/* Information Card */}
              <div className="p-6">
                <span className="text-[9px] uppercase tracking-widest text-primary font-semibold block mb-1">
                  {cert.issuer}
                </span>
                <h3 className="font-display text-base font-bold text-warm-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {cert.title}
                </h3>
                <span className="text-[10px] text-muted-gray block mt-2">
                  {cert.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-soft-black/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-card-bg border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-soft-black border border-white/5 text-muted-gray hover:text-warm-white transition-colors z-20 cursor-none"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>

                {/* Content Panel */}
                <div className="overflow-y-auto p-8">
                  {/* Image container */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/5 bg-soft-black">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-primary font-semibold block mb-1">
                      {selectedCert.issuer}
                    </span>
                    
                    <h3 className="font-display text-xl font-bold text-warm-white mb-2 leading-snug">
                      {selectedCert.title}
                    </h3>
                    
                    <span className="text-xs text-muted-gray block mb-6">
                      {selectedCert.date}
                    </span>

                    {/* How I Earned It Story */}
                    <div className="mb-6 text-left">
                      <span className="text-[9px] uppercase tracking-widest text-primary block mb-2 font-bold">
                        How I Earned It
                      </span>
                      <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                        {selectedCert.earnedStory}
                      </p>
                    </div>

                    {/* What I Learned Story */}
                    <div className="mb-6 text-left">
                      <span className="text-[9px] uppercase tracking-widest text-primary block mb-2 font-bold">
                        What I Learned
                      </span>
                      <p className="text-xs sm:text-sm text-soft-gray leading-relaxed">
                        {selectedCert.learnedStory}
                      </p>
                    </div>

                    {/* Verified Skills */}
                    <div className="mb-6 text-left">
                      <span className="text-[9px] uppercase tracking-widest text-muted-gray block mb-3 font-semibold">
                        Skills Verified
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-full bg-soft-black border border-white/5 text-[9px] uppercase tracking-wider text-muted-gray font-semibold"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Copyable LinkedIn Caption Box */}
                    <div className="p-5 rounded-2xl bg-soft-black border border-white/5 mb-6 text-left">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] uppercase tracking-widest text-primary font-bold flex items-center gap-1.5">
                          <Share2 size={10} />
                          LinkedIn Share Caption
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleCopyText(selectedCert.postCaption, selectedCert.id)}
                          className="px-3 py-1 rounded-full bg-stone-gray/10 hover:bg-stone-gray/25 border border-white/5 hover:border-white/10 text-[9px] font-semibold text-warm-white flex items-center gap-1 cursor-none transition-colors"
                        >
                          {copiedId === selectedCert.id ? (
                            <>
                              <Check size={10} className="text-green-500" />
                              <span className="text-green-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Clipboard size={10} />
                              <span>Copy Caption</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="p-3.5 bg-stone-gray/5 border border-white/5 rounded-xl max-h-36 overflow-y-auto">
                        <p className="text-[11px] text-muted-gray leading-relaxed whitespace-pre-wrap select-all">
                          {selectedCert.postCaption}
                        </p>
                      </div>
                    </div>

                    {/* Verification Action - No Live Demo */}
                    <div className="flex justify-start">
                      <a
                        href={selectedCert.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-primary hover:bg-bronze text-background text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-lg hover:shadow-primary/20 cursor-none"
                      >
                        <span>LinkedIn Verification</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
