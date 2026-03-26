"use client";

import { forwardRef } from "react";
import { LayoutBandeau } from "@/components/invoice/LayoutBandeau";
import { LayoutClassic } from "@/components/invoice/LayoutClassic";
import { LayoutDeuxColonnes } from "@/components/invoice/LayoutDeuxColonnes";
import { LayoutFacturette } from "@/components/invoice/LayoutFacturette";
import type { InvoicePdfLabels } from "@/lib/i18n/invoicePdfLabels";
import type { Locale } from "@/lib/i18n/types";
import type { InvoiceDocumentMode } from "@/lib/invoiceDocumentMode";
import type { InvoiceLayoutId } from "@/lib/invoiceLayouts";
import type { InvoiceData, InvoiceFieldSelection } from "@/lib/invoiceTypes";

export type InvoiceTemplateProps = {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
  layout: InvoiceLayoutId;
  mode: InvoiceDocumentMode;
  locale: Locale;
  pdf: InvoicePdfLabels;
  formatMoney: (amount: number) => string;
  formatPercent: (rate: number) => string;
};

const layoutProps = (p: InvoiceTemplateProps) => ({
  data: p.data,
  selection: p.selection,
  locale: p.locale,
  pdf: p.pdf,
  formatMoney: p.formatMoney,
  formatPercent: p.formatPercent,
});

export const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  function InvoiceTemplate(props, ref) {
    const common = layoutProps(props);

    if (props.mode === "facturette") {
      return <LayoutFacturette ref={ref} {...common} />;
    }

    switch (props.layout) {
      case "bandeau":
        return <LayoutBandeau ref={ref} {...common} />;
      case "deuxColonnes":
        return <LayoutDeuxColonnes ref={ref} {...common} />;
      case "classic":
      default:
        return <LayoutClassic ref={ref} {...common} />;
    }
  },
);
