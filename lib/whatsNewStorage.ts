export const WHATS_NEW_LAST_SEEN_KEY = "factice-whatsnew-last-seen";

export function readWhatsNewLastSeen(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(WHATS_NEW_LAST_SEEN_KEY);
}

export function writeWhatsNewLastSeen(version: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WHATS_NEW_LAST_SEEN_KEY, version);
}

