"use client";

import { forwardRef } from "react";
import { GeneratedLogo } from "@/components/GeneratedLogo";
import { formatMoney, formatPercent } from "@/lib/format";
import { C } from "./colors";
import {
  BonPourAccordSection,
  FictifBanner,
  LegalSection,
  PaymentSection,
  invoiceRootClassName,
  invoiceRootStyle,
} from "./parts";
import type { InvoiceLayoutBodyProps } from "./layoutTypes";

/** Mise en page type facturette : ticket centré, texte resserré, titre FACTURETTE. */
export const LayoutFacturette = forwardRef<HTMLDivElement, InvoiceLayoutBodyProps>(
  function LayoutFacturette({ data, selection }, ref) {
    const s = selection;

    return (
      <div
        ref={ref}
        className={invoiceRootClassName}
        style={invoiceRootStyle()}
      >
        <FictifBanner />

        <div className="mx-auto flex max-w-[440px] flex-col items-stretch pb-8">
          <div
            className="border-2 border-dashed px-5 py-6 text-[11px] leading-relaxed"
            style={{ borderColor: C.border }}
          >
            <p
              className="mb-4 text-center text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: C.textMuted }}
            >
              Facturette (document simplifié)
            </p>
            {s.sellerLogo && (
              <div className="mx-auto mb-3 flex justify-center">
                <GeneratedLogo
                  seed={`${data.seller.name}|${data.invoiceNumber}`}
                  companyName={data.seller.name}
                  width={112}
                  height={48}
                />
              </div>
            )}
            <h1 className="mb-1 text-center text-2xl font-bold tracking-tight">
              FACTURETTE
            </h1>
            <p className="mb-4 text-center text-[11px]" style={{ color: C.textSoft }}>
              N° {data.invoiceNumber} · {data.issueDate}
            </p>

            <div
              className="mb-4 border-b pb-3 text-[10px]"
              style={{ borderColor: C.borderLight }}
            >
              <p className="font-bold">{data.seller.name}</p>
              <p>{data.seller.addressLine1}</p>
              <p>
                {data.seller.zip} {data.seller.city}
              </p>
              {s.sellerSiret && data.seller.siret && (
                <p className="mt-1">SIRET {data.seller.siret}</p>
              )}
              {s.sellerTvaFr && data.seller.tvaFr && (
                <p>TVA {data.seller.tvaFr}</p>
              )}
              {s.sellerPhone && data.seller.phone && (
                <p>Tél. {data.seller.phone}</p>
              )}
              {s.sellerEmail && data.seller.email && <p>{data.seller.email}</p>}
            </div>

            <div
              className="mb-4 text-[10px]"
              style={{ color: C.textDark }}
            >
              <p className="font-semibold" style={{ color: C.textMuted }}>
                Client
              </p>
              <p className="font-medium">{data.buyer.name}</p>
              <p>{data.buyer.addressLine1}</p>
              <p>
                {data.buyer.zip} {data.buyer.city}
              </p>
              {s.buyerSiret && data.buyer.siret && (
                <p>SIRET {data.buyer.siret}</p>
              )}
              {s.buyerTvaIntra && data.buyer.tvaIntra && (
                <p>TVA {data.buyer.tvaIntra}</p>
              )}
              {s.buyerPhone && data.buyer.phone && (
                <p>{data.buyer.phone}</p>
              )}
              {s.buyerEmail && data.buyer.email && (
                <p>{data.buyer.email}</p>
              )}
            </div>

            <table
              className="mb-3 w-full border-collapse border text-[9px]"
              style={{ borderColor: C.border }}
            >
              <thead>
                <tr style={{ backgroundColor: C.thead }}>
                  <th
                    className="border px-1 py-0.5 text-left font-semibold"
                    style={{ borderColor: C.border }}
                  >
                    Libellé
                  </th>
                  <th
                    className="w-10 border px-1 py-0.5 text-right font-semibold"
                    style={{ borderColor: C.border }}
                  >
                    Qté
                  </th>
                  <th
                    className="w-16 border px-1 py-0.5 text-right font-semibold"
                    style={{ borderColor: C.border }}
                  >
                    TTC
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.lines.map((line, i) => {
                  const lineHt = line.quantity * line.unitPriceHt;
                  const lineTtc = lineHt * (1 + line.tvaRate);
                  return (
                    <tr key={i}>
                      <td
                        className="border px-1 py-1 align-top"
                        style={{ borderColor: C.border }}
                      >
                        {line.description}
                      </td>
                      <td
                        className="border px-1 py-1 text-right"
                        style={{ borderColor: C.border }}
                      >
                        {line.quantity}
                      </td>
                      <td
                        className="border px-1 py-1 text-right"
                        style={{ borderColor: C.border }}
                      >
                        {formatMoney(lineTtc)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div
              className="space-y-1 border-t pt-2 text-[10px]"
              style={{ borderColor: C.border }}
            >
              <div className="flex justify-between">
                <span>Total HT</span>
                <span>{formatMoney(data.totals.ht)}</span>
              </div>
              {Object.entries(data.totals.tvaByRate).map(([rate, amount]) => (
                <div key={rate} className="flex justify-between">
                  <span>TVA {formatPercent(Number(rate))}</span>
                  <span>{formatMoney(amount)}</span>
                </div>
              ))}
              <div
                className="flex justify-between border-t pt-1 text-[12px] font-bold"
                style={{ borderColor: C.border }}
              >
                <span>À payer TTC</span>
                <span>{formatMoney(data.totals.ttc)}</span>
              </div>
            </div>

            {s.paymentDelayDays && data.paymentDelayDays != null && (
              <p
                className="mt-3 text-center text-[9px]"
                style={{ color: C.textMuted }}
              >
                Paiement sous {data.paymentDelayDays} jours — échéance{" "}
                {data.dueDate}
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-[440px]">
          <PaymentSection data={data} selection={selection} />
          <LegalSection data={data} selection={selection} />
          <BonPourAccordSection selection={selection} />
        </div>
      </div>
    );
  },
);
