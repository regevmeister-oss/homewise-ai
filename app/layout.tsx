import type { Metadata } from "next";
import "./globals.css";
import RRLogo from "@/components/RRLogo";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "HomeWise AI",

  description:
    "AI system for forecasting financial stability and future pressure before buying a home.",

  verification: {
    google: "MZIyoRBjixk_eFnDus9vA30qqovOrpYnD8sDEZeyOe4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <RRLogo />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
