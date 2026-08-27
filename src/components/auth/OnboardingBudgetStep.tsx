"use client";

import React from "react";
import { IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OnboardingBudgetStepProps {
  budgetMin: number;
  budgetMax: number;
  onBudgetChange: (min: number, max: number) => void;
  className?: string;
}

const BUDGET_TIERS = [
  { min: 8000, max: 12000, label: "₹8k – ₹12k", desc: "Shared / Budget co-living" },
  { min: 12000, max: 18000, label: "₹12k – ₹18k", desc: "Comfort twin or compact private" },
  { min: 18000, max: 25000, label: "₹18k – ₹25k", desc: "Premium private room with ensuite" },
  { min: 25000, max: 35000, label: "₹25k+", desc: "Flagship studio / balcony suites" },
];

export function OnboardingBudgetStep({
  budgetMin,
  budgetMax,
  onBudgetChange,
  className,
}: OnboardingBudgetStepProps) {
  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          What feels comfortable?
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          All Roomly rates include high-speed Wi-Fi, electricity, and weekly housekeeping.
        </p>
      </div>

      {/* Selected Budget Callout */}
      <div className="p-5 rounded-2xl bg-[#FDFCF8] border-2 border-roomly-dark shadow-sm flex flex-col gap-1">
        <span className="text-[10px] uppercase font-bold text-roomly-muted tracking-wider flex items-center gap-1">
          <IndianRupee className="w-3 h-3 text-roomly-green" />
          <span>Your target monthly rent bracket</span>
        </span>
        <div className="font-display font-black text-2xl sm:text-3xl text-roomly-dark">
          ₹{budgetMin.toLocaleString("en-IN")} — ₹{budgetMax.toLocaleString("en-IN")}{" "}
          <span className="text-xs text-roomly-muted font-normal">/ month</span>
        </div>
      </div>

      {/* Preset Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {BUDGET_TIERS.map((tier) => {
          const isSelected = budgetMin === tier.min && budgetMax === tier.max;

          return (
            <button
              key={tier.label}
              type="button"
              onClick={() => onBudgetChange(tier.min, tier.max)}
              className={cn(
                "p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1",
                isSelected
                  ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow scale-[1.01]"
                  : "bg-[#FDFCF8] text-roomly-dark border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-lg">
                  {tier.label}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-roomly-lime" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs",
                  isSelected ? "text-roomly-cream/70" : "text-roomly-muted"
                )}
              >
                {tier.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
