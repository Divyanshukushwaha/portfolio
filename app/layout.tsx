import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ThreeBackground from "@/components/ThreeBackground";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divyanshu Kushwaha — Portfolio",
  description: "Awwwards-grade portfolio of Divyanshu Kushwaha, a Computer Science Engineering student and Flutter developer specialized in premium UI/UX design, WebGL elements, and AI automation.",
  authors: [{ name: "Divyanshu Kushwaha" }],
  openGraph: {
    type: "website",
    title: "Divyanshu Kushwaha | Creative Developer & AI Engineer",
    description: "Handcrafted personal portfolio showing WebGL canvas objects, custom transitions, and SafeAura case study.",
    images: ["/assets/divyanshu_mountain.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="relative bg-background text-foreground antialiased overflow-x-hidden min-h-screen">
        {/* WebGL reflective canvas background */}
        <ThreeBackground />
        
        {/* Grain overlay for paper noise style */}
        <div className="grain-overlay" />
        
        {/* Custom morphing cursor */}
        <Cursor />

        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
