"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { FieldSelector } from "@/components/FieldSelector";
import { WelcomeDialog } from "@/components/WelcomeDialog";
import { InvoiceTemplate } from "@/components/InvoiceTemplate";
import { defaultFieldSelection } from "@/lib/invoiceFieldConfig";
import { generateFakeInvoiceData } from "@/lib/generateFakeInvoiceData";
import {
  DOCUMENT_MODE_HELP,
  INVOICE_DOCUMENT_MODES,
  type InvoiceDocumentMode,
  isInvoiceDocumentMode,
} from "@/lib/invoiceDocumentMode";
import {
  INVOICE_LAYOUTS,
  type InvoiceLayoutId,
  isInvoiceLayoutId,
} from "@/lib/invoiceLayouts";
import type { InvoiceData, InvoiceFieldKey, InvoiceFieldSelection } from "@/lib/invoiceTypes";
import { downloadPdf, generateScannedInvoicePdf } from "@/lib/scanPipeline";
import {
  readWelcomeDismissed,
  writeWelcomeDismissed,
} from "@/lib/welcomeStorage";

export default function Home() {
  const [selection, setSelection] = useState<InvoiceFieldSelection>(() =>
    defaultFieldSelection(true),
  );
  const [documentMode, setDocumentMode] =
    useState<InvoiceDocumentMode>("facture");
  const [layout, setLayout] = useState<InvoiceLayoutId>("classic");
  const [lineCount, setLineCount] = useState(5);
  /** null au premier rendu (SSR + hydratation) pour éviter tout écart de contenu aléatoire. */
  const [data, setData] = useState<InvoiceData | null>(null);
  const [busy, setBusy] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  /** Incrémenté à chaque ouverture du guide pour réinitialiser l’état de la modale. */
  const [welcomeKey, setWelcomeKey] = useState(0);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!readWelcomeDismissed()) {
      setWelcomeOpen(true);
    }
  }, []);

  useEffect(() => {
    setData(generateFakeInvoiceData(lineCount));
  }, [lineCount]);

  const handleWelcomeClose = useCallback(
    (options: { neverShowAgain: boolean }) => {
      if (options.neverShowAgain) {
        writeWelcomeDismissed(true);
      }
      setWelcomeOpen(false);
    },
    [],
  );

  const openWelcome = useCallback(() => {
    setWelcomeKey((k) => k + 1);
    setWelcomeOpen(true);
  }, []);

  const randomizeData = useCallback(() => {
    setData(generateFakeInvoiceData(lineCount));
  }, [lineCount]);

  const handleLineCountChange = useCallback((n: number) => {
    setLineCount(n);
  }, []);

  const toggleField = useCallback((key: InvoiceFieldKey) => {
    setSelection((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handlePdf = async () => {
    const el = invoiceRef.current;
    if (!el || !data) return;
    setBusy(true);
    try {
      const bytes = await generateScannedInvoicePdf(el);
      const safe = data.invoiceNumber.replace(/[^\w.-]+/g, "_");
      const prefix =
        documentMode === "facturette" ? "facturette-fictive" : "facture-fictive";
      downloadPdf(bytes, `${prefix}-${safe}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f4f4f5] text-neutral-900">
      <WelcomeDialog
        key={welcomeKey}
        open={welcomeOpen}
        onClose={handleWelcomeClose}
      />
      <AppHeader onOpenWelcome={openWelcome} />

      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:gap-5 sm:py-5 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-4 lg:max-w-md">
          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Type de document
            </h2>
            <label htmlFor="documentMode" className="sr-only">
              Type de document
            </label>
            <select
              id="documentMode"
              value={documentMode}
              onChange={(e) => {
                const v = e.target.value;
                if (isInvoiceDocumentMode(v)) setDocumentMode(v);
              }}
              className="mb-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              {INVOICE_DOCUMENT_MODES.map((id) => (
                <option key={id} value={id}>
                  {DOCUMENT_MODE_HELP[id].label}
                </option>
              ))}
            </select>
            <p className="mb-6 text-xs leading-relaxed text-neutral-600">
              {DOCUMENT_MODE_HELP[documentMode].description}
            </p>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Disposition
            </h2>
            <label htmlFor="layout" className="sr-only">
              Disposition de la facture
            </label>
            <select
              id="layout"
              value={layout}
              disabled={documentMode === "facturette"}
              onChange={(e) => {
                const v = e.target.value;
                if (isInvoiceLayoutId(v)) setLayout(v);
              }}
              className="mb-2 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500"
            >
              {INVOICE_LAYOUTS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="mb-6 text-xs leading-relaxed text-neutral-600">
              {documentMode === "facturette"
                ? "La facturette utilise une disposition fixe (ticket condensé). Repassez en « Facture » pour choisir un autre modèle."
                : INVOICE_LAYOUTS.find((o) => o.id === layout)?.description}
            </p>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Champs sur la facture
            </h2>
            <FieldSelector
              selection={selection}
              onToggle={toggleField}
              lineCount={lineCount}
              onLineCountChange={handleLineCountChange}
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={randomizeData}
              className="rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-neutral-50"
            >
              Nouvelles données aléatoires
            </button>
            <button
              type="button"
              onClick={handlePdf}
              disabled={busy || !data}
              className="rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 disabled:opacity-50"
            >
              {busy ? "Génération…" : "Télécharger le PDF"}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-auto rounded-lg border border-dashed border-neutral-300 bg-neutral-200/80 p-4 lg:p-8">
          <div className="mx-auto w-fit">
            {data ? (
              <InvoiceTemplate
                ref={invoiceRef}
                data={data}
                selection={selection}
                layout={layout}
                mode={documentMode}
              />
            ) : (
              <div
                className="flex w-[794px] min-h-[1123px] items-center justify-center bg-white text-sm text-neutral-500 shadow-sm"
                aria-hidden
              >
                Préparation de l’aperçu…
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
