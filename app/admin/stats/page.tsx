"use client";

import { useEffect, useState } from "react";

export default function StatsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics/visit")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <main className="min-h-screen text-white flex items-center justify-center px-6">
      <section className="w-full max-w-3xl rounded-[32px] border border-amber-200/25 bg-[#1b1328]/80 backdrop-blur-md p-10 shadow-2xl text-center">
        <p className="text-amber-200 tracking-[0.35em] uppercase text-xs">
          HomeWise Analytics
        </p>

        <h1 className="text-5xl font-bold mt-6">
          מעקב משתמשים
        </h1>

        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <Card
            label="כניסות כולל"
            value={stats ? stats.totalVisits : "..."}
          />

          <Card
            label="משתמשים ייחודיים"
            value={stats ? stats.uniqueVisitors : "..."}
          />
        </div>

        <p className="text-zinc-400 mt-8 text-sm">
          נתוני MVP פנימיים. בשלב production מומלץ להעביר ל־Database אמיתי.
        </p>
      </section>
    </main>
  );
}

function Card({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-3xl bg-black/25 border border-white/10 p-7">
      <p className="text-zinc-400">{label}</p>
      <p className="text-5xl font-bold text-amber-200 mt-4">{value}</p>
    </div>
  );
}


