"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { questions } from "@/lib/questions";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const q = questions[step];

  const saveAnswer = (value: any) => {
    const updated = {
      ...answers,
      [q.id]: value,
    };

    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "homewiseAnswers",
        JSON.stringify(updated)
      );

      router.push("/result");
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden text-white"
      dir="rtl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('/backgrounds/home-bg.png')",
        }}
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <motion.div
          key={step}
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.7 }}
          className="
            w-full
            max-w-4xl
            rounded-[40px]
            border
            border-white/20
            bg-white/10
            p-10
            backdrop-blur-2xl
          "
        >

          <div className="text-cyan-300 text-sm tracking-[0.35em] font-bold">
            HOMEWISE AI
          </div>

          <div className="mt-8 text-zinc-400">
            שאלה {step + 1} מתוך {questions.length}
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            {q.text}
          </h1>

          {/* SLIDER */}
          {q.type === "slider" && (
            <div className="mt-16">

              <input
                type="range"
                min={q.min}
                max={q.max}
                step={q.step}
                defaultValue={(q.max || 10) / 2}
                onMouseUp={(e: any) =>
                  saveAnswer(Number(e.target.value))
                }
                className="w-full"
              />

              <div className="flex justify-between text-zinc-400 mt-4">
                <span>{q.min}</span>
                <span>{q.max}</span>
              </div>

            </div>
          )}

          {/* CHOICE */}
          {q.type === "choice" && (
            <div className="mt-14 grid gap-5">
              {q.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => saveAnswer(option)}
                  className="
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/5
                    px-6
                    py-5
                    text-right
                    text-2xl
                    transition
                    hover:scale-[1.02]
                    hover:bg-white/10
                  "
                >
                  {option}
                </button>
              ))}
            </div>
          )}

        </motion.div>
      </div>
    </main>
  );
}
