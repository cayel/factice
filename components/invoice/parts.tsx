import type { CSSProperties } from "react";
import { GeneratedLogo } from "@/components/GeneratedLogo";
import type { InvoiceData, InvoiceFieldSelection } from "@/lib/invoiceTypes";
import { formatMoney, formatPercent } from "@/lib/format";
import { C } from "./colors";

export const invoiceRootClassName =
  "box-border w-[794px] min-h-[1123px] p-10 text-[12px] leading-snug shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

export function invoiceRootStyle(): CSSProperties {
  return {
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: C.text,
    backgroundColor: "#ffffff",
  };
}

export function FictifBanner() {
  return (
    <div
      className="mb-3 rounded border px-3 py-2 text-center text-[11px] font-semibold"
      style={{
        borderColor: C.bannerBorder,
        backgroundColor: C.bannerBg,
        color: C.bannerText,
      }}
    >
      Document fictif — test uniquement — ne pas utiliser à des fins réelles
    </div>
  );
}

type BlockProps = {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
  sellerTitle?: string;
  buyerTitle?: string;
};

export function SellerBlock({
  data,
  selection,
  sellerTitle = "Vendeur",
}: BlockProps) {
  const s = selection;
  return (
    <div className="min-w-0 flex-1">
      {s.sellerLogo && (
        <div className="mb-3">
          <GeneratedLogo
            seed={`${data.seller.name}|${data.invoiceNumber}`}
            companyName={data.seller.name}
            width={144}
            height={64}
          />
        </div>
      )}
      <p
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: C.textMuted }}
      >
        {sellerTitle}
      </p>
      <p className="text-base font-bold">{data.seller.name}</p>
      <p>{data.seller.addressLine1}</p>
      <p>
        {data.seller.zip} {data.seller.city}
      </p>
      <p>{data.seller.country}</p>
      {s.sellerSiret && data.seller.siret && (
        <p className="mt-1">SIRET : {data.seller.siret}</p>
      )}
      {s.sellerTvaFr && data.seller.tvaFr && <p>TVA : {data.seller.tvaFr}</p>}
      {s.sellerPhone && data.seller.phone && (
        <p>Tél. : {data.seller.phone}</p>
      )}
      {s.sellerEmail && data.seller.email && <p>{data.seller.email}</p>}
    </div>
  );
}

export function BuyerBlock({
  data,
  selection,
  buyerTitle = "Client",
}: BlockProps) {
  const s = selection;
  return (
    <div>
      <p
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: C.textMuted }}
      >
        {buyerTitle}
      </p>
      <p className="text-base font-bold">{data.buyer.name}</p>
      <p>{data.buyer.addressLine1}</p>
      <p>
        {data.buyer.zip} {data.buyer.city}
      </p>
      <p>{data.buyer.country}</p>
      {s.buyerSiret && data.buyer.siret && (
        <p className="mt-1">SIRET : {data.buyer.siret}</p>
      )}
      {s.buyerTvaIntra && data.buyer.tvaIntra && (
        <p>TVA intracom. : {data.buyer.tvaIntra}</p>
      )}
      {s.buyerPhone && data.buyer.phone && (
        <p>Tél. : {data.buyer.phone}</p>
      )}
      {s.buyerEmail && data.buyer.email && <p>{data.buyer.email}</p>}
    </div>
  );
}

export function InvoiceMetaRight({
  data,
  selection,
}: {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
}) {
  const s = selection;
  return (
    <div className="text-right">
      <h1 className="text-2xl font-bold tracking-tight">FACTURE</h1>
      <p className="mt-2 font-medium">N° {data.invoiceNumber}</p>
      <p>Date d’émission : {data.issueDate}</p>
      <p>Date d’échéance : {data.dueDate}</p>
      {s.paymentDelayDays && data.paymentDelayDays != null && (
        <p className="mt-1 text-[11px]" style={{ color: C.textSoft }}>
          Paiement sous {data.paymentDelayDays} jours
        </p>
      )}
    </div>
  );
}

export function LinesTable({ data }: { data: InvoiceData }) {
  return (
    <table
      className="mb-6 w-full border-collapse border text-[11px]"
      style={{ borderColor: C.border }}
    >
      <thead>
        <tr style={{ backgroundColor: C.thead }}>
          <th
            className="border px-2 py-1 text-left font-semibold"
            style={{ borderColor: C.border }}
          >
            Désignation
          </th>
          <th
            className="w-16 border px-2 py-1 text-right font-semibold"
            style={{ borderColor: C.border }}
          >
            Qté
          </th>
          <th
            className="w-24 border px-2 py-1 text-right font-semibold"
            style={{ borderColor: C.border }}
          >
            PU HT
          </th>
          <th
            className="w-16 border px-2 py-1 text-right font-semibold"
            style={{ borderColor: C.border }}
          >
            TVA
          </th>
          <th
            className="w-28 border px-2 py-1 text-right font-semibold"
            style={{ borderColor: C.border }}
          >
            Total HT
          </th>
        </tr>
      </thead>
      <tbody>
        {data.lines.map((line, i) => {
          const lineHt = line.quantity * line.unitPriceHt;
          return (
            <tr key={i}>
              <td
                className="border px-2 py-1.5 align-top"
                style={{ borderColor: C.border }}
              >
                {line.description}
              </td>
              <td
                className="border px-2 py-1.5 text-right"
                style={{ borderColor: C.border }}
              >
                {line.quantity}
              </td>
              <td
                className="border px-2 py-1.5 text-right"
                style={{ borderColor: C.border }}
              >
                {formatMoney(line.unitPriceHt)}
              </td>
              <td
                className="border px-2 py-1.5 text-right"
                style={{ borderColor: C.border }}
              >
                {formatPercent(line.tvaRate)}
              </td>
              <td
                className="border px-2 py-1.5 text-right"
                style={{ borderColor: C.border }}
              >
                {formatMoney(lineHt)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function TotalsBox({ data }: { data: InvoiceData }) {
  return (
    <div
      className="ml-auto w-72 border p-3 text-[11px]"
      style={{ borderColor: C.border }}
    >
      <div className="flex justify-between py-0.5">
        <span>Total HT</span>
        <span>{formatMoney(data.totals.ht)}</span>
      </div>
      {Object.entries(data.totals.tvaByRate).map(([rate, amount]) => (
        <div key={rate} className="flex justify-between py-0.5">
          <span>TVA {formatPercent(Number(rate))}</span>
          <span>{formatMoney(amount)}</span>
        </div>
      ))}
      <div
        className="mt-1 flex justify-between border-t pt-1 font-bold"
        style={{ borderColor: C.border }}
      >
        <span>Total TTC</span>
        <span>{formatMoney(data.totals.ttc)}</span>
      </div>
    </div>
  );
}

export function PaymentSection({
  data,
  selection,
}: {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
}) {
  const s = selection;
  if (
    !((s.paymentTerms && data.paymentTerms) || (s.iban && data.iban))
  ) {
    return null;
  }
  return (
    <div className="mt-8 space-y-2 text-[11px]" style={{ color: C.textDark }}>
      {s.paymentTerms && data.paymentTerms && (
        <p>
          <span className="font-semibold">Conditions : </span>
          {data.paymentTerms}
        </p>
      )}
      {s.iban && data.iban && (
        <p>
          <span className="font-semibold">IBAN : </span>
          {data.iban}
        </p>
      )}
    </div>
  );
}

export function LegalSection({
  data,
  selection,
}: {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
}) {
  if (!selection.legalFooter || !data.legalFooter) return null;
  return (
    <p className="mt-8 text-[9px] leading-tight" style={{ color: C.textSoft }}>
      {data.legalFooter}
    </p>
  );
}

export function BonPourAccordSection({
  selection,
}: {
  selection: InvoiceFieldSelection;
}) {
  if (!selection.bonPourAccord) return null;
  return (
    <div
      className="mt-12 border-t pt-4 text-[11px]"
      style={{ borderColor: C.borderLight }}
    >
      <p className="mb-8">Bon pour accord</p>
      <p style={{ color: C.textMuted }}>Date, cachet et signature</p>
      <div className="mt-16 border-b" style={{ borderColor: C.border }} />
    </div>
  );
}
