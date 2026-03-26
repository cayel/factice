/** Hash déterministe pour varier formes et couleurs à partir d’une chaîne. */
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Initiales (2 caractères) à partir du nom de société. */
export function initialsFromName(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0 && /[A-Za-zÀ-ÿ0-9]/.test(p));
  if (parts.length >= 2) {
    const a = parts[0]!.match(/[A-Za-zÀ-ÿ0-9]/);
    const b = parts[1]!.match(/[A-Za-zÀ-ÿ0-9]/);
    return ((a?.[0] ?? "?") + (b?.[0] ?? "?")).toUpperCase();
  }
  const w = parts[0] ?? "?";
  const chars = w.replace(/[^A-Za-zÀ-ÿ0-9]/g, "");
  if (chars.length >= 2) return chars.slice(0, 2).toUpperCase();
  return (chars + "?").slice(0, 2).toUpperCase();
}

/** Palettes en hex uniquement (capture PDF / html2canvas). */
export const LOGO_PALETTES: readonly (readonly [string, string, string])[] = [
  ["#1e3a5f", "#3b82f6", "#93c5fd"],
  ["#422006", "#d97706", "#fde68a"],
  ["#14532d", "#16a34a", "#bbf7d0"],
  ["#4c0519", "#e11d48", "#fecdd3"],
  ["#312e81", "#6366f1", "#c7d2fe"],
  ["#164e63", "#0891b2", "#a5f3fc"],
  ["#3f3f46", "#71717a", "#e4e4e7"],
  ["#713f12", "#ca8a04", "#fef08a"],
] as const;

export function pickPalette(seed: string): readonly [string, string, string] {
  const h = hashSeed(seed);
  return LOGO_PALETTES[h % LOGO_PALETTES.length]!;
}
