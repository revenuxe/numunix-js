"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  LoaderCircle,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import numunixIcon from "@/assets/numunix-icon.png";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { supabase } from "@/lib/supabase";
import { CONTACT } from "@/lib/contact";
import {
  buildAnswers,
  calculateQuote,
  deriveSelectedFamilyTags,
  getVisibleConfigurationGroups,
  submitDeviceOrder,
} from "@/lib/quote";
import { generateInvoicePdf } from "@/lib/invoice";
import { getMyProfile } from "@/lib/customer-profile";
import {
  clearQuoteSession,
  getSavedPincode,
  loadQuoteSession,
  saveQuoteSession,
  setSavedPincode,
} from "@/lib/session-quote";
import type {
  Brand,
  ConditionGroup,
  ConfigurationGroup,
  DeviceOrder,
  Model,
  PickupSlot,
  QuoteBreakdown,
  Series,
} from "@/lib/quote-types";

type Phase = "intro" | "configuration" | "condition" | "results" | "pickup" | "confirmation";

type StepOption = { id: string; label: string; description: string | null };
type Step = {
  id: string;
  title: string;
  helperText: string | null;
  multi: boolean;
  options: StepOption[];
};

function formatInr(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function QuoteFunnel({
  brand,
  series,
  model,
  configGroups,
  conditionGroups,
}: {
  brand: Brand;
  series: Series;
  model: Model;
  configGroups: ConfigurationGroup[];
  conditionGroups: ConditionGroup[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("intro");
  const [configIndex, setConfigIndex] = useState(0);
  const [conditionIndex, setConditionIndex] = useState(0);
  const [configSelections, setConfigSelections] = useState<Record<string, string[]>>({});
  const [conditionSelections, setConditionSelections] = useState<Record<string, string[]>>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [breakdown, setBreakdown] = useState<QuoteBreakdown | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [order, setOrder] = useState<DeviceOrder | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const visibleConfigGroups = useMemo(
    () =>
      getVisibleConfigurationGroups(
        configGroups,
        deriveSelectedFamilyTags(configGroups, configSelections),
      ),
    [configGroups, configSelections],
  );

  // If an earlier answer changes and a dependent sub-category question (e.g.
  // a GPU model list) disappears as a result, drop its now-stale selection so
  // it never leaks into the final answers/quote once it's no longer shown.
  useEffect(() => {
    const visibleIds = new Set(visibleConfigGroups.map((g) => g.id));
    setConfigSelections((current) => {
      let changed = false;
      const next: Record<string, string[]> = {};
      for (const group of configGroups) {
        const selected = current[group.id];
        if (!selected) continue;
        if (group.depends_on_processor_family && !visibleIds.has(group.id)) {
          changed = true;
          continue;
        }
        next[group.id] = selected;
      }
      return changed ? next : current;
    });
  }, [visibleConfigGroups, configGroups]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const authed = Boolean(data.user);
      setIsAuthenticated(authed);

      const session = loadQuoteSession();
      if (
        session &&
        session.brandSlug === brand.slug &&
        session.seriesSlug === series.slug &&
        session.modelSlug === model.slug
      ) {
        setConfigSelections(session.configSelections);
        setConditionSelections(session.conditionSelections);
        setPhase(session.phase);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "results" || !isAuthenticated || breakdown || loadingQuote) return;
    setLoadingQuote(true);
    const configOptionIds = Object.values(configSelections).flat();
    const conditionOptionIds = Object.values(conditionSelections).flat();
    calculateQuote(model.id, configOptionIds, conditionOptionIds)
      .then(setBreakdown)
      .catch(() => toast.error("Could not calculate your quote. Please try again."))
      .finally(() => setLoadingQuote(false));
  }, [
    phase,
    isAuthenticated,
    breakdown,
    loadingQuote,
    model.id,
    configSelections,
    conditionSelections,
  ]);

  function toggleOption(
    step: Step,
    optionId: string,
    selections: Record<string, string[]>,
    setSelections: (v: Record<string, string[]>) => void,
  ) {
    const current = selections[step.id] ?? [];
    if (step.multi) {
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      setSelections({ ...selections, [step.id]: next });
    } else {
      setSelections({ ...selections, [step.id]: [optionId] });
    }
  }

  function toConfigStep(group: ConfigurationGroup): Step {
    return {
      id: group.id,
      title: group.title,
      helperText: group.helper_text,
      multi: group.selection_mode === "multi",
      options: group.configuration_options.map((o) => ({
        id: o.id,
        label: o.label,
        description: o.description,
      })),
    };
  }

  function toConditionStep(group: ConditionGroup): Step {
    return {
      id: group.id,
      title: group.title,
      helperText: group.helper_text,
      multi: group.selection_mode === "multi",
      options: group.condition_options.map((o) => ({
        id: o.id,
        label: o.label,
        description: o.description,
      })),
    };
  }

  function goToResults() {
    setBreakdown(null);
    setPhase("results");
  }

  function handleConfigContinue() {
    if (configIndex < visibleConfigGroups.length - 1) {
      setConfigIndex(configIndex + 1);
    } else if (conditionGroups.length > 0) {
      setPhase("condition");
      setConditionIndex(0);
    } else {
      goToResults();
    }
  }

  function handleConditionContinue() {
    if (conditionIndex < conditionGroups.length - 1) {
      setConditionIndex(conditionIndex + 1);
    } else {
      goToResults();
    }
  }

  function handleSignInToContinue() {
    saveQuoteSession({
      brandSlug: brand.slug,
      seriesSlug: series.slug,
      modelSlug: model.slug,
      configSelections,
      conditionSelections,
      phase: "results",
    });
    router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }

  async function handlePickupSubmit(input: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    pickupDate: string;
    pickupSlot: PickupSlot;
    notes: string;
  }) {
    if (!breakdown) return;
    setSubmitting(true);
    try {
      const answers = buildAnswers(
        configGroups,
        conditionGroups,
        configSelections,
        conditionSelections,
      );
      const created = await submitDeviceOrder({
        customerName: input.customerName,
        phone: input.phone,
        email: input.email,
        address: input.address,
        pincode: input.pincode,
        pickupDate: input.pickupDate,
        pickupSlot: input.pickupSlot,
        notes: input.notes,
        categoryName: "Laptops",
        brandName: brand.name,
        seriesName: series.name,
        modelName: model.name,
        modelId: model.id,
        answers,
        quoteBreakdown: breakdown,
      });
      setSavedPincode(input.pincode);
      clearQuoteSession();
      setOrder(created);
      setPhase("confirmation");
      toast.success("Pickup requested!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not book your pickup. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Numunix, I want to sell my ${brand.name} ${model.name}. Please help me get a quote.`,
  );

  return (
    <div className="mx-auto max-w-[768px] px-4 py-10 md:px-8">
      {phase === "intro" && (
        <IntroPhase
          model={model}
          brand={brand}
          series={series}
          whatsappMessage={whatsappMessage}
          onStart={() =>
            visibleConfigGroups.length > 0
              ? setPhase("configuration")
              : conditionGroups.length > 0
                ? setPhase("condition")
                : goToResults()
          }
        />
      )}

      {phase === "configuration" && visibleConfigGroups[configIndex] && (
        <StepPhase
          key={visibleConfigGroups[configIndex].id}
          label="CONFIGURATION"
          stepNumber={configIndex + 1}
          totalSteps={visibleConfigGroups.length + conditionGroups.length}
          step={toConfigStep(visibleConfigGroups[configIndex])}
          selected={configSelections[visibleConfigGroups[configIndex].id] ?? []}
          onToggle={(optionId) =>
            toggleOption(
              toConfigStep(visibleConfigGroups[configIndex]),
              optionId,
              configSelections,
              setConfigSelections,
            )
          }
          onBack={() => (configIndex > 0 ? setConfigIndex(configIndex - 1) : setPhase("intro"))}
          onContinue={handleConfigContinue}
          continueLabel={
            configIndex === visibleConfigGroups.length - 1 && conditionGroups.length === 0
              ? "See my price"
              : "Continue"
          }
        />
      )}

      {phase === "condition" && conditionGroups[conditionIndex] && (
        <StepPhase
          key={conditionGroups[conditionIndex].id}
          label="CONDITION"
          stepNumber={visibleConfigGroups.length + conditionIndex + 1}
          totalSteps={visibleConfigGroups.length + conditionGroups.length}
          step={toConditionStep(conditionGroups[conditionIndex])}
          selected={conditionSelections[conditionGroups[conditionIndex].id] ?? []}
          onToggle={(optionId) =>
            toggleOption(
              toConditionStep(conditionGroups[conditionIndex]),
              optionId,
              conditionSelections,
              setConditionSelections,
            )
          }
          onBack={() =>
            conditionIndex > 0
              ? setConditionIndex(conditionIndex - 1)
              : visibleConfigGroups.length > 0
                ? setPhase("configuration")
                : setPhase("intro")
          }
          onContinue={handleConditionContinue}
          continueLabel={
            conditionIndex === conditionGroups.length - 1 ? "See my price" : "Continue"
          }
        />
      )}

      {phase === "results" && (
        <ResultsPhase
          isAuthenticated={isAuthenticated}
          loading={loadingQuote}
          breakdown={breakdown}
          modelName={model.name}
          onSignIn={handleSignInToContinue}
          onBack={() =>
            conditionGroups.length > 0 ? setPhase("condition") : setPhase("configuration")
          }
          onBookPickup={() => setPhase("pickup")}
          whatsappMessage={whatsappMessage}
        />
      )}

      {phase === "pickup" && breakdown && (
        <PickupPhase
          finalQuote={breakdown.final_quote}
          submitting={submitting}
          onBack={() => setPhase("results")}
          onSubmit={handlePickupSubmit}
        />
      )}

      {phase === "confirmation" && order && <ConfirmationPhase order={order} />}
    </div>
  );
}

function IntroPhase({
  model,
  brand,
  whatsappMessage,
  onStart,
}: {
  model: Model;
  brand: Brand;
  series: Series;
  whatsappMessage: string;
  onStart: () => void;
}) {
  return (
    <div>
      <a
        href={`${CONTACT.whatsappUrl}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-emerald-300"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">Prefer to chat? Sell on WhatsApp</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Send a photo of your {model.name} and get a quote in minutes.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700" />
      </a>

      <div className="mt-5 rounded-[2rem] bg-ink p-7 text-white shadow-card">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Best price up to</p>
        <p className="mt-3 bg-gradient-to-r from-sky-400 via-brand to-indigo-500 bg-clip-text text-5xl font-extrabold text-transparent">
          {formatInr(model.base_price)}
        </p>
        <p className="mt-4 text-sm leading-6 text-white/75">
          Answer a few quick questions about your {model.name}&apos;s condition to lock in your
          exact price.
        </p>
        <button
          onClick={onStart}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110 sm:w-auto"
        >
          Sell now <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { Icon: Zap, title: "Instant price", desc: "See your exact quote in under a minute." },
          { Icon: Truck, title: "Free pickup", desc: "Doorstep collection across Bangalore." },
          {
            Icon: ShieldCheck,
            title: "Instant payment",
            desc: "Get paid the moment we verify your device.",
          },
        ].map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-4 text-center shadow-soft ring-1 ring-border"
          >
            <Icon className="mx-auto h-5 w-5 text-brand" />
            <p className="mt-2 text-sm font-bold text-ink">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        {brand.name} · {model.name}
      </p>
    </div>
  );
}

function StepPhase({
  label,
  stepNumber,
  totalSteps,
  step,
  selected,
  onToggle,
  onBack,
  onContinue,
  continueLabel,
}: {
  label: string;
  stepNumber: number;
  totalSteps: number;
  step: Step;
  selected: string[];
  onToggle: (optionId: string) => void;
  onBack: () => void;
  onContinue: () => void;
  continueLabel: string;
}) {
  const canContinue = selected.length > 0;
  const progressPercent = Math.round((stepNumber / totalSteps) * 100);
  const remaining = totalSteps - stepNumber;
  const isCompact =
    step.options.every((o) => !o.description) &&
    step.options.every((o) => o.label.length <= 22) &&
    step.options.length > 2;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 pb-28 duration-300">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{label}</p>
        <p className="text-xs font-semibold text-muted-foreground">
          {remaining > 0 ? `${remaining} question${remaining === 1 ? "" : "s"} to go` : "Last one!"}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-bold text-muted-foreground">
          {stepNumber}/{totalSteps}
        </span>
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-ink">{step.title}</h2>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {step.helperText && <p className="text-sm text-muted-foreground">{step.helperText}</p>}
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {step.multi ? "Select all that apply" : "Choose one"}
        </span>
      </div>

      <div
        className={isCompact ? "mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3" : "mt-6 grid gap-3"}
      >
        {step.options.map((option) => {
          const isSelected = selected.includes(option.id);

          if (isCompact) {
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                aria-pressed={isSelected}
                className={`relative flex items-center justify-center rounded-2xl border px-3 py-4 text-center text-sm font-bold transition-all duration-150 active:scale-[0.97] ${
                  isSelected
                    ? "border-brand bg-brand/10 text-brand ring-2 ring-brand/15"
                    : "border-border bg-white text-ink hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft"
                }`}
              >
                {option.label}
                {isSelected && (
                  <span
                    className={`absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center border-2 border-white bg-brand text-brand-foreground ${
                      step.multi ? "rounded-md" : "rounded-full"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={option.id}
              onClick={() => onToggle(option.id)}
              aria-pressed={isSelected}
              className={`group flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-150 active:scale-[0.99] ${
                isSelected
                  ? "border-brand bg-brand/10 ring-2 ring-brand/15"
                  : "border-border bg-white hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft"
              }`}
            >
              <span>
                <span className="block text-sm font-bold text-ink">{option.label}</span>
                {option.description && (
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center border-2 transition-all ${
                  step.multi ? "rounded-md" : "rounded-full"
                } ${
                  isSelected
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-white text-transparent group-hover:border-brand/40"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
            </button>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[768px] gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-soft transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground disabled:shadow-none"
          >
            {continueLabel} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsPhase({
  isAuthenticated,
  loading,
  breakdown,
  modelName,
  onSignIn,
  onBack,
  onBookPickup,
  whatsappMessage,
}: {
  isAuthenticated: boolean | null;
  loading: boolean;
  breakdown: QuoteBreakdown | null;
  modelName: string;
  onSignIn: () => void;
  onBack: () => void;
  onBookPickup: () => void;
  whatsappMessage: string;
}) {
  if (isAuthenticated === null) {
    return (
      <div className="grid place-items-center py-24 text-muted-foreground">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl bg-white p-7 text-center shadow-soft ring-1 ring-border">
        <Image src={numunixIcon} alt="" className="mx-auto h-10 w-auto" />
        <h2 className="mt-4 text-xl font-extrabold text-ink">
          Sign in to save your quote and book pickup
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Your selected model and answers will be kept after login.
        </p>
        <button
          onClick={onSignIn}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
        >
          Sign in to continue <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onBack}
          className="mt-4 block w-full text-xs font-semibold text-muted-foreground hover:text-ink"
        >
          Back to edit answers
        </button>
      </div>
    );
  }

  if (loading || !breakdown) {
    return (
      <div className="grid place-items-center py-24 text-muted-foreground">
        <LoaderCircle className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300">
      <div className="rounded-3xl bg-white p-7 text-center shadow-card ring-1 ring-border">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
          Your estimated buyback price
        </p>
        <p className="mt-3 text-5xl font-extrabold text-brand">
          {formatInr(breakdown.final_quote)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{modelName}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Final price is confirmed after doorstep inspection.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink transition hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> Edit answers
          </button>
          <button
            onClick={onBookPickup}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-soft transition hover:brightness-110"
          >
            Book free pickup <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <a
        href={`${CONTACT.whatsappUrl}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-emerald-300"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
          <WhatsAppIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink">Prefer WhatsApp support instead?</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Chat with our team if you have questions about your quote.
          </p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-emerald-700" />
      </a>
    </div>
  );
}

function PickupPhase({
  finalQuote,
  submitting,
  onBack,
  onSubmit,
}: {
  finalQuote: number;
  submitting: boolean;
  onBack: () => void;
  onSubmit: (input: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    pincode: string;
    pickupDate: string;
    pickupSlot: PickupSlot;
    notes: string;
  }) => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupSlot, setPickupSlot] = useState<PickupSlot>("morning");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setPincode(getSavedPincode());
    getMyProfile()
      .then((profile) => {
        if (!profile) return;
        if (profile.full_name) setCustomerName(profile.full_name);
        if (profile.phone) setPhone(profile.phone);
        if (profile.email) setEmail(profile.email);
        if (profile.address) setAddress(profile.address);
        if (profile.pincode) setPincode(profile.pincode);
      })
      .catch(() => {
        // ignore — the buyer just types their details in manually
      });
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    onSubmit({ customerName, phone, email, address, pincode, pickupDate, pickupSlot, notes });
  }

  return (
    <form
      onSubmit={onSubmitForm}
      className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-border sm:p-8"
    >
      <h2 className="text-2xl font-extrabold text-ink">Book your free pickup</h2>
      <p className="mt-2 text-3xl font-extrabold text-brand">{formatInr(finalQuote)}</p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-ink/70">Full name</span>
          <input
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Phone / WhatsApp number</span>
            <input
              required
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Email (optional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-ink/70">Flat/house, street, landmark</span>
          <textarea
            required
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Bangalore pincode</span>
            <input
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink/70">Preferred pickup date</span>
            <input
              required
              type="date"
              min={today}
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>
        </div>
        <div>
          <span className="text-xs font-semibold text-ink/70">Time slot</span>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {(
              [
                ["morning", "Morning · 9am–12pm"],
                ["afternoon", "Afternoon · 12pm–4pm"],
                ["evening", "Evening · 4pm–8pm"],
              ] as [PickupSlot, string][]
            ).map(([value, label]) => (
              <button
                type="button"
                key={value}
                onClick={() => setPickupSlot(value)}
                className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                  pickupSlot === value
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border text-ink hover:border-brand/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-ink/70">
            Notes for the pickup agent (optional)
          </span>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
        >
          {submitting ? "Booking…" : "Confirm free pickup"}
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Free to book · You approve the rate before anything is sold. By booking, you agree to our{" "}
        <a href="/sell-laptop/terms" target="_blank" className="font-semibold text-brand underline">
          Buyback Terms &amp; Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function ConfirmationPhase({ order }: { order: DeviceOrder }) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-border">
      <CheckCircle2 className="mx-auto h-14 w-14 text-brand" />
      <h2 className="mt-4 text-2xl font-extrabold text-ink">Pickup requested!</h2>
      <p className="mx-auto mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
        Booking ID: {order.booking_id}
      </p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
        Our team will call you shortly to confirm your {order.model_name} pickup and final price of{" "}
        {formatInr(order.final_quote)}.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() =>
            void generateInvoicePdf(order).catch(() =>
              toast.error("Could not generate the invoice PDF. Please try again."),
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink"
        >
          <Download className="h-4 w-4" /> Download invoice
        </button>
        <a
          href="/sell/laptops"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-ink"
        >
          Sell another device
        </a>
        <a
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
        >
          View my requests
        </a>
      </div>
    </div>
  );
}
