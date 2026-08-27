"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PriceBreakdownAccordionProps {
  monthlyRent: number;
  deposit: number;
  bookingFee: number;
  className?: string;
}

export function PriceBreakdownAccordion({
  monthlyRent,
  deposit,
  bookingFee,
  className,
}: PriceBreakdownAccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const totalDueToday = deposit + bookingFee;

  return (
    <div className={cn("flex flex-col gap-4 w-full select-none", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-xl sm:text-2xl text-roomly-dark">
          Review your move.
        </h3>
        <p className="text-xs text-roomly-muted">
          Transparent pricing with zero hidden charges or brokerage locks.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-4">
        {/* Core numbers overview */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-roomly-border">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider">
              Amount Due Today
            </span>
            <span className="font-display font-black text-2xl text-roomly-dark">
              ₹{totalDueToday.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-roomly-green font-semibold">
              Deposit + Booking Fee
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider">
              Monthly Rent After Move-In
            </span>
            <span className="font-display font-black text-2xl text-roomly-dark">
              ₹{monthlyRent.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-roomly-muted">
              First bill due Oct 5
            </span>
          </div>
        </div>

        {/* Accordion toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between text-xs font-bold text-roomly-green hover:text-roomly-dark transition-colors cursor-pointer py-1"
        >
          <span>{expanded ? "Hide price details" : "View full price breakdown ▾"}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Detailed Expandable Rows */}
        {expanded && (
          <div className="flex flex-col gap-2.5 pt-3 border-t border-roomly-border/70 text-xs animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center justify-between">
              <span className="text-roomly-muted">Monthly Room Rent</span>
              <span className="font-semibold text-roomly-dark">
                ₹{monthlyRent.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-roomly-muted">Refundable Security Deposit (Escrow Protected)</span>
              <span className="font-semibold text-roomly-dark">
                ₹{deposit.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-roomly-muted">Power Backup & Regular Maintenance</span>
              <span className="font-semibold text-roomly-green">Included (₹0)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-roomly-muted">Gigabit Fiber Internet</span>
              <span className="font-semibold text-roomly-green">Included (₹0)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-roomly-muted">One-time Reservation & Verification Fee</span>
              <span className="font-semibold text-roomly-dark">
                ₹{bookingFee.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-roomly-border font-bold text-roomly-dark">
              <span>Total Payable to Reserve</span>
              <span className="text-sm">₹{totalDueToday.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
