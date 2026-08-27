"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  theme = "light",
  className,
  action,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-10 sm:mb-14",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        action && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <FadeIn className="flex flex-col gap-3 max-w-3xl">
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                isDark ? "bg-roomly-lime" : "bg-roomly-green"
              )}
            />
            <span
              className={cn(
                "text-xs uppercase tracking-widest font-semibold",
                isDark ? "text-roomly-cream/60" : "text-roomly-muted"
              )}
            >
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          className={cn(
            "font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]",
            isDark ? "text-white" : "text-roomly-dark"
          )}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={cn(
              "text-sm sm:text-base leading-relaxed pt-1",
              isDark ? "text-roomly-cream/70" : "text-roomly-muted"
            )}
          >
            {subtitle}
          </p>
        )}
      </FadeIn>

      {action && (
        <FadeIn delay={0.1} className="pt-2 md:pt-0 flex-shrink-0">
          {action}
        </FadeIn>
      )}
    </div>
  );
}
