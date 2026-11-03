import { useEffect, useRef, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, PhoneCall } from "lucide-react";
import { createRepairBooking } from "@/lib/bookings.functions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function RepairCallback({ service, brand, brandLogo }: { service: string; brand?: string; brandLogo?: string }) {
  const submitBooking = useServerFn(createRepairBooking);
  const submitting = useRef(false);
  const [ready, setReady] = useState(false);
  const [phone, setPhone] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{ reference: string; phone: string } | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => setReady(true), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    submitting.current = true;
    setPending(true);
    setError("");
    try {
      const result = await submitBooking({ data: {
        name: "Callback request",
        phone: `+91${phone}`,
        service,
        brand,
        timeline: "As soon as possible",
        description: "Callback requested. Please call within 15 minutes to discuss the repair.",
        source: window.location.pathname,
      } });
      setReceipt({ reference: result.reference, phone });
      setOpen(true);
      setPhone("");
    } catch {
      setError("We couldn't save your callback request. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return <section aria-labelledby="callback-title" className="border-b border-border bg-paper py-7 sm:py-9">
    <div className="shell flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="flex min-w-0 items-start gap-2 sm:gap-3">
        {brandLogo ? <span className="flex h-11 w-20 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-2 sm:w-28"><img src={brandLogo} alt={`${brand} logo`} width={480} height={104} className="h-auto w-full object-contain" /></span> : <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><PhoneCall size={20} aria-hidden="true" /></span>}
        <div className="min-w-0"><h2 id="callback-title" className={`whitespace-nowrap font-medium tracking-tight text-navytext ${brandLogo ? "text-sm sm:text-xl" : "text-xl"}`}>Prefer a quick callback?</h2><p className={`mt-1 whitespace-nowrap leading-relaxed text-mutedtext sm:text-sm ${brandLogo ? "text-[10px]" : "text-xs"}`}>We’ll call you within 15 minutes.</p></div>
      </div>
      <form onSubmit={handleSubmit} aria-busy={pending} className="w-full lg:max-w-lg">
        <label htmlFor="callback-phone" className="sr-only">Mobile number</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex min-h-12 min-w-0 flex-1 items-center rounded-xl border border-border bg-card px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <span className="border-r border-border pr-3 text-sm font-medium text-navytext">+91</span>
            <input id="callback-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Your mobile number" value={phone} onChange={event => { setPhone(event.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }} required pattern="[6-9][0-9]{9}" title="Enter a 10-digit Indian mobile number" maxLength={10} disabled={pending} aria-invalid={!!error} aria-describedby={error ? "callback-error" : undefined} className="min-w-0 w-full bg-transparent py-3 pl-3 text-base text-navytext outline-none placeholder:text-mutedtext" />
          </div>
          <Button type="submit" variant="default" disabled={!ready || pending} className="min-h-12 rounded-xl px-5">{pending ? <><Loader2 className="size-4 animate-spin" aria-hidden="true" />Requesting…</> : "Request callback"}</Button>
        </div>
        {error && <p id="callback-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p>}
        <p className="mt-2 text-xs text-mutedtext lg:whitespace-nowrap">By requesting a callback, you agree to be contacted about your repair. <a href="/privacy" className="underline underline-offset-2">Privacy policy</a></p>
      </form>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-2xl border-border bg-paper p-7 text-center text-navytext">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Check aria-hidden="true" /></span>
        <DialogTitle className="text-xl font-medium">Your callback is booked!</DialogTitle>
        <DialogDescription className="leading-relaxed text-mutedtext">Our team will call you on <span className="font-medium text-navytext">+91 {receipt?.phone}</span> within <span className="font-medium text-navytext">15 minutes</span> to help with your repair.</DialogDescription>
        <p className="text-xs text-mutedtext">Reference: {receipt?.reference}</p>
        <DialogClose asChild><Button variant="default" className="min-h-11 rounded-xl">Got it</Button></DialogClose>
      </DialogContent>
    </Dialog>
  </section>;
}
