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
  function LayoutBandeau(
    { data, selection, locale, pdf, formatMoney, formatPercent },
    ref,
  ) {
    const s = selection;

    return (
      <div
        ref={ref}
        className={invoiceRootClassName}
        style={invoiceRootStyle()}
      >
        <FictifBanner text={pdf.fictifBanner} />

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
                {pdf.bandeauKicker}
              </p>
              <p className="text-3xl font-bold tracking-tight">
                {pdf.invoiceTitle}
              </p>
            </div>
            <div className="text-right text-[12px] leading-relaxed">
              <p className="font-semibold">
                {pdf.invoiceNumberPrefix} {data.invoiceNumber}
              </p>
              <p style={{ color: C.bandeauMuted }}>
                {pdf.bandeauIssuePrefix} {data.issueDate}
              </p>
              <p style={{ color: C.bandeauMuted }}>
                {pdf.bandeauDuePrefix} {data.dueDate}
              </p>
              {s.paymentDelayDays && data.paymentDelayDays != null && (
                <p className="mt-1 text-[11px]" style={{ color: C.bandeauMuted }}>
                  {pdf.bandeauDelayLine.replace(
                    "{days}",
                    String(data.paymentDelayDays),
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <SellerBlock
            data={data}
            selection={selection}
            locale={locale}
            pdf={pdf}
            sellerTitle={pdf.sellerTitleEmitter}
          />
          <BuyerBlock
            data={data}
            selection={selection}
            locale={locale}
            pdf={pdf}
            buyerTitle={pdf.buyerTitleAddressed}
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
  },
);
