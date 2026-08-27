import React from "react";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import { BookingClient } from "@/components/booking";
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
  if (!property) return { title: "Reserve Room" };
  return {
    title: `Reserve ${property.name} — ${property.neighbourhood} | Stanza Living`,
    description: `Book your room at ${property.name}.`,
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);

  // Custom 404 Fallback
  if (!property) {
    return (
      <div className="min-h-screen bg-roomly-bg text-roomly-dark flex flex-col items-center justify-center p-6 text-center gap-4">
        <h1 className="font-display font-bold text-3xl">Room not found.</h1>
        <p className="text-sm text-roomly-muted max-w-sm">
          The property or room you requested does not exist or may have been relocated.
        </p>
        <Link href="/rooms">
          <RoomlyButton variant="primary" size="md" shape="pill">
            Back to rooms →
          </RoomlyButton>
        </Link>
      </div>
    );
  }

  return <BookingClient property={property} />;
}
