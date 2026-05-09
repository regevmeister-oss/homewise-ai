"use client";

import { useEffect, useMemo, useState } from "react";

type Answers = Record<string, string>;

function valueFromRange(text: string | undefined, fallback: number) {
  if (!text) return fallback;

  if (text.includes("מעל 45")) return 50000;
  if (text.includes("30,000") || text.includes("30–45")) return 37000;
  if (text.includes("20,000") || text.includes("20–30")) return 25000;
  if (text.includes("12,000") || text.includes("12–20")) return 16000;
  if (text.includes("עד 12")) return 10000;

  if (text.includes("מעל 6 מיליון")) return 6500000;
  if (text.includes("4–6")) return 5000000;
  if (text.includes("2.5–4") || text.includes("2.2–3")) return 3200000;
  if (text.includes("1.5–2.5") || text.includes("1.5–2.2")) return 2000000;
  if (text.includes("עד 1.5")) return 1300000;

  if (text.includes("מעל 5 מיליון")) return 5500000;
  if (text.includes("3–5")) return 4000000;
  if (text.includes("1.5–3")) return 2200000;
  if (text.includes("800 אלף")) return 1100000;
  if (text.includes("500–800")) return 650000;
  if (text.includes("250–500")) return 375000;
  if (text.includes("עד 250")) return 200000;

  return fallback;
}

function riskPoints(text: string | undefined) {
  if (!text) return 0;
  if (text.includes("גבוה") || text.includes("לא יציבה") || text.includes("קשה") || text.includes("סיכון")) return 18;
  if (text.includes("בינוני") || text.includes("אולי") || text.includes("חלקית")) return 10;
  if (text.includes("נמוך") || text.includes("יציבה") || text.includes("טוב") || text.includes("לא")) return 3;
  return 7;
}

export default function ResultPage() {
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    const raw = localStorage.getItem("homewise_answers");
    if (raw) setAnswers(JSON.parse(raw));
  }, []);

  const income = valueFromRange(answers.monthly_income || answers.income, 22000);
  const homePrice = valueFromRange(answers.homePrice || answers.home_price, 2400000);
  const equity = valueFromRange(answers.equity, 600000);
  const mortgage = Math.max(homePrice - equity, 0);

  const baseRisk =
    riskPoints(answers.jobStability || answers.income_stability) +
    riskPoints(answers.existingLoans || answers.current_loans) +
    riskPoints(answers.transport) +
    riskPoints(answers.education) +
    riskPoints(answers.monthlyExpenses || answers.monthly_expenses) +
    riskPoints(answers.emergency || answers.emergency_fund) +
    riskPoints(answers.careerRisk || answers.career_risk);

  const monthlyMortgage = Math.round(mortgage * 0.0052);
  const loadRatio = Math.round((monthlyMortgage / Math.max(income, 1)) * 100);
  const stressScore = Math.min(96, Math.max(12, loadRatio + baseRisk));
  const freedomScore = Math.max(4, 100 - stressScore);

  const timeline = useMemo(() => {
    return Array.from({ length: 31 }, (_, year) => {
      const incomeGrowth = income * Math.pow(1.025, year);
      const expenseGrowth = income * 0.48 * Math.pow(1.035, year);
      const childPressure = year > 2 ? income * 0.08 : 0;
      const mortgagePressure = monthlyMortgage * Math.pow(1.012, year);
      const pressure = Math.round(((expenseGrowth + childPressure + mortgagePressure) / incomeGrowth) * 100);
      return {
        year: 2026 + year,
        score: Math.min(100, Math.max(10, pressure)),
      };
    });
  }, [income, monthlyMortgage]);

  const insights = [
    stressScore > 75
      ? "המערכת מזהה סיכון גבוה ללחץ כלכלי עתידי. הקנייה אפשרית, אבל עלולה לצמצם משמעותית את החופש הכלכלי."
      : "המערכת מזהה עומס סביר, אך עדיין כדאי לבדוק תרחישי לחץ לפני התחייבות ארוכת טווח.",
    loadRatio > 35
      ? "החזר המשכנתא ביחס להכנסה גבוה. מומלץ להקטין החזר חודשי או להגדיל הון עצמי."
      : "יחס ההחזר להכנסה נראה סביר יחסית, אך יש לבדוק הוצאות ילדים, תחבורה ושינויים בהכנסה.",
    equity / homePrice < 0.3
      ? "ההון העצמי נמוך יחסית למחיר הבית. זה מגדיל תלות במשכנתא ובריבית."
      : "ההון העצמי נותן בסיס טוב יותר ומקטין את הסיכון העתידי.",
  ];

  const improvements = [
    "להגדיל הון עצמי לפני רכישה.",
    "להקטין את מחיר הבית או לבחור אזור זול יותר.",
    "להפחית הלוואות קיימות לפני לקיחת משכנתא.",
    "לשמור כרית ביטחון של לפחות 6 חודשי הוצאות.",
    "לבנות תרחיש שמרני עם ילד נוסף, עליית ריבית וירידה זמנית בהכנסה.",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-12 text-white print:bg-white print:text-black" dir="rtl">
      <div className="absolute inset-0 bg-cover bg-center scale-105 print:hidden" style={{ backgroundImage: "url('/backgrounds/home-bg.png')" }} />
      <div className="absolute inset-0 bg-black/45 print:hidden" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <section className="rounded-[40px] border border-white/20 bg-black/45 p-10 backdrop-blur-2xl print:border-black print:bg-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-cyan-300 font-bold tracking-[0.4em] print:text-black">HOMEWISE AI</div>
              <h1 className="mt-4 text-5xl font-black">דוח ניתוח רכישת בית</h1>
              <p className="mt-3 text-zinc-300 print:text-black">תחזית עומס כלכלי ל־30 שנה קדימה</p>
            </div>

            <button onClick={() => window.print()} className="rounded-full bg-white px-8 py-4 font-black text-black print:hidden">
              גרסה להדפסה
            </button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card title="ציון לחץ עתידי" value={`${stressScore}%`} danger />
            <Card title="חופש כלכלי" value={`${freedomScore}%`} />
            <Card title="החזר משוער" value={`${monthlyMortgage.toLocaleString("he-IL")} ₪`} />
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-black">גרף מצב כלכלי ל־30 שנה</h2>
            <div className="mt-8 flex h-[280px] items-end gap-1 border-b border-white/20 pb-4">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex flex-1 flex-col items-center">
                  <div
                    className={item.score > 80 ? "bg-red-500" : item.score > 60 ? "bg-yellow-400" : "bg-emerald-400"}
                    style={{ height: `${item.score * 2.2}px`, width: "100%", borderRadius: "12px 12px 0 0" }}
                  />
                  {i % 5 === 0 && <span className="mt-2 text-xs">{item.year}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <section>
              <h2 className="text-3xl font-black">תובנות חכמות</h2>
              <div className="mt-5 space-y-4">
                {insights.map((x) => (
                  <p key={x} className="rounded-2xl bg-white/10 p-5 leading-relaxed print:border print:border-black print:bg-white">{x}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black">מה אפשר לשפר?</h2>
              <div className="mt-5 space-y-4">
                {improvements.map((x) => (
                  <p key={x} className="rounded-2xl bg-cyan-400/15 p-5 leading-relaxed print:border print:border-black print:bg-white">{x}</p>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ title, value, danger = false }: { title: string; value: string; danger?: boolean }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-8 print:border-black print:bg-white">
      <div className="text-zinc-300 print:text-black">{title}</div>
      <div className={`mt-4 text-6xl font-black ${danger ? "text-red-400" : "text-emerald-400"} print:text-black`}>
        {value}
      </div>
    </div>
  );
}
