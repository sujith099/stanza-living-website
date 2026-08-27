"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "w-full h-full min-h-[160px] bg-[#E5E1CF] text-roomly-dark flex flex-col items-center justify-center p-6 text-center select-none",
          className
        )}
      >
        <div className="w-10 h-10 rounded-2xl bg-white/60 border border-roomly-border flex items-center justify-center mb-2 shadow-xs">
          <Home className="w-5 h-5 text-roomly-green" />
        </div>
        <span className="font-display font-bold text-xs text-roomly-dark tracking-wide">
          {fallbackTitle || "Roomly Living"}
        </span>
        {fallbackSubtitle && (
          <span className="text-[10px] text-roomly-muted mt-0.5">
            {fallbackSubtitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
