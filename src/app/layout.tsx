import type { Metadata } from "next";
import "./globals.css";
import SocialSidebar from "../components/SocialSidebar";
import FloatingControls from "../components/FloatingControls";

export const metadata: Metadata = {
  metadataBase: new URL("https://shyamkano-portfolio.vercel.app"),
  title: {
    default: "Ghanshyam Kanojiya (Shyamkano) | Software Architect & AI Researcher",
    template: "%s | Ghanshyam Kanojiya (Shyamkano)"
  },
  description: "Official portfolio of Ghanshyam Kanojiya (Shyamkano), a Software Architect, AI Researcher, and Full Stack Developer specializing in distributed backend systems, AI agents, and high-fidelity web applications.",
  keywords: [
    "Ghanshyam Kanojiya",
    "Ghanshyam",
    "Shyamkano",
    "Shyam Kanojiya",
    "Ghanshyam Kanojiya portfolio",
    "Shyamkano portfolio",
    "Software Architect",
    "AI Researcher",
    "Full Stack Developer",
    "Next.js developer",
    "LUMEN founder",
    "Groovli developer"
  ],
  authors: [{ name: "Ghanshyam Kanojiya", url: "https://shyamkano-portfolio.vercel.app" }],
  creator: "Ghanshyam Kanojiya",
  publisher: "Ghanshyam Kanojiya",
  alternates: {
    canonical: "https://shyamkano-portfolio.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shyamkano-portfolio.vercel.app",
    title: "Ghanshyam Kanojiya (Shyamkano) | Software Architect & AI Researcher",
    description: "Explore the projects, research papers, digital narratives, and technical expertise of Ghanshyam Kanojiya (Shyamkano).",
    siteName: "Ghanshyam Kanojiya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghanshyam Kanojiya (Shyamkano) | Software Architect & AI Researcher",
    description: "Explore the projects, research papers, digital narratives, and technical expertise of Ghanshyam Kanojiya (Shyamkano).",
    creator: "@shyamkano",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <div className="bg-grid"></div>
        <div className="bg-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
        <SocialSidebar />
        <FloatingControls />
        {children}
      </body>
    </html>
  );
}
