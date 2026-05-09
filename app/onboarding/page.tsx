"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    q: "מה הכי נכון לתאר את המצב הכלכלי שלך היום?",
    options: ["יציב ובשליטה", "סביר אבל רגיש", "לחוץ ולא צפוי", "אני לא באמת יודע/ת"],
  },
  {
    q: "אם ההכנסה תרד ב־20% לחצי שנה, מה יקרה?",
    options: ["נסתדר בלי שינוי גדול", "נצטרך לצמצם", "ניכנס ללחץ משמעותי", "זה עלול לשבור אותנו"],
  },
  {
    q: "מה הכי מפחיד אותך בקניית בית?",
    options: ["החזר חודשי גבוה", "איבוד חופש כלכלי", "הוצאות לא צפויות", "להיתקע עם החלטה לא נכונה"],
  },
  {
    q: "כמה כרית ביטחון יש לך אחרי הקנייה?",
    options: ["מעל שנה", "6–12 חודשים", "3–6 חודשים", "כמעט אין"],
  },
  {
    q: "איך ההכנסה שלך צפויה להשתנות בשנים הקרובות?",
    options: ["לעלות בביטחון", "כנראה לעלות", "להישאר דומה", "לא בטוח / עלולה לרדת"],
  },
  {
    q: "איזה שינוי חיים הכי סביר אצלך בעשור הקרוב?",
    options: ["ילדים / הרחבת משפחה", "שינוי קריירה", "מעבר מקום מגורים", "לא צפוי שינוי גדול"],
  },
  {
    q: "מה חשוב לך יותר אחרי קניית בית?",
    options: ["ביטחון ויציבות", "חופש וגמישות", "רמת חיים גבוהה", "שקט נפשי"],
  },
  {
    q: "איך אתה מקבל החלטות כלכליות גדולות?",
    options: ["מחושב וזהיר", "אופטימי אבל בודק", "לפי תחושת בטן", "נוטה לקחת סיכון"],
  },
  {
    q: "מה יקרה אם ההוצאות יעלו ב־3,000 ₪ בחודש?",
    options: ["עדיין נהיה בסדר", "נצמצם בילויים", "נפגע בחיסכון", "ניכנס למינוס"],
  },
  {
    q: "מה אתה רוצה ש־HomeWise יבדוק עבורך בעיקר?",
    options: ["האם הבית בטוח כלכלית", "כמה לחץ יהיה בעתיד", "מה לשנות כדי לשפר מצב", "האם כדאי לקנות או לחכות"],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = questions[step];

  function choose(option: string) {
    const updated = { ...answers, [current.q]: option };
    setAnswers(updated);

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        localStorage.setItem("homewise_answers", JSON.stringify(updated));
        router.push("/analyzing");
      }
    }, 250);
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white" dir="rtl">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/backgrounds/home-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-5xl rounded-[40px] border border-white/20 bg-white/10 p-8 text-center shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-2xl md:p-14">
          <div className="text-sm font-bold tracking-[0.4em] text-cyan-300">
            HOMEWISE AI
          </div>

          <div className="mt-8 text-zinc-300">
            שאלה {step + 1} מתוך {questions.length}
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            {current.q}
          </h1>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => choose(option)}
                className="rounded-3xl border border-white/20 bg-black/35 px-8 py-6 text-2xl font-bold text-white transition hover:scale-[1.02] hover:border-cyan-300 hover:bg-cyan-300/20"
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="rounded-full border border-white/20 px-10 py-4 text-xl font-bold text-white transition hover:bg-white/10"
              >
                חזור
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
