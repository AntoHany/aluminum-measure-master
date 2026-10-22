import { useState, useEffect } from "react";
import type { Measurement } from "../utils/calculations";

type Props = {
  onSubmit: (m: { width: number; height: number; qty: number }) => void;
  editing?: Measurement | null;
  onCancel?: () => void;
};

export function MeasurementForm({ onSubmit, editing, onCancel }: Props) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [qty, setQty] = useState("1");

  useEffect(() => {
    if (editing) {
      setWidth(String(editing.width));
      setHeight(String(editing.height));
      setQty(String(editing.qty ?? 1));
    }
  }, [editing]);

  const changeQty = (delta: number) => {
    const current = parseInt(qty, 10) || 1;
    const next = Math.max(1, current + delta);
    setQty(String(next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(width);
    const h = parseFloat(height);
    const q = Math.max(1, Math.round(parseInt(qty, 10) || 1));
    if (!w || !h || w <= 0 || h <= 0) return;
    onSubmit({ width: w, height: h, qty: q });
    setWidth("");
    setHeight("");
    setQty("1");
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
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
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted-foreground">العدد</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => changeQty(1)}
              className="h-12 w-12 shrink-0 rounded-xl border border-border bg-secondary text-2xl font-bold text-secondary-foreground transition active:scale-90 hover:bg-accent"
              aria-label="زيادة العدد"
            >
              +
            </button>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={qty}
              onChange={(e) => {
                const v = Math.max(1, Math.round(parseInt(e.target.value, 10) || 1));
                setQty(String(v));
              }}
              className="w-16 rounded-xl border border-input bg-background px-2 py-3 text-center text-lg font-bold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={() => changeQty(-1)}
              className="h-12 w-12 shrink-0 rounded-xl border border-border bg-secondary text-2xl font-bold text-secondary-foreground transition active:scale-90 hover:bg-accent disabled:opacity-40"
              aria-label="تقليل العدد"
              disabled={(parseInt(qty, 10) || 1) <= 1}
            >
              −
            </button>
          </div>
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
