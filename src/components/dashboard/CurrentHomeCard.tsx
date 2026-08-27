"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Home, ArrowUpRight, Compass } from "lucide-react";
import { DashboardBooking } from "@/data/dashboard";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface CurrentHomeCardProps {
  booking: DashboardBooking;
  className?: string;
}

export function CurrentHomeCard({ booking, className }: CurrentHomeCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-md overflow-hidden flex flex-col md:flex-row select-none",
        className
      )}
    >
      {/* Property Photo */}
      <div className="relative w-full md:w-5/12 h-64 md:h-auto min-h-[260px] overflow-hidden bg-roomly-cream/40 flex-shrink-0">
        <Image
          src={booking.propertyImage}
          alt={booking.propertyName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />

        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-roomly-dark/85 backdrop-blur-sm text-roomly-lime text-[11px] font-bold tracking-wider uppercase shadow">
          {booking.status}
        </div>
      </div>

      {/* Details Body */}
      <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs text-roomly-green font-semibold">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span>Digital Home Pass</span>
          </div>

          <div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-roomly-dark">
              {booking.propertyName}
            </h3>
            <span className="text-xs text-roomly-muted flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-roomly-muted" />
              <span>{booking.address}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-roomly-muted tracking-wider flex items-center gap-1">
                <Home className="w-3 h-3 text-roomly-green" />
                <span>Room Assigned</span>
              </span>
              <span className="font-bold text-sm text-roomly-dark">
                {booking.roomName}
              </span>
              <span className="text-[11px] text-roomly-muted truncate">
                {booking.roomType}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-roomly-muted tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-roomly-green" />
                <span>Move-in Date</span>
              </span>
              <span className="font-bold text-sm text-roomly-dark">
                Sept 1, 2026
              </span>
              <span className="text-[11px] text-roomly-green font-semibold">
                ₹{booking.monthlyRent.toLocaleString("en-IN")} / mo
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-roomly-border">
          <Link href="/dashboard/booking">
            <RoomlyButton
              variant="primary"
              size="md"
              shape="pill"
              withArrow
              arrowStyle="circle"
              className="text-xs font-semibold py-2.5 px-5"
            >
              View booking
            </RoomlyButton>
          </Link>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(booking.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-roomly-border text-xs font-semibold text-roomly-dark hover:bg-roomly-bg transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-roomly-green" />
            <span>Get directions</span>
            <ArrowUpRight className="w-3 h-3 text-roomly-muted" />
          </a>
        </div>
      </div>
    </div>
  );
}
