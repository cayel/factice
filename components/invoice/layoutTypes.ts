import type { InvoiceData, InvoiceFieldSelection } from "@/lib/invoiceTypes";

export type InvoiceLayoutBodyProps = {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
};
