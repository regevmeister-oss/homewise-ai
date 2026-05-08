export const regionProfiles: Record<string, any> = {
  "tel_aviv": {
    label: "תל אביב והמרכז",
    costMultiplier: 1.35,
    riskNote: "אזור יקר מאוד. גם הכנסה גבוהה עלולה להרגיש לחוצה בגלל מחיר הנכס ויוקר המחיה."
  },
  "haifa": {
    label: "חיפה",
    costMultiplier: 1.05,
    riskNote: "איזון טוב יחסית בין מחיר, תעסוקה ואיכות חיים."
  },
  "krayot": {
    label: "הקריות",
    costMultiplier: 0.92,
    riskNote: "אזור נגיש יותר מבחינת מחיר, אך חשוב לבדוק תחבורה ותעסוקה."
  },
  "north": {
    label: "צפון",
    costMultiplier: 0.88,
    riskNote: "מחירים נוחים יותר, אבל חשוב לחשב זמני נסיעה ותעסוקה."
  },
  "south": {
    label: "דרום",
    costMultiplier: 0.86,
    riskNote: "מחיר כניסה נמוך יותר, אך יש לבדוק יציבות תעסוקתית ותשתיות."
  },
  "jerusalem": {
    label: "ירושלים והסביבה",
    costMultiplier: 1.18,
    riskNote: "אזור עם ביקוש חזק, אך יוקר מחיה ומחירי נכסים יכולים להכביד."
  }
};

export function getRegionProfile(region?: string) {
  return regionProfiles[region || "haifa"] || regionProfiles.haifa;
}


