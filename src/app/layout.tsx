import type { Metadata } from "next";
import "./globals.css";
import SocialSidebar from "../components/SocialSidebar";
import CustomCursor from "../components/CustomCursor";
import FloatingControls from "../components/FloatingControls";

export const metadata: Metadata = {
  title: "Shyamkano | Portfolio",
  description: "A premium developer portfolio built with Next.js and Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ cursor: 'none' }} suppressHydrationWarning>
        <CustomCursor />
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
