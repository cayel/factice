import { getMessages } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/types";
import type { InvoiceFieldKey } from "./invoiceTypes";

export type FieldGroup = {
  id: string;
  label: string;
  fields: { key: InvoiceFieldKey; label: string }[];
};

export const ALL_FIELD_KEYS: InvoiceFieldKey[] = [
  "sellerLogo",
  "sellerPhone",
  "sellerEmail",
  "sellerSiret",
  "sellerTvaFr",
  "buyerPhone",
  "buyerEmail",
  "buyerSiret",
  "buyerTvaIntra",
  "paymentTerms",
  "iban",
  "paymentDelayDays",
  "legalFooter",
  "bonPourAccord",
];

export function getFieldGroups(locale: Locale): FieldGroup[] {
  const m = getMessages(locale);
  const f = m.fields;
  return [
    {
      id: "seller",
      label: m.groups.seller,
      fields: [
        { key: "sellerLogo", label: f.sellerLogo },
        { key: "sellerPhone", label: f.sellerPhone },
        { key: "sellerEmail", label: f.sellerEmail },
        { key: "sellerSiret", label: f.sellerSiret },
        { key: "sellerTvaFr", label: f.sellerTvaFr },
      ],
    },
    {
      id: "buyer",
      label: m.groups.buyer,
      fields: [
        { key: "buyerPhone", label: f.buyerPhone },
        { key: "buyerEmail", label: f.buyerEmail },
        { key: "buyerSiret", label: f.buyerSiret },
        { key: "buyerTvaIntra", label: f.buyerTvaIntra },
      ],
    },
    {
      id: "payment",
      label: m.groups.payment,
      fields: [
        { key: "paymentTerms", label: f.paymentTerms },
        { key: "iban", label: f.iban },
        { key: "paymentDelayDays", label: f.paymentDelayDays },
      ],
    },
    {
      id: "other",
      label: m.groups.other,
      fields: [
        { key: "legalFooter", label: f.legalFooter },
        { key: "bonPourAccord", label: f.bonPourAccord },
      ],
    },
  ];
}

export function defaultFieldSelection(
  all = true,
): Record<InvoiceFieldKey, boolean> {
  return Object.fromEntries(
    ALL_FIELD_KEYS.map((k) => [k, all]),
  ) as Record<InvoiceFieldKey, boolean>;
}
