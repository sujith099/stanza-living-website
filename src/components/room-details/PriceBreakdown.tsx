"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info } from "lucide-react";
import { Property } from "@/data/properties";
import { ROOMLY_EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface PriceBreakdownProps {
  property: Property;
  className?: string;
}

export function PriceBreakdown({ property, className }: PriceBreakdownProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex flex-col gap-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-display font-bold text-lg text-roomly-dark">
            Pricing breakdown
          </h3>
          <span className="text-xs text-roomly-muted">
            All essential utilities included in monthly rent
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-roomly-green hover:text-roomly-dark flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>{expanded ? "Hide details" : "See full cost breakdown"}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Primary Key Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-roomly-bg border border-roomly-border">
          <span className="text-[11px] uppercase tracking-wider text-roomly-muted font-medium">
            Monthly rent
          </span>
          <div className="font-display font-bold text-lg text-roomly-dark mt-0.5">
            ₹{property.rent.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-roomly-bg border border-roomly-border">
          <span className="text-[11px] uppercase tracking-wider text-roomly-muted font-medium">
            Security deposit
          </span>
          <div className="font-display font-bold text-lg text-roomly-dark mt-0.5">
            ₹{property.deposit.toLocaleString("en-IN")}
            <span className="text-[10px] text-roomly-muted font-normal block">
              100% Refundable
            </span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-roomly-bg border border-roomly-border">
          <span className="text-[11px] uppercase tracking-wider text-roomly-muted font-medium">
            Brokerage fee
          </span>
          <div className="font-display font-bold text-lg text-roomly-green mt-0.5">
            ₹0
            <span className="text-[10px] text-roomly-muted font-normal block">
              Zero brokers
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Full Accordion */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: ROOMLY_EASE }}
            className="overflow-hidden pt-4 border-t border-roomly-border flex flex-col gap-3 text-xs"
          >
            <div className="flex items-center justify-between py-1.5 border-b border-roomly-border/50">
              <span className="text-roomly-muted">Building Maintenance & Housekeeping</span>
              <span className="font-semibold text-roomly-green">Included</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-roomly-border/50">
              <span className="text-roomly-muted">High-Speed Fiber Wi-Fi (1Gbps)</span>
              <span className="font-semibold text-roomly-green">Included</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-roomly-border/50">
              <span className="text-roomly-muted">Electricity & Power Backup</span>
              <span className="font-semibold text-roomly-green">Included (fair usage)</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-roomly-border/50">
              <span className="text-roomly-muted">Chef-prepared meals</span>
              <span className="font-semibold text-roomly-green">Included</span>
            </div>

            {property.optionalServices.map((opt) => (
              <div
                key={opt.name}
                className="flex items-center justify-between py-1.5 border-b border-roomly-border/50"
              >
                <span className="text-roomly-muted">{opt.name}</span>
                <span className="font-medium text-roomly-dark">
                  Optional ({opt.price})
                </span>
              </div>
            ))}

            <div className="p-3 rounded-xl bg-roomly-cream/40 border border-roomly-border/60 text-[11px] text-roomly-muted flex items-start gap-2 mt-1">
              <Info className="w-3.5 h-3.5 text-roomly-dark flex-shrink-0 mt-0.5" />
              <span>
                Stanza Living deposits are held in a verified escrow account and returned
                within 48 hours of move-out inspection.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
