import type { Measurement } from "../utils/calculations";
import { calcArea, formatNumber } from "../utils/calculations";
import { SummaryCard } from "./SummaryCard";

type Props = {
  items: Measurement[];
  minOneMeter: boolean;
  onEdit: (m: Measurement) => void;
  onDelete: (id: string) => void;
};

export function MeasurementTable({ items, minOneMeter, onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-muted-foreground">
        لا توجد مقاسات بعد. أضف أول مقاس بالأعلى.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-[var(--gradient-steel)] text-primary-foreground">
            <tr>
              <th className="px-3 py-3 font-semibold">#</th>
              <th className="px-3 py-3 font-semibold">العرض</th>
              <th className="px-3 py-3 font-semibold">الارتفاع</th>
              <th className="px-3 py-3 font-semibold">المساحة (م²)</th>
              <th className="px-3 py-3 font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m, i) => {
              const area = calcArea(m.width, m.height, minOneMeter);
              return (
                <tr key={m.id} className="border-t border-border odd:bg-muted/30">
                  <td className="px-3 py-3 font-bold text-muted-foreground">{i + 1}</td>
                  <td className="px-3 py-3 font-semibold">{m.width}</td>
                  <td className="px-3 py-3 font-semibold">{m.height}</td>
                  <td className="px-3 py-3 font-bold text-primary">{formatNumber(area)}</td>
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