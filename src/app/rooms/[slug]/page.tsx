import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { RoomDetailsClient } from "@/components/room-details/RoomDetailsClient";
import { RoomlyNav } from "@/components/ui/RoomlyNav";
import { RoomlyFooter } from "@/components/ui/RoomlyFooter";
import { RoomlyButton } from "@/components/ui/RoomlyButton";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);
  if (!property) return { title: "Room Not Found" };
  return {
    title: `${property.name} — ${property.neighbourhood} | Stanza Living`,
    description: property.description,
  };
}

export default async function RoomDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);

  // Polished 404 State if slug is invalid
  if (!property) {
    return (
      <div className="min-h-screen bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream flex flex-col justify-between">
        <RoomlyNav />

        <main className="pt-36 pb-24 px-5 max-w-xl mx-auto w-full flex-grow flex flex-col items-center justify-center text-center gap-6">
          <div className="w-14 h-14 rounded-full bg-roomly-cream/80 flex items-center justify-center text-roomly-dark shadow-sm">
            <Sparkles className="w-6 h-6 text-roomly-green" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-roomly-dark">
              Room not found.
            </h1>
            <p className="text-sm text-roomly-muted leading-relaxed max-w-md">
              The residence you are looking for may have been leased or its
              address has been updated.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/rooms">
              <RoomlyButton
                variant="primary"
                size="lg"
                shape="pill"
                withArrow
                arrowStyle="circle"
                className="px-8 py-3.5 text-xs sm:text-sm font-semibold"
              >
                Explore available rooms
              </RoomlyButton>
            </Link>
          </div>
        </main>

        <RoomlyFooter />
      </div>
    );
  }

  return (
    <RoomDetailsClient
      property={property}
      allProperties={PROPERTIES}
    />
  );
}
