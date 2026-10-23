import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Printer, X } from "lucide-react";
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

type PrintOption = "all" | "aluminum" | "glass";

const PRINT_OPTIONS: { value: PrintOption; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "aluminum", label: "الألوميتال فقط" },
  { value: "glass", label: "الزجاج فقط" },
];

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

  const [printOpen, setPrintOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [printOption, setPrintOption] = useState<PrintOption>("all");

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

  const confirmPrint = () => {
    setPrintOpen(false);
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-5 px-4 pb-32 pt-6 print:hidden">
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

      {list.length > 0 && (
        <div className="sticky bottom-0 z-40 border-t border-border bg-card/90 px-4 py-3 backdrop-blur-md print:hidden">
          <div className="mx-auto max-w-5xl">
            <button
              onClick={() => setPrintOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gradient-primary)] px-6 py-4 text-lg font-bold text-black shadow-[var(--shadow-glow)] transition active:scale-95"
            >
              <Printer className="h-5 w-5" />
              طباعة
            </button>
          </div>
        </div>
      )}

      {printOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 print:hidden sm:items-center"
          onClick={() => setPrintOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-foreground">خيارات الطباعة</h3>
              <button
                onClick={() => setPrintOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted-foreground">
                اسم العميل
              </span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="مثال: أ. محمد"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 font-semibold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <div className="mt-4 space-y-2">
              {PRINT_OPTIONS.map((o) => (
                <label
                  key={o.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 font-semibold transition ${
                    printOption === o.value
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  <input
                    type="radio"
                    name="print-option"
                    checked={printOption === o.value}
                    onChange={() => setPrintOption(o.value)}
                    className="h-4 w-4 accent-primary"
                  />
                  {o.label}
                </label>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={confirmPrint}
                className="flex-1 rounded-xl bg-[var(--gradient-primary)] px-6 py-3 text-base font-bold text-black shadow-[var(--shadow-glow)] transition active:scale-95"
              >
                طباعة
              </button>
              <button
                onClick={() => setPrintOpen(false)}
                className="rounded-xl border border-border bg-secondary px-4 py-3 font-semibold text-secondary-foreground hover:bg-accent"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {list.length > 0 && (
        <div className="hidden print:block">
          <h1 className="text-center text-2xl font-extrabold">تخصيمات الألوميتال</h1>
          <p className="text-center text-sm font-semibold">نوع القطاع: {SECTOR_LABELS[sector]}</p>
          <p className="mb-4 text-center text-sm font-semibold">
            اسم العميل: {customerName.trim() || "—"} — التاريخ: {new Date().toLocaleDateString("ar-EG")}
          </p>
          <table className="print-table">
            <thead>
              <tr>
                <th>مقاس الشباك (سم)</th>
                {printOption !== "glass" && <th>مقاس ضرفة الألوميتال</th>}
                {printOption !== "aluminum" && <th>مقاس الزجاج</th>}
                <th>العدد</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => {
                const fmt = (p: { width: number; height: number } | null) =>
                  p ? `${formatNumber(p.width)} × ${formatNumber(p.height)}` : "—";
                return (
                  <tr key={item.id}>
                    <td className="font-bold">
                      {item.width} × {item.height}
                    </td>
                    {printOption !== "glass" && <td>{fmt(item.result.glassFrame)}</td>}
                    {printOption !== "aluminum" && <td>{fmt(item.result.glass)}</td>}
                    <td className="font-bold">{items[i]?.qty ?? 1}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
