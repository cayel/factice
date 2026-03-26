import type { Locale } from "@/lib/i18n/types";

export function formatMoneyAmount(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: locale === "fr" ? "EUR" : "USD",
  }).format(amount);
}

export function formatTaxPercent(rate: number, locale: Locale): string {
  const formatted = (rate * 100).toLocaleString(
    locale === "fr" ? "fr-FR" : "en-US",
    { maximumFractionDigits: 2 },
  );
  return locale === "fr" ? `${formatted} %` : `${formatted}%`;
}

/** @deprecated Utiliser formatMoneyAmount avec locale. */
export function formatMoney(amount: number): string {
  return formatMoneyAmount(amount, "fr");
}

/** @deprecated Utiliser formatTaxPercent avec locale. */
export function formatPercent(rate: number): string {
  return formatTaxPercent(rate, "fr");
}
