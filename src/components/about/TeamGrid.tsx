"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/about";
import { FadeIn } from "@/components/ui/FadeIn";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface TeamGridProps {
  className?: string;
}

export function TeamGrid({ className }: TeamGridProps) {
  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              THE TEAM
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Concept & product team.
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted max-w-md">
            Product thinkers, designers, and community curators dedicated to making urban moving feel human.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {TEAM_MEMBERS.map((member, idx) => (
          <FadeIn key={member.name} delay={idx * 0.08}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: ROOMLY_EASE }}
              className="group flex flex-col p-5 rounded-3xl bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/40 shadow-sm transition-all duration-300 select-none h-full"
            >
              {/* Natural Portrait */}
              <div className="relative aspect-[4/4] w-full rounded-2xl overflow-hidden bg-roomly-cream/50 mb-4">
                <Image
                  src={member.image}
                  alt={`${member.name} portrait`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-grow justify-between gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg text-roomly-dark">
                      {member.name}
                    </h4>
                    <span className="text-xs font-semibold text-roomly-green group-hover:text-roomly-dark transition-colors">
                      {member.role}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-roomly-border flex items-center justify-center text-roomly-muted group-hover:text-roomly-dark group-hover:border-roomly-dark opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs text-roomly-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
