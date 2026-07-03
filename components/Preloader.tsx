"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment loading counter dynamically
    let start = 0;
    const end = 100;
    const duration = 2000; // 2 seconds loader
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
        }, 300); // short pause at 100%
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.1,
              ease: [0.76, 0, 0.24, 1], // Locomotive cubic ease
            },
          }}
          className="fixed inset-0 w-full h-full z-9999 bg-soft-black flex flex-col items-center justify-between p-12 select-none overflow-hidden"
        >
          {/* Subtle noise layer inside loader */}
          <div className="grain-overlay" />

          {/* Top Label */}
          <div className="w-full flex justify-between items-center text-[10px] tracking-widest uppercase text-muted-gray">
            <span>Divyanshu Kushwaha</span>
            <span>Est. 2026</span>
          </div>

          {/* Center Animated Logo Icon */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6"
            >
              {/* Custom Drawing Logo SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-16 h-16 stroke-accent-terracotta fill-none stroke-2 stroke-dashoffset-100"
                style={{
                  stroke: "#D4A373",
                  strokeWidth: 2.5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                  d="M10,20 L30,20 L30,80 L10,80 Z M50,20 L70,20 L70,80 L50,80 Z M90,30 L90,70 L70,50 Z"
                />
              </svg>
            </motion.div>
            
            {/* Morphing load status details */}
            <span className="text-[9px] uppercase tracking-[0.25em] text-muted-gray">
              Initialising Core Canvas
            </span>
          </div>

          {/* Bottom Counter block */}
          <div className="w-full flex justify-between items-end">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-muted-gray block mb-1">
                Engineering Portfolios
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-warm-white">
                Creative Architecture
              </span>
            </div>
            
            {/* Count percentage */}
            <div className="overflow-hidden h-24 sm:h-32 flex items-baseline">
              <span
                className="font-display text-7xl sm:text-9xl font-bold tracking-tighter text-warm-white leading-none selection:bg-transparent"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {count}
              </span>
              <span className="font-display text-2xl sm:text-4xl font-semibold text-primary ml-1">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
