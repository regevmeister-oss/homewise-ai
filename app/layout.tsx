import type { Metadata } from "next";
import "./globals.css";
import RRLogo from "@/components/RRLogo";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "HomeWise AI",

  description:
    "AI system for forecasting financial stability and future pressure before buying a home.",

  verification: {
    google: "wGO71tIjzfs5mCOL5Vz3GQIDO4K3oEVa3twUGHFTP3Q",
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
