"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, Clock, Download } from "lucide-react";
import { CURRENT_PAYMENT, PAYMENT_HISTORY } from "@/data/residents";
import { FadeIn } from "@/components/ui/FadeIn";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface PaymentPreviewProps {
  className?: string;
}

export function PaymentPreview({ className }: PaymentPreviewProps) {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              RENT & INVOICING
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Payments without the guesswork.
          </h3>

          <p className="text-xs sm:text-sm text-roomly-muted max-w-md pt-1">
            Zero brokerage, zero surprise maintenance bills. Your rent, utilities, and high-speed Wi-Fi stay consolidated into one single predictable payment.
          </p>
        </div>
      </FadeIn>

      {/* Payment Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Invoice Card */}
        <FadeIn delay={0.1} className="lg:col-span-6 w-full">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#FDFCF8] border-2 border-roomly-dark shadow-xl flex flex-col gap-6 select-none">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider">
                  Upcoming Bill
                </span>
                <h4 className="font-display font-bold text-2xl text-roomly-dark">
                  {CURRENT_PAYMENT.month}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-roomly-coral/10 text-roomly-coral text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Due {CURRENT_PAYMENT.dueDate}</span>
              </div>
            </div>

            {/* Itemized Rent Breakdown */}
            <div className="flex flex-col gap-2.5 py-4 border-y border-roomly-border text-xs">
              <div className="flex items-center justify-between">
                <span className="text-roomly-muted">Private Room 204 (Furnished)</span>
                <span className="font-semibold text-roomly-dark">₹15,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-roomly-muted">1Gbps Fiber Internet (Unlimited)</span>
                <span className="font-semibold text-roomly-green">Included (₹0)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-roomly-muted">Power Backup & Utilities Allowance</span>
                <span className="font-semibold text-roomly-dark">₹2,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-roomly-muted">Weekly Room & Common Deep Clean</span>
                <span className="font-semibold text-roomly-dark">₹1,500</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-roomly-border/60 text-sm font-bold text-roomly-dark">
                <span>Total Amount Due</span>
                <span className="font-display text-xl text-roomly-dark">
                  {CURRENT_PAYMENT.amount}
                </span>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="flex flex-col gap-2">
              <RoomlyButton
                variant={isPaid ? "primary" : "lime"}
                size="lg"
                shape="pill"
                onClick={() => setIsPaid(true)}
                className="w-full justify-center text-xs font-semibold py-3.5"
              >
                {isPaid ? "✓ Paid via UPI (REC-9421)" : "Pay rent now →"}
              </RoomlyButton>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-roomly-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-roomly-green" />
                <span>Protected by Roomly Tenant Escrow Guarantee</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right: Payment History & Receipts */}
        <FadeIn delay={0.2} className="lg:col-span-6 w-full flex flex-col gap-4">
          <div className="p-7 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-4 select-none">
            <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider">
              Settled Invoices & Receipts
            </span>

            <div className="divide-y divide-roomly-border/70">
              {PAYMENT_HISTORY.map((item) => (
                <div
                  key={item.month}
                  className="py-3.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-roomly-green/10 flex items-center justify-center text-roomly-green">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-roomly-dark text-sm">
                        {item.month}
                      </div>
                      <span className="text-[11px] text-roomly-muted">
                        Paid on {item.paidOn} · {item.receiptId}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${item.receiptId}.pdf`)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-roomly-border text-roomly-dark hover:bg-roomly-dark hover:text-white transition-colors cursor-pointer text-[11px] font-semibold"
                  >
                    <Download className="w-3 h-3" />
                    <span>Receipt</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
