import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Printer } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { CuttingResults } from "../components/CuttingResults";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Measurement } from "../utils/calculations";
import { formatNumber } from "../utils/calculations";
import {
  type SectorType,
  SECTOR_LABELS,
  calculateCutting,
} from "../utils/cuttingRules";

export const Route = createFileRoute("/cutting")({
  head: () => ({
    meta: [
      { title: "التخصيمات — حاسبة الألوميتال" },
      { name: "description", content: "حساب أبعاد قطع الألوميتال للحلق والشبك والزجاز." },
    ],
  }),
  component: CuttingPage,
});

function CuttingPage() {
  const [items] = useLocalStorage<Measurement[]>("alu_measurements", []);
  const [sector, setSector] = useLocalStorage<SectorType>("alu_sector", "bs_small");
  const [overrides, setOverrides] = useState<Record<string, { width: number; height: number }>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const list = useMemo(
    () =>
      items.map((m) => {
        const o = overrides[m.id];
        const w = o?.width ?? m.width;
        const h = o?.height ?? m.height;
        return { id: m.id, width: w, height: h, result: calculateCutting(sector, w, h) };
      }),
    [items, overrides, sector],
  );

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-5 px-4 py-6">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">التخصيمات</h1>
          <p className="text-sm text-muted-foreground">
            اختر نوع القطاع وستتحدث جميع التخصيمات تلقائياً.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <label className="mb-2 block text-xs font-semibold text-muted-foreground">
            نوع القطاع
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(SECTOR_LABELS) as SectorType[]).map((s) => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
                  sector === s
                    ? "bg-[var(--gradient-primary)] text-black shadow-[var(--shadow-glow)]"
                    : "border border-border bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {SECTOR_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
            لا توجد مقاسات محفوظة. أضف مقاسات أولاً من صفحة <strong>تجميع المقاسات</strong>.
          </div>
        ) : (
          <div className="space-y-4">
            {list.map((item, idx) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-bold text-muted-foreground">شباك #{idx + 1}</span>
                  <button
                    onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                    className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-accent"
                  >
                    {editingId === item.id ? "إغلاق" : "تعديل"}
                  </button>
                </div>
                {editingId === item.id && (
                  <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-card p-3">
                    <input
                      type="number"
                      value={item.width}
                      onChange={(e) =>
                        setOverrides({
                          ...overrides,
                          [item.id]: { width: parseFloat(e.target.value) || 0, height: item.height },
                        })
                      }
                      className="rounded-lg border border-input bg-background px-3 py-2 font-semibold"
                    />
                    <input
                      type="number"
                      value={item.height}
                      onChange={(e) =>
                        setOverrides({
                          ...overrides,
                          [item.id]: { width: item.width, height: parseFloat(e.target.value) || 0 },
                        })
                      }
                      className="rounded-lg border border-input bg-background px-3 py-2 font-semibold"
                    />
                  </div>
                )}
                <CuttingResults width={item.width} height={item.height} result={item.result} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
