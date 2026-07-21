"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Laptop, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import {
  createModel,
  deleteModel,
  listAllBrands,
  listAllModels,
  listAllSeries,
  slugify,
  updateModel,
  type ModelInput,
} from "@/lib/admin-catalog";
import type { Brand, Model, Series } from "@/lib/quote-types";

const EMPTY_FORM: ModelInput = {
  name: "",
  slug: "",
  year: new Date().getFullYear(),
  image: null,
  active: true,
};

export function ModelsSubtab({ categoryId }: { categoryId: string }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Model | null>(null);
  const [form, setForm] = useState<ModelInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listAllBrands(categoryId).then((data) => {
      setBrands(data);
      if (data.length > 0) setSelectedBrandId(data[0].id);
    });
  }, [categoryId]);

  useEffect(() => {
    if (!selectedBrandId) return;
    listAllSeries(selectedBrandId).then((data) => {
      setSeries(data);
      setSelectedSeriesId(data[0]?.id ?? "");
      if (data.length === 0) setLoading(false);
    });
  }, [selectedBrandId]);

  async function load(seriesId: string) {
    setLoading(true);
    try {
      setModels(await listAllModels(seriesId));
    } catch {
      toast.error("Could not load models.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedSeriesId) void load(selectedSeriesId);
  }, [selectedSeriesId]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(m: Model) {
    setEditing(m);
    setForm({
      name: m.name,
      slug: m.slug,
      year: m.year,
      image: m.image,
      active: m.active,
    });
    setDialogOpen(true);
  }

  async function onSave() {
    if (!form.name.trim() || !form.slug.trim() || !selectedSeriesId) {
      toast.error("Name and slug are required.");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateModel(editing.id, form);
        toast.success("Model updated.");
      } else {
        await createModel(selectedSeriesId, form, models.length + 1);
        toast.success("Model added.");
      }
      setDialogOpen(false);
      await load(selectedSeriesId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save model.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteModel(id);
      toast.success("Model deleted.");
      await load(selectedSeriesId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete model.");
    }
  }

  async function onToggleActive(m: Model) {
    try {
      await updateModel(m.id, {
        name: m.name,
        slug: m.slug,
        year: m.year,
        image: m.image,
        active: !m.active,
      });
      await load(selectedSeriesId);
    } catch {
      toast.error("Could not update model.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(e.target.value)}
            className="rounded-xl border border-border px-3 py-2 text-sm font-semibold"
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <select
            value={selectedSeriesId}
            onChange={(e) => setSelectedSeriesId(e.target.value)}
            className="rounded-xl border border-border px-3 py-2 text-sm font-semibold"
          >
            {series.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={openCreate}
              disabled={!selectedSeriesId}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-50"
            >
              <Plus className="h-4 w-4" /> Add model
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit model" : "Add model"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Model name</span>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                      slug: editing ? form.slug : slugify(e.target.value),
                    })
                  }
                  className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Slug</span>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Model year</span>
                <input
                  type="number"
                  min={1990}
                  max={2100}
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                  className="mt-1.5 w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </label>
              <ImageUploadField
                label="Product image"
                value={form.image}
                onChange={(image) => setForm({ ...form, image })}
              />
              <label className="flex items-center justify-between rounded-xl border border-border px-3 py-2.5">
                <span className="text-sm font-semibold text-ink">Active</span>
                <Switch
                  checked={form.active}
                  onCheckedChange={(active) => setForm({ ...form, active })}
                />
              </label>
            </div>
            <DialogFooter>
              <button
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16 text-muted-foreground">
          <Spinner className="h-5 w-5" />
        </div>
      ) : models.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
          No models yet for this series.
        </p>
      ) : (
        <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-white">
          {models.map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary/60">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Laptop className="h-5 w-5 text-muted-foreground" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.year}</p>
              </div>
              {!m.active && (
                <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                  Hidden
                </span>
              )}
              <Switch checked={m.active} onCheckedChange={() => void onToggleActive(m)} />
              <button
                onClick={() => openEdit(m)}
                aria-label="Edit model"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-ink"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <ConfirmDeleteDialog
                title="Delete this model?"
                description="This cannot be undone."
                onConfirm={() => void onDelete(m.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
