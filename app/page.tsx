"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black opacity-95" />

      <div className="relative z-10 max-w-5xl text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
        >
          Most people can buy a house.
          <br />
          <span className="text-zinc-400">
            Few can survive what comes after.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 text-xl text-zinc-500 max-w-3xl mx-auto"
        >
          HomeWise AI simulates your future financial pressure,
          stress load, lifestyle shifts and long-term stability
          before you buy a home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-14"
        >
          <Link
            href="/onboarding"
            className="px-10 py-5 rounded-full bg-white text-black text-lg font-semibold hover:scale-105 transition-all"
          >
            Simulate My Future
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
