"use client";

import React from "react";
import Image from "next/image";
import { LifestylePillar } from "@/data/lifestyles";
import { cn } from "@/lib/utils";

export interface LifestyleCardProps {
  pillar: LifestylePillar;
  className?: string;
}

export function LifestyleCard({ pillar, className }: LifestyleCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between bg-[#FDFCF9] border border-roomly-border rounded-2xl overflow-hidden p-6 sm:p-7 transition-all duration-400 hover:shadow-lg hover:border-roomly-dark/40",
        className
      )}
    >
      <div className="flex flex-col gap-5">
        {/* Top Header: Number and Tag */}
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-sm tracking-wider text-roomly-muted">
            {pillar.number}
          </span>
          <span className="text-[11px] font-medium tracking-tight px-2.5 py-0.5 rounded-full bg-roomly-bg border border-roomly-border text-roomly-dark">
            {pillar.tag}
          </span>
        </div>

        {/* Photography */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-roomly-cream/40">
          <Image
            src={pillar.image}
            alt={pillar.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-roomly-green">
            {pillar.subtitle}
          </span>
          <h3 className="font-display text-xl font-bold text-roomly-dark tracking-tight">
            {pillar.title}
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted leading-relaxed">
            {pillar.description}
          </p>
        </div>
      </div>
    </div>
  );
}
