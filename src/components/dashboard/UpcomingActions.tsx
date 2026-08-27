"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, UserCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export function UpcomingActions({ className }: { className?: string }) {
  const ACTIONS = [
    {
      id: "action-rent",
      title: "September rent due Sep 5",
      description: "Pay before the 5th to keep your automated utility pass active.",
      actionLabel: "Pay rent",
      href: "/dashboard/payments",
      icon: CreditCard,
      badge: "₹18,500",
      urgency: "medium",
    },
    {
      id: "action-doc",
      title: "Residential lease agreement pending signature",
      description: "Digital counter-signature required before lock PIN release.",
      actionLabel: "Review & sign",
      href: "/dashboard/booking",
      icon: FileText,
      badge: "Required",
      urgency: "high",
    },
    {
      id: "action-kyc",
      title: "Profile completeness (85%)",
      description: "Add emergency contact to complete your building directory pass.",
      actionLabel: "Complete profile",
      href: "/dashboard/profile",
      icon: UserCheck,
      badge: "2 min",
      urgency: "low",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-3.5 w-full select-none", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-roomly-dark">
          Things that need your attention
        </h3>
        <span className="text-xs text-roomly-muted">
          3 active tasks
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {ACTIONS.map((a) => {
          const Icon = a.icon;

          return (
            <div
              key={a.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#FDFCF8] border border-roomly-border hover:border-roomly-dark/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-roomly-bg border border-roomly-border flex items-center justify-center text-roomly-dark flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-roomly-green" />
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-roomly-dark">
                      {a.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-roomly-bg border border-roomly-border text-roomly-muted">
                      {a.badge}
                    </span>
                  </div>
                  <p className="text-xs text-roomly-muted leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </div>

              <Link
                href={a.href}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-roomly-dark text-roomly-cream hover:bg-black text-xs font-semibold self-start sm:self-center transition-colors flex-shrink-0 shadow-xs"
              >
                <span>{a.actionLabel}</span>
                <ArrowRight className="w-3 h-3 text-roomly-lime" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
