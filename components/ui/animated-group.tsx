"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: any;
    item?: any;
  };
}

export function AnimatedGroup({ children, className, variants }: AnimatedGroupProps) {
  // Default container variants for stagger
  const containerVariants = variants?.container || {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Default item variants for springs
  const itemVariants = variants?.item || {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.0,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={itemVariants} className="w-full flex justify-center">
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}
