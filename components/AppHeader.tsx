"use client";

import { useLocale } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/types";

/**
 * En-tête compact — couleurs en hex (hors capture PDF facture).
 */
export type AppHeaderProps = {
  /** Rouvre la modale d’accueil / guide. */
  onOpenWelcome?: () => void;
  /** Rouvre la modale “Nouveautés”. */
  onOpenWhatsNew?: () => void;
};

function langButtonClass(active: boolean) {
  return [
    "min-w-[2.25rem] px-2 py-1 text-[12px] font-semibold transition-colors",
    active
      ? "bg-[#4338ca] text-white"
      : "text-[#64748b] hover:bg-[#eef2ff] hover:text-[#4338ca]",
  ].join(" ");
}

export function AppHeader({ onOpenWelcome, onOpenWhatsNew }: AppHeaderProps) {
  const { locale, setLocale, messages } = useLocale();

  const pickLocale = (next: Locale) => {
    setLocale(next);
  };

  return (
    <header className="relative shrink-0 overflow-hidden border-b border-[#e2e8f0] bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff]">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-32 w-32 rounded-full bg-[#6366f1]/[0.06] blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c7d2fe] bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#4338ca] shadow-sm">
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-[#6366f1]"
                  aria-hidden
                />
                Test
              </span>
              <h1 className="bg-gradient-to-r from-[#0f172a] to-[#334155] bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
                Factice
              </h1>
              <span className="hidden text-[13px] text-[#64748b] sm:inline">
                {messages.headerTagline}
              </span>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <div
                className="inline-flex overflow-hidden rounded-lg border border-[#c7d2fe] bg-white/90 shadow-sm"
                role="group"
                aria-label={messages.langSwitcherAria}
              >
                <button
                  type="button"
                  onClick={() => pickLocale("fr")}
                  className={langButtonClass(locale === "fr")}
                >
                  {messages.langFr}
                </button>
                <button
                  type="button"
                  onClick={() => pickLocale("en")}
                  className={langButtonClass(locale === "en")}
                >
                  {messages.langEn}
                </button>
              </div>
              {onOpenWelcome && (
                <button
                  type="button"
                  onClick={onOpenWelcome}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#c7d2fe] bg-white/90 px-3 py-1.5 text-[12px] font-medium text-[#4338ca] shadow-sm hover:bg-[#eef2ff]"
                >
                  <svg
                    className="size-3.5 shrink-0 opacity-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  {messages.guide}
                </button>
              )}
              {onOpenWhatsNew && (
                <button
                  type="button"
                  onClick={onOpenWhatsNew}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#a5f3fc] bg-white/90 px-3 py-1.5 text-[12px] font-medium text-[#0e7490] shadow-sm hover:bg-[#ecfeff]"
                >
                  <svg
                    className="size-3.5 shrink-0 opacity-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2v6m0 0 3-3m-3 3-3-3M4 14a8 8 0 0 0 16 0"
                    />
                  </svg>
                  {messages.whatsNewCta}
                </button>
              )}
            </div>
          </div>
          <p className="text-[12px] leading-snug text-[#64748b] sm:max-w-2xl">
            {messages.headerDescription}
          </p>
        </div>
      </div>
    </header>
  );
}
