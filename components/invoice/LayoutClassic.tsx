"use client";

import { forwardRef } from "react";
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

export const LayoutClassic = forwardRef<HTMLDivElement, InvoiceLayoutBodyProps>(
  function LayoutClassic(
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

        <div className="mb-8 flex justify-between gap-6">
          <SellerBlock
            data={data}
            selection={selection}
            locale={locale}
            pdf={pdf}
          />
          <InvoiceMetaRight data={data} selection={selection} pdf={pdf} />
        </div>

        <div className="mb-8">
          <BuyerBlock data={data} selection={selection} locale={locale} pdf={pdf} />
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
  },
);
