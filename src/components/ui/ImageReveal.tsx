"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROOMLY_EASE } from "@/lib/animations";

export interface ImageRevealProps {
  src: string;
  alt: string;
  aspectRatio?: "portrait" | "landscape" | "square" | "cinematic" | "wide";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  withHoverZoom?: boolean;
  overlay?: boolean;
  children?: React.ReactNode;
}

export function ImageReveal({
  src,
  alt,
  aspectRatio = "landscape",
  className,
  imageClassName,
  priority = false,
  withHoverZoom = true,
  overlay = false,
  children,
}: ImageRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectStyles = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
    cinematic: "aspect-[16/10]",
    wide: "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden bg-roomly-cream/50 rounded-xl",
        aspectStyles[aspectRatio],
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: isLoaded ? 1 : 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ROOMLY_EASE }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            withHoverZoom && "group-hover:scale-[1.04]",
            imageClassName
          )}
        />
      </motion.div>

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-roomly-dark/80 via-roomly-dark/20 to-transparent pointer-events-none" />
      )}

      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  );
}
