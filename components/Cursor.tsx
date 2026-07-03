"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [cursorMode, setCursorMode] = useState<"normal" | "hover" | "view" | "drag">("normal");
  const [magneticElement, setMagneticElement] = useState<HTMLElement | null>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = !window.matchMedia("(pointer: fine)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Update spot lights inside globals.css variables
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine interactive nodes
      const interactiveEl = target.closest("a, button, input, textarea, select, [role='button'], .hover-target") as HTMLElement | null;
      const cursorTextEl = target.closest("[data-cursor]") as HTMLElement;

      if (cursorTextEl) {
        const text = cursorTextEl.getAttribute("data-cursor") || "";
        setHoverText(text.toUpperCase());
        setCursorMode(text.toLowerCase() === "drag" ? "drag" : "view");
      } else if (interactiveEl) {
        setCursorMode("hover");
      }

      if (interactiveEl && interactiveEl.classList.contains("magnetic")) {
        setMagneticElement(interactiveEl as HTMLElement);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, input, textarea, select, [role='button'], .hover-target") as HTMLElement | null;
      const cursorTextEl = target.closest("[data-cursor]") as HTMLElement;

      if (cursorTextEl) {
        setHoverText("");
        setCursorMode("normal");
      } else if (interactiveEl) {
        setCursorMode("normal");
      }

      if (interactiveEl) {
        setMagneticElement(null);
        interactiveEl.style.transform = "";
      }
    };


    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Lerp Loop for smooth inertia interpolation
    let animationFrameId: number;

    const tick = () => {
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        targetX = centerX + (mousePos.current.x - centerX) * 0.4;
        targetY = centerY + (mousePos.current.y - centerY) * 0.4;

        const pullX = (mousePos.current.x - centerX) * 0.25;
        const pullY = (mousePos.current.y - centerY) * 0.25;
        magneticElement.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      }

      dotPos.current.x += (targetX - dotPos.current.x) * 0.35;
      dotPos.current.y += (targetY - dotPos.current.y) * 0.35;

      followerPos.current.x += (targetX - followerPos.current.x) * 0.16;
      followerPos.current.y += (targetY - followerPos.current.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px, 0)`;
      }
      
      if (followerRef.current) {
        // Adjust translation offsets based on shape sizing (e.g. view mode is wider)
        const offsetWidth = cursorMode === "view" || cursorMode === "drag" ? 36 : 16;
        const offsetHeight = 16;
        followerRef.current.style.transform = `translate3d(${followerPos.current.x - offsetWidth}px, ${followerPos.current.y - offsetHeight}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animationFrameId);
      if (magneticElement) {
        magneticElement.style.transform = "";
      }
    };
  }, [magneticElement, cursorMode]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-9999 mix-blend-difference"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
      
      {/* Elastic Follower Ring with Morphing states */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-9999 flex items-center justify-center transition-all duration-300 ease-out border ${
          cursorMode === "normal"
            ? "w-8 h-8 border-primary/40 bg-transparent scale-100"
            : cursorMode === "hover"
            ? "w-10 h-10 border-primary bg-primary/10 scale-120"
            : "w-18 h-8 rounded-full border-primary bg-primary text-background scale-100"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      >
        {/* Render indicator text inside the morph capsule */}
        {(cursorMode === "view" || cursorMode === "drag") && (
          <span className="text-[9px] uppercase tracking-wider font-display font-bold select-none text-black animate-fade-in">
            {hoverText}
          </span>
        )}
      </div>
    </>
  );
}
