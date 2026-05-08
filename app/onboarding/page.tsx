"use client";

import { useState } from "react";

const baseQuestions = [
  {
    key: "profileGender",
    title: "מי ממלא/ת את הנתונים?",
    explanation: "זה עוזר להתאים שאלות כמו חופשת לידה, ירידה זמנית בהכנסה ותכנון משפחתי.",
    options: [
      { label: "גבר", value: "male" },
      { label: "אישה", value: "female" },
      { label: "זוג יחד", value: "couple" }
    ]
  },
  {
    key: "age",
    title: "מה טווח הגיל שלך?",
    explanation: "הגיל עוזר לחשב אופק עבודה, חסכון ומשכנתא.",
    options: [
      { label: "25–30", value: 28 },
      { label: "31–35", value: 33 },
      { label: "36–40", value: 38 },
      { label: "41–50", value: 45 }
    ]
  },
  {
    key: "income",
    title: "מה ההכנסה החודשית נטו שלך?",
    explanation: "סכום שנכנס לחשבון אחרי מסים והפרשות.",
    options: [
      { label: "עד ₪7,500", value: 7000 },
      { label: "₪7,500–10,000", value: 8750 },
      { label: "₪10,000–13,000", value: 11500 },
      { label: "₪13,000–16,000", value: 14500 },
      { label: "₪16,000–20,000", value: 18000 },
      { label: "₪20,000–25,000", value: 22500 },
      { label: "₪25,000–35,000", value: 30000 },
      { label: "מעל ₪35,000", value: 42000 }
    ]
  },
  {
    key: "partnerIncome",
    title: "מה ההכנסה החודשית נטו של בן/בת הזוג?",
    explanation: "בן/בת הזוג יכולים להרוויח גם יותר ממך. זה משנה את התחזית המשפחתית.",
    options: [
      { label: "אין", value: 0 },
      { label: "עד ₪7,500", value: 7000 },
      { label: "₪7,500–10,000", value: 8750 },
      { label: "₪10,000–13,000", value: 11500 },
      { label: "₪13,000–17,000", value: 15000 },
      { label: "₪17,000–22,000", value: 19500 },
      { label: "₪22,000–28,000", value: 25000 },
      { label: "₪28,000–35,000", value: 31500 },
      { label: "₪35,000–45,000", value: 40000 },
      { label: "מעל ₪45,000", value: 52000 }
    ]
  },
  {
    key: "savings",
    title: "כמה חסכונות נזילים יש לכם?",
    explanation: "כסף זמין לשימוש, לא כולל פנסיה לא נזילה.",
    options: [
      { label: "עד ₪50,000", value: 35000 },
      { label: "₪50,000–100,000", value: 75000 },
      { label: "₪100,000–200,000", value: 150000 },
      { label: "₪200,000–350,000", value: 275000 },
      { label: "₪350,000–600,000", value: 475000 },
      { label: "₪600,000–900,000", value: 750000 },
      { label: "₪900,000–1,500,000", value: 1200000 },
      { label: "₪1,500,000–2,000,000", value: 1750000 },
      { label: "₪2,000,000–3,000,000", value: 2500000 },
      { label: "₪3,000,000–4,000,000", value: 3500000 },
      { label: "₪4,000,000–5,000,000", value: 4500000 },
      { label: "מעל ₪5,000,000", value: 5500000 }
    ]
  },
  {
    key: "equity",
    title: "כמה הון עצמי מיועד לבית?",
    explanation: "כמה באמת תשימו בקנייה בלי לרוקן את כל הביטחון.",
    options: [
      { label: "עד ₪200,000", value: 160000 },
      { label: "₪200,000–350,000", value: 275000 },
      { label: "₪350,000–500,000", value: 425000 },
      { label: "₪500,000–750,000", value: 625000 },
      { label: "₪750,000–1,000,000", value: 875000 },
      { label: "₪1,000,000–1,500,000", value: 1250000 },
      { label: "₪1,500,000–2,000,000", value: 1750000 },
      { label: "₪2,000,000–3,000,000", value: 2500000 },
      { label: "₪3,000,000–4,000,000", value: 3500000 },
      { label: "₪4,000,000–5,000,000", value: 4500000 },
      { label: "מעל ₪5,000,000", value: 5500000 }
    ]
  },
  {
    key: "propertyPrice",
    title: "מה מחיר הנכס שאתם שוקלים?",
    explanation: "אפשר לבחור טווח משוער לפי האזור והחלום.",
    options: [
      { label: "עד ₪1.2M", value: 1100000 },
      { label: "₪1.2M–1.6M", value: 1400000 },
      { label: "₪1.6M–2M", value: 1800000 },
      { label: "₪2M–2.5M", value: 2250000 },
      { label: "₪2.5M–3.2M", value: 2850000 },
      { label: "₪3.2M–4M", value: 3600000 },
      { label: "מעל ₪4M", value: 4500000 }
    ]
  },
  {
    key: "debts",
    title: "הלוואות קיימות בחודש?",
    explanation: "כולל רכב, אשראי, בנק ותשלומים קבועים.",
    options: [
      { label: "אין", value: 0 },
      { label: "עד ₪1,500", value: 1000 },
      { label: "₪1,500–4,000", value: 2800 },
      { label: "מעל ₪4,000", value: 5000 }
    ]
  },
  {
    key: "childrenNow",
    title: "כמה ילדים יש היום?",
    explanation: "ילדים משפיעים מאוד על הוצאות חינוך, מזון וחיים.",
    options: [
      { label: "0", value: 0 },
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3+", value: 3 }
    ]
  },
  {
    key: "childrenPlanned",
    title: "כמה ילדים נוספים מתוכננים?",
    explanation: "כאן נזהה את העלייה העתידית בהוצאות.",
    options: [
      { label: "0", value: 0 },
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3+", value: 3 }
    ]
  },
  {
    key: "firstChildInYears",
    title: "מתי צפויה הרחבת משפחה?",
    explanation: "זה משפיע על השנים שבהן הלחץ הכלכלי עולה.",
    options: [
      { label: "תוך שנה", value: 1 },
      { label: "2–3 שנים", value: 2 },
      { label: "4–6 שנים", value: 5 },
      { label: "לא צפוי", value: 30 }
    ]
  },
  {
    key: "educationType",
    title: "איזה חינוך סביר שתבחרו?",
    explanation: "חינוך פרטי משנה מאוד את התחזית.",
    options: [
      { label: "ציבורי", value: "public" },
      { label: "ציבורי עם הרבה תוספות", value: "semi" },
      { label: "פרטי", value: "private" }
    ]
  },
  {
    key: "salaryGrowth",
    title: "מה קצב צמיחת ההכנסה?",
    explanation: "הערכה שמרנית טובה יותר מתחזית אופטימית.",
    options: [
      { label: "כמעט לא תגדל", value: 0 },
      { label: "1%–2% בשנה", value: 1.5 },
      { label: "3%–4% בשנה", value: 3.5 },
      { label: "5%+ בשנה", value: 5.5 }
    ]
  },
  {
    key: "jobSecurity",
    title: "עד כמה ההכנסה יציבה?",
    explanation: "עצמאי, שכיר קבוע או הכנסה משתנה — סיכון אחר.",
    options: [
      { label: "יציבה מאוד", value: "high" },
      { label: "בינונית", value: "medium" },
      { label: "לא יציבה", value: "low" }
    ]
  },
  {
    key: "carExpenses",
    title: "עלות רכב/תחבורה בחודש?",
    explanation: "דלק, ביטוח, טיפולים, ליסינג ותחבורה.",
    options: [
      { label: "עד ₪1,000", value: 800 },
      { label: "₪1,000–2,500", value: 1800 },
      { label: "₪2,500–4,000", value: 3200 },
      { label: "מעל ₪4,000", value: 4800 }
    ]
  },
  {
    key: "supportFamily",
    title: "תמיכה כלכלית במשפחה?",
    explanation: "עזרה קבועה להורים או משפחה משפיעה על היכולת.",
    options: [
      { label: "אין", value: 0 },
      { label: "עד ₪1,000", value: 700 },
      { label: "₪1,000–3,000", value: 2000 },
      { label: "מעל ₪3,000", value: 4000 }
    ]
  },
  {
    key: "lifestyleCost",
    title: "הוצאות מחיה מעבר לדיור?",
    explanation: "מזון, בילויים, בריאות, חוגים, קניות וחיים.",
    options: [
      { label: "עד ₪5,000", value: 4500 },
      { label: "₪5,000–8,000", value: 6500 },
      { label: "₪8,000–11,000", value: 9500 },
      { label: "₪11,000–15,000", value: 13000 },
      { label: "₪15,000–20,000", value: 17500 },
      { label: "מעל ₪20,000", value: 23000 }
    ]
  },
  {
    key: "maintenanceLevel",
    title: "איזה סוג נכס?",
    explanation: "בית פרטי יקר יותר לתחזוקה מדירה.",
    options: [
      { label: "דירה פשוטה", value: "low" },
      { label: "דירה גדולה / בית רגיל", value: "medium" },
      { label: "בית פרטי", value: "high" }
    ]
  },
  {
    key: "parentalHelp",
    title: "האם צפויה עזרה כספית מהמשפחה?",
    explanation: "עזרה חד־פעמית או חודשית יכולה להקטין את הסיכון הראשוני.",
    options: [
      { label: "לא צפויה", value: 0 },
      { label: "עד ₪50,000", value: 50000 },
      { label: "₪50,000–150,000", value: 100000 },
      { label: "מעל ₪150,000", value: 200000 }
    ]
  },
  {
    key: "renovationNeed",
    title: "האם הנכס ידרוש שיפוץ?",
    explanation: "שיפוץ אחרי קנייה הוא גורם נפוץ לחריגה תקציבית.",
    options: [
      { label: "לא", value: 0 },
      { label: "שיפוץ קל", value: 50000 },
      { label: "שיפוץ בינוני", value: 150000 },
      { label: "שיפוץ כבד", value: 300000 }
    ]
  },
  {
    key: "emergencyComfort",
    title: "כמה חודשי ביטחון חשוב להשאיר?",
    explanation: "ככל שצריך יותר ביטחון, ההמלצה תהיה שמרנית יותר.",
    options: [
      { label: "3 חודשים", value: 3 },
      { label: "6 חודשים", value: 6 },
      { label: "9 חודשים", value: 9 },
      { label: "12 חודשים ומעלה", value: 12 }
    ]
  },
  {
    key: "careerChangeRisk",
    title: "האם צפוי שינוי קריירה ב־5 השנים הקרובות?",
    explanation: "שינוי מקצוע, פתיחת עסק או מעבר עבודה יכולים לשנות הכנסה וסיכון.",
    options: [
      { label: "לא צפוי", value: "none" },
      { label: "ייתכן מעבר עבודה", value: "job_change" },
      { label: "ייתכן מעבר לעצמאות", value: "self_employed" },
      { label: "לא בטוח", value: "unknown" }
    ]
  },
  {
    key: "homePurpose",
    title: "מה המטרה העיקרית של הבית?",
    explanation: "בית למגורים, השקעה או איכות חיים מייצרים החלטות שונות.",
    options: [
      { label: "מגורים לטווח ארוך", value: "living" },
      { label: "שיפור איכות חיים", value: "lifestyle" },
      { label: "השקעה", value: "investment" },
      { label: "ביטחון למשפחה", value: "security" }
    ]
  },
  {
    key: "region",
    title: "באיזה אזור אתם שוקלים לקנות?",
    explanation: "אזור הקנייה משפיע על מחיר, יוקר מחיה, תחבורה וסיכון עתידי.",
    options: [
      { label: "תל אביב והמרכז", value: "tel_aviv" },
      { label: "חיפה", value: "haifa" },
      { label: "הקריות", value: "krayot" },
      { label: "צפון", value: "north" },
      { label: "דרום", value: "south" },
      { label: "ירושלים והסביבה", value: "jerusalem" }
    ]
  },
  {
    key: "homePath",
    title: "מה אתם מתכננים לעשות?",
    explanation: "קניית דירה ובניית בית הן החלטות שונות לחלוטין מבחינת סיכון, חריגות ותקציב.",
    options: [
      { label: "לקנות דירה", value: "buy_apartment" },
      { label: "לקנות בית מוכן", value: "buy_house" },
      { label: "לבנות בית", value: "build_house" },
      { label: "עדיין לא בטוחים", value: "unknown" }
    ]
  },
  {
    key: "biggestFear",
    title: "מה הכי מפחיד אתכם בקניית בית?",
    explanation: "המערכת תשתמש בזה כדי להציג המלצה שמתאימה גם לאופי שלכם, לא רק למספרים.",
    options: [
      { label: "לקרוס כלכלית", value: "collapse" },
      { label: "לשלם יותר מדי", value: "overpay" },
      { label: "להיתקע באזור לא נכון", value: "wrong_area" },
      { label: "לאבד חופש", value: "lose_freedom" },
      { label: "לפספס הזדמנות", value: "miss_out" }
    ]
  },
  {
    key: "riskLevel",
    title: "איך אתם עם סיכון כלכלי?",
    explanation: "המערכת מתאימה המלצה גם לאופי שלכם.",
    options: [
      { label: "צריך ביטחון גבוה", value: "low" },
      { label: "מוכן לסיכון סביר", value: "medium" },
      { label: "מוכן לסיכון גבוה", value: "high" }
    ]
  }
];

const femaleOnlyQuestions = [
  {
    key: "maternityLeavePlan",
    title: "האם צפויה חופשת לידה בשנים הקרובות?",
    explanation: "חופשת לידה יכולה ליצור ירידה זמנית בהכנסה ועלייה בהוצאות.",
    options: [
      { label: "לא צפויה", value: "none" },
      { label: "כן, חופשה קצרה", value: "short" },
      { label: "כן, 4–6 חודשים", value: "medium" },
      { label: "כן, מעל חצי שנה", value: "long" }
    ]
  },
  {
    key: "returnToWorkAfterBirth",
    title: "אחרי לידה, איך צפויה החזרה לעבודה?",
    explanation: "חזרה חלקית או ירידה בשעות עבודה משפיעה על השנים הראשונות.",
    options: [
      { label: "חזרה מלאה", value: "full" },
      { label: "חזרה חלקית זמנית", value: "partial_temp" },
      { label: "חזרה חלקית ארוכה", value: "partial_long" },
      { label: "לא בטוחה", value: "unknown" }
    ]
  }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});

  const questions =
    answers.profileGender === "female"
      ? [...baseQuestions, ...femaleOnlyQuestions]
      : baseQuestions;

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const selected = answers[q.key];

  function choose(value: any) {

    const updatedAnswers = {
      ...answers,
      [q.key]: value
    };

    setAnswers(updatedAnswers);

    setTimeout(() => {

      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        localStorage.setItem(
          "homewise_answers",
          JSON.stringify(updatedAnswers)
        );

        window.location.href = "/analyzing";
      }

    }, 180);
  }

  function next() {
    if (selected === undefined) return;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("homewise_answers", JSON.stringify(answers));
      window.location.href = "/analyzing";
    }
  }

  return (
    <main className="min-h-screen text-white flex items-center justify-center px-4 py-5">
      <div className="w-full max-w-xl w-full rounded-[24px] border border-white/10 bg-transparent/85 backdrop-blur-md shadow-2xl p-5 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-cyan-300 text-xs font-bold">
              שאלה {step + 1} מתוך {questions.length}
            </p>
            <p className="text-zinc-300 text-[11px] mt-1">
              תחזית יכולת כלכלית ל־30 שנה
            </p>
          </div>

          <div className="text-lg font-bold text-cyan-300">
            {Math.round(progress)}%
          </div>
        </div>

        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
          {q.title}
        </h1>

        <p className="mt-3 text-sm md:text-base text-zinc-300 leading-relaxed">
          {q.explanation}
        </p>

        <div className="mt-6 grid gap-3">
          {q.options.map((option: any) => {
            const isActive = selected === option.value;

            return (
              <button
                key={option.label}
                onClick={() => choose(option.value)}
                className={`w-full text-right rounded-2xl border p-4 text-base font-semibold transition ${
                  isActive
                    ? "bg-cyan-300 text-black border-cyan-200 shadow-[0_0_30px_rgba(103,232,249,0.35)]"
                    : "bg-white/10 border-white/15 text-white hover:border-cyan-300 hover:bg-white/15"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-white/5 transition text-sm"
          >
            חזור
          </button>

          <button
            onClick={next}
            disabled={selected === undefined}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition disabled:opacity-40 text-sm"
          >
            {step === questions.length - 1 ? "חשב תחזית" : "המשך"}
          </button>
        </div>
      </div>
    </main>
  );
}












