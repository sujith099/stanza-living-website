"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface PageTransitionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className,
  ...props
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.5,
        ease: ROOMLY_EASE,
      }}
      className={cn("w-full flex-grow flex flex-col", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
