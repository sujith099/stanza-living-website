"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthLayoutProps {
  children: React.ReactNode;
  brandQuote?: string;
  imageSrc?: string;
  className?: string;
}

export function AuthLayout({
  children,
  brandQuote = "Move with more confidence.",
  imageSrc = "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600&auto=format&fit=crop",
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col lg:flex-row bg-roomly-bg text-roomly-dark",
        className
      )}
    >
      {/* Left Column (Desktop 50% / Mobile Top Banner) */}
      <div className="relative w-full lg:w-1/2 h-56 sm:h-72 lg:h-auto min-h-0 lg:min-h-screen overflow-hidden flex-shrink-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none">
        <Image
          src={imageSrc}
          alt="Warm urban living room with morning light"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover brightness-[0.7] contrast-[1.08]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

        {/* Top brand header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-1 group">
            <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white whitespace-nowrap">
              STANZA LIVING
            </span>
            <span className="text-roomly-lime font-bold text-lg sm:text-xl group-hover:rotate-45 transition-transform">
              *
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to home</span>
          </Link>
        </div>

        {/* Bottom Quotation */}
        <div className="relative z-10 max-w-md hidden sm:flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-widest font-bold text-roomly-lime">
            Stanza Living Identity
          </span>
          <p className="font-display font-bold text-2xl lg:text-3xl text-white leading-snug">
            &ldquo;{brandQuote}&rdquo;
          </p>
        </div>
      </div>

      {/* Right Column (Form Container) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 flex-grow">
        <div className="w-full max-w-md flex flex-col gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
