import type { Measurement } from "../utils/calculations";
import { groupMeasurements } from "../utils/calculations";

export function GroupedMeasurements({ items }: { items: Measurement[] }) {
  const groups = groupMeasurements(items);
  if (groups.length === 0) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-base font-bold text-foreground">تجميع المقاسات المتشابهة</h3>
      <div className="flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 font-bold text-secondary-foreground"
          >
            <span className="text-base">
              {g.width} × {g.height}
            </span>
            <span className="rounded-md bg-primary px-2 py-0.5 text-sm text-primary-foreground">
              × {g.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}