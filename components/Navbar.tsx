"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = NAV_ITEMS.map(item => document.getElementById(item.href.replace("#", "")));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].href.replace("#", ""));
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 ${
        isScrolled ? "bg-soft-black/40 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Editorial Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-lg font-display font-semibold uppercase tracking-widest text-warm-white hover-target select-none"
        >
          Divyanshu<span className="text-accent-terracotta">.</span>
        </a>

        {/* Minimal Link Bar */}
        <nav className="hidden md:flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-stone-gray/10 border border-white/5 backdrop-blur-xl">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-warm-white bg-white/5"
                    : "text-muted-gray hover:text-warm-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Magnetic CTA button */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="magnetic px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent-terracotta hover:bg-accent-terracotta-dark text-warm-white flex items-center gap-2 border border-white/10 transition-all shadow-lg hover:shadow-accent-terracotta/20"
        >
          <Mail size={13} />
          <span>Connect</span>
        </a>
      </div>
    </header>
  );
}
