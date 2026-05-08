"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeThirtyYears } from "@/lib/financialEngine";

function money(v: any) {
  return `₪${Number(v || 0).toLocaleString("he-IL")}`;
}

function pct(v: any) {
  return `${Number(v || 0)}%`;
}

function Mini({ label, value, help }: { label: string; value: string; help?: string }) {
  return (
    <div className="rounded-2xl border border-[#E2D8C8] bg-[#FCFAF7] p-5 shadow-sm">
      <div className="text-sm font-semibold text-[#64748B]">{label}</div>
      <div className="mt-2 text-2xl font-bold text-[#1F2933]">{value}</div>
      {help && <div className="mt-2 text-sm leading-relaxed text-[#64748B]">{help}</div>}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 1000,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <div className="rounded-2xl border border-[#E2D8C8] bg-white/80 p-4">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-bold text-[#334155]">{label}</label>
        <div className="text-lg font-black text-[#1F2933]">{money(value)}</div>
      </div>

      <input
        type="range"
        min="0"
        max={Math.max(value * 2, 50000)}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full accent-[#0F766E]"
      />

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full rounded-xl border border-[#E2D8C8] bg-[#FAF7F2] px-4 py-2 text-right text-[#1F2933]"
      />
    </div>
  );
}

function ForecastGraph({ years }: { years: any[] }) {
  const points = years.slice(0, 30);
  const now = new Date().getFullYear();

  const maxValue = Math.max(
    ...points.map((y) => Number(y.totalMonthlyPressure || 0)),
    ...points.map((y) => Number(y.income || 0)),
    1
  );

  const xOf = (i: number) => 2 + (i / Math.max(points.length - 1, 1)) * 96;
  const yOf = (v: number) => 82 - (v / maxValue) * 64;

  const pressurePath = points.map((y, i) => {
    const x = xOf(i);
    const yy = yOf(Number(y.totalMonthlyPressure || 0));
    return `${i === 0 ? "M" : "L"} ${x} ${yy}`;
  }).join(" ");

  const incomePath = points.map((y, i) => {
    const x = xOf(i);
    const yy = yOf(Number(y.income || 0));
    return `${i === 0 ? "M" : "L"} ${x} ${yy}`;
  }).join(" ");

  return (
    <section className="rounded-3xl border border-[#E2D8C8] bg-[#FCFAF7] p-6 shadow-sm">
      <div className="text-sm tracking-[0.35em] text-[#64748B]">תחזית פיננסית</div>
      <h2 className="mt-3 text-3xl font-bold text-[#1F2933]">גרף תחזית ל־30 השנים הבאות</h2>

      <div className="mt-6 rounded-3xl border border-[#E2D8C8] bg-gradient-to-b from-white to-[#F6F1E8] p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-bold text-[#334155]">₪ לחודש</div>

          <div className="flex gap-5 text-sm font-medium text-[#334155]">
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-emerald-400" />הכנסה חזויה</div>
            <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-400" />לחץ חודשי כולל</div>
          </div>
        </div>

        <svg viewBox="0 0 100 92" className="h-[460px] w-full overflow-visible">
          <defs>
            <linearGradient id="incomeArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(52,211,153,0.20)" />
              <stop offset="100%" stopColor="rgba(52,211,153,0.02)" />
            </linearGradient>
            <linearGradient id="pressureArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(248,113,113,0.18)" />
              <stop offset="100%" stopColor="rgba(248,113,113,0.02)" />
            </linearGradient>
          </defs>

          {[18, 34, 50, 66, 82].map((y, i) => (
            <g key={i}>
              <line x1="2" y1={y} x2="98" y2={y} stroke="rgba(100,116,139,0.16)" strokeWidth="0.35" />
              <text x="0" y={y + 1} fontSize="3" fill="#64748B" textAnchor="middle">
                {Math.round((maxValue * (82 - y)) / 64 / 1000)}K
              </text>
            </g>
          ))}

          {[0, 5, 10, 15, 20, 25, 29].map((i) => (
            <g key={`year-${i}`}>
              <line x1={xOf(i)} y1="18" x2={xOf(i)} y2="82" stroke="rgba(100,116,139,0.09)" strokeWidth="0.25" />
              
            </g>
          ))}

          <path d={`${incomePath} L ${xOf(points.length - 1)} 82 L ${xOf(0)} 82 Z`} fill="url(#incomeArea)" />
          <path d={`${pressurePath} L ${xOf(points.length - 1)} 82 L ${xOf(0)} 82 Z`} fill="url(#pressureArea)" />

          <path d={incomePath} fill="none" stroke="rgb(16,185,129)" strokeWidth="1.25" strokeLinecap="round" />
          <path d={pressurePath} fill="none" stroke="rgb(248,113,113)" strokeWidth="1.25" strokeLinecap="round" />

          {points.map((y, i) => (
            <g key={i}>
              <circle cx={xOf(i)} cy={yOf(Number(y.income || 0))} r="0.85" fill="rgb(16,185,129)" />
              <circle cx={xOf(i)} cy={yOf(Number(y.totalMonthlyPressure || 0))} r="0.85" fill="rgb(248,113,113)" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [baseAnswers, setBaseAnswers] = useState<any>(null);
  const [answers, setAnswers] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("homewise_answers") || localStorage.getItem("answers");

    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setBaseAnswers(parsed);
      setAnswers(parsed);
    } catch {
      
    }
  }, []);

  const result = useMemo(() => {
    if (!answers) return null;
    try {
      return analyzeThirtyYears(answers);
    } catch {
      return null;
    }
  }, [answers]);

  function update(key: string, value: number) {
    setAnswers((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetOriginal() {
    setAnswers(baseAnswers);
  }

  function saveScenario() {
    localStorage.setItem("homewise_answers", JSON.stringify(answers));
  }

  function restart() {
    localStorage.clear();
    router.push("/onboarding");
  }

  if (!result || !answers) {
    return (
      <main className="min-h-screen bg-[#F4EFE6] text-[#1F2933] flex items-center justify-center">
        אין נתונים להצגה. חזור לשאלון.
      </main>
    );
  }

  const years = Array.isArray(result.years) ? result.years : [];
  const dangerYears = years.filter((y: any) => Number(y?.pressureRatio || 0) > 62);
  const freedom = Number(result.safePayment || 0) - Number(result.mortgagePayment || 0);

  return (
    <main className="min-h-screen bg-[#F4EFE6] px-4 py-6 text-[#1F2933]" dir="rtl">
      <div className="mx-auto max-w-[1500px] space-y-6">

        <section className="rounded-3xl border border-[#E2D8C8] bg-gradient-to-br from-white to-[#F8F3EA] p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm tracking-[0.35em] text-[#64748B]">HOMEWISE AI</div>
              <h1 className="mt-3 text-4xl font-black leading-tight text-[#1F2933]">
                איך אפשר לשפר את סיכויי הקנייה?
              </h1>
              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#64748B]">
                שנה את הנתונים וראה מיד איך ההחזר, העומס, החופש הכלכלי והתחזית ל־30 שנה משתנים.
              </p>
            </div>

            <button onClick={restart} className="rounded-full border border-[#F3B5B5] bg-[#FFF1F1] px-5 py-3 text-sm font-bold text-[#9F1239]">
              נקה נתונים והתחל מחדש
            </button>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-[#E2D8C8] bg-[#FCFAF7] p-6 shadow-sm">
            <div className="text-sm tracking-[0.35em] text-[#64748B]">סימולציה חיה</div>
            <h2 className="mt-3 text-2xl font-bold">שנה נתונים ובדוק שיפור</h2>

            <div className="mt-5 space-y-4">
              <Field label="מחיר נכס" value={Number(answers.propertyPrice || 0)} onChange={(v) => update("propertyPrice", v)} step={50000} />
              <Field label="הון עצמי" value={Number(answers.equity || 0)} onChange={(v) => update("equity", v)} step={25000} />
              <Field label="הכנסה חודשית" value={Number(answers.income || 0)} onChange={(v) => update("income", v)} step={1000} />
              <Field label="הכנסת בן/בת זוג" value={Number(answers.partnerIncome || 0)} onChange={(v) => update("partnerIncome", v)} step={1000} />
              <Field label="חיסכון זמין" value={Number(answers.savings || 0)} onChange={(v) => update("savings", v)} step={10000} />
              <Field label="הוצאות מחיה" value={Number(answers.lifestyleCost || 0)} onChange={(v) => update("lifestyleCost", v)} step={500} />
              <Field label="חובות חודשיים" value={Number(answers.debts || 0)} onChange={(v) => update("debts", v)} step={500} />
            </div>

            <div className="mt-5 grid gap-3">
              <button onClick={saveScenario} className="rounded-2xl bg-[#0F766E] px-5 py-3 font-bold text-white">
                שמור תרחיש חדש
              </button>

              <button onClick={resetOriginal} className="rounded-2xl border border-[#E2D8C8] bg-white px-5 py-3 font-bold text-[#334155]">
                חזור לנתונים המקוריים
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <section className="grid gap-4 md:grid-cols-4">
              <Mini label="ציון יציבות" value={String(result.score || 0)} help="ככל שהציון גבוה יותר, העסקה בטוחה יותר." />
              <Mini label="עומס ביחס להכנסה" value={pct(result.pressureRatio)} help="המדד המרכזי לשחיקת החופש הכלכלי." />
              <Mini label="החזר משכנתא" value={money(result.mortgagePayment)} help="החזר חודשי משוער לפי הנתונים." />
              <Mini label="מרווח חופשי" value={money(freedom)} help="פער בין החזר בטוח לבין ההחזר בפועל." />
            </section>

            <section className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
              <h2 className="text-2xl font-bold text-orange-800">
                הבית צורך {Math.min(100, Math.max(0, Number(result.pressureRatio || 0)))}% מהחופש הכלכלי שלכם
              </h2>
              <p className="mt-3 text-[#64748B]">
                נסה להוריד מחיר נכס, להגדיל הון עצמי, להקטין חובות או להפחית הוצאות מחיה —
                ותראה מיד מה הכי משפר את הסיכויים.
              </p>
            </section>

            <ForecastGraph years={years} />
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E2D8C8] bg-[#FCFAF7] p-6">
            <h2 className="text-2xl font-bold">מה משפר את הסיכויים?</h2>
            <div className="mt-4 space-y-3 text-[#64748B]">
              <p>• הורדת מחיר הנכס מקטינה את ההלוואה ואת ההחזר החודשי.</p>
              <p>• הגדלת הון עצמי מקטינה סיכון ומעלה את ציון היציבות.</p>
              <p>• הקטנת חובות חודשיים מגדילה את מרווח הנשימה.</p>
              <p>• הפחתת הוצאות מחיה משפרת את התחזית לאורך שנים.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#E2D8C8] bg-[#FCFAF7] p-6">
            <h2 className="text-2xl font-bold">המלצה לפי הנתונים הנוכחיים</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#475569]">{result.recommendation}</p>
            <div className="mt-4 text-[#64748B]">שנות סכנה בתחזית: {dangerYears.length}</div>
          </div>
        </section>

      </div>
    </main>
  );
}


