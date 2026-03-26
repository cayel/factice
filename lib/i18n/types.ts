export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

export const LOCALE_STORAGE_KEY = "factice-locale";

export function isLocale(value: string): value is Locale {
  return value === "fr" || value === "en";
}
