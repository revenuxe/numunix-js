const PINCODE_KEY = "numunix:pincode";

export function getSavedPincode(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(PINCODE_KEY) ?? "";
}

export function setSavedPincode(pincode: string) {
  if (typeof window === "undefined") return;
  if (!pincode) window.localStorage.removeItem(PINCODE_KEY);
  else window.localStorage.setItem(PINCODE_KEY, pincode);
}
