export const metadata = {
  title: "AI Mortgage Stress Test | HomeWise",
  description:
    "Analyze future financial pressure before buying a house using AI.",
};

export default function MortgageStressPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-6xl font-black leading-tight">
          AI Mortgage Stress Test
        </h1>

        <p className="mt-8 text-zinc-400 text-xl leading-relaxed">
          Most mortgage calculators only check if you can pay today.
          HomeWise forecasts your future financial pressure using AI.
        </p>

        <div className="mt-16 space-y-10">

          <section>
            <h2 className="text-3xl font-bold">
              Can I really afford a house?
            </h2>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              Buying a home is more than monthly payments.
              Future lifestyle pressure, inflation, salary changes,
              children, and economic instability all affect affordability.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold">
              What makes HomeWise different?
            </h2>

            <p className="mt-4 text-zinc-400 leading-relaxed">
              HomeWise uses AI simulations to estimate future financial stress,
              burnout risk, and long-term financial flexibility.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
