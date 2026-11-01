import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { enquiriesConfigured, submitEnquiry } from "@/lib/enquiries";
import { enquirySchema } from "@/lib/enquiry-schema";
import { useCategory } from "./category";
import { REPAIR_SERVICES } from "@/content/homepage-repairs";
import { FEATURES } from "@/content/features";
import { CONTACT } from "@/content/site";

const fieldClass =
  "mt-2 block min-h-12 w-full min-w-0 rounded-xl border border-[#dbe5f2] bg-[#f8fafc] px-4 py-3 text-base font-normal text-[#102a63] outline-none transition focus:border-[#2563eb] focus:ring-3 focus:ring-[#2563eb]/10 placeholder:text-[#8190aa]";
const labelClass = "block min-w-0 text-sm font-medium text-[#102a63]";

export function ContactForm({ initialDescription = "", initialService = "" }: { initialDescription?: string; initialService?: string } = {}) {
  const ctx = useCategory();
  const baseOptions = ctx ? REPAIR_SERVICES[ctx.category].map(item => ({ slug: item.kind, name: item.nav })) : FEATURES;
  const serviceOptions = initialService && !baseOptions.some(item => item.name === initialService) ? [{slug: "requested-repair", name: initialService}, ...baseOptions] : baseOptions;
  const submitting = useRef(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !enquiriesConfigured) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    const parsed = enquirySchema.safeParse({
      ...values,
      source: window.location.pathname === "/" ? "/" : "/contact",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      setStatus("error");
      return;
    }
    submitting.current = true;
    setStatus("pending");
    try {
      await submitEnquiry({ ...values, source: parsed.data.source });
      form.reset();
      setStatus("success");
      window.location.assign("/thank-you");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Please try again later.");
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      aria-busy={status === "pending"}
      onChange={() => {
        if (status !== "pending") setStatus("idle");
      }}
      className="rounded-[24px] border border-[#dbe5f2] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(16,42,99,0.25)] sm:p-8"
    >
      <h2 className="text-2xl font-medium tracking-tight text-[#102a63]">
        {ctx ? "Tell us what needs repairing." : "Tell us what you have in mind."}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#5d76a3]">
        A few details are enough to start. Fields marked * are required.
      </p>
      <fieldset disabled={status === "pending"} className="mt-7 grid min-w-0 gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor="contact-name">
          Name *
          <input
            className={fieldClass}
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            maxLength={100}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
        </label>
        <label className={labelClass} htmlFor="contact-phone">
          Phone number *
          <input
            className={fieldClass}
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            required
            maxLength={25}
            pattern={String.raw`[+0-9\(\) .\-]{7,25}`}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-email">
          Email <span className="font-normal text-[#5d76a3]">(optional)</span>
          <input
            className={fieldClass}
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={254}
          />
        </label>
        <label className={labelClass} htmlFor="contact-service">
          Service *
          <select
            className={fieldClass}
            key={ctx?.category ?? "software"}
            id="contact-service"
            name="service"
            defaultValue={initialService}
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((feature) => (
              <option key={feature.slug} value={feature.name}>
                {feature.name}
              </option>
            ))}
            <option value="Help me decide">Not sure yet, help me decide</option>
          </select>
        </label>
        <label className={labelClass} htmlFor="contact-timeline">
          When would you like to start?
          <select
            className={fieldClass}
            id="contact-timeline"
            name="timeline"
            defaultValue="Flexible"
          >
            <option>Flexible</option>
            <option>As soon as possible</option>
            <option>Within a month</option>
            <option>In 1–3 months</option>
            <option>Just exploring</option>
          </select>
        </label>
        <label className={`${labelClass} sm:col-span-2`} htmlFor="contact-description">
          {ctx ? "Fault description" : "Project description"} <span className="font-normal text-[#5d76a3]">(optional)</span>
          <textarea
            className={`${fieldClass} min-h-32 resize-y`}
            id="contact-description"
            name="description"
            defaultValue={initialDescription}
            rows={4}
            maxLength={1500}
            placeholder={ctx ? "Share the model, symptoms and any damage or error codes." : "What would you like to build or improve? Share your idea, goals, or any questions."}
          />
        </label>
      </fieldset>
      <p id="contact-delivery" className="mt-5 text-sm leading-relaxed text-[#5d76a3]">
        {enquiriesConfigured ? (
          (ctx ? "Share your details and our team will follow up about your repair." : "Share your details and our team will follow up about your project.")
        ) : (
          <>
            Online enquiries will be available soon. For now,{" "}
            <a
              href={CONTACT.emailHref}
              className="font-medium text-[#1e4ed8] underline underline-offset-2"
            >
              email our team
            </a>{" "}
            {ctx ? "to discuss your repair." : "to discuss your project."}
          </>
        )}
      </p>
      <button
        type="submit"
        disabled={!hydrated || !enquiriesConfigured || status === "pending"}
        aria-describedby="contact-delivery"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#1e4ed8] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "pending" ? "Sending enquiry…" : "Submit enquiry"}{" "}
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      {status === "success" && (
        <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
          Thank you. Your enquiry has been received. Our team will contact you to discuss the next
          steps.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          {error}{" "}
          <a href={CONTACT.emailHref} className="underline">
            Email us
          </a>
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-[#5d76a3]">
        We’ll use your details to respond to your enquiry.{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy policy
        </a>
      </p>
    </form>
  );
}
