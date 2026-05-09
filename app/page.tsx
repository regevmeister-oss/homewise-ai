"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white" dir="rtl">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/backgrounds/home-bg.png')" }}
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="w-full max-w-6xl rounded-[40px] border border-white/20 bg-white/10 p-8 text-center shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-2xl md:p-16"
        >
          <div className="text-sm font-semibold tracking-[0.45em] text-cyan-300 md:text-lg">
            HOMEWISE AI
          </div>

          <h1 className="mt-8 text-5xl font-black leading-tight md:text-8xl">
            האם את/ה באמת
            <br />
            יכול/ה לקנות בית?
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-relaxed text-zinc-200 md:text-3xl">
            מערכת AI שמנסה לחזות את החיים האמיתיים שלך בעוד 5, 10 ו־30 שנה —
            לפני שאתה מתחייב לבית.
          </p>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-cyan-300">תחזית AI</h3>
              <p className="mt-6 text-lg leading-relaxed text-zinc-200">
                תחזית אישית לפי החיים העתידיים שלך.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-cyan-300">משכנתא ולחץ</h3>
              <p className="mt-6 text-lg leading-relaxed text-zinc-200">
                בדיקה אם אפשר לשרוד את ההחזר לאורך שנים.
              </p>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-cyan-300">ילדים ומשפחה</h3>
              <p className="mt-6 text-lg leading-relaxed text-zinc-200">
                חינוך, ילדים ועלויות חיים עתידיות.
              </p>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              href="/onboarding"
              className="rounded-full bg-cyan-400 px-12 py-5 text-2xl font-black text-black transition hover:scale-105 hover:bg-cyan-300"
            >
              התחל שאלון
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}


