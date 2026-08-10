import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Bilingual } from "@/data/types";

export type Lang = "hi" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx>({ lang: "hi", setLang: () => {} });

const STORAGE_KEY = "sakh-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "hi") setLangState(saved);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l) => {
        setLangState(l);
        try {
          localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* ignore */
        }
      },
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Bilingual helpers: `t("हिंदी", "English")` and `b({ hi, en })`. */
export function useT() {
  const { lang, setLang } = useLang();
  return {
    lang,
    setLang,
    t: (hi: string, en: string) => (lang === "hi" ? hi : en),
    b: (v: Bilingual) => (lang === "hi" ? v.hi : v.en),
  };
}
