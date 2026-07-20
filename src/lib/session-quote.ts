const QUOTE_SESSION_KEY = "numunix:quote-session";
const PINCODE_KEY = "numunix:pincode";

export type StoredQuoteSession = {
  brandSlug: string;
  seriesSlug: string;
  modelSlug: string;
  configSelections: Record<string, string[]>;
  conditionSelections: Record<string, string[]>;
  phase: "results" | "pickup";
};

export function saveQuoteSession(session: StoredQuoteSession) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(QUOTE_SESSION_KEY, JSON.stringify(session));
}

export function loadQuoteSession(): StoredQuoteSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(QUOTE_SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredQuoteSession;
  } catch {
    return null;
  }
}

export function clearQuoteSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(QUOTE_SESSION_KEY);
}

export function getSavedPincode(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(PINCODE_KEY) ?? "";
}

export function setSavedPincode(pincode: string) {
  if (typeof window === "undefined") return;
  if (!pincode) window.localStorage.removeItem(PINCODE_KEY);
  else window.localStorage.setItem(PINCODE_KEY, pincode);
}
