"use client";

import { forwardRef } from "react";
import { C } from "./colors";
import {
  BonPourAccordSection,
  BuyerBlock,
  FictifBanner,
  LegalSection,
  LinesTable,
  PaymentSection,
  SellerBlock,
  TotalsBox,
  invoiceRootClassName,
  invoiceRootStyle,
} from "./parts";
import type { InvoiceLayoutBodyProps } from "./layoutTypes";

export const LayoutBandeau = forwardRef<HTMLDivElement, InvoiceLayoutBodyProps>(
  function LayoutBandeau({ data, selection }, ref) {
    const s = selection;

    return (
      <div
        ref={ref}
        className={invoiceRootClassName}
        style={invoiceRootStyle()}
      >
        <FictifBanner />

        <div
          className="-mx-10 mb-6 w-[calc(100%+5rem)] max-w-none px-10 py-5"
          style={{
            backgroundColor: C.bandeauBg,
            color: C.bandeauText,
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: C.bandeauMuted }}
              >
                Facturation
              </p>
              <p className="text-3xl font-bold tracking-tight">FACTURE</p>
            </div>
            <div className="text-right text-[12px] leading-relaxed">
              <p className="font-semibold">N° {data.invoiceNumber}</p>
              <p style={{ color: C.bandeauMuted }}>
                Émission : {data.issueDate}
              </p>
              <p style={{ color: C.bandeauMuted }}>
                Échéance : {data.dueDate}
              </p>
              {s.paymentDelayDays && data.paymentDelayDays != null && (
                <p className="mt-1 text-[11px]" style={{ color: C.bandeauMuted }}>
                  Délai : {data.paymentDelayDays} jours
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <SellerBlock data={data} selection={selection} sellerTitle="Émetteur" />
          <BuyerBlock data={data} selection={selection} buyerTitle="Adressé à" />
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
