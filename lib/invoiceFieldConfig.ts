import type { InvoiceFieldKey } from "./invoiceTypes";

export type FieldGroup = {
  id: string;
  label: string;
  fields: { key: InvoiceFieldKey; label: string }[];
};

export const FIELD_GROUPS: FieldGroup[] = [
  {
    id: "seller",
    label: "Vendeur",
    fields: [
      { key: "sellerLogo", label: "Bloc logo (placeholder)" },
      { key: "sellerPhone", label: "Téléphone" },
      { key: "sellerEmail", label: "E-mail" },
      { key: "sellerSiret", label: "SIRET" },
      { key: "sellerTvaFr", label: "N° TVA intracommunautaire (FR)" },
    ],
  },
  {
    id: "buyer",
    label: "Client",
    fields: [
      { key: "buyerPhone", label: "Téléphone" },
      { key: "buyerEmail", label: "E-mail" },
      { key: "buyerSiret", label: "SIRET" },
      { key: "buyerTvaIntra", label: "N° TVA intracommunautaire (UE)" },
    ],
  },
  {
    id: "payment",
    label: "Paiement & conditions",
    fields: [
      { key: "paymentTerms", label: "Conditions de paiement (texte)" },
      { key: "iban", label: "IBAN" },
      { key: "paymentDelayDays", label: "Délai de paiement (jours)" },
    ],
  },
  {
    id: "other",
    label: "Autres",
    fields: [
      { key: "legalFooter", label: "Mentions légales (pied de page)" },
      { key: "bonPourAccord", label: "Ligne « Bon pour accord »" },
    ],
  },
];

export const ALL_FIELD_KEYS: InvoiceFieldKey[] = FIELD_GROUPS.flatMap((g) =>
  g.fields.map((f) => f.key),
);

export function defaultFieldSelection(
  all = true,
): Record<InvoiceFieldKey, boolean> {
  return Object.fromEntries(
    ALL_FIELD_KEYS.map((k) => [k, all]),
  ) as Record<InvoiceFieldKey, boolean>;
}
