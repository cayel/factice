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
  function LayoutClassic({ data, selection }, ref) {
    return (
      <div
        ref={ref}
        className={invoiceRootClassName}
        style={invoiceRootStyle()}
      >
        <FictifBanner />

        <div className="mb-8 flex justify-between gap-6">
          <SellerBlock data={data} selection={selection} />
          <InvoiceMetaRight data={data} selection={selection} />
        </div>

        <div className="mb-8">
          <BuyerBlock data={data} selection={selection} />
        </div>

        <LinesTable data={data} />
        <TotalsBox data={data} />
        <PaymentSection data={data} selection={selection} />
        <LegalSection data={data} selection={selection} />
        <BonPourAccordSection selection={selection} />
      </div>
    );
  },
);
