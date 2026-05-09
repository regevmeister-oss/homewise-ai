export type Question = {
  id: string;
  text: string;
  type: "slider" | "choice";
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  category: string;
};

export const questions: Question[] = [
  {
    id: "income_stability",
    text: "עד כמה ההכנסה שלך יציבה לאורך זמן?",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    category: "stability",
  },

  {
    id: "financial_pressure",
    text: "אם תהיה ירידה של 20% בהכנסה — כמה החיים שלך יתערערו?",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    category: "pressure",
  },

  {
    id: "freedom_vs_stability",
    text: "מה חשוב לך יותר?",
    type: "choice",
    options: [
      "יציבות מוחלטת",
      "איזון",
      "חופש וגמישות"
    ],
    category: "personality",
  },

  {
    id: "children",
    text: "כמה ילדים אתה מתכנן בעתיד?",
    type: "slider",
    min: 0,
    max: 6,
    step: 1,
    category: "future",
  },

  {
    id: "risk",
    text: "מה מלחיץ אותך יותר?",
    type: "choice",
    options: [
      "לאבד כסף",
      "להרגיש תקוע",
      "לא להתקדם בחיים"
    ],
    category: "risk",
  },

  {
    id: "burnout",
    text: "כמה אתה מרגיש שאתה כבר קרוב לקצה כלכלית?",
    type: "slider",
    min: 1,
    max: 10,
    step: 1,
    category: "burnout",
  },

  {
    id: "career_change",
    text: "האם אתה חושב על שינוי קריירה בשנים הקרובות?",
    type: "choice",
    options: [
      "לא",
      "אולי",
      "כן"
    ],
    category: "future",
  },
];
