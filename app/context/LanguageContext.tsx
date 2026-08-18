"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import en from "../locales/en.json";
import fa from "../locales/fa.json";

type Locale = "en" | "fa";
type Translations = typeof en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Locale, Translations> = {
  en,
  fa,
};

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  const savedLocale = localStorage.getItem("locale");

  return savedLocale === "fa" || savedLocale === "en" ? savedLocale : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem("locale", locale);

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    dir: locale === "fa" ? "rtl" : "ltr",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
