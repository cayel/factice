export const WELCOME_DISMISSED_KEY = "factice-welcome-dismissed";

export function readWelcomeDismissed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(WELCOME_DISMISSED_KEY) === "true";
}

export function writeWelcomeDismissed(dismissed: boolean): void {
  if (typeof window === "undefined") return;
  if (dismissed) {
    window.localStorage.setItem(WELCOME_DISMISSED_KEY, "true");
  } else {
    window.localStorage.removeItem(WELCOME_DISMISSED_KEY);
  }
}
