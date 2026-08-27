"use client";

import React from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResidentInsightProps {
  cityName: string;
  className?: string;
}

export function ResidentInsight({ cityName, className }: ResidentInsightProps) {
  return (
    <div
      className={cn(
        "p-8 sm:p-12 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8",
        className
      )}
    >
      <div className="flex flex-col gap-3 max-w-2xl">
        <div className="flex items-center gap-2">
          <Quote className="w-5 h-5 text-roomly-green" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-muted">
            Resident Reflection · {cityName}
          </span>
        </div>

        <h4 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark leading-snug">
          &ldquo;Where you live changes your routine more than you think.&rdquo;
        </h4>

        <p className="text-xs sm:text-sm text-roomly-muted leading-relaxed">
          &ldquo;I chose Indiranagar because I wanted to walk to coffee roasters and meet friends after work instead of spending two hours in Outer Ring Road traffic every evening. It transformed how my week feels.&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-roomly-border">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="Pooja K. resident portrait"
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-xs sm:text-sm text-roomly-dark">
            Pooja K.
          </span>
          <span className="text-[11px] text-roomly-muted">
            Product Designer at Swiggy
          </span>
          <span className="text-[10px] text-roomly-green font-medium">
            18 months in Indiranagar
          </span>
        </div>
      </div>
    </div>
  );
}
