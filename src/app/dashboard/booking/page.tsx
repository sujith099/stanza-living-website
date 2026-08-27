"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { BookingTimeline } from "@/components/dashboard";
import { DEMO_DOCUMENTS } from "@/data/dashboard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { BackButton } from "@/components/ui/BackButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { useRoomlyApp } from "@/context/RoomlyAppContext";

export default function DashboardBookingPage() {
  const { activeBooking } = useRoomlyApp();

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Back to Dashboard */}
      <div>
        <BackButton label="Back to dashboard" fallback="/dashboard" />
      </div>

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-green block">
              Reservation #{activeBooking.id}
            </span>
            <h1 className="font-display font-black text-3xl text-roomly-dark">
              My Booking · {activeBooking.propertyName}
            </h1>
            <p className="text-xs text-roomly-muted mt-0.5">
              {activeBooking.roomName} ({activeBooking.roomType}) · {activeBooking.address}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/rooms/${activeBooking.propertySlug}`}>
              <RoomlyButton
                variant="outline"
                size="sm"
                shape="pill"
                className="text-xs font-semibold bg-white border-roomly-border hover:bg-roomly-bg"
              >
                <span>View property</span>
                <ArrowUpRight className="w-3 h-3 text-roomly-muted" />
              </RoomlyButton>
            </Link>

            <Link href="/dashboard/messages">
              <RoomlyButton
                variant="primary"
                size="sm"
                shape="pill"
                className="text-xs font-semibold"
              >
                Contact desk
              </RoomlyButton>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* 4-Stage Timeline Stepper */}
      <FadeIn delay={0.05}>
        <BookingTimeline />
      </FadeIn>

      {/* Documents Vault */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-roomly-dark">
              Booking Documents & Verification
            </h3>
            <span className="text-xs text-roomly-muted">
              {DEMO_DOCUMENTS.length} official records
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-xs flex flex-col gap-3">
            {DEMO_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-2xl bg-white border border-roomly-border hover:border-roomly-dark/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-roomly-bg border border-roomly-border flex items-center justify-center text-roomly-green flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-roomly-dark">
                      {doc.name}
                    </span>
                    <span className="text-[11px] text-roomly-muted">
                      {doc.date} · {doc.fileSize}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                      doc.status === "Verified"
                        ? "bg-roomly-green/10 text-roomly-green"
                        : doc.status === "Pending signature"
                        ? "bg-roomly-coral/10 text-roomly-coral"
                        : "bg-roomly-bg text-roomly-muted"
                    }`}
                  >
                    {doc.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${doc.name}`)}
                    className="text-xs font-semibold text-roomly-dark hover:text-roomly-green underline cursor-pointer"
                  >
                    View / Download
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
