"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BackButtonProps {
  label?: string;
  fallback?: string;
  onClick?: () => void;
  className?: string;
}

export function BackButton({
  label = "Back",
  fallback = "/",
  onClick,
  className,
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onClick) {
      onClick();
      return;
    }

    // Intelligent history fallback
    if (typeof window !== "undefined") {
      const hasHistory =
        window.history.length > 1 &&
        document.referrer &&
        document.referrer.includes(window.location.host);

      if (hasHistory) {
        router.back();
        return;
      }
    }

    router.push(fallback);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-roomly-green hover:text-roomly-dark",
        "py-1.5 px-3 -ml-3 rounded-full hover:bg-roomly-green/8 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-roomly-green/30 cursor-pointer select-none",
        className
      )}
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 flex-shrink-0" />
      <span>{label}</span>
    </button>
  );
}
