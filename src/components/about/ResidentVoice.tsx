"use client";

import React from "react";
import { Quote } from "lucide-react";
import { RESIDENT_VOICE_QUOTE } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface ResidentVoiceProps {
  className?: string;
}

export function ResidentVoice({ className }: ResidentVoiceProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-18 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full",
        className
      )}
    >
      <FadeIn>
        <div className="w-12 h-12 rounded-full bg-roomly-cream/70 flex items-center justify-center text-roomly-green mb-1">
          <Quote className="w-5 h-5" />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <blockquote className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-roomly-dark leading-snug max-w-2xl">
          &ldquo;{RESIDENT_VOICE_QUOTE.quote}&rdquo;
        </blockquote>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-display font-bold text-sm text-roomly-dark">
            {RESIDENT_VOICE_QUOTE.author}
          </span>
          <span className="text-xs text-roomly-muted">
            {RESIDENT_VOICE_QUOTE.role} · {RESIDENT_VOICE_QUOTE.city}
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
