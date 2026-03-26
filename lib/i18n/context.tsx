"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getMessages, type Messages } from "./messages";
import { LOCALE_STORAGE_KEY, type Locale, isLocale } from "./types";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored && isLocale(stored)) {
        setLocaleState(stored);
      }
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "fr" ? "fr" : "en";
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const messages = useMemo(() => getMessages(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, messages }),
    [locale, setLocale, messages],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}

/** Hook pratique pour la page et les composants sous `LocaleProvider`. */
export function useLocale() {
  const { locale, setLocale, messages } = useLocaleContext();
  return { locale, setLocale, messages };
}
