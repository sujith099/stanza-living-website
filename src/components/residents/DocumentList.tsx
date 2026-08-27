"use client";

import React from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import { RESIDENT_DOCUMENTS } from "@/data/residents";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface DocumentListProps {
  className?: string;
}

export function DocumentList({ className }: DocumentListProps) {
  return (
    <section className={cn("flex flex-col gap-8 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              DIGITAL VAULT
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark tracking-tight leading-tight">
            Your important details, organised.
          </h3>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Instant digital access to signed agreements, KYC clearances, and property handbooks
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col rounded-2xl border border-roomly-border bg-[#FDFCF8] divide-y divide-roomly-border/70 shadow-sm overflow-hidden select-none">
        {RESIDENT_DOCUMENTS.map((doc, idx) => (
          <FadeIn key={doc.id} delay={idx * 0.06}>
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-roomly-cream/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-roomly-bg border border-roomly-border flex items-center justify-center text-roomly-dark flex-shrink-0">
                  <FileText className="w-4 h-4 text-roomly-green" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-roomly-dark">
                    {doc.name}
                  </h4>
                  <span className="text-xs text-roomly-muted">
                    {doc.date} · {doc.type} · {doc.size}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Opening preview for ${doc.name}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-roomly-border text-roomly-dark hover:bg-roomly-dark hover:text-white transition-colors cursor-pointer text-xs font-semibold flex-shrink-0"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
