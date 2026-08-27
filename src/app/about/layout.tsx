import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Stanza Living",
  description: "A modern concept prototype exploring student residences, shared living, and managed housing across Indian metros.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
