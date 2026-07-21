"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
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
import { ReorderButtons } from "@/components/admin/reorder-buttons";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import {
  createBrand,
  deleteBrand,
  listAllBrands,
  reorderBrand,
  slugify,
  updateBrand,
  type BrandInput,
} from "@/lib/admin-catalog";
import type { Brand, Platform } from "@/lib/quote-types";

const EMPTY_FORM: BrandInput = {
  name: "",
  slug: "",
  platform: "windows",
  logo: null,
  active: true,
};

export function BrandsSubtab({ categoryId }: { categoryId: string }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState<BrandInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setBrands(await listAllBrands(categoryId));
    } catch {
      toast.error("Could not load brands.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(brand: Brand) {
    setEditing(brand);
    setForm({
      name: brand.name,
      slug: brand.slug,
      platform: brand.platform,
      logo: brand.logo,
      active: brand.active,
    });
    setDialogOpen(true);
  }

  async function onSave() {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error("Name and slug are required.");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await updateBrand(editing.id, form);
        toast.success("Brand updated.");
      } else {
        await createBrand(categoryId, form, brands.length + 1);
        toast.success("Brand added.");
      }
      setDialogOpen(false);
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save brand.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteBrand(id);
      toast.success("Brand deleted.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete brand.");
    }
  }

  async function onToggleActive(brand: Brand) {
    try {
      await updateBrand(brand.id, {
        name: brand.name,
        slug: brand.slug,
        platform: brand.platform,
        logo: brand.logo,
        active: !brand.active,
      });
      await load();
    } catch {
      toast.error("Could not update brand.");
    }
  }

  async function onReorder(index: number, direction: -1 | 1) {
    const neighbor = brands[index + direction];
    if (!neighbor) return;
    try {
      await reorderBrand(brands[index], neighbor);
      await load();
    } catch {
      toast.error("Could not reorder brands.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-ink">Brands</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground"
            >
              <Plus className="h-4 w-4" /> Add brand
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit brand" : "Add brand"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-ink/70">Brand name</span>
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
              <div>
                <span className="text-xs font-semibold text-ink/70">Platform</span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {(["windows", "apple"] as Platform[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, platform: p })}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold capitalize transition ${
                        form.platform === p
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-border text-ink"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <ImageUploadField
                label="Logo"
                value={form.logo}
                onChange={(logo) => setForm({ ...form, logo })}
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
      ) : brands.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
          No brands yet. Add your first brand above.
        </p>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand, index) => (
            <div key={brand.id} className="rounded-2xl border border-border bg-white p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary/60">
                    {brand.logo ? (
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-lg font-extrabold text-brand">{brand.name[0]}</span>
                    )}
                  </span>
                  <div>
                    <p className="font-bold text-ink">{brand.name}</p>
                    <span className="text-xs capitalize text-muted-foreground">
                      {brand.platform}
                    </span>
                    {!brand.active && (
                      <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                        Hidden
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Switch checked={brand.active} onCheckedChange={() => void onToggleActive(brand)} />
                <div className="flex items-center gap-2">
                  <ReorderButtons
                    canMoveLeft={index > 0}
                    canMoveRight={index < brands.length - 1}
                    onMoveLeft={() => void onReorder(index, -1)}
                    onMoveRight={() => void onReorder(index, 1)}
                  />
                  <button
                    onClick={() => openEdit(brand)}
                    aria-label="Edit brand"
                    className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-ink"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <ConfirmDeleteDialog
                    title="Delete this brand?"
                    description="This also removes its series and models. This cannot be undone."
                    onConfirm={() => void onDelete(brand.id)}
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
