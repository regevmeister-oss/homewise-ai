"use client";

import { useEffect, useMemo, useState } from "react";

export default function ResultPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [income, setIncome] = useState(22000);
  const [homePrice, setHomePrice] = useState(2400000);
  const [equity, setEquity] = useState(600000);
  const [mortgagePayment, setMortgagePayment] = useState(7800);
  const [expenses, setExpenses] = useState(9500);
  const [loans, setLoans] = useState(1500);
  const [children, setChildren] = useState(2);
  const [childCosts, setChildCosts] = useState(3500);
  const [transport, setTransport] = useState(2500);
  const [savings, setSavings] = useState(180000);
  const [interestShock, setInterestShock] = useState(1.5);
  const [housingGrowth, setHousingGrowth] = useState(3);

  useEffect(() => {
    const raw = localStorage.getItem("homewise_answers");
    if (raw) setAnswers(JSON.parse(raw));
  }, []);

  const mortgageAmount = Math.max(homePrice - equity, 0);
  const equityPercent = Math.round((equity / Math.max(homePrice, 1)) * 100);

  const timeline = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const futureIncome = income * Math.pow(1.025, i);
      const futureExpenses =
        (expenses + loans + transport + childCosts + children * 1200) *
        Math.pow(1.035, i);

      const futureMortgage =
        mortgagePayment * Math.pow(1 + interestShock / 100, i / 5);

      const pressure = Math.round(
        ((futureExpenses + futureMortgage) / Math.max(futureIncome, 1)) * 100
      );

      return {
        year: 2026 + i,
        pressure: Math.min(100, Math.max(10, pressure)),
      };
    });
  }, [income, mortgagePayment, expenses, loans, children, childCosts, transport, interestShock]);

  const avgPressure = Math.round(
    timeline.reduce((sum, x) => sum + x.pressure, 0) / timeline.length
  );

  const stressScore = Math.min(
    98,
    Math.max(
      5,
      avgPressure +
        (equityPercent < 25 ? 12 : 0) +
        (savings < expenses * 6 ? 10 : 0)
    )
  );

  const freedomScore = Math.max(2, 100 - stressScore);

  const insights = [
    equityPercent < 30
      ? "ההון העצמי נמוך יחסית למחיר הבית. הגדלת ההון העצמי תקטין את המשכנתא, את ההחזר ואת הסיכון העתידי."
      : "ההון העצמי שלך נותן בסיס טוב יותר לעסקה ומקטין תלות בריבית.",

    mortgagePayment / Math.max(income, 1) > 0.35
      ? "החזר המשכנתא גבוה ביחס להכנסה. מומלץ לבדוק בית זול יותר, פריסה אחרת או הגדלת הון עצמי."
      : "יחס ההחזר להכנסה נראה סביר, אך עדיין צריך לבדוק הוצאות ילדים, תחבורה ושינויים עתידיים.",

    savings < expenses * 6
      ? "כרית הביטחון נמוכה. לפני רכישה מומלץ לשמור לפחות 6 חודשי הוצאות בצד."
      : "כרית הביטחון טובה יחסית ומאפשרת להתמודד טוב יותר עם הפתעות.",

    children > 1
      ? "הוצאות ילדים וחינוך הן אחד הגורמים המשמעותיים ביותר ב־30 שנה קדימה. כדאי לחשב גנים, חוגים, לימודים ותחבורה."
      : "גם אם אין הרבה ילדים היום, כדאי לבדוק תרחיש של הרחבת משפחה לפני התחייבות למשכנתא.",
  ];

  const recommendations = [
    "בדוק/י מחיר בית נמוך ב־5%–10% והשווה את הירידה בציון הלחץ.",
    "נסה/י להגדיל הון עצמי ולראות איך ההחזר והגרף משתפרים.",
    "הפחת/י הלוואות קיימות לפני לקיחת משכנתא.",
    "השאר/י כרית ביטחון של לפחות 6 חודשי הוצאות.",
    "בדוק/י תרחיש שמרני: ריבית עולה, ילד נוסף, והכנסה שלא גדלה.",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-12 text-white" dir="rtl">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/backgrounds/home-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <section className="rounded-[40px] border border-white/20 bg-black/45 p-10 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-bold tracking-[0.4em] text-cyan-300">
                HOMEWISE AI
              </div>
              <h1 className="mt-4 text-5xl font-black">דוח ניתוח רכישת בית</h1>
              <p className="mt-3 text-zinc-300">
                שנה נתונים וראה איך מצבך הכלכלי משתנה ל־30 שנה קדימה.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="rounded-full bg-white px-8 py-4 font-black text-black"
            >
              גרסה להדפסה
            </button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <Card title="ציון לחץ עתידי" value={`${stressScore}%`} danger />
            <Card title="חופש כלכלי" value={`${freedomScore}%`} />
            <Card title="משכנתא משוערת" value={`${mortgageAmount.toLocaleString("he-IL")} ₪`} />
            <Card title="הון עצמי" value={`${equityPercent}%`} />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/10 p-8">
              <h2 className="text-3xl font-black">שינוי נתונים</h2>

              <div className="mt-8 space-y-6">
                <Field label="הכנסה חודשית נטו" value={income} setValue={setIncome} min={8000} max={70000} step={500} />
                <Field label="מחיר הבית" value={homePrice} setValue={setHomePrice} min={800000} max={8000000} step={50000} />
                <Field label="שווי הון עצמי" value={equity} setValue={setEquity} min={0} max={5000000} step={25000} />
                <Field label="החזר משכנתא חודשי" value={mortgagePayment} setValue={setMortgagePayment} min={2000} max={25000} step={250} />
                <Field label="הוצאות שוטפות" value={expenses} setValue={setExpenses} min={3000} max={35000} step={250} />
                <Field label="הלוואות חודשיות" value={loans} setValue={setLoans} min={0} max={20000} step={250} />
                <Field label="מספר ילדים" value={children} setValue={setChildren} min={0} max={7} step={1} />
                <Field label="גנים / לימודי ילדים" value={childCosts} setValue={setChildCosts} min={0} max={15000} step={250} />
                <Field label="תחבורה חודשית" value={transport} setValue={setTransport} min={0} max={12000} step={250} />
                <Field label="חיסכון / כרית ביטחון" value={savings} setValue={setSavings} min={0} max={1000000} step={10000} />
                <Field label="עליית ריבית עתידית" value={interestShock} setValue={setInterestShock} min={0} max={5} step={0.25} />
                <Field label="עליית מחירי דיור שנתית" value={housingGrowth} setValue={setHousingGrowth} min={0} max={10} step={0.5} />
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/10 p-8">
              <h2 className="text-3xl font-black">גרף מצב כלכלי ל־30 שנה</h2>

              <div className="mt-8 flex h-[300px] items-end gap-1 border-b border-white/20 pb-4">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex flex-1 flex-col items-center">
                    <div
                      className={
                        item.pressure > 80
                          ? "bg-red-500"
                          : item.pressure > 60
                          ? "bg-yellow-400"
                          : "bg-emerald-400"
                      }
                      style={{
                        height: `${item.pressure * 2.2}px`,
                        width: "100%",
                        borderRadius: "12px 12px 0 0",
                      }}
                    />
                    {i % 5 === 0 && (
                      <span className="mt-2 text-xs text-zinc-300">{item.year}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <Info title="תובנות חכמות" items={insights} />
                <Info title="מה אפשר לשפר?" items={recommendations} />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, value, setValue, min, max, step }: any) {
  return (
    <label className="block">
      <div className="mb-2 flex justify-between gap-4 text-zinc-200">
        <span>{label}</span>
        <span className="font-black text-white">{Number(value).toLocaleString("he-IL")}</span>
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

function Card({ title, value, danger = false }: any) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-7">
      <div className="text-zinc-300">{title}</div>
      <div className={`mt-4 text-5xl font-black ${danger ? "text-red-400" : "text-emerald-400"}`}>
        {value}
      </div>
    </div>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((x) => (
          <div key={x} className="rounded-2xl bg-black/35 p-4 leading-relaxed text-zinc-100">
            {x}
          </div>
        ))}
      </div>
    </div>
  );
}
