import type { InvoicePdfLabels } from "@/lib/i18n/invoicePdfLabels";
import type { Locale } from "@/lib/i18n/types";
import type { InvoiceData, InvoiceFieldSelection } from "@/lib/invoiceTypes";

export type InvoiceLayoutBodyProps = {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
  locale: Locale;
  pdf: InvoicePdfLabels;
  formatMoney: (n: number) => string;
  formatPercent: (n: number) => string;
};
