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

export const LayoutDeuxColonnes = forwardRef<HTMLDivElement, InvoiceLayoutBodyProps>(
  function LayoutDeuxColonnes({ data, selection }, ref) {
    return (
      <div
        ref={ref}
        className={invoiceRootClassName}
        style={invoiceRootStyle()}
      >
        <FictifBanner />

        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:justify-between">
          <SellerBlock data={data} selection={selection} sellerTitle="Émetteur" />
          <InvoiceMetaRight data={data} selection={selection} />
        </div>

        <div
          className="mb-8 border p-5"
          style={{ borderColor: C.border }}
        >
          <BuyerBlock data={data} selection={selection} buyerTitle="Client facturé" />
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
