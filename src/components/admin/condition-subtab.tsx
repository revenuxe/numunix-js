"use client";

import { useEffect, useMemo, useState } from "react";
import { Apple, Laptop, LoaderCircle, Monitor, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { PriceEffectBadge } from "@/components/admin/price-effect-badge";
import {
  createConditionGroup,
  createConditionOption,
  deleteConditionGroup,
  deleteConditionOption,
  listConditionGroups,
  updateConditionGroup,
  updateConditionOption,
  type ConditionGroupInput,
  type ConditionOptionInput,
} from "@/lib/admin-catalog";
import type { ConditionGroup, ConditionOption, Platform, PriceEffectType } from "@/lib/quote-types";

const EMPTY_GROUP: ConditionGroupInput = {
  title: "",
  helper_text: "",
  platform: null,
  selection_mode: "single",
  step_order: 1,
  active: true,
};
const EMPTY_OPTION: ConditionOptionInput = {
  label: "",
  description: "",
  price_effect_type: "deduct_fixed",
  price_effect_amount: 0,
  sort_order: 1,
};

const PLATFORM_LABEL: Record<string, string> = {
  all: "All platforms",
  apple: "Apple only",
  windows: "Windows only",
};

type PlatformKey = "all" | "windows" | "apple";

const PLATFORM_SECTIONS: {
  key: PlatformKey;
  title: string;
  subtitle: string;
  Icon: typeof Laptop;
}[] = [
  {
    key: "all",
    title: "Universal",
    subtitle: "Condition checks every laptop gets, no matter the platform.",
    Icon: Laptop,
  },
  {
    key: "windows",
    title: "Windows-only",
    subtitle: "Only shown while evaluating a Windows brand.",
    Icon: Monitor,
  },
  {
    key: "apple",
    title: "Apple-only",
    subtitle: "Only shown while evaluating an Apple brand.",
    Icon: Apple,
  },
];

function platformKey(group: ConditionGroup): PlatformKey {
  return (group.platform ?? "all") as PlatformKey;
}

export function ConditionSubtab({ categoryId }: { categoryId: string }) {
  const [groups, setGroups] = useState<ConditionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PlatformKey>("all");

  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<ConditionGroup | null>(null);
  const [groupForm, setGroupForm] = useState<ConditionGroupInput>(EMPTY_GROUP);
  const [savingGroup, setSavingGroup] = useState(false);

  const [optionDialogOpen, setOptionDialogOpen] = useState(false);
  const [optionGroupId, setOptionGroupId] = useState<string | null>(null);
  const [editingOption, setEditingOption] = useState<ConditionOption | null>(null);
  const [optionForm, setOptionForm] = useState<ConditionOptionInput>(EMPTY_OPTION);
  const [savingOption, setSavingOption] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setGroups(await listConditionGroups(categoryId));
    } catch {
      toast.error("Could not load condition questions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const grouped = useMemo(() => {
    const byPlatform: Record<PlatformKey, ConditionGroup[]> = { all: [], windows: [], apple: [] };
    for (const group of groups) byPlatform[platformKey(group)].push(group);
    return byPlatform;
  }, [groups]);

  function openCreateGroup(defaultPlatform: Platform | null) {
    setEditingGroup(null);
    setGroupForm({ ...EMPTY_GROUP, platform: defaultPlatform, step_order: groups.length + 1 });
    setGroupDialogOpen(true);
  }

  function openEditGroup(group: ConditionGroup) {
    setEditingGroup(group);
    setGroupForm({
      title: group.title,
      helper_text: group.helper_text ?? "",
      platform: group.platform,
      selection_mode: group.selection_mode,
      step_order: group.step_order,
      active: group.active,
    });
    setGroupDialogOpen(true);
  }

  async function onSaveGroup() {
    if (!groupForm.title.trim()) {
      toast.error("Question title is required.");
      return;
    }
    setSavingGroup(true);
    const payload: ConditionGroupInput = {
      ...groupForm,
      helper_text: groupForm.helper_text?.trim() || null,
    };
    try {
      if (editingGroup) {
        await updateConditionGroup(editingGroup.id, payload);
        toast.success("Question updated.");
      } else {
        await createConditionGroup(categoryId, payload);
        toast.success("Question added.");
      }
      setGroupDialogOpen(false);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save question.");
    } finally {
      setSavingGroup(false);
    }
  }

  async function onDeleteGroup(id: string) {
    try {
      await deleteConditionGroup(id);
      toast.success("Question deleted.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete question.");
    }
  }

  function openCreateOption(groupId: string, count: number) {
    setEditingOption(null);
    setOptionGroupId(groupId);
    setOptionForm({ ...EMPTY_OPTION, sort_order: count + 1 });
    setOptionDialogOpen(true);
  }

  function openEditOption(groupId: string, option: ConditionOption) {
    setEditingOption(option);
    setOptionGroupId(groupId);
    setOptionForm({
      label: option.label,
      description: option.description ?? "",
      price_effect_type: option.price_effect_type,
      price_effect_amount: option.price_effect_amount,
      sort_order: option.sort_order,
    });
    setOptionDialogOpen(true);
  }

  async function onSaveOption() {
    if (!optionForm.label.trim() || !optionGroupId) {
      toast.error("Option label is required.");
      return;
    }
    setSavingOption(true);
    const payload: ConditionOptionInput = {
      ...optionForm,
      description: optionForm.description?.trim() || null,
    };
    try {
      if (editingOption) {
        await updateConditionOption(editingOption.id, payload);
        toast.success("Option updated.");
      } else {
        await createConditionOption(optionGroupId, payload);
        toast.success("Option added.");
      }
      setOptionDialogOpen(false);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save option.");
    } finally {
      setSavingOption(false);
    }
  }

  async function onDeleteOption(id: string) {
    try {
      await deleteConditionOption(id);
      toast.success("Option deleted.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete option.");
    }
  }

  return (
    <div>
      <p className="rounded-2xl bg-secondary/40 p-4 text-sm text-muted-foreground">
        Evaluation questions buyers answer — each option adjusts the quote. Questions are grouped by
        platform below — a Windows brand only sees <strong>Universal</strong> and{" "}
        <strong>Windows-only</strong> checks; an Apple brand only sees <strong>Universal</strong>{" "}
        and <strong>Apple-only</strong>.
      </p>

      {loading ? (
        <div className="grid place-items-center py-16 text-muted-foreground">
          <LoaderCircle className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as PlatformKey)}
          className="mt-6"
        >
          <TabsList className="h-auto flex-wrap gap-1 bg-secondary p-1.5">
            {PLATFORM_SECTIONS.map(({ key, title, Icon }) => (
              <TabsTrigger key={key} value={key} className="gap-1.5 px-3 py-1.5">
                <Icon className="h-3.5 w-3.5" />
                {title}
                <span className="ml-1 rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-bold">
                  {grouped[key].length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {PLATFORM_SECTIONS.map(({ key, title, subtitle }) => {
            const sectionGroups = grouped[key];
            return (
              <TabsContent key={key} value={key} className="mt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                  <button
                    onClick={() => openCreateGroup(key === "all" ? null : (key as Platform))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink transition hover:bg-secondary"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add question
                  </button>
                </div>

                {sectionGroups.length === 0 ? (
                  <p className="mt-3 rounded-2xl bg-secondary/40 p-4 text-center text-xs text-muted-foreground">
                    No {title.toLowerCase()} condition questions yet.
                  </p>
                ) : (
                  <Accordion type="multiple" className="mt-3 space-y-2.5">
                    {sectionGroups.map((group) => (
                      <AccordionItem
                        key={group.id}
                        value={group.id}
                        className="rounded-2xl border border-border bg-white px-4"
                      >
                        <div className="flex items-center gap-2">
                          <AccordionTrigger className="flex-1 hover:no-underline">
                            <span className="flex flex-wrap items-center gap-2 text-left">
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-ink">
                                Step {group.step_order}
                              </span>
                              <span className="font-bold text-ink">{group.title}</span>
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                                {group.selection_mode === "multi"
                                  ? "Multi-select"
                                  : "Single choice"}
                              </span>
                              {!group.active && (
                                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-600">
                                  Hidden
                                </span>
                              )}
                            </span>
                          </AccordionTrigger>
                          <button
                            onClick={() => openEditGroup(group)}
                            aria-label="Edit question"
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-ink"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <ConfirmDeleteDialog
                            title="Delete this question?"
                            description="All of its answer options will be removed too."
                            onConfirm={() => void onDeleteGroup(group.id)}
                          />
                        </div>
                        <AccordionContent>
                          <div className="space-y-2">
                            {group.condition_options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center justify-between gap-3 rounded-xl bg-secondary/40 px-3 py-2"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-ink">
                                    {option.label}
                                  </p>
                                  {option.description && (
                                    <p className="truncate text-xs text-muted-foreground">
                                      {option.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                  <PriceEffectBadge
                                    type={option.price_effect_type}
                                    amount={option.price_effect_amount}
                                  />
                                  <button
                                    onClick={() => openEditOption(group.id, option)}
                                    aria-label="Edit option"
                                    className="grid h-7 w-7 place-items-center rounded-lg bg-white text-ink ring-1 ring-border"
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => void onDeleteOption(option.id)}
                                    aria-label="Delete option"
                                    className="grid h-7 w-7 place-items-center rounded-lg bg-white text-red-600 ring-1 ring-border"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() =>
                              openCreateOption(group.id, group.condition_options.length)
                            }
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand"
                          >
                            <Plus className="h-3.5 w-3.5" /> Add option
                          </button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      )}

      <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingGroup ? "Edit condition question" : "Add condition question"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-ink/70">Question</span>
              <input
                value={groupForm.title}
                onChange={(e) => setGroupForm({ ...groupForm, title: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink/70">Helper text</span>
              <input
                value={groupForm.helper_text ?? ""}
                onChange={(e) => setGroupForm({ ...groupForm, helper_text: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <div>
              <span className="text-xs font-semibold text-ink/70">Platform</span>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Which brands should see this condition question?
              </p>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {([null, "windows", "apple"] as (Platform | null)[]).map((p) => (
                  <button
                    key={p ?? "all"}
                    type="button"
                    onClick={() => setGroupForm({ ...groupForm, platform: p })}
                    className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                      groupForm.platform === p
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border text-ink"
                    }`}
                  >
                    {PLATFORM_LABEL[p ?? "all"]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold text-ink/70">Selection</span>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {(["single", "multi"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setGroupForm({ ...groupForm, selection_mode: mode })}
                    className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                      groupForm.selection_mode === mode
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border text-ink"
                    }`}
                  >
                    {mode === "single" ? "Single choice" : "Multi-select"}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="text-xs font-semibold text-ink/70">Step order</span>
              <input
                type="number"
                min={1}
                value={groupForm.step_order}
                onChange={(e) => setGroupForm({ ...groupForm, step_order: Number(e.target.value) })}
                className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5">
              <span className="text-sm font-semibold text-ink">Active</span>
              <Switch
                checked={groupForm.active}
                onCheckedChange={(active) => setGroupForm({ ...groupForm, active })}
              />
            </label>
          </div>
          <DialogFooter>
            <button
              onClick={onSaveGroup}
              disabled={savingGroup}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
            >
              {savingGroup ? "Saving…" : "Save"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={optionDialogOpen} onOpenChange={setOptionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingOption ? "Edit option" : "Add option"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-ink/70">Option label</span>
              <input
                value={optionForm.label}
                onChange={(e) => setOptionForm({ ...optionForm, label: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-ink/70">Explanation (optional)</span>
              <input
                value={optionForm.description ?? ""}
                onChange={(e) => setOptionForm({ ...optionForm, description: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
            <div>
              <span className="text-xs font-semibold text-ink/70">Effect type</span>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {(
                  [
                    ["deduct_fixed", "Deduct fixed"],
                    ["deduct_percent", "Deduct percent"],
                    ["bonus_fixed", "Bonus fixed"],
                  ] as [PriceEffectType, string][]
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setOptionForm({ ...optionForm, price_effect_type: value })}
                    className={`rounded-xl border px-2 py-2 text-xs font-semibold transition ${
                      optionForm.price_effect_type === value
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border text-ink"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="text-xs font-semibold text-ink/70">
                {optionForm.price_effect_type === "deduct_percent" ? "Percentage" : "Amount (₹)"}
              </span>
              <input
                type="number"
                min={0}
                value={optionForm.price_effect_amount}
                onChange={(e) =>
                  setOptionForm({ ...optionForm, price_effect_amount: Number(e.target.value) })
                }
                className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </label>
          </div>
          <DialogFooter>
            <button
              onClick={onSaveOption}
              disabled={savingOption}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
            >
              {savingOption ? "Saving…" : "Save"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
