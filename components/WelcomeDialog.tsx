"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/context";

export type WelcomeDialogProps = {
  open: boolean;
  onClose: (options: { neverShowAgain: boolean }) => void;
};

/**
 * Modale d’accueil : présentation de Factice + option « ne plus afficher ».
 */
export function WelcomeDialog({ open, onClose }: WelcomeDialogProps) {
  const { messages } = useLocale();
  const w = messages.welcome;
  const titleId = useId();
  const descId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [neverShowAgain, setNeverShowAgain] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose({ neverShowAgain });
      }
    },
    [open, neverShowAgain, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#0f172a]/45 backdrop-blur-[2px] transition-opacity"
        aria-label={w.closeBackdropAria}
        onClick={() => onClose({ neverShowAgain })}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl shadow-[#1e293b]/15"
      >
        <div className="border-b border-[#e2e8f0] bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6366f1]">
            {w.badge}
          </p>
          <h2
            id={titleId}
            className="mt-1 text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl"
          >
            {w.title}
          </h2>
          <p id={descId} className="mt-2 text-sm leading-relaxed text-[#475569]">
            {w.intro}
          </p>
        </div>

        <div className="space-y-4 px-5 py-4 text-sm leading-relaxed text-[#334155] sm:px-6">
          <section>
            <h3 className="mb-2 text-[13px] font-semibold text-[#0f172a]">
              {w.sectionPurpose}
            </h3>
            <ul className="list-inside list-disc space-y-1.5 text-[13px] text-[#475569]">
              {w.purposeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-[13px] font-semibold text-[#0f172a]">
              {w.sectionHow}
            </h3>
            <ol className="list-inside list-decimal space-y-1.5 text-[13px] text-[#475569]">
              {w.howItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <div
            className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-[12px] text-amber-950"
            role="note"
          >
            {w.important}
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-3 text-[13px] text-[#475569]">
            <input
              type="checkbox"
              checked={neverShowAgain}
              onChange={(e) => setNeverShowAgain(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-[#cbd5e1] text-[#4f46e5] focus:ring-[#6366f1]"
            />
            <span>{w.checkbox}</span>
          </label>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            className="rounded-lg border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-medium text-[#475569] shadow-sm hover:bg-[#f1f5f9]"
            onClick={() => onClose({ neverShowAgain })}
          >
            {w.close}
          </button>
          <button
            ref={closeBtnRef}
            type="button"
            className="rounded-lg bg-[#1e293b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#334155]"
            onClick={() => onClose({ neverShowAgain })}
          >
            {w.start}
          </button>
        </div>
      </div>
    </div>
  );
}
