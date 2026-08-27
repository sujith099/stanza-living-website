import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Stanza Living — Find your next stay",
    template: "%s | Stanza Living",
  },
  description:
    "Furnished rooms, managed student residences, and shared living spaces across India's top university and tech hubs.",
};

import { RoomlyAppProvider } from "@/context/RoomlyAppContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-roomly-bg text-roomly-dark selection:bg-roomly-green selection:text-roomly-cream">
        <RoomlyAppProvider>
          {children}
        </RoomlyAppProvider>
      </body>
    </html>
  );
}
