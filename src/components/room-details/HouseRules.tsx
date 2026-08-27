"use client";

import React, { useState } from "react";
import { ShieldAlert, ArrowRight, X } from "lucide-react";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export interface HouseRulesProps {
  property: Property;
  className?: string;
}

export function HouseRules({ property, className }: HouseRulesProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col gap-5",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h3 className="font-display font-bold text-lg text-roomly-dark">
              Before you move in
            </h3>
            <span className="text-xs text-roomly-muted">
              House guidelines designed for communal peace & privacy
            </span>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-roomly-green hover:text-roomly-dark flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View all rules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {property.houseRules.map((rule) => (
            <div
              key={rule.rule}
              className="p-3.5 rounded-xl bg-roomly-bg border border-roomly-border flex flex-col gap-1"
            >
              <span className="text-xs font-bold text-roomly-dark">
                {rule.rule}
              </span>
              <span className="text-xs text-roomly-muted leading-relaxed">
                {rule.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* House Rules Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none">
          <div className="bg-[#FDFCF8] border border-roomly-border rounded-3xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-roomly-border">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-roomly-green" />
                <h3 className="font-display font-bold text-lg text-roomly-dark">
                  Complete House Agreement
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-roomly-bg flex items-center justify-center text-roomly-dark hover:bg-roomly-border transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs text-roomly-dark max-h-[60vh] overflow-y-auto pr-2">
              <div className="flex flex-col gap-1">
                <span className="font-bold">1. Guest & Visitor Access</span>
                <p className="text-roomly-muted leading-relaxed">
                  Guests are welcome between 8:00 AM and 10:00 PM. Overnight stays are allowed with 24-hour advance registration on the resident app (up to 4 nights per month).
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold">2. Smoking & Substance Policy</span>
                <p className="text-roomly-muted leading-relaxed">
                  Smoking is prohibited indoors to maintain clean indoor air standards. Designated open-air rooftop terraces are equipped for smoking.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold">3. Quiet Hours</span>
                <p className="text-roomly-muted leading-relaxed">
                  Quiet hours are observed between 11:00 PM and 7:00 AM in all corridors and common spaces. Headphones are encouraged for nighttime media in shared areas.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold">4. Kitchen & Cooking Etiquette</span>
                <p className="text-roomly-muted leading-relaxed">
                  Residents have 24/7 access to refrigerators, induction cooktops, and microwaves. All utensils must be washed or placed in the dishwasher immediately after use.
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold">5. Move-Out & Notice Period</span>
                <p className="text-roomly-muted leading-relaxed">
                  A standard 30-day notice is required for move-out. Deposits are refunded via bank transfer within 48 hours of key handover.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 rounded-full bg-roomly-dark text-roomly-cream text-xs font-semibold hover:bg-roomly-green transition-colors cursor-pointer"
            >
              I understand
            </button>
          </div>
        </div>
      )}
    </>
  );
}
