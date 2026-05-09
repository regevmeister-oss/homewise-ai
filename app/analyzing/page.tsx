"use client";

import { useEffect } from "react";

export default function AnalyzingPage() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = "/mortgage-stress-test";
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center px-6">
      <div className="text-center max-w-4xl">
        <div className="w-24 h-24 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />

        <h1 className="text-5xl md:text-7xl font-bold mt-10">
          מחשב את העתיד הכלכלי שלך...
        </h1>

        <p className="text-zinc-300 text-xl mt-8">
          המערכת בונה תחזית של 30 שנה: הכנסות, ילדים, מסים, תחזוקה,
          משכנתא, חינוך, סיכון תעסוקתי ולחץ חודשי.
        </p>
      </div>
    </main>
  );
}




