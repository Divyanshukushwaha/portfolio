import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ThreeBackground from "@/components/ThreeBackground";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  title: "Divyanshu | AI & Flutter Developer Portfolio",
  description: "I'm Divyanshu, a Computer Science Diploma student passionate about Flutter, Firebase, AI, Vibe Coding, and building real-world digital products. Explore my projects, certifications, and portfolio.",
  authors: [{ name: "Divyanshu" }],
  keywords: [
    "Divyanshu",
    "Flutter Developer",
    "AI Builder",
    "Vibe Coding",
    "Flutter",
    "Firebase",
    "Generative AI",
    "Portfolio",
    "App Developer",
    "Computer Science Student",
    "Mobile App Developer"
  ],
  alternates: {
    canonical: "https://divyanshu.vercel.app",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: "Divyanshu | AI & Flutter Developer Portfolio",
    description: "Explore Divyanshu's portfolio showcasing Flutter apps, AI projects, certifications, and modern development skills.",
    url: "https://divyanshu.vercel.app",
    siteName: "Divyanshu Portfolio",
    images: [
      {
        url: "/assets/divyanshu_mountain.jpg",
        width: 1200,
        height: 630,
        alt: "Divyanshu Profile Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyanshu | AI & Flutter Developer Portfolio",
    description: "Explore Divyanshu's portfolio showcasing Flutter apps, AI projects, certifications, and modern development skills.",
    images: ["/assets/divyanshu_mountain.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Divyanshu",
  "jobTitle": "Flutter Developer & AI Builder",
  "url": "https://divyanshu.vercel.app",
  "sameAs": [
    "https://github.com/Divyanshukushwaha",
    "https://www.linkedin.com/in/mr-divyanshu-314572242",
    "https://www.instagram.com/divyan_shu_kushwaha"
  ],
  "email": "mailto:divyanshukushawha39@gmail.com"
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
      <head>
        <meta name="theme-color" content="#050505" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative bg-background text-foreground antialiased overflow-x-hidden min-h-screen">
        {/* WebGL reflective canvas background */}
        <ThreeBackground />
        
        {/* Grain overlay for paper noise style */}
        <div className="grain-overlay" />
        
        {/* Custom morphing cursor */}
        <Cursor />

        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
