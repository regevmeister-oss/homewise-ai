"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaExclamationTriangle,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";

export default function ResultPage() {
  const stressScore = 81;
  const freedomScore = 42;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black opacity-100" />

      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-red-500 blur-[180px]" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-emerald-500 blur-[180px]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
            Your Future
            <br />
            Financial Reality
          </h1>

          <p className="mt-8 text-zinc-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Banks check if you can survive today.
            <br />
            HomeWise checks if your future survives.
          </p>
        </motion.div>

        {/* SCORES */}
        <div className="grid md:grid-cols-2 gap-8 mt-24">

          {/* STRESS SCORE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="bg-white/5 border border-red-500/20 rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(255,0,0,0.15)]"
          >
            <div className="flex items-center gap-3 text-red-400 text-xl font-semibold">
              <FaExclamationTriangle />
              Future Stress Score
            </div>

            <div className="mt-8 text-8xl font-black text-red-400">
              <CountUp end={stressScore} duration={3} />%
            </div>

            <div className="mt-6 h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stressScore}%` }}
                transition={{ duration: 2 }}
                className="h-full bg-red-500"
              />
            </div>

            <p className="mt-8 text-zinc-300 leading-relaxed text-lg">
              Your current financial structure may create
              long-term pressure under future economic shifts,
              lifestyle changes, or income instability.
            </p>
          </motion.div>

          {/* FREEDOM SCORE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="bg-white/5 border border-emerald-500/20 rounded-3xl p-10 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,150,0.15)]"
          >
            <div className="flex items-center gap-3 text-emerald-400 text-xl font-semibold">
              <FaShieldAlt />
              Freedom Score
            </div>

            <div className="mt-8 text-8xl font-black text-emerald-400">
              <CountUp end={freedomScore} duration={3} />%
            </div>

            <div className="mt-6 h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${freedomScore}%` }}
                transition={{ duration: 2 }}
                className="h-full bg-emerald-500"
              />
            </div>

            <p className="mt-8 text-zinc-300 leading-relaxed text-lg">
              Your future flexibility may decrease over time
              due to mortgage dependency and rising long-term expenses.
            </p>
          </motion.div>
        </div>

        {/* TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 bg-white/5 rounded-3xl p-10 border border-white/10"
        >
          <div className="flex items-center gap-3 text-2xl font-bold">
            <FaChartLine />
            Future Pressure Timeline
          </div>

          <div className="mt-16 flex justify-between items-end h-[250px]">

            <div className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 1 }}
                className="w-16 rounded-t-2xl bg-emerald-500"
              />
              <div className="mt-4 text-zinc-400">2026</div>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 130 }}
                transition={{ duration: 1.3 }}
                className="w-16 rounded-t-2xl bg-yellow-500"
              />
              <div className="mt-4 text-zinc-400">2028</div>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 180 }}
                transition={{ duration: 1.6 }}
                className="w-16 rounded-t-2xl bg-orange-500"
              />
              <div className="mt-4 text-zinc-400">2031</div>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 230 }}
                transition={{ duration: 2 }}
                className="w-16 rounded-t-2xl bg-red-500"
              />
              <div className="mt-4 text-zinc-400">2035</div>
            </div>

          </div>
        </motion.div>

        {/* FINAL WARNING */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 2 }}
          className="mt-24 text-center"
        >
          <div className="text-zinc-500 text-xl">
            AI Forecast Conclusion
          </div>

          <div className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            You may afford this home today.
            <br />
            But your future stability is at risk.
          </div>
        </motion.div>

      </div>
    </main>
  );
}
