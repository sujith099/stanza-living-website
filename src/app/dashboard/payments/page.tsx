"use client";

import React, { useState } from "react";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";
import { DEMO_PAYMENTS, DashboardPayment } from "@/data/dashboard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";

export default function DashboardPaymentsPage() {
  const [payments, setPayments] = useState<DashboardPayment[]>(DEMO_PAYMENTS);
  const [paying, setPaying] = useState(false);

  const handlePayRent = (id: string) => {
    setPaying(true);
    setTimeout(() => {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: "Paid", method: "UPI (Google Pay)" } : p
        )
      );
      setPaying(false);
    }, 1200);
  };

  const upcomingBill = payments.find((p) => p.status === "Upcoming");
  const settledBills = payments.filter((p) => p.status === "Paid");

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-display font-black text-3xl text-roomly-dark">
            Payments & Invoices
          </h1>
          <p className="text-xs text-roomly-muted">
            Consolidated monthly living invoices, power utilities, and escrow receipts
          </p>
        </div>
      </FadeIn>

      {/* Current Active Bill Card */}
      {upcomingBill ? (
        <FadeIn delay={0.05}>
          <div className="p-6 sm:p-8 rounded-3xl bg-roomly-dark text-roomly-cream shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-lime">
                Current Statement
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {upcomingBill.title}
              </h2>
              <p className="text-xs text-roomly-cream/70">
                Due by {upcomingBill.dueDate} · High-speed Wi-Fi, maintenance & housekeeping included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-roomly-cream/60 tracking-wider block">
                  Total Payable
                </span>
                <span className="font-display font-black text-2xl sm:text-3xl text-white">
                  ₹{upcomingBill.amount.toLocaleString("en-IN")}
                </span>
              </div>

              <RoomlyButton
                variant="lime"
                size="lg"
                shape="pill"
                disabled={paying}
                onClick={() => handlePayRent(upcomingBill.id)}
                className="text-xs sm:text-sm font-semibold py-3.5 px-6 shadow-md cursor-pointer"
              >
                {paying ? "Processing UPI..." : "Pay rent now →"}
              </RoomlyButton>
            </div>
          </div>
        </FadeIn>
      ) : (
        <FadeIn delay={0.05}>
          <div className="p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-roomly-green" />
            <span className="text-sm font-semibold text-roomly-dark">
              All statements are currently settled! Next invoice generates on October 1.
            </span>
          </div>
        </FadeIn>
      )}

      {/* Escrow Guarantee Callout */}
      <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-roomly-border flex items-center gap-3 text-xs text-roomly-muted">
        <ShieldCheck className="w-5 h-5 text-roomly-green flex-shrink-0" />
        <span>
          Payments are handled via secure RBI-compliant escrow rails. You will never be charged surprise landlord maintenance fees.
        </span>
      </div>

      {/* Payment History Table */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-lg text-roomly-dark">
            Payment History
          </h3>

          <div className="p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xs flex flex-col gap-3">
            {settledBills.map((bill) => (
              <div
                key={bill.id}
                className="p-4 rounded-2xl bg-white border border-roomly-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-roomly-green/10 text-roomly-green flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-roomly-dark">
                      {bill.title}
                    </span>
                    <span className="text-[11px] text-roomly-muted">
                      Paid on {bill.dueDate} · {bill.method}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <span className="font-display font-bold text-sm text-roomly-dark">
                    ₹{bill.amount.toLocaleString("en-IN")}
                  </span>

                  <button
                    type="button"
                    onClick={() => alert(`Receipt downloaded for ${bill.title}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-roomly-green hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
