"use client";

import React from "react";
import Link from "next/link";
import { Check, Calendar, Home, MapPin, IndianRupee } from "lucide-react";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { FadeIn } from "@/components/ui/FadeIn";
import { useRoomlyApp } from "@/context/RoomlyAppContext";

export default function BookingSuccessPage() {
  const { activeBooking } = useRoomlyApp();

  React.useEffect(() => {
    document.title = "Booking Confirmed | Stanza Living";
  }, []);

  return (
    <div className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between p-6 sm:p-12 lg:p-16 select-none">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="font-display font-black text-base sm:text-lg tracking-wider text-roomly-dark whitespace-nowrap">
            STANZA LIVING
          </span>
          <span className="text-roomly-lime font-bold text-base group-hover:rotate-45 transition-transform">
            *
          </span>
        </Link>

        <span className="text-xs font-bold uppercase tracking-widest text-roomly-green">
          Reservation Receipt
        </span>
      </header>

      {/* Center Confirmation Card */}
      <main className="max-w-xl mx-auto w-full my-8">
        <FadeIn>
          <div className="p-8 sm:p-10 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-2xl flex flex-col items-center text-center gap-6">
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-roomly-green text-white flex items-center justify-center shadow-lg mb-1">
              <Check className="w-8 h-8" />
            </div>

            {/* Heading & Subtitle */}
            <div className="flex flex-col gap-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark tracking-tight">
                You&apos;re on your way home.
              </h1>
              <p className="text-xs sm:text-sm text-roomly-muted max-w-md">
                Your booking request for {activeBooking.propertyName} has been received. Our property team will review and issue your digital key.
              </p>
            </div>

            {/* Ticket Card Details */}
            <div className="w-full p-5 sm:p-6 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-3 text-xs text-left">
              <div className="flex items-center justify-between pb-3 border-b border-roomly-border">
                <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider">
                  Booking Reference
                </span>
                <span className="font-mono font-bold text-roomly-dark text-sm">
                  {activeBooking.id}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-roomly-muted flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-roomly-green" />
                  <span>Property & Room</span>
                </span>
                <span className="font-bold text-roomly-dark">
                  {activeBooking.propertyName} · {activeBooking.roomName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-roomly-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-roomly-green" />
                  <span>Location</span>
                </span>
                <span className="font-medium text-roomly-dark">
                  {activeBooking.neighbourhood}, {activeBooking.city}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-roomly-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-roomly-green" />
                  <span>Move-in Date</span>
                </span>
                <span className="font-bold text-roomly-dark">
                  September 1, 2026
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-roomly-muted flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-roomly-green" />
                  <span>Monthly Rent</span>
                </span>
                <span className="font-bold text-roomly-dark">
                  ₹{activeBooking.monthlyRent.toLocaleString("en-IN")} / month
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-roomly-border">
                <span className="text-[11px] font-bold text-roomly-muted">
                  Booking Status
                </span>
                <span className="px-3 py-1 rounded-full bg-roomly-lime text-roomly-dark text-[11px] font-bold">
                  Booking requested
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
              <Link href="/dashboard" className="w-full">
                <RoomlyButton
                  variant="primary"
                  size="md"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  className="w-full justify-center text-xs font-semibold py-3.5"
                >
                  View my booking
                </RoomlyButton>
              </Link>

              <Link href="/rooms" className="w-full">
                <RoomlyButton
                  variant="outline"
                  size="md"
                  shape="pill"
                  className="w-full justify-center text-xs font-semibold py-3.5 border-roomly-border hover:bg-roomly-cream/40"
                >
                  Explore more rooms
                </RoomlyButton>
              </Link>
            </div>
          </div>
        </FadeIn>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-roomly-muted">
        <span>Stanza Living Concept Prototype · Managed student & shared living</span>
      </footer>
    </div>
  );
}
