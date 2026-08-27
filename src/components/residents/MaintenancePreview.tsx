"use client";

import React, { useState } from "react";
import {
  Zap,
  Droplets,
  Wind,
  Wifi,
  Armchair,
  Sparkles,
  HelpCircle,
  UploadCloud,
  Check,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface MaintenancePreviewProps {
  className?: string;
}

const CATEGORIES = [
  { id: "AC", label: "AC", icon: Wind },
  { id: "Wi-Fi", label: "Wi-Fi", icon: Wifi },
  { id: "Plumbing", label: "Plumbing", icon: Droplets },
  { id: "Electrical", label: "Electrical", icon: Zap },
  { id: "Furniture", label: "Furniture", icon: Armchair },
  { id: "Cleaning", label: "Cleaning", icon: Sparkles },
  { id: "Other", label: "Other", icon: HelpCircle },
];

export function MaintenancePreview({ className }: MaintenancePreviewProps) {
  const [selectedCat, setSelectedCat] = useState("AC");
  const [problemDesc, setProblemDesc] = useState("AC cooling reduced during peak afternoon heat.");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const STEPS = [
    { label: "Received", status: "completed" },
    { label: "Assigned", status: "completed" },
    { label: "In progress", status: "active" },
    { label: "Resolved", status: "pending" },
  ];

  return (
    <section className={cn("flex flex-col gap-12 sm:gap-16 w-full", className)}>
      <FadeIn>
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-roomly-green" />
            <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-muted">
              ON-SITE RESOLUTION
            </span>
          </div>

          <h3 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-roomly-dark tracking-tight leading-tight">
            Something broken?
          </h3>

          <p className="text-xs sm:text-sm text-roomly-muted max-w-md pt-1">
            Raise a request without chasing someone on WhatsApp. Dedicated maintenance technicians are dispatched directly to your room.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Raise Request Mockup */}
        <FadeIn delay={0.1} className="lg:col-span-6 w-full">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#FDFCF8] border border-roomly-border shadow-sm flex flex-col gap-6 select-none">
            <div className="flex items-center justify-between border-b border-roomly-border pb-3">
              <span className="font-display font-bold text-lg text-roomly-dark">
                Raise New Maintenance Request
              </span>
              <span className="text-xs text-roomly-green font-semibold">
                Oak House · Room 204
              </span>
            </div>

            {/* Category selection */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-roomly-muted uppercase tracking-wider">
                Select Category
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCat === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCat(cat.id)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                        isSelected
                          ? "bg-roomly-dark text-roomly-lime shadow"
                          : "bg-roomly-bg text-roomly-dark border border-roomly-border hover:bg-roomly-cream/40"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Problem Description */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-roomly-muted uppercase tracking-wider">
                Describe the issue
              </span>
              <textarea
                rows={3}
                value={problemDesc}
                onChange={(e) => setProblemDesc(e.target.value)}
                placeholder="What seems to be the problem?"
                className="w-full p-3.5 rounded-2xl bg-roomly-bg border border-roomly-border text-xs text-roomly-dark placeholder:text-roomly-muted/60 focus:outline-none focus:border-roomly-dark resize-none"
              />
            </div>

            {/* Upload Area */}
            <div className="border border-dashed border-roomly-border rounded-2xl p-4 flex items-center justify-center gap-2 text-xs text-roomly-muted bg-roomly-bg/50">
              <UploadCloud className="w-4 h-4 text-roomly-dark" />
              <span>Optional: Attach photo or video clip</span>
            </div>

            {/* Submit Action */}
            <RoomlyButton
              variant={isSubmitted ? "primary" : "lime"}
              size="md"
              shape="pill"
              onClick={() => setIsSubmitted(true)}
              className="w-full justify-center text-xs font-semibold py-3"
            >
              {isSubmitted ? "✓ Request #2049 Logged" : "Submit request →"}
            </RoomlyButton>
          </div>
        </FadeIn>

        {/* Right: Live Ticket Status Stepper Tracker */}
        <FadeIn delay={0.2} className="lg:col-span-6 w-full flex flex-col gap-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#FDFCF8] border-2 border-roomly-dark shadow-xl flex flex-col gap-6 select-none">
            <div className="flex items-center justify-between border-b border-roomly-border pb-3">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase font-bold text-roomly-muted tracking-wider">
                  Live Ticket Status
                </span>
                <h4 className="font-display font-bold text-lg text-roomly-dark">
                  Request #2048 · AC Cooling
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-roomly-coral/15 text-roomly-coral text-xs font-bold">
                In Progress
              </span>
            </div>

            {/* 4-Step Animated Progress Stepper */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
              {STEPS.map((s, idx) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors",
                      s.status === "completed"
                        ? "bg-roomly-green text-white"
                        : s.status === "active"
                        ? "bg-roomly-dark text-roomly-lime ring-4 ring-roomly-lime/30"
                        : "bg-roomly-bg text-roomly-muted border border-roomly-border"
                    )}
                  >
                    {s.status === "completed" ? (
                      <Check className="w-4 h-4" />
                    ) : s.status === "active" ? (
                      <span className="w-2 h-2 rounded-full bg-roomly-lime animate-pulse" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      s.status === "active"
                        ? "text-roomly-dark font-bold"
                        : s.status === "completed"
                        ? "text-roomly-green"
                        : "text-roomly-muted"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-roomly-bg border border-roomly-border flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-roomly-muted">Assigned Technician:</span>
                <span className="font-bold text-roomly-dark">Kiran (HVAC Specialist)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-roomly-muted">Expected Resolution:</span>
                <span className="font-bold text-roomly-green">Today, by 4:30 PM</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
