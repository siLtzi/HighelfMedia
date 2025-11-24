import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";

const clashDisplay = localFont({
  src: [
    { path: "../../public/fonts/ClashDisplay/ClashDisplay-Regular.otf", weight: "400" },
    { path: "../../public/fonts/ClashDisplay/ClashDisplay-Semibold.otf", weight: "600" },
    { path: "../../public/fonts/ClashDisplay/ClashDisplay-Bold.otf", weight: "700" },
  ],
  variable: "--font-clash-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Highelf Media",
  description: "Highelf Media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          ${poppins.variable} ${clashDisplay.variable}
          antialiased bg-white/10 dark:bg-zinc-900/10
        `}
      >
        <SmoothScroll />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
