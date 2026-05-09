"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaExclamationTriangle, FaShieldAlt, FaChartLine } from "react-icons/fa";

export default function ResultPage() {
  const stressScore = 81;
  const freedomScore = 42;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-500 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black leading-tight md:text-8xl">
            תמונת העתיד
            <br />
            הכלכלי שלך
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-zinc-400">
            HomeWise מנתח לא רק אם אפשר לקנות היום —
            אלא האם החיים שלך יישארו יציבים גם בעתיד.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="rounded-3xl border border-red-500/20 bg-white/5 p-10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-red-400">
              <FaExclamationTriangle />
              ציון לחץ עתידי
            </div>

            <div className="mt-8 text-8xl font-black text-red-400">
              <CountUp end={stressScore} duration={3} />%
            </div>

            <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stressScore}%` }}
                transition={{ duration: 2 }}
                className="h-full bg-red-500"
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-zinc-300">
              לפי הסימולציה, המבנה הכלכלי הנוכחי עלול ליצור לחץ משמעותי
              בשנים הקרובות במקרה של עליית הוצאות, שינוי הכנסה או אירועי חיים.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="rounded-3xl border border-emerald-500/20 bg-white/5 p-10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 text-xl font-bold text-emerald-400">
              <FaShieldAlt />
              ציון חופש כלכלי
            </div>

            <div className="mt-8 text-8xl font-black text-emerald-400">
              <CountUp end={freedomScore} duration={3} />%
            </div>

            <div className="mt-6 h-4 w-full overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${freedomScore}%` }}
                transition={{ duration: 2 }}
                className="h-full bg-emerald-500"
              />
            </div>

            <p className="mt-8 text-lg leading-relaxed text-zinc-300">
              רמת הגמישות העתידית שלך עשויה להצטמצם בגלל תלות גבוהה בהכנסה
              קבועה, החזר משכנתא והוצאות חיים משתנות.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-10"
        >
          <div className="flex items-center gap-3 text-2xl font-bold">
            <FaChartLine />
            ציר זמן של לחץ עתידי
          </div>

          <div className="mt-16 flex h-[250px] items-end justify-between">
            {[
              ["2026", 80, "bg-emerald-500"],
              ["2028", 130, "bg-yellow-500"],
              ["2031", 180, "bg-orange-500"],
              ["2035", 230, "bg-red-500"],
            ].map(([year, height, color]) => (
              <div key={year} className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: Number(height) }}
                  transition={{ duration: 1.5 }}
                  className={`w-16 rounded-t-2xl ${color}`}
                />
                <div className="mt-4 text-zinc-400">{year}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 text-center">
          <div className="text-xl text-zinc-500">מסקנת AI</div>
          <div className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            ייתכן שאתה יכול לקנות את הבית היום.
            <br />
            אבל היציבות העתידית שלך דורשת זהירות.
          </div>
        </div>
      </div>
    </main>
  );
}
