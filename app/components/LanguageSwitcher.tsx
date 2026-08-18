"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      dir="ltr"
      className="relative isolate inline-flex h-9 w-132px shrink-0 items-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-0 w-1/2 rounded-md bg-linear-to-br from-violet-500 to-violet-600"
        initial={false}
        animate={{
          x: locale === "en" ? "0%" : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 30,
          mass: 0.7,
        }}
      />

      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`relative z-10 flex h-full w-1/2 items-center justify-center px-2 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
          locale === "en" ? "text-white" : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => setLocale("fa")}
        aria-pressed={locale === "fa"}
        className={`relative z-10 flex h-full w-1/2 items-center justify-center px-2 text-[11px] font-semibold whitespace-nowrap transition-colors ${
          locale === "fa" ? "text-white" : "text-zinc-500 hover:text-zinc-200"
        }`}
      >
        فارسی
      </button>
    </div>
  );
}
