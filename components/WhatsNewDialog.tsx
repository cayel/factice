"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import type { Locale } from "@/lib/i18n/types";
import type { WhatsNewEntry } from "@/lib/whatsNew";
import { useLocale } from "@/lib/i18n/context";

export type WhatsNewDialogProps = {
  open: boolean;
  locale: Locale;
  versionLabel: string;
  entries: WhatsNewEntry[];
  onClose: () => void;
};

export function WhatsNewDialog({
  open,
  locale,
  versionLabel,
  entries,
  onClose,
}: WhatsNewDialogProps) {
  const { messages } = useLocale();
  const titleId = useId();
  const descId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
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
        aria-label={messages.whatsNew.closeBackdropAria}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative max-h-[min(90vh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl shadow-[#1e293b]/15"
      >
        <div className="border-b border-[#e2e8f0] bg-gradient-to-br from-[#f8fafc] to-[#ecfeff] px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0891b2]">
            {messages.whatsNew.badge} · {versionLabel}
          </p>
          <h2
            id={titleId}
            className="mt-1 text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl"
          >
            {messages.whatsNew.title}
          </h2>
          <p id={descId} className="mt-2 text-sm leading-relaxed text-[#475569]">
            {messages.whatsNew.intro}
          </p>
        </div>

        <div className="space-y-4 px-5 py-4 text-sm leading-relaxed text-[#334155] sm:px-6">
          {entries.map((entry) => (
            <section key={entry.id}>
              <h3 className="mb-2 text-[13px] font-semibold text-[#0f172a]">
                {entry.titleByLocale[locale]}
              </h3>
              <ul className="list-inside list-disc space-y-1.5 text-[13px] text-[#475569]">
                {entry.itemsByLocale[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e2e8f0] bg-[#f8fafc] px-5 py-4 sm:px-6">
          <button
            ref={closeBtnRef}
            type="button"
            className="rounded-lg bg-[#1e293b] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#334155]"
            onClick={onClose}
          >
            {messages.whatsNew.close}
          </button>
        </div>
      </div>
    </div>
  );
}

