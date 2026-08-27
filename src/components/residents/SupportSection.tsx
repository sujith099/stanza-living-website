"use client";

import React, { useState } from "react";
import { MessageSquare, PhoneCall, HelpCircle, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/lib/utils";

export interface SupportSectionProps {
  className?: string;
}

export function SupportSection({ className }: SupportSectionProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAction = (type: string) => {
    setToastMsg(type);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const CHANNELS = [
    {
      icon: MessageSquare,
      title: "Message Stanza Living",
      desc: "Chat directly with your building support desk for quick questions and deliveries.",
      btnText: "Message support →",
      feedback: "Opening in-app resident chat...",
    },
    {
      icon: PhoneCall,
      title: "Call property team",
      desc: "For urgent utility leaks, power trip emergencies, or key lockouts 24/7.",
      btnText: "Contact desk →",
      feedback: "Connecting to Oak House building manager...",
    },
    {
      icon: HelpCircle,
      title: "Help centre",
      desc: "Find quick answers about guest policies, parking bays, Wi-Fi passwords, and trash disposal.",
      btnText: "Visit help centre →",
      feedback: "Opening Oak House Resident Handbook...",
    },
  ];

  return (
    <section
      className={cn(
        "p-8 sm:p-14 lg:p-20 rounded-3xl bg-roomly-dark text-roomly-cream relative overflow-hidden shadow-2xl border border-white/10 flex flex-col gap-12 sm:gap-14",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-roomly-green/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-3 max-w-xl">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-roomly-lime">
          24/7 Assistance
        </span>

        <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          Need help?
        </h3>

        <p className="text-xs sm:text-sm text-roomly-cream/70 leading-relaxed pt-1">
          Whether you have a midnight plumbing leak or want to know the terrace timing, our on-site property team is always within reach.
        </p>
      </div>

      {/* Support Options Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {CHANNELS.map((ch, idx) => {
          const Icon = ch.icon;

          return (
            <FadeIn key={ch.title} delay={idx * 0.1}>
              <div className="p-7 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between gap-6 h-full select-none">
                <div className="flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-roomly-lime">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-xl text-white">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-roomly-cream/60 leading-relaxed pt-1.5">
                      {ch.desc}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction(ch.feedback)}
                  className="w-full py-2.5 rounded-full border border-white/20 text-xs font-semibold text-white hover:bg-roomly-lime hover:text-roomly-dark hover:border-roomly-lime transition-all cursor-pointer text-center"
                >
                  {ch.btnText}
                </button>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 px-5 py-3 rounded-full bg-roomly-lime text-roomly-dark text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
}
