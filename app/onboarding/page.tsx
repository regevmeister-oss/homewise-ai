"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { q: "מי ממלא/ת את הבדיקה?", o: ["גבר", "אישה", "זוג / משק בית משותף", "מעדיף/ה לא לציין"] },
  { q: "מה טווח הגיל שלך?", o: ["עד 25", "26–35", "36–45", "46–55", "56+"] },
  { q: "באיזה אזור בארץ נמצא הבית?", o: ["מרכז", "תל אביב והסביבה", "השרון", "ירושלים", "חיפה והצפון", "השפלה", "דרום", "יהודה ושומרון"] },
  { q: "עד כמה חשוב לכם להישאר יציבים כלכלית גם במקרה של עליית ריבית או ירידה בהכנסה?", o: ["קריטי — אני לא רוצה לקחת סיכון", "חשוב מאוד — מעדיף יציבות על פני סיכון", "מוכן לקחת סיכון מחושב בשביל בית טוב יותר", "מעדיף למתוח את הגבול כדי לקנות עכשיו"] },
  { q: "מה מחיר הבית שאתם רוצים לקנות?", o: ["עד 1.5 מיליון ₪", "1.5–2.2 מיליון ₪", "2.2–3 מיליון ₪", "3–4 מיליון ₪", "מעל 4 מיליון ₪"] },
  { q: "כמה הון עצמי יש לכם?", o: ["עד 250 אלף ₪", "250–500 אלף ₪", "500–800 אלף ₪", "800 אלף–1.5 מיליון ₪", "1.5–3 מיליון ₪", "3–5 מיליון ₪", "מעל 5 מיליון ₪"] },
  { q: "איזה אחוז ממחיר הבית מגיע מהון עצמי?", o: ["פחות מ־20%", "20%–30%", "30%–40%", "40%–50%", "50%–70%", "70%–90%", "90%–100%"] },
  { q: "מה גובה המשכנתא הצפויה?", o: ["עד 800 אלף ₪", "800 אלף–1.2 מיליון ₪", "1.2–1.8 מיליון ₪", "1.8–2.5 מיליון ₪", "מעל 2.5 מיליון ₪"] },
  { q: "מה ההחזר החודשי הצפוי?", o: ["עד 4,000 ₪", "4,000–6,500 ₪", "6,500–9,000 ₪", "9,000–12,000 ₪", "מעל 12,000 ₪"] },
  { q: "מה ההכנסה החודשית נטו של משק הבית?", o: ["עד 12,000 ₪", "12,000–20,000 ₪", "20,000–30,000 ₪", "30,000–45,000 ₪", "מעל 45,000 ₪"] },
  { q: "עד כמה ההכנסה שלכם יציבה?", o: ["מאוד יציבה", "די יציבה", "משתנה לפעמים", "לא יציבה"] },
  { q: "כמה אתם משלמים היום על הלוואות קיימות בחודש?", o: ["אין הלוואות", "עד 1,500 ₪", "1,500–3,500 ₪", "3,500–6,000 ₪", "מעל 6,000 ₪"] },
  { q: "מה סך החובות / מינוס / אשראי שלכם כרגע?", o: ["אין", "עד 25 אלף ₪", "25–75 אלף ₪", "75–150 אלף ₪", "מעל 150 אלף ₪"] },
  { q: "מה ההוצאות החודשיות הקבועות שלכם בלי משכנתא?", o: ["עד 8,000 ₪", "8,000–13,000 ₪", "13,000–18,000 ₪", "18,000–25,000 ₪", "מעל 25,000 ₪"] },
  { q: "כמה ילדים יש לכם היום?", o: ["0", "1", "2", "3", "4+"] },
  { q: "כמה ילדים נוספים אתם מתכננים בעשור הקרוב?", o: ["0", "1", "2", "3+"] },
  { q: "מה עלות חודשית צפויה לילדים / חינוך / גנים?", o: ["עד 1,500 ₪", "1,500–3,500 ₪", "3,500–6,000 ₪", "6,000–9,000 ₪", "מעל 9,000 ₪"] },
  { q: "כמה רכבים יש או יהיו במשק הבית?", o: ["0", "1", "2", "3+"] },
  { q: "מה עלות תחבורה חודשית צפויה?", o: ["עד 1,000 ₪", "1,000–2,500 ₪", "2,500–4,500 ₪", "4,500 ₪+"] },
  { q: "כמה כסף יישאר בצד אחרי הקנייה?", o: ["כמעט כלום", "עד 50 אלף ₪", "50–150 אלף ₪", "150–300 אלף ₪", "מעל 300 אלף ₪"] },
  { q: "אם אחד מבני הבית מאבד עבודה ל־6 חודשים — מה קורה?", o: ["יש כרית ביטחון", "נשרוד בקושי", "נצטרך הלוואה", "סיכון גבוה לקריסה"] },
  { q: "אם ההחזר יעלה ב־1,500 ₪ בחודש — מה יקרה?", o: ["עדיין נסתדר", "נצמצם הוצאות", "נפגע בחיסכון", "ניכנס ללחץ / מינוס"] },
  { q: "האם צפוי שינוי קריירה / עסק / לימודים ב־10 השנים הקרובות?", o: ["לא", "אולי", "כן, מתוכנן", "כן, ויש סיכון הכנסה"] },
  { q: "מה הכי חשוב לכם אחרי הקנייה?", o: ["יציבות", "חופש כלכלי", "רמת חיים", "ביטחון לילדים", "בית גדול יותר"] },
  { q: "במבט 30 שנה קדימה, מה ייחשב הצלחה?", o: ["לסיים משכנתא בלי להיחנק", "לשמור על חופש וחיים טובים", "להגדיל נכסים", "לתת לילדים ביטחון", "לא להצטער על הקנייה"] },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[step];

  function choose(option: string) {
    const updated = { ...answers, [current.q]: option };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("homewise_answers", JSON.stringify(updated));
      router.push("/analyzing");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white" dir="rtl">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/backgrounds/home-bg.png')" }} />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl rounded-[40px] border border-white/20 bg-white/10 p-8 text-center shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-2xl md:p-14">
          <div className="text-sm font-bold tracking-[0.4em] text-cyan-300">HOMEWISE AI</div>
          <div className="mt-8 text-zinc-300">שאלה {step + 1} מתוך {questions.length}</div>

          <div className="mx-auto mt-4 h-2 max-w-xl overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-cyan-300 transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {current.q}
          </h1>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {current.o.map((option) => (
              <button
                key={option}
                onClick={() => choose(option)}
                className="rounded-3xl border border-white/20 bg-black/35 px-8 py-6 text-2xl font-bold transition hover:scale-[1.02] hover:border-cyan-300 hover:bg-cyan-300/20"
              >
                {option}
              </button>
            ))}
          </div>

          {step > 0 && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setStep(step - 1)} className="rounded-full border border-white/20 px-10 py-4 text-xl font-bold hover:bg-white/10">
                חזור
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}



