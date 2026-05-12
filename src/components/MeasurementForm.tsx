import { useState, useEffect } from "react";
import type { Measurement } from "../utils/calculations";

type Props = {
  onSubmit: (m: { width: number; height: number }) => void;
  editing?: Measurement | null;
  onCancel?: () => void;
};

export function MeasurementForm({ onSubmit, editing, onCancel }: Props) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    if (editing) {
      setWidth(String(editing.width));
      setHeight(String(editing.height));
    }
  }, [editing]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;
    onSubmit({ width: w, height: h });
    setWidth("");
    setHeight("");
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted-foreground">العرض (سم)</span>
          <input
            type="number"
            inputMode="decimal"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="مثال: 90"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-lg font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted-foreground">الارتفاع (سم)</span>
          <input
            type="number"
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="مثال: 120"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-lg font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <div className="col-span-2 flex gap-2 sm:col-span-1 sm:items-end">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 text-base font-bold text-black shadow-[var(--shadow-glow)] transition active:scale-95"
          >
            {editing ? "حفظ" : "إضافة"}
          </button>
          {editing && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-border bg-secondary px-4 py-3 font-semibold text-secondary-foreground "
            >
              إلغاء
            </button>
          )}
        </div>
      </div>
    </form>
  );
}