"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a_0%,#020617_35%,#000_100%)]" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500 blur-[180px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1 }}
          className="max-w-5xl"
        >
          <div className="mb-8 text-sm font-bold tracking-[0.4em] text-blue-300">
            HOMEWISE AI
          </div>

          <h1 className="text-5xl font-black leading-tight md:text-8xl">
            הבנק בודק אם אתה יכול לשלם היום.
            <br />
            <span className="text-blue-300">
              HomeWise בודק אם העתיד שלך ישרוד.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-2xl">
            מערכת AI שמדמה לחץ כלכלי עתידי לפני קניית בית:
            משכנתא, הוצאות חיים, סיכונים, יציבות וחופש כלכלי.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/result"
              className="rounded-full bg-white px-10 py-4 text-lg font-bold text-black transition hover:scale-105 hover:bg-blue-100"
            >
              התחל בדיקת עתיד
            </Link>

            <Link
              href="/mortgage-stress-test"
              className="rounded-full border border-white/20 px-10 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              איך זה עובד?
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
