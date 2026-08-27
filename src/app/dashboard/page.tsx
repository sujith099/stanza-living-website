"use client";

import React from "react";
import {
  CurrentHomeCard,
  MoveInCountdown,
  QuickStatsRow,
  UpcomingActions,
} from "@/components/dashboard";
import { FadeIn } from "@/components/ui/FadeIn";
import { useRoomlyApp } from "@/context/RoomlyAppContext";

export default function DashboardOverviewPage() {
  const { user, activeBooking } = useRoomlyApp();
  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex flex-col gap-8 w-full select-none">
      {/* Top Greeting */}
      <FadeIn>
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark tracking-tight">
            Good morning, {firstName}.
          </h1>
          <p className="text-xs sm:text-sm text-roomly-muted">
            Here&apos;s what&apos;s happening with your home in {activeBooking.neighbourhood}.
          </p>
        </div>
      </FadeIn>

      {/* Move-in Countdown Bar */}
      <FadeIn delay={0.05}>
        <MoveInCountdown moveInDate={activeBooking.moveInDate} />
      </FadeIn>

      {/* Primary Section: Digital Home Pass */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
            Your home
          </span>
          <CurrentHomeCard booking={activeBooking} />
        </div>
      </FadeIn>

      {/* Quick 4 Metrics Row */}
      <FadeIn delay={0.15}>
        <QuickStatsRow />
      </FadeIn>

      {/* Upcoming Action Items */}
      <FadeIn delay={0.2}>
        <UpcomingActions />
      </FadeIn>
    </div>
  );
}
