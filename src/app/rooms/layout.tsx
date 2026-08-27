import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find a Room | Stanza Living",
  description: "Search verified private and shared rooms by city, neighbourhood, budget, and amenities across India.",
};

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
