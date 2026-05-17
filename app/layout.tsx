import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import MobileStickyCtaBar from "@/components/MobileStickyCtaBar";
import HashScrollManager from "@/components/ui/HashScrollManager";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Template 4]",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen bg-[color:var(--color-brand-dark)] text-white antialiased font-body">
        <HashScrollManager />
        <Navbar />
        <main className="pb-20 md:pb-0">{children}</main>
        <MobileStickyCtaBar />
      </body>
    </html>
  );
}
