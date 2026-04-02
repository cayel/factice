import type { Locale } from "@/lib/i18n/types";

/**
 * Version logique des nouveautés.
 * À incrémenter quand tu veux ré-afficher la modale “Nouveautés”.
 */
export const WHATS_NEW_VERSION = "2026-04-02";

export type WhatsNewEntry = {
  id: string;
  titleByLocale: Record<Locale, string>;
  itemsByLocale: Record<Locale, string[]>;
};

export const WHATS_NEW_ENTRIES: WhatsNewEntry[] = [
  {
    id: "vat-regimes",
    titleByLocale: {
      fr: "TVA : nouveaux scénarios",
      en: "VAT: new scenarios",
    },
    itemsByLocale: {
      fr: [
        "Ajout d’un sélecteur “Régime TVA” : France (TVA), CEE intracom (sans TVA), Étranger (sans TVA).",
        "Factures sans TVA : pas de lignes TVA dans le récapitulatif, et la colonne TVA affiche “—”.",
      ],
      en: [
        "Added a “VAT regime” selector: France (VAT), EU intracom (no VAT), Foreign (no VAT).",
        "No-VAT invoices: VAT summary lines are hidden and VAT column shows “—”.",
      ],
    },
  },
  {
    id: "seller-location-fix",
    titleByLocale: {
      fr: "Correction : vendeur CEE/étranger",
      en: "Fix: EU/foreign seller",
    },
    itemsByLocale: {
      fr: [
        "Pour les régimes CEE et Étranger, le vendeur est désormais UE / hors UE et le client est en France.",
      ],
      en: [
        "For EU/Foreign regimes, the seller is now EU / non‑EU and the buyer is in France.",
      ],
    },
  },
];

