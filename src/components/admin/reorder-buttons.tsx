import { ChevronLeft, ChevronRight } from "lucide-react";

export function ReorderButtons({
  canMoveLeft,
  canMoveRight,
  onMoveLeft,
  onMoveRight,
}: {
  canMoveLeft: boolean;
  canMoveRight: boolean;
  onMoveLeft: () => void;
  onMoveRight: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={!canMoveLeft}
        onClick={onMoveLeft}
        aria-label="Move earlier"
        className="grid h-7 w-7 place-items-center rounded-lg border border-border text-ink disabled:opacity-30"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={!canMoveRight}
        onClick={onMoveRight}
        aria-label="Move later"
        className="grid h-7 w-7 place-items-center rounded-lg border border-border text-ink disabled:opacity-30"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
