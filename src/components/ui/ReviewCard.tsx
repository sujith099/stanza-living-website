"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle } from "lucide-react";
import { Review } from "@/data/reviews";
import { cn } from "@/lib/utils";

export interface ReviewCardProps {
  review: Review;
  variant?: "light" | "dark";
  className?: string;
}

export function ReviewCard({
  review,
  variant = "light",
  className,
}: ReviewCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex flex-col justify-between p-7 sm:p-8 rounded-2xl border transition-all duration-400",
        isDark
          ? "bg-roomly-dark text-roomly-cream border-white/10 shadow-xl"
          : "bg-[#FDFCF8] text-roomly-dark border-roomly-border shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col gap-5">
        {/* Rating Stars & Residence info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  isDark
                    ? "fill-roomly-lime text-roomly-lime"
                    : "fill-roomly-dark text-roomly-dark"
                )}
              />
            ))}
          </div>
          <span
            className={cn(
              "text-[11px] font-medium tracking-tight px-2 py-0.5 rounded-full border",
              isDark
                ? "border-white/10 text-roomly-cream/60"
                : "border-roomly-border text-roomly-muted"
            )}
          >
            {review.stayDuration}
          </span>
        </div>

        {/* Editorial Quote */}
        <div className="relative">
          <Quote
            className={cn(
              "w-8 h-8 -top-3 -left-2 absolute opacity-10 pointer-events-none",
              isDark ? "text-white" : "text-roomly-dark"
            )}
          />
          <blockquote
            className={cn(
              "text-base sm:text-lg leading-relaxed font-normal tracking-tight pt-2",
              isDark ? "text-roomly-cream" : "text-roomly-dark"
            )}
          >
            &ldquo;{review.quote}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Resident Footer */}
      <div className="pt-6 mt-6 border-t border-inherit flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-inherit">
            <Image
              src={review.avatar}
              alt={review.author}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "text-sm font-semibold tracking-tight",
                  isDark ? "text-white" : "text-roomly-dark"
                )}
              >
                {review.author}
              </span>
              <CheckCircle
                className={cn(
                  "w-3.5 h-3.5",
                  isDark ? "text-roomly-lime" : "text-roomly-green"
                )}
              />
            </div>
            <span
              className={cn(
                "text-xs",
                isDark ? "text-roomly-cream/60" : "text-roomly-muted"
              )}
            >
              {review.role} • {review.company}
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:flex flex-col">
          <span
            className={cn(
              "text-xs font-medium",
              isDark ? "text-roomly-cream/90" : "text-roomly-dark"
            )}
          >
            {review.residence}
          </span>
          <span
            className={cn(
              "text-[11px]",
              isDark ? "text-roomly-cream/50" : "text-roomly-muted"
            )}
          >
            {review.location}
          </span>
        </div>
      </div>
    </div>
  );
}
