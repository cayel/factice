"use client";

import { forwardRef } from "react";
import { LayoutBandeau } from "@/components/invoice/LayoutBandeau";
import { LayoutClassic } from "@/components/invoice/LayoutClassic";
import { LayoutDeuxColonnes } from "@/components/invoice/LayoutDeuxColonnes";
import { LayoutFacturette } from "@/components/invoice/LayoutFacturette";
import type { InvoiceDocumentMode } from "@/lib/invoiceDocumentMode";
import type { InvoiceLayoutId } from "@/lib/invoiceLayouts";
import type { InvoiceData, InvoiceFieldSelection } from "@/lib/invoiceTypes";

export type InvoiceTemplateProps = {
  data: InvoiceData;
  selection: InvoiceFieldSelection;
  layout: InvoiceLayoutId;
  mode: InvoiceDocumentMode;
};

export const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  function InvoiceTemplate({ data, selection, layout, mode }, ref) {
    if (mode === "facturette") {
      return (
        <LayoutFacturette ref={ref} data={data} selection={selection} />
      );
    }

    switch (layout) {
      case "bandeau":
        return (
          <LayoutBandeau ref={ref} data={data} selection={selection} />
        );
      case "deuxColonnes":
        return (
          <LayoutDeuxColonnes ref={ref} data={data} selection={selection} />
        );
      case "classic":
      default:
        return (
          <LayoutClassic ref={ref} data={data} selection={selection} />
        );
    }
  },
);
