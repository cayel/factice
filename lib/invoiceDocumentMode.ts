/** Ordre d’affichage dans le sélecteur. */
export const INVOICE_DOCUMENT_MODES = ["facture", "facturette"] as const;

export type InvoiceDocumentMode = (typeof INVOICE_DOCUMENT_MODES)[number];

export function isInvoiceDocumentMode(
  value: string,
): value is InvoiceDocumentMode {
  return (INVOICE_DOCUMENT_MODES as readonly string[]).includes(value);
}

export const DOCUMENT_MODE_HELP: Record<
  InvoiceDocumentMode,
  { label: string; description: string }
> = {
  facture: {
    label: "Facture",
    description:
      "Mise en page classique ou selon la disposition choisie (A4 type facture complète).",
  },
  facturette: {
    label: "Facturette",
    description:
      "Document simplifié, format ticket condensé (souvent moins de mentions), pour tester les flux facturette.",
  },
};
