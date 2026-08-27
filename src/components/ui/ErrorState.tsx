"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { RoomlyButton } from "./RoomlyButton";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong.",
  description = "We couldn't load this content right now. Please try again or return to available rooms.",
  onRetry,
  backHref = "/rooms",
  backLabel = "Back to rooms",
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "p-8 sm:p-12 rounded-3xl bg-[#FDFCF8] border border-roomly-border text-center flex flex-col items-center justify-center gap-4 max-w-md mx-auto my-8 select-none",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-roomly-coral/15 text-roomly-coral flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-xl text-roomly-dark">
          {title}
        </h3>
        <p className="text-xs text-roomly-muted leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        {onRetry && (
          <RoomlyButton
            variant="outline"
            size="sm"
            shape="pill"
            onClick={onRetry}
            className="text-xs font-semibold bg-white border-roomly-border hover:bg-roomly-bg"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Try again</span>
          </RoomlyButton>
        )}

        <Link href={backHref}>
          <RoomlyButton
            variant="primary"
            size="sm"
            shape="pill"
            className="text-xs font-semibold px-5"
          >
            {backLabel} →
          </RoomlyButton>
        </Link>
      </div>
    </div>
  );
}
