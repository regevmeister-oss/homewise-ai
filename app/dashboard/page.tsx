"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("homewise_result");

    if (!raw) {
      window.location.href = "/onboarding";
      return;
    }

    setResult(JSON.parse(raw));
  }, []);

  if (!result) return null;

  return (
    <main className="min-h-screen bg-transparent text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold">
          דשבורד עתיד כלכלי
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mt-14">
          <Metric label="ציון יכולת" value={`${result.score}%`} />
          <Metric label="עומס ממוצע" value={`${result.averageRatio}%`} />
          <Metric label="שיא עומס" value={`${result.worstRatio}%`} />
          <Metric label="שנים מסוכנות" value={`${result.dangerYears.length}`} />
        </div>

        <section className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-4xl font-bold">המלצת AI</h2>
            <p className="text-xl text-zinc-300 mt-6 leading-relaxed">
              {result.recommendation}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h2 className="text-4xl font-bold">מה המערכת בודקת?</h2>
            <ul className="text-xl text-zinc-300 mt-6 space-y-3">
              <li>• האם ההחזר החודשי ישרוד ילדים והוצאות חינוך</li>
              <li>• האם ההכנסה צפויה להדביק אינפלציה ועלויות בית</li>
              <li>• האם יש שנים שבהן המשפחה תגיע לאזור סכנה</li>
              <li>• האם נכון לקנות עכשיו, לחכות, או להקטין תקציב</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-7 rounded-3xl">
      <p className="text-zinc-400">{label}</p>
      <p className="text-4xl font-bold mt-4">{value}</p>
    </div>
  );
}



