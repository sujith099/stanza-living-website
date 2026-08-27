import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations | Stanza Living",
  description: "Discover cities and vibrant student & tech neighbourhoods across Bengaluru, Hyderabad, Pune, and Delhi NCR.",
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
