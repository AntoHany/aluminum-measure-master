import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { MeasurementForm } from "../components/MeasurementForm";
import { MeasurementTable } from "../components/MeasurementTable";
import { SummaryCard } from "../components/SummaryCard";
import { GroupedMeasurements } from "../components/GroupedMeasurements";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Measurement } from "../utils/calculations";
import { totalArea, totalQuantity } from "../utils/calculations";

export const Route = createFileRoute("/measurements")({
  head: () => ({
    meta: [
      { title: "تجميع المقاسات — حاسبة الألوميتال" },
      { name: "description", content: "أضف مقاسات الشبابيك واحسب المساحة والسعر." },
    ],
  }),
  component: MeasurementsPage,
});

function MeasurementsPage() {
  const [items, setItems] = useLocalStorage<Measurement[]>("alu_measurements", []);
  const [minOneMeter, setMinOneMeter] = useLocalStorage<boolean>("alu_min_one_meter", false);
  const [pricePerMeter, setPricePerMeter] = useLocalStorage<number>("alu_price_per_meter", 0);
  const [editing, setEditing] = useState<Measurement | null>(null);

  const total = useMemo(() => totalArea(items, minOneMeter), [items, minOneMeter]);

  const handleSubmit = (m: { width: number; height: number; qty: number }) => {
    if (editing) {
      setItems(items.map((it) => (it.id === editing.id ? { ...editing, ...m } : it)));
      setEditing(null);
    } else {
      setItems([...items, { id: crypto.randomUUID(), ...m }]);
    }
  };

  const changeQty = (id: string, qty: number) =>
    setItems(items.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.round(qty)) } : it)));

  const clearAll = () => {
    if (confirm("هل تريد حذف كل المقاسات؟")) setItems([]);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">تجميع المقاسات</h1>
            <p className="text-sm text-muted-foreground">العرض × الارتفاع بالسنتيمتر</p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearAll}
              className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              مسح الكل
            </button>
          )}
        </div>

        <MeasurementForm
          onSubmit={handleSubmit}
          editing={editing}
          onCancel={() => setEditing(null)}
        />

        <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card p-4">
          <input
            type="checkbox"
            checked={minOneMeter}
            onChange={(e) => setMinOneMeter(e.target.checked)}
            className="h-5 w-5 cursor-pointer accent-primary"
          />
          <span className="font-semibold text-foreground">الأقل من متر يُحسب متر</span>
        </label>

        <SummaryCard
          count={items.length}
          totalArea={total}
          pricePerMeter={pricePerMeter}
          onPriceChange={setPricePerMeter}
        />

        <MeasurementTable
          items={items}
          minOneMeter={minOneMeter}
          onEdit={setEditing}
          onDelete={(id) => setItems(items.filter((m) => m.id !== id))}
        />

        <GroupedMeasurements items={items} />
      </main>
    </div>
  );
}
