"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  {
    id: "gender",
    type: "choice",
    question: "מי ממלא את השאלון?",
    options: ["גבר", "אישה"],
  },

  {
    id: "age",
    type: "choice",
    question: "בן/בת כמה את/ה?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "income",
    type: "choice",
    question: "מה ההכנסה החודשית נטו של משק הבית?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "income_stability",
    type: "choice",
    question: "עד כמה ההכנסה שלכם יציבה?",
    options: [
      "מאוד יציבה",
      "די יציבה",
      "משתנה לפעמים",
      "לא יציבה",
    ],
  },

  {
    id: "home_price",
    type: "choice",
    question: "מה שווי הבית שאתם רוצים לקנות?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "equity",
    type: "choice",
    question: "כמה הון עצמי יש לכם?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "mortgage",
    type: "choice",
    question: "מה גובה המשכנתא הצפויה?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "loans",
    type: "choice",
    question: "כמה החזרי הלוואות יש לכם בחודש?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "expenses",
    type: "choice",
    question: "מה ההוצאות החודשיות הקבועות שלכם?",
    options: ["נמוך", "בינוני", "גבוה", "גבוה מאוד"],
  },

  {
    id: "children",
    type: "choice",
    question: "כמה ילדים יש לכם היום?",
    options: [
      "0",
      "1",
      "2",
      "3",
      "4+",
    ],
  },

  {
    id: "future_children",
    type: "choice",
    question: "כמה ילדים נוספים אתם מתכננים?",
    options: [
      "0",
      "1",
      "2",
      "3+",
    ],
  },

  {
    id: "savings",
    type: "choice",
    question: "כמה כרית ביטחון תישאר אחרי הקנייה?",
    options: [
      "פחות מחודש",
      "1–3 חודשים",
      "3–6 חודשים",
      "יותר מחצי שנה",
    ],
  },

  {
    id: "career_risk",
    type: "choice",
    question: "כמה אתם חוששים מירידה בהכנסה בעתיד?",
    options: [
      "בכלל לא",
      "מעט",
      "די חושש/ת",
      "מאוד חושש/ת",
    ],
  },

  {
    id: "life_goal",
    type: "choice",
    question: "מה הכי חשוב לכם ב־30 השנים הקרובות?",
    options: [
      "יציבות",
      "חופש כלכלי",
      "רמת חיים גבוהה",
      "ביטחון למשפחה",
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const current = questions[step];

  function next(value: any) {
    const updated = {
      ...answers,
      [current.id]: value,
    };

    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "homewise_answers",
        JSON.stringify(updated)
      );

      router.push("/analyzing");
    }
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      dir="rtl"
    >

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('/backgrounds/home-bg.png')",
        }}
      />

      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div
          className="
            w-full
            max-w-5xl
            rounded-[40px]
            border
            border-white/20
            bg-white/10
            p-8
            md:p-14
            text-center
            backdrop-blur-2xl
            shadow-[0_0_60px_rgba(255,255,255,0.08)]
          "
        >

          {/* TOP */}
          <div className="text-sm font-bold tracking-[0.4em] text-cyan-300">
            HOMEWISE AI
          </div>

          <div className="mt-8 text-zinc-300">
            שאלה {step + 1} מתוך {questions.length}
          </div>

          {/* QUESTION */}
          <h1 className="mx-auto mt-8 max-w-4xl text-4xl md:text-6xl font-black leading-tight">
            {current.question}
          </h1>

          {/* CHOICE */}
          {current.type === "choice" && (
            <div className="mt-14 grid gap-5 md:grid-cols-2">

              {current.options?.map((option: string) => (
                <button
                  key={option}
                  onClick={() => next(option)}
                  className="
                    rounded-3xl
                    border
                    border-white/20
                    bg-black/35
                    px-8
                    py-6
                    text-2xl
                    font-bold
                    transition
                    hover:scale-[1.02]
                    hover:border-cyan-300
                    hover:bg-cyan-300/20
                  "
                >
                  {option}
                </button>
              ))}

            </div>
          )}

          {/* NUMBER */}
          

          {/* BACK */}
          {step > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setStep(step - 1)}
                className="
                  rounded-full
                  border
                  border-white/20
                  px-10
                  py-4
                  text-xl
                  font-bold
                  transition
                  hover:bg-white/10
                "
              >
                חזור
              </button>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}


