"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, GraduationCap, VolumeX, Users2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LifestyleDiscoveryProps {
  cityName: string;
  className?: string;
}

export function LifestyleDiscovery({
  cityName,
  className,
}: LifestyleDiscoveryProps) {
  const LIFESTYLES = [
    {
      title: "NEAR WORK",
      subtitle: "Short commute.",
      desc: "Stay minutes away from business corridors and tech parks. Reclaim 2 hours every day.",
      href: `/rooms?city=${encodeURIComponent(cityName)}&lifestyle=Work-friendly`,
      icon: <Briefcase className="w-4 h-4 text-roomly-lime" />,
    },
    {
      title: "NEAR CAMPUS",
      subtitle: "Easy mornings.",
      desc: "Fast walk or metro hop to top engineering and management universities.",
      href: `/rooms?city=${encodeURIComponent(cityName)}&lifestyle=Student`,
      icon: <GraduationCap className="w-4 h-4 text-roomly-lime" />,
    },
    {
      title: "QUIET",
      subtitle: "More calm.",
      desc: "Residential pocket avenues with old rain trees, low traffic, and double-glazed quiet.",
      href: `/rooms?city=${encodeURIComponent(cityName)}&lifestyle=Quiet`,
      icon: <VolumeX className="w-4 h-4 text-roomly-lime" />,
    },
    {
      title: "SOCIAL",
      subtitle: "More around you.",
      desc: "Specialty roasters, artisan bakeries, design pop-ups, and weekend community culture.",
      href: `/rooms?city=${encodeURIComponent(cityName)}&lifestyle=Social`,
      icon: <Users2 className="w-4 h-4 text-roomly-lime" />,
    },
    {
      title: "VALUE",
      subtitle: "More for your budget.",
      desc: "Smart co-living spaces with all utilities, Wi-Fi, and housekeeping included under ₹15k.",
      href: `/rooms?city=${encodeURIComponent(cityName)}&budget=under-15k`,
      icon: <Sparkles className="w-4 h-4 text-roomly-lime" />,
    },
  ];

  return (
    <section
      className={cn(
        "p-8 sm:p-12 lg:p-16 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col gap-10",
        className
      )}
    >
      <div className="flex flex-col gap-2 max-w-xl">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
          Living Rhythm
        </span>
        <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
          Choose your kind of everyday.
        </h3>
        <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed pt-1">
          Pick your lifestyle priority in {cityName} and find rooms matching your routine.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LIFESTYLES.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-roomly-lime/60 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between gap-6"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-roomly-lime group-hover:text-roomly-dark group-hover:border-roomly-lime transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-sm tracking-wider text-white">
                  {item.title}
                </span>
                <span className="text-xs text-roomly-lime font-semibold">
                  · {item.subtitle}
                </span>
              </div>
              <p className="text-xs text-roomly-cream/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
