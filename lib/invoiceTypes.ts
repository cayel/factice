export type InvoiceFieldKey =
  | "sellerLogo"
  | "sellerPhone"
  | "sellerEmail"
  | "sellerSiret"
  | "sellerTvaFr"
  | "buyerPhone"
  | "buyerEmail"
  | "buyerSiret"
  | "buyerTvaIntra"
  | "paymentTerms"
  | "iban"
  | "paymentDelayDays"
  | "legalFooter"
  | "bonPourAccord";

export type InvoiceFieldSelection = Record<InvoiceFieldKey, boolean>;

export type InvoiceLine = {
  description: string;
  quantity: number;
  unitPriceHt: number;
  tvaRate: number;
};

export type InvoiceData = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  seller: {
    name: string;
    addressLine1: string;
    zip: string;
    city: string;
    country: string;
    phone?: string;
    email?: string;
    siret?: string;
    tvaFr?: string;
  };
  buyer: {
    name: string;
    addressLine1: string;
    zip: string;
    city: string;
    country: string;
    phone?: string;
    email?: string;
    siret?: string;
    tvaIntra?: string;
  };
  lines: InvoiceLine[];
  totals: {
    ht: number;
    tvaByRate: Record<string, number>;
    ttc: number;
  };
  paymentTerms?: string;
  iban?: string;
  paymentDelayDays?: number;
  legalFooter?: string;
};
