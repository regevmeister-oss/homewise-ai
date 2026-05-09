"use client";

import { useMemo, useState } from "react";

export default function ResultPage() {
  const [income, setIncome] = useState(22000);
  const [mortgage, setMortgage] = useState(7800);
  const [expenses, setExpenses] = useState(9500);
  const [children, setChildren] = useState(2);
  const [savings, setSavings] = useState(180000);

  const years = [2026, 2028, 2030, 2032, 2035];

  const data = useMemo(() => {
    return years.map((year, i) => {
      const inflation = 1 + i * 0.08;
      const childCost = children * 1800 * inflation;
      const futureExpenses = expenses * inflation + childCost;
      const futureMortgage = mortgage * (1 + i * 0.035);
      const futureIncome = income * (1 + i * 0.035);
      const monthlyPressure = futureMortgage + futureExpenses - futureIncome;
      const stress = Math.min(
        100,
        Math.max(5, Math.round(((futureMortgage + futureExpenses) / futureIncome) * 70))
      );

      return {
        year,
        stress,
        pressure: Math.round(monthlyPressure),
      };
    });
  }, [income, mortgage, expenses, children]);

  const avgStress = Math.round(data.reduce((a, b) => a + b.stress, 0) / data.length);
  const freedomScore = Math.max(0, 100 - avgStress + Math.min(20, Math.floor(savings / 50000)));

  const suggestions = [
    {
      title: "הורדת החזר המשכנתא",
      text: "הפחתה של 1,000–1,500 ₪ בהחזר החודשי יכולה לשפר משמעותית את ציון הלחץ העתידי.",
    },
    {
      title: "הגדלת כרית ביטחון",
      text: "חיסכון נוסף מקטין את הסיכון בתקופות של שינוי הכנסה, ילדים או עליית מחירים.",
    },
    {
      title: "בדיקת תרחיש שמרני",
      text: "נסה להזין הכנסה נמוכה יותר או הוצאות גבוהות יותר כדי לראות אם הבית עדיין בטוח עבורך.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <section className="text-center">
          <div className="text-cyan-300 tracking-[0.4em] text-sm font-bold">
            HOMEWISE AI
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
            ניתוח העתיד הכלכלי שלך
          </h1>

          <p className="mt-6 text-zinc-400 text-xl">
            שנה נתונים וראה בזמן אמת מה יכול לשפר את המצב.
          </p>
        </section>

        <section className="mt-14 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-3xl font-black">שינוי נתונים</h2>

            <div className="mt-8 space-y-6">
              <Field label="הכנסה חודשית נטו" value={income} setValue={setIncome} min={8000} max={60000} step={500} />
              <Field label="החזר משכנתא חודשי" value={mortgage} setValue={setMortgage} min={2000} max={25000} step={250} />
              <Field label="הוצאות חודשיות" value={expenses} setValue={setExpenses} min={3000} max={30000} step={250} />
              <Field label="מספר ילדים" value={children} setValue={setChildren} min={0} max={6} step={1} />
              <Field label="חיסכון / כרית ביטחון" value={savings} setValue={setSavings} min={0} max={1000000} step={10000} />
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <Score title="ציון לחץ עתידי" value={avgStress} danger />
              <Score title="ציון חופש כלכלי" value={freedomScore} />
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-black">גרף לחץ עתידי</h2>

              <div className="mt-8 flex h-[280px] items-end justify-between gap-4 border-b border-white/20 pb-4">
                {data.map((item) => (
                  <div key={item.year} className="flex flex-1 flex-col items-center">
                    <div className="mb-3 text-sm text-zinc-400">{item.stress}%</div>
                    <div
                      className={`w-full max-w-[80px] rounded-t-2xl ${
                        item.stress > 75
                          ? "bg-red-500"
                          : item.stress > 55
                          ? "bg-yellow-400"
                          : "bg-emerald-400"
                      }`}
                      style={{ height: `${Math.max(20, item.stress * 2.2)}px` }}
                    />
                    <div className="mt-4 text-zinc-300">{item.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-3xl bg-black/40 p-8 border border-white/10">
              <h2 className="text-3xl font-black">מה אפשר לשנות?</h2>

              <div className="mt-6 grid md:grid-cols-3 gap-5">
                {suggestions.map((s) => (
                  <div key={s.title} className="rounded-2xl bg-white/5 p-5 border border-white/10">
                    <h3 className="text-cyan-300 font-bold text-xl">{s.title}</h3>
                    <p className="mt-3 text-zinc-300 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, setValue, min, max, step }: any) {
  return (
    <label className="block">
      <div className="flex justify-between text-zinc-300 mb-2">
        <span>{label}</span>
        <span className="font-bold text-white">{Number(value).toLocaleString("he-IL")}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

function Score({ title, value, danger = false }: any) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-8">
      <div className="text-zinc-400 text-lg">{title}</div>
      <div className={`mt-4 text-7xl font-black ${danger ? "text-red-400" : "text-emerald-400"}`}>
        {value}%
      </div>
    </div>
  );
}
