export const INVOICE_LAYOUT_IDS = ["classic", "bandeau", "deuxColonnes"] as const;

export type InvoiceLayoutId = (typeof INVOICE_LAYOUT_IDS)[number];

export type InvoiceLayoutOption = {
  id: InvoiceLayoutId;
  label: string;
  description: string;
};

export const INVOICE_LAYOUTS: InvoiceLayoutOption[] = [
  {
    id: "classic",
    label: "Classique",
    description: "Vendeur à gauche, titre FACTURE à droite, puis client.",
  },
  {
    id: "bandeau",
    label: "Bandeau",
    description: "En-tête coloré pleine largeur, vendeur et client côte à côte.",
  },
  {
    id: "deuxColonnes",
    label: "Deux colonnes",
    description: "Émetteur / métadonnées facture en haut, client encadré au centre.",
  },
];

export function isInvoiceLayoutId(value: string): value is InvoiceLayoutId {
  return (INVOICE_LAYOUT_IDS as readonly string[]).includes(value);
}
