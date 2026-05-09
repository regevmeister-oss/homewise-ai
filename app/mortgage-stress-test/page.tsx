export const metadata = {
  title: "בדיקת לחץ משכנתא AI | HomeWise",
  description:
    "בדיקה חכמה של לחץ כלכלי עתידי לפני קניית בית בעזרת AI.",
};

export default function MortgageStressPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white" dir="rtl">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-black leading-tight md:text-7xl">
          בדיקת לחץ משכנתא בעזרת AI
        </h1>

        <p className="mt-8 text-xl leading-relaxed text-zinc-400">
          רוב מחשבוני המשכנתא בודקים אם אתה יכול לשלם היום.
          HomeWise בודק האם העתיד הכלכלי שלך יכול להחזיק את ההחלטה הזו.
        </p>

        <div className="mt-16 space-y-10">
          <section>
            <h2 className="text-3xl font-bold">האם אני באמת יכול לקנות בית?</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              קניית בית היא לא רק החזר חודשי. צריך לקחת בחשבון הוצאות חיים,
              ילדים, אינפלציה, שינוי הכנסה, עליית ריבית ולחץ כלכלי עתידי.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">מה שונה ב־HomeWise?</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              HomeWise משתמש בסימולציה חכמה כדי להעריך לחץ עתידי,
              סיכון שחיקה, יציבות כלכלית וגמישות לאורך זמן.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
