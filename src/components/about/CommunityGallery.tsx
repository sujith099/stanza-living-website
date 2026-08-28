"use client";

import React from "react";
import Image from "next/image";
import { COMMUNITY_MOMENTS } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface CommunityGalleryProps {
  className?: string;
}

export function CommunityGallery({ className }: CommunityGalleryProps) {
  return (
    <section className={cn("flex flex-col gap-10 sm:gap-14 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              EVERYDAY LIVING
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Stanza Living isn&apos;t just about rooms.
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted max-w-md">
            It&apos;s about what happens once you unpack — morning light, quiet focus, and familiar faces.
          </p>
        </div>
      </FadeIn>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMUNITY_MOMENTS.map((moment, idx) => (
          <FadeIn key={moment.moment} delay={idx * 0.08}>
            <div className="group flex flex-col gap-3">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md border border-roomly-border bg-roomly-cream/50">
                <Image
                  src={moment.image}
                  alt={moment.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-roomly-green">
                  {moment.moment}
                </span>
                <p className="text-xs text-roomly-muted leading-snug">
                  &ldquo;{moment.caption}&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
