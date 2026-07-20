"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle, Pencil, Plus, Tag } from "lucide-react";
import { toast } from "sonner";
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
  createSeries,
  deleteSeries,
  listAllBrands,
  listAllSeries,
  slugify,
  updateSeries,
  type SeriesInput,
} from "@/lib/admin-catalog";
import type { Brand, Series } from "@/lib/quote-types";

const EMPTY_FORM: SeriesInput = { name: "", slug: "", image: null, active: true };

export function SeriesSubtab({ categoryId }: { categoryId: string }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Series | null>(null);
  const [form, setForm] = useState<SeriesInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listAllBrands(categoryId).then((data) => {
      setBrands(data);
      if (data.length > 0) setSelectedBrandId(data[0].id);
      else setLoading(false);
    });
  }, [categoryId]);

  async function load(brandId: string) {
    setLoading(true);
    try {
      setSeries(await listAllSeries(brandId));
    } catch {
      toast.error("Could not load series.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedBrandId) void load(selectedBrandId);
  }, [selectedBrandId]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(s: Series) {
    setEditing(s);
    setForm({ name: s.name, slug: s.slug, image: s.image, active: s.active });
    setDialogOpen(true);
  }

  async function onSave() {
    if (!form.name.trim() || !form.slug.trim() || !selectedBrandId) {
      toast.error("Name and slug are required.");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateSeries(editing.id, form);
        toast.success("Series updated.");
      } else {
        await createSeries(selectedBrandId, form, series.length + 1);
        toast.success("Series added.");
      }
      setDialogOpen(false);
      await load(selectedBrandId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save series.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteSeries(id);
      toast.success("Series deleted.");
      await load(selectedBrandId);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete series.");
    }
  }

  async function onToggleActive(s: Series) {
    try {
      await updateSeries(s.id, { name: s.name, slug: s.slug, image: s.image, active: !s.active });
      await load(selectedBrandId);
    } catch {
      toast.error("Could not update series.");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={openCreate}
              disabled={!selectedBrandId}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground disabled:opacity-50"
            >
              <Plus className="h-4 w-4" /> Add series
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit series" : "Add series"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Series name</span>
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
              <ImageUploadField
                label="Series image"
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
          <LoaderCircle className="h-5 w-5 animate-spin" />
        </div>
      ) : series.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
          No series yet. e.g. MacBook Air, ThinkPad, XPS.
        </p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary/60">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Tag className="h-5 w-5 text-emerald-600" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink">{s.name}</p>
                  {!s.active && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Switch checked={s.active} onCheckedChange={() => void onToggleActive(s)} />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(s)}
                    aria-label="Edit series"
                    className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-ink"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <ConfirmDeleteDialog
                    title="Delete this series?"
                    description="This also removes its models. This cannot be undone."
                    onConfirm={() => void onDelete(s.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
