import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { RoomlyNav } from "@/components/ui/RoomlyNav";
import { RoomlyFooter } from "@/components/ui/RoomlyFooter";
import { RoomlyButton } from "@/components/ui/RoomlyButton";
import { FadeIn } from "@/components/ui/FadeIn";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between select-none">
      {/* Navigation */}
      <RoomlyNav />

      {/* 404 Content */}
      <main className="pt-36 sm:pt-44 pb-24 px-6 max-w-xl mx-auto w-full flex-grow flex flex-col items-center justify-center text-center gap-6">
        <FadeIn>
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#FDFCF8] border border-roomly-border flex items-center justify-center text-roomly-dark shadow-sm">
              <Compass className="w-7 h-7 text-roomly-green animate-pulse" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-roomly-muted">
                Error 404 · Page not found
              </span>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-roomly-dark tracking-tight leading-tight">
                Looks like you&apos;ve taken a wrong turn.
              </h1>
              <p className="text-xs sm:text-sm text-roomly-muted max-w-md mx-auto leading-relaxed">
                The address you entered might have moved, or the room listing has expired. Let&apos;s get you back to finding somewhere that fits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 w-full sm:w-auto">
              <Link href="/rooms" className="w-full sm:w-auto">
                <RoomlyButton
                  variant="primary"
                  size="md"
                  shape="pill"
                  withArrow
                  arrowStyle="circle"
                  className="w-full sm:w-auto justify-center text-xs font-semibold px-6 py-3"
                >
                  Find a room
                </RoomlyButton>
              </Link>

              <Link href="/" className="w-full sm:w-auto">
                <RoomlyButton
                  variant="outline"
                  size="md"
                  shape="pill"
                  className="w-full sm:w-auto justify-center text-xs font-semibold px-6 py-3 bg-white border-roomly-border hover:bg-roomly-cream/40"
                >
                  Go home
                </RoomlyButton>
              </Link>
            </div>
          </div>
        </FadeIn>
      </main>

      {/* Global Footer */}
      <RoomlyFooter />
    </div>
  );
}
