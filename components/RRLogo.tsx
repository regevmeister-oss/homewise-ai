export default function RRLogo() {
  return (
    <div className="fixed right-5 top-4 z-50 select-none">
      <div
        className="
          relative
          flex
          items-center
          justify-center
          text-[34px]
          font-black
          tracking-tight
          leading-none
        "
        style={{
          fontFamily: "serif",
        }}
      >

        {/* Hebrew ר */}
        <span
          className="
            absolute
            -right-[2px]
            top-[1px]
            rotate-[8deg]
            opacity-95
          "
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#d9d9d9 20%,#9ca3af 45%,#ffffff 60%,#7c7c7c 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow:
              "0 0 1px rgba(255,255,255,0.9), 0 0 12px rgba(255,255,255,0.35)",
            filter:
              "drop-shadow(0 0 6px rgba(255,255,255,0.25))",
          }}
        >
          ר
        </span>

        {/* English R */}
        <span
          className="
            relative
            -left-[3px]
            rotate-[-8deg]
          "
          style={{
            background:
              "linear-gradient(135deg,#ffffff 0%,#e5e7eb 18%,#9ca3af 42%,#ffffff 60%,#6b7280 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow:
              "0 0 1px rgba(255,255,255,0.95), 0 0 14px rgba(255,255,255,0.25)",
            filter:
              "drop-shadow(0 0 7px rgba(255,255,255,0.2))",
          }}
        >
          R
        </span>

        {/* DIAMOND EFFECT */}
        <div
          className="
            absolute
            -top-1
            left-1/2
            h-[4px]
            w-[4px]
            rounded-full
            bg-white
          "
          style={{
            boxShadow:
              "0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.7)",
          }}
        />

      </div>
    </div>
  );
}


