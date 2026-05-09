"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1974&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/35" />

      {/* BLUR CONTAINER */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="
            w-full
            max-w-6xl
            rounded-[40px]
            border
            border-white/20
            bg-white/10
            backdrop-blur-2xl
            shadow-[0_0_60px_rgba(255,255,255,0.08)]
            p-8
            md:p-16
          "
        >

          {/* LOGO */}
          <div className="text-center">
            <div className="tracking-[0.45em] text-cyan-300 text-sm md:text-lg font-semibold">
              HOMEWISE AI
            </div>

            {/* TITLE */}
            <h1 className="mt-8 text-5xl md:text-8xl font-black leading-tight">
              האם את/ה באמת
              <br />
              יכול/ה לקנות בית?
            </h1>

            {/* SUBTITLE */}
            <p className="mt-8 text-zinc-200 text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto">
              מערכת AI שמנסה לחזות את החיים האמיתיים שלך בעוד
              5, 10 ו־30 שנה —
              לפני שאתה מתחייב לבית.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="
                rounded-3xl
                border
                border-white/20
                bg-white/5
                p-8
                backdrop-blur-xl
              "
            >
              <h3 className="text-cyan-300 text-2xl font-bold">
                תחזית AI
              </h3>

              <p className="mt-6 text-zinc-200 text-lg leading-relaxed">
                תחזית אישית לפי החיים העתידיים שלך.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="
                rounded-3xl
                border
                border-white/20
                bg-white/5
                p-8
                backdrop-blur-xl
              "
            >
              <h3 className="text-cyan-300 text-2xl font-bold">
                משכנתא ולחץ
              </h3>

              <p className="mt-6 text-zinc-200 text-lg leading-relaxed">
                בדיקה אם אפשר לשרוד את ההחזר לאורך שנים.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="
                rounded-3xl
                border
                border-white/20
                bg-white/5
                p-8
                backdrop-blur-xl
              "
            >
              <h3 className="text-cyan-300 text-2xl font-bold">
                ילדים ומשפחה
              </h3>

              <p className="mt-6 text-zinc-200 text-lg leading-relaxed">
                חינוך, ילדים ועלויות חיים עתידיות.
              </p>
            </motion.div>

          </div>

          {/* BUTTON */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/result"
              className="
                rounded-full
                bg-cyan-400
                px-12
                py-5
                text-2xl
                font-black
                text-black
                transition
                hover:scale-105
                hover:bg-cyan-300
              "
            >
              התחל סימולציה
            </Link>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
