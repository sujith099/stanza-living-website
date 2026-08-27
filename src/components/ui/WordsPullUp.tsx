"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROOMLY_EASE } from "@/lib/animations";

export interface WordsPullUpProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function WordsPullUp({
  text,
  className,
  as: Component = "h1",
  delay = 0.05,
  stagger = 0.035,
}: WordsPullUpProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: "110%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: ROOMLY_EASE,
      },
    },
  };

  return (
    <Component className={cn("overflow-hidden leading-tight", className)}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span variants={item} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
