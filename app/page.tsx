export default function HomePage() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center px-4 py-6 overflow-hidden">
      <section className="w-full max-w-4xl rounded-[28px] border border-white/10 bg-transparent/84 backdrop-blur-md shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#06b6d433,transparent_35%),radial-gradient(circle_at_bottom_right,#22c55e22,transparent_35%)] pointer-events-none" />

        <div className="relative px-6 py-7 md:px-10 md:py-9 text-center">
          <p className="uppercase tracking-[0.32em] text-cyan-300 text-[11px]">
            HomeWise AI
          </p>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-5">
            האם את/ה באמת
              <br />
              יכול/ה לקנות בית?
          </h1>

          <p className="mt-5 text-sm md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            מערכת AI שמנסה לחזות את החיים האמיתיים שלך בעוד 5, 10 ו־30 שנה —
            לפני שאתה מתחייב לבית.
          </p>

          <div className="grid md:grid-cols-3 gap-3 mt-7">
            <Mini title="ילדים ומשפחה" text="חינוך, ילדים ועלויות חיים עתידיות." />
            <Mini title="משכנתא ולחץ" text="בדיקה אם אפשר לשרוד את ההחזר לאורך שנים." />
            <Mini title="תחזית AI" text="תחזית אישית לפי החיים העתידיים שלך." />
          </div>

          <a
            href="/onboarding"
            className="inline-flex items-center justify-center mt-8 px-7 py-3 rounded-2xl bg-cyan-400 text-black text-base font-bold hover:bg-cyan-300 transition"
          >
            התחל תחזית עתידית
          </a>

          <p className="mt-5 text-zinc-500 text-xs">
            אל תקנה בית לפי מי שאתה היום.
          </p>

          <p className="text-cyan-300 text-base font-bold mt-1">
            קנה לפי מי שתהיה בעוד 10 שנים.
          </p>
        </div>
      </section>
    </main>
  );
}

function Mini({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
      <p className="text-cyan-300 text-sm font-bold">{title}</p>
      <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}




