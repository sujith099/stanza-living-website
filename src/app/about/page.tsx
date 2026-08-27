"use client";

import React from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { RoomlyNav } from "@/components/ui/RoomlyNav";
import { RoomlyFooter } from "@/components/ui/RoomlyFooter";
import {
  StoryHero,
  WhyRoomlyIntro,
  ProblemSequence,
  RoomlyResponse,
  BeliefSection,
  HumanStorySection,
  RoomlyTimeline,
  ImpactStats,
  TeamGrid,
  CommunityGallery,
  ResidentVoice,
  FutureVision,
  AboutCTA,
} from "@/components/about";

export default function AboutPage() {
  const scrollToWhyRoomly = () => {
    const el = document.getElementById("why-roomly");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageTransition className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
      {/* 1. Global Navigation */}
      <RoomlyNav />

      {/* Main Narrative Container */}
      <main className="pt-24 sm:pt-32 pb-24 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col gap-20 sm:gap-28 lg:gap-32">
        {/* 2. Hero Section */}
        <StoryHero onDiscoverClick={scrollToWhyRoomly} />

        {/* 3. Why Roomly Introduction */}
        <WhyRoomlyIntro id="why-roomly" />

        {/* 4. The Problem: The Old Way Is Broken */}
        <ProblemSequence />

        {/* 5. So We Built Something Better */}
        <RoomlyResponse />

        {/* 6. What We Believe (Core Philosophy) */}
        <BeliefSection />

        {/* 7. Human Origin Story */}
        <HumanStorySection />

        {/* 8. Milestones & Evolutionary Timeline */}
        <RoomlyTimeline />

        {/* 9. Prototype Snapshot Numbers */}
        <ImpactStats />

        {/* 10. People Building Roomly */}
        <TeamGrid />

        {/* 11. Roomly Community & Living Atmosphere */}
        <CommunityGallery />

        {/* 12. Resident Voice */}
        <ResidentVoice />

        {/* 13. Future Vision: Where We're Going */}
        <FutureVision />

        {/* 14. Final Decision CTA */}
        <AboutCTA />
      </main>

      {/* 15. Reusable Minimal Footer */}
      <RoomlyFooter />
    </PageTransition>
  );
}
