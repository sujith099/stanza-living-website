"use client";

import React from "react";
import Image from "next/image";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface StoryHeroProps {
  onDiscoverClick: () => void;
  className?: string;
}

export function StoryHero({ onDiscoverClick, className }: StoryHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[85vh] sm:min-h-[90vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-end p-6 sm:p-12 lg:p-18 text-white select-none",
        className
      )}
    >
      {/* Cinematic Background Photograph */}
      <Image
        src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000&auto=format&fit=crop"
        alt="Lived-in urban apartment bathed in morning sunlight"
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.65] contrast-[1.08]"
      />

      {/* Dark Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl flex flex-col gap-5">
        <FadeIn delay={0.05}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-lime" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-lime">
              OUR STORY / 05
            </span>
          </div>
        </FadeIn>

        <WordsPullUp
          text="We believe finding a room should feel human."
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
        />

        <FadeIn delay={0.25}>
          <p className="text-sm sm:text-base lg:text-lg text-roomly-cream/80 max-w-2xl leading-relaxed pt-1">
            Stanza Living started with a simple observation: finding a place to live had become harder than it needed to be.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <div className="pt-3">
            <RoomlyButton
              variant="lime"
              size="lg"
              shape="pill"
              withArrow
              arrowStyle="circle"
              onClick={onDiscoverClick}
              className="text-xs sm:text-sm font-semibold shadow-2xl px-8 py-3.5"
            >
              Discover Stanza Living
            </RoomlyButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
