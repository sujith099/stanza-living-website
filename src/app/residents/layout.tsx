import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Residents | Stanza Living",
  description: "Resident portal, maintenance requests, rent payments, and concierge support for Stanza Living residents.",
};

export default function ResidentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
