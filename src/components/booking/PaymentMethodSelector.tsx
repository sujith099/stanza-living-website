"use client";

import React from "react";
import { Smartphone, CreditCard, Landmark, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaymentMethodSelectorProps {
  selectedMethod: "UPI" | "Card" | "Net banking";
  onSelectMethod: (method: "UPI" | "Card" | "Net banking") => void;
  className?: string;
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
  className,
}: PaymentMethodSelectorProps) {
  const METHODS = [
    { id: "UPI" as const, label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: Smartphone },
    { id: "Card" as const, label: "Debit / Credit Card", desc: "Visa, Mastercard, RuPay", icon: CreditCard },
    { id: "Net banking" as const, label: "Net Banking", desc: "All major banks", icon: Landmark },
  ];

  return (
    <div className={cn("flex flex-col gap-4 w-full select-none", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-roomly-dark">
          Choose Payment Method
        </label>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-roomly-lime/30 text-roomly-dark font-bold">
          DEMO GATEWAY
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {METHODS.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedMethod === m.id;

          return (
            <div
              key={m.id}
              onClick={() => onSelectMethod(m.id)}
              className={cn(
                "p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3",
                isSelected
                  ? "bg-roomly-dark text-roomly-lime border-roomly-dark shadow"
                  : "bg-white text-roomly-dark border-roomly-border hover:border-roomly-dark/40"
              )}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4" />
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </div>

              <div>
                <div className="font-display font-bold text-sm">
                  {m.label}
                </div>
                <span
                  className={cn(
                    "text-[11px]",
                    isSelected ? "text-roomly-cream/70" : "text-roomly-muted"
                  )}
                >
                  {m.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-roomly-muted/80 pt-1 leading-relaxed">
        Payment gateway will be connected in production. No real financial credentials or tokens will be charged in this prototype.
      </p>
    </div>
  );
}
