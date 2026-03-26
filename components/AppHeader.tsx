/**
 * En-tête compact — couleurs en hex (hors capture PDF facture).
 */
export function AppHeader() {
  return (
    <header className="relative shrink-0 overflow-hidden border-b border-[#e2e8f0] bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#eef2ff]">
      <div
        className="pointer-events-none absolute -right-16 top-0 h-32 w-32 rounded-full bg-[#6366f1]/[0.06] blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px] px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
              Factures fictives · PDF scan
            </span>
          </div>
          <p className="text-[12px] leading-snug text-[#64748b] sm:max-w-md sm:text-right">
            Données aléatoires, champs modulables, export PDF pour valider votre
            flux comptable.
          </p>
        </div>
      </div>
    </header>
  );
}
