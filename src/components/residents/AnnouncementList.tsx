"use client";

import React, { useState } from "react";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { ANNOUNCEMENTS } from "@/data/residents";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface AnnouncementListProps {
  className?: string;
}

export function AnnouncementList({ className }: AnnouncementListProps) {
  const [expandedId, setExpandedId] = useState<string | null>("ann-1");

  return (
    <section className={cn("flex flex-col gap-8 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              NOTICES & UPDATES
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark tracking-tight leading-tight">
            What&apos;s happening at home.
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Building notices, preventative maintenance schedules, and housekeeping alerts
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-3 select-none">
        {ANNOUNCEMENTS.map((item, idx) => {
          const isExpanded = expandedId === item.id;

          return (
            <FadeIn key={item.id} delay={idx * 0.08}>
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={cn(
                  "p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer",
                  isExpanded
                    ? "bg-[#FDFCF8] border-roomly-dark shadow-md"
                    : "bg-[#FDFCF8] border-roomly-border hover:border-roomly-dark/40"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-roomly-green/10 flex items-center justify-center text-roomly-green flex-shrink-0">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base text-roomly-dark">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-roomly-bg border border-roomly-border font-semibold text-roomly-muted hidden sm:inline">
                          {item.tag}
                        </span>
                      </div>
                      <span className="text-xs text-roomly-muted">
                        {item.date} · {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full border border-roomly-border flex items-center justify-center text-roomly-dark flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-roomly-border/60 text-xs text-roomly-muted leading-relaxed pl-11">
                    {item.description}
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
