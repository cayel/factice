"use client";

import { forwardRef } from "react";
import { C } from "./colors";
import {
  BonPourAccordSection,
  BuyerBlock,
  FictifBanner,
  InvoiceMetaRight,
  LegalSection,
  LinesTable,
  PaymentSection,
  SellerBlock,
  TotalsBox,
  invoiceRootClassName,
  invoiceRootStyle,
} from "./parts";
import type { InvoiceLayoutBodyProps } from "./layoutTypes";

export const LayoutDeuxColonnes = forwardRef<
  HTMLDivElement,
  InvoiceLayoutBodyProps
>(function LayoutDeuxColonnes(
  { data, selection, locale, pdf, formatMoney, formatPercent },
  ref,
) {
  return (
    <div
      ref={ref}
      className={invoiceRootClassName}
      style={invoiceRootStyle()}
    >
      <FictifBanner text={pdf.fictifBanner} />

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <SellerBlock
          data={data}
          selection={selection}
          locale={locale}
          pdf={pdf}
          sellerTitle={pdf.sellerTitleEmitter}
        />
        <InvoiceMetaRight data={data} selection={selection} pdf={pdf} />
      </div>

      <div className="mb-8 border p-5" style={{ borderColor: C.border }}>
        <BuyerBlock
          data={data}
          selection={selection}
          locale={locale}
          pdf={pdf}
          buyerTitle={pdf.buyerTitleBilled}
        />
      </div>

      <LinesTable
        data={data}
        pdf={pdf}
        formatMoney={formatMoney}
        formatPercent={formatPercent}
      />
      <TotalsBox
        data={data}
        pdf={pdf}
        formatMoney={formatMoney}
        formatPercent={formatPercent}
      />
      <PaymentSection data={data} selection={selection} pdf={pdf} />
      <LegalSection data={data} selection={selection} />
      <BonPourAccordSection selection={selection} pdf={pdf} />
    </div>
  );
});
