import type { Measurement } from "../utils/calculations";
import { unitArea, formatNumber } from "../utils/calculations";
import { SummaryCard } from "./SummaryCard";

type Props = {
  items: Measurement[];
  minOneMeter: boolean;
  onEdit: (m: Measurement) => void;
  onDelete: (id: string) => void;
  onChangeQty: (id: string, qty: number) => void;
};

export function MeasurementTable({ items, minOneMeter, onEdit, onDelete, onChangeQty }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
        لا توجد مقاسات بعد. أضف أول مقاس بالأعلى.
      </div>
    );
  }

  const qtyButton =
    "h-9 w-9 rounded-lg border border-border bg-secondary text-lg font-bold text-secondary-foreground transition active:scale-90 hover:bg-accent disabled:opacity-40";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-[var(--gradient-steel)] text-primary-foreground">
            <tr>
              <th className="px-3 py-3 font-semibold">#</th>
              <th className="px-3 py-3 font-semibold">العرض</th>
              <th className="px-3 py-3 font-semibold">الارتفاع</th>
              <th className="px-3 py-3 font-semibold">العدد</th>
              <th className="px-3 py-3 font-semibold">مساحة الشباك (م²)</th>
              <th className="px-3 py-3 font-semibold">إجمالي الصف (م²)</th>
              <th className="px-3 py-3 font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m, i) => {
              const area = unitArea(m, minOneMeter);
              const rowArea = area * (m.qty ?? 1);
              return (
                <tr key={m.id} className="border-t border-border odd:bg-muted/30">
                  <td className="px-3 py-3 font-bold text-muted-foreground">{i + 1}</td>
                  <td className="px-3 py-3 font-semibold">{m.width}</td>
                  <td className="px-3 py-3 font-semibold">{m.height}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onChangeQty(m.id, (m.qty ?? 1) + 1)}
                        className={qtyButton}
                        aria-label="زيادة العدد"
                      >
                        +
                      </button>
                      <span className="min-w-8 text-center text-base font-bold text-primary">
                        {m.qty ?? 1}
                      </span>
                      <button
                        onClick={() => onChangeQty(m.id, Math.max(1, (m.qty ?? 1) - 1))}
                        className={qtyButton}
                        aria-label="تقليل العدد"
                        disabled={(m.qty ?? 1) <= 1}
                      >
                        −
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-semibold">{formatNumber(area)}</td>
                  <td className="px-3 py-3 font-bold text-primary">{formatNumber(rowArea)}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(m)}
                        className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground hover:bg-accent"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => onDelete(m.id)}
                        className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
