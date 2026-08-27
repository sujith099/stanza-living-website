"use client";

import React from "react";
import Image from "next/image";
import { ROOMLY_PRINCIPLES } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface RoomlyResponseProps {
  className?: string;
}

export function RoomlyResponse({ className }: RoomlyResponseProps) {
  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              OUR RESPONSE
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            So we built
            <br />
            something better.
          </h3>
        </div>
      </FadeIn>

      {/* Large Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Large Roomly Photography */}
        <FadeIn delay={0.1} className="lg:col-span-6 w-full">
          <div className="relative aspect-[4/3] sm:aspect-[16/12] w-full rounded-3xl overflow-hidden shadow-2xl border border-roomly-border bg-roomly-cream/50">
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
              alt="Bright, tranquil shared living space with authentic teak furnishings"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </FadeIn>

        {/* Right: Explanation & 3 Pillars */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <FadeIn delay={0.15}>
            <p className="text-base sm:text-lg text-roomly-dark font-medium leading-relaxed">
              Stanza Living brings discovery, comparison and booking together so people can make a confident decision before they move.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-6 pt-2 border-t border-roomly-border">
            {ROOMLY_PRINCIPLES.map((principle, idx) => (
              <FadeIn key={principle.number} delay={0.2 + idx * 0.1}>
                <div className="flex items-start gap-4">
                  <span className="font-display font-black text-lg text-roomly-green mt-0.5">
                    {principle.number}
                  </span>

                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-display font-bold text-lg text-roomly-dark">
                      {principle.title}
                    </h4>
                    <span className="text-xs font-semibold text-roomly-green">
                      {principle.summary}
                    </span>
                    <p className="text-xs text-roomly-muted leading-relaxed pt-1">
                      {principle.detail}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
