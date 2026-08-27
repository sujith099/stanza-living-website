"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface ResidentQuoteProps {
  className?: string;
}

export function ResidentQuote({ className }: ResidentQuoteProps) {
  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-18 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col items-center text-center gap-6 max-w-4xl mx-auto w-full",
        className
      )}
    >
      <FadeIn>
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <blockquote className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-roomly-dark leading-snug max-w-2xl">
          &ldquo;The best part wasn&apos;t just finding the room. It was knowing exactly who to contact when something needed fixing.&rdquo;
        </blockquote>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex items-center gap-3 pt-2">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-roomly-border">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
              alt="Meera Sharma portrait"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-sm text-roomly-dark">
              Meera Sharma
            </span>
            <span className="text-xs text-roomly-muted">
              Software Engineer · Oak House resident, Bengaluru · Sample resident perspective
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
