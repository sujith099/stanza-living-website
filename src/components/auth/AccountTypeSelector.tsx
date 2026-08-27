"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Home } from "lucide-react";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { cn } from "@/lib/utils";

export interface AccountTypeSelectorProps {
  userName: string;
  className?: string;
}

export function AccountTypeSelector({
  userName,
  className,
}: AccountTypeSelectorProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"seeker" | "resident">("seeker");

  const handleContinue = () => {
    if (selectedType === "seeker") {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full select-none", className)}>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-roomly-dark">
          Welcome, {userName || "there"}.
        </h2>
        <p className="text-xs sm:text-sm text-roomly-muted">
          What brings you to Roomly today?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Option 1: Seeker */}
        <div
          onClick={() => setSelectedType("seeker")}
          className={cn(
            "p-5 sm:p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex items-start gap-4",
            selectedType === "seeker"
              ? "bg-[#FDFCF8] border-roomly-dark shadow-lg ring-2 ring-roomly-dark/10"
              : "bg-[#FDFCF8] border-roomly-border hover:border-roomly-dark/40"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
              selectedType === "seeker"
                ? "bg-roomly-dark text-roomly-lime"
                : "bg-roomly-bg text-roomly-dark border border-roomly-border"
            )}
          >
            <Search className="w-5 h-5" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base text-roomly-dark">
                I NEED A ROOM
              </span>
              {selectedType === "seeker" && (
                <span className="w-2 h-2 rounded-full bg-roomly-lime" />
              )}
            </div>
            <p className="text-xs text-roomly-muted leading-relaxed">
              Search, compare and book verified co-living and private rooms.
            </p>
          </div>
        </div>

        {/* Option 2: Existing Resident */}
        <div
          onClick={() => setSelectedType("resident")}
          className={cn(
            "p-5 sm:p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex items-start gap-4",
            selectedType === "resident"
              ? "bg-[#FDFCF8] border-roomly-dark shadow-lg ring-2 ring-roomly-dark/10"
              : "bg-[#FDFCF8] border-roomly-border hover:border-roomly-dark/40"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors",
              selectedType === "resident"
                ? "bg-roomly-dark text-roomly-lime"
                : "bg-roomly-bg text-roomly-dark border border-roomly-border"
            )}
          >
            <Home className="w-5 h-5" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base text-roomly-dark">
                I&apos;M ALREADY A RESIDENT
              </span>
              {selectedType === "resident" && (
                <span className="w-2 h-2 rounded-full bg-roomly-lime" />
              )}
            </div>
            <p className="text-xs text-roomly-muted leading-relaxed">
              Pay rent, raise maintenance tickets, and check building notices.
            </p>
          </div>
        </div>
      </div>

      <RoomlyButton
        type="button"
        variant="primary"
        size="lg"
        shape="pill"
        withArrow
        arrowStyle="circle"
        onClick={handleContinue}
        className="w-full justify-center text-xs sm:text-sm font-semibold py-3.5 mt-2"
      >
        Continue
      </RoomlyButton>
    </div>
  );
}
