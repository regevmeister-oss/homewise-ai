import type { Metadata } from "next";
import "./globals.css";
import RRLogo from "@/components/RRLogo";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "HomeWise AI | בדיקת עתיד כלכלי לפני קניית בית",
  description:
    "מערכת AI שמדמה לחץ כלכלי עתידי, יציבות וחופש כלכלי לפני קניית בית.",
  verification: {
    google: "MZIyoRBjixk_eFnDus9vA30qqovOrpY",
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
