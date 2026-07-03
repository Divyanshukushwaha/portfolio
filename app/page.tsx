"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import ScrollProvider from "@/components/ScrollProvider";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <ScrollProvider>
          {/* Aligned Awwwards sections in HTML hierarchy order */}
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Certificates />
          <Education />
          <Contact />
          <Footer />
        </ScrollProvider>
      )}
    </>
  );
}
