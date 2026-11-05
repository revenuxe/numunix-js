import { useEffect } from "react";
import { emitRepairEvent } from "@/lib/repair-events";

export function RepairInteractionEvents() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!target) return;
      try {
        if (new URL(target.getAttribute("href") || "", window.location.origin).hostname === "wa.me")
          emitRepairEvent("whatsapp_click");
      } catch {
        /* Ignore unrelated malformed links. */
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
