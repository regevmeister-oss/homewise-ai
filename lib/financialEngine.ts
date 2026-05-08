export type Answers = {
  income: number;
  partnerIncome: number;
  savings: number;
  equity: number;
  propertyPrice: number;
  debts: number;
  lifestyleCost: number;
  childrenNow: number;
  childrenPlanned: number;
  jobSecurity: string;
  riskLevel: string;
  salaryGrowth: number;
  age?: number;
};

function num(v: any) {
  return Number(v || 0);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function mortgageCalc(
  propertyPrice: number,
  equity: number,
  interest = 0.052
) {
  const loan = Math.max(0, propertyPrice - equity);

  const monthlyInterest = interest / 12;
  const months = 360;

  if (loan <= 0) {
    return {
      loanAmount: 0,
      payment: 0,
    };
  }

  const payment =
    loan *
    (
      monthlyInterest *
      Math.pow(1 + monthlyInterest, months)
    ) /
    (
      Math.pow(1 + monthlyInterest, months) - 1
    );

  return {
    loanAmount: Math.round(loan),
    payment: Math.round(payment),
  };
}

export function analyzeThirtyYears(a: Answers) {

  const income =
    num(a.income) +
    num(a.partnerIncome);

  const savings =
    num(a.savings);

  const equity =
    num(a.equity);

  const propertyPrice =
    num(a.propertyPrice);

  const debts =
    num(a.debts);

  const lifestyle =
    num(a.lifestyleCost);

  const children =
    num(a.childrenNow) +
    num(a.childrenPlanned);

  const mortgage =
    mortgageCalc(
      propertyPrice,
      equity
    );

  const years = [];

  let avgPressure = 0;
  let maxPressure = 0;

  for (let year = 1; year <= 30; year++) {

    const inflation =
      Math.pow(1.028, year);

    const projectedIncome =
      income *
      Math.pow(
        1 + num(a.salaryGrowth) / 100,
        year
      );

    const childrenCost =
      children * 2200 * inflation;

    const lifestyleCost =
      lifestyle * inflation;

    const monthlyPressure =
      mortgage.payment +
      debts +
      childrenCost +
      lifestyleCost;

    const ratio =
      projectedIncome > 0
        ? monthlyPressure / projectedIncome
        : 1;

    avgPressure += ratio;

    if (ratio > maxPressure) {
      maxPressure = ratio;
    }

    let narrative =
      "המשפחה נמצאת באזור יציב יחסית.";

    if (ratio > 0.35) {
      narrative =
        "ההוצאות מתחילות להשפיע על רמת החופש הכלכלי.";
    }

    if (ratio > 0.48) {
      narrative =
        "הלחץ הכלכלי מתחיל להיות מורגש בחיי היומיום.";
    }

    if (ratio > 0.62) {
      narrative =
        "המשפחה נכנסת לאזור רגיש שבו כל שינוי כלכלי עלול להפוך למשבר.";
    }

    years.push({
      year,

      income:
        Math.round(projectedIncome),

      mortgage:
        mortgage.payment,

      childrenCost:
        Math.round(childrenCost),

      totalMonthlyPressure:
        Math.round(monthlyPressure),

      pressureRatio:
        Math.round(ratio * 100),

      narrative,
    });
  }

  avgPressure =
    avgPressure / 30;

  let score = 72;

  if (avgPressure < 0.35) {
    score += 15;
  }

  if (avgPressure > 0.55) {
    score -= 20;
  }

  if (equity / Math.max(propertyPrice,1) > 0.35) {
    score += 10;
  }

  score =
    clamp(
      Math.round(score),
      15,
      96
    );

  const emotionalStress =
    Math.min(
      100,
      Math.round(avgPressure * 120)
    );

  const freedomScore =
    clamp(
      100 - emotionalStress,
      5,
      100
    );

  const fragilityScore =
    clamp(
      Math.round(maxPressure * 100),
      5,
      100
    );

  const peaceOfMind =
    clamp(
      Math.round(
        freedomScore * 0.7 +
        (savings / Math.max(income,1)) * 10
      ),
      5,
      100
    );

  return {

    score,

    recommendation:
      score >= 78
        ? "לפי הנתונים שלכם, הקנייה נראית אפשרית — כל עוד תשמרו כרית ביטחון."
        : score >= 58
        ? "אפשר לרכוש את הנכס, אך העתיד הכלכלי יהיה רגיש לשינויים."
        : "כרגע הסיכון הכלכלי העתידי גבוה מדי.",

    mortgagePayment:
      mortgage.payment,

    optimisticMortgagePayment:
      Math.round(
        mortgage.payment * 0.88
      ),

    stressMortgagePayment:
      Math.round(
        mortgage.payment * 1.22
      ),

    pressureRatio:
      Math.round(avgPressure * 100),

    emotionalStress,

    freedomScore,

    fragilityScore,

    peaceOfMind,

    safePayment:
      Math.round(income * 0.3),

    years,

    emotionalTimeline:
      years.map((y: any) => ({
        year: y.year,
        pressure: y.pressureRatio,
        narrative: y.narrative,
      })),

    strengths: [
      "בדיקה עתידית ל־30 שנה",
      "סימולציית לחץ כלכלי",
      "בדיקת עומס חודשי עתידי",
    ],

    weaknesses:
      avgPressure > 0.55
        ? [
            "רמת לחץ עתידית גבוהה",
            "רגישות גבוהה לשינויים כלכליים",
          ]
        : [
            "יש לשמור כרית ביטחון",
          ],

    actions: [
      {
        title:
          "כמה חודשי ביטחון חשוב להשאיר?",
        text:
          "כרית ביטחון של 6–12 חודשי מחיה יכולה לעזור למשפחה להתמודד עם עליית ריבית, ירידה בהכנסה או תקופות לחץ.",
        impact: "קריטי",
      },
    ],
  };
}


