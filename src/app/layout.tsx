import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit as requested for modern look
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import PageTransition from "@/components/PageTransition";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NelioSoft | Modern Digital Solutions",
  description: "NelioSoft is a team of university students creating modern websites and online solutions for growing businesses.",
  keywords: ["web development", "design", "startup", "neliosoft", "digital agency"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <LanguageProvider>
          <PageTransition />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
