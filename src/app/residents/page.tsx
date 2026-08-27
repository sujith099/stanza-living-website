"use client";

import React from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { RoomlyNav } from "@/components/ui/RoomlyNav";
import { RoomlyFooter } from "@/components/ui/RoomlyFooter";
import {
  ResidentHero,
  ResidentPromise,
  ResidentDashboardPreview,
  PaymentPreview,
  MaintenancePreview,
  CommunitySection,
  SupportSection,
  ResidentQuote,
  ResidentCTA,
} from "@/components/residents";

export default function ResidentsPage() {
  const scrollToPromise = () => {
    const el = document.getElementById("resident-promise");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
      {/* 1. Global Navigation */}
      <RoomlyNav />

      {/* Main Container */}
      <main className="pt-24 sm:pt-32 pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col gap-20 sm:gap-28 lg:gap-32">
        {/* 2. Cinematic Hero */}
        <ResidentHero onScrollToPromise={scrollToPromise} />

        {/* 3. Resident Promise */}
        <ResidentPromise id="resident-promise" />

        {/* 4. Interactive Resident Dashboard Preview (Centerpiece) */}
        <ResidentDashboardPreview />

        {/* 5. Payments Breakdown & History */}
        <PaymentPreview />

        {/* 6. Maintenance Request & Live Status Stepper */}
        <MaintenancePreview />

        {/* 7. Community & Curated Gatherings */}
        <CommunitySection />

        {/* 8. Direct Support Channels */}
        <SupportSection />

        {/* 9. Verified Resident Testimonial */}
        <ResidentQuote />

        {/* 10. Final Decision CTA */}
        <ResidentCTA />
      </main>

      {/* 11. Reusable Minimal Footer */}
      <RoomlyFooter />
    </PageTransition>
  );
}
