/** Régimes TVA (simplifiés) utilisés pour générer les données fictives. */
export const VAT_REGIMES = [
  "france_tva",
  "cee_intra_no_vat",
  "etranger_no_vat",
] as const;

export type VatRegimeId = (typeof VAT_REGIMES)[number];

export function isVatRegimeId(value: string): value is VatRegimeId {
  return (VAT_REGIMES as readonly string[]).includes(value);
}

