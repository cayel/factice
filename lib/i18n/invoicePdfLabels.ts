/** Libellés pour le rendu PDF facture (FR / EN). */
export type InvoicePdfLabels = {
  fictifBanner: string;
  seller: string;
  buyer: string;
  invoiceTitle: string;
  invoiceNumberPrefix: string;
  issueDate: string;
  dueDate: string;
  paymentWithinDays: string;
  sellerCompanyId: string;
  taxId: string;
  phonePrefix: string;
  buyerCompanyId: string;
  buyerTaxIntra: string;
  tableDescription: string;
  tableQty: string;
  tableUnitPrice: string;
  tableTax: string;
  tableLineTotal: string;
  totalExclTax: string;
  taxLinePrefix: string;
  totalInclTax: string;
  paymentTermsLabel: string;
  bankLabel: string;
  bonPourAccord: string;
  signatureHint: string;
  bandeauKicker: string;
  bandeauIssuePrefix: string;
  bandeauDuePrefix: string;
  /** Ex. « Délai : {days} jours » */
  bandeauDelayLine: string;
  sellerTitleEmitter: string;
  buyerTitleAddressed: string;
  buyerTitleBilled: string;
  facturetteKicker: string;
  facturetteTitle: string;
  facturetteTableTotal: string;
  facturetteSubtotal: string;
  facturettePayDue: string;
  facturetteColumnLabel: string;
  /** « Paiement sous {days} jours — échéance {due} » */
  facturetteDueReminder: string;
};
