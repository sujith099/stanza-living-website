"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LifestyleWay {
  id: string;
  tag: string;
  title: string;
  image: string;
  description: string;
}

export const LIFESTYLE_WAYS: LifestyleWay[] = [
  {
    id: "way-quiet",
    tag: "QUIET",
    title: "Slow mornings.",
    description: "Acoustic insulation, private balconies, and tree-lined streets where sleep is protected.",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "way-connected",
    tag: "CONNECTED",
    title: "Close to work and everything else.",
    description: "Ten-minute walks to tech parks, independent coffee roasters, and rapid transit lines.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "way-social",
    tag: "SOCIAL",
    title: "People around. Space for yourself.",
    description: "Unforced, respectful community with shared rooftops, chef kitchens, and private sanctuaries.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "way-value",
    tag: "VALUE",
    title: "More for your money.",
    description: "All-inclusive rent with zero brokerage, daily housekeeping, fast WiFi, and no surprise bills.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
  }
];

export interface LifestyleWayCardProps {
  item: LifestyleWay;
  className?: string;
  onClick?: () => void;
}

export function LifestyleWayCard({
  item,
  className,
  onClick,
}: LifestyleWayCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative flex flex-col justify-between bg-[#191D1A] border border-white/10 rounded-2xl p-6 sm:p-7 select-none cursor-pointer overflow-hidden transition-all duration-400",
        "hover:-translate-y-1.5 hover:border-roomly-lime/60 hover:shadow-2xl",
        className
      )}
    >
      {/* Top Header: Tag + Arrow */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs uppercase tracking-widest font-bold text-roomly-lime">
          {item.tag}
        </span>
        <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-roomly-cream/70 transition-all duration-300 group-hover:bg-roomly-lime group-hover:text-roomly-dark group-hover:border-roomly-lime">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Subtle architectural image visual */}
      <div className="relative my-6 aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/40 border border-white/5">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191D1A]/80 via-transparent to-transparent" />
      </div>

      {/* Heading & Supporting text */}
      <div className="flex flex-col gap-2 z-10">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-roomly-cream/65 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
