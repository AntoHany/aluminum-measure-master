import { formatNumber } from "../utils/calculations";

type Props = {
  count: number;
  totalArea: number;
  pricePerMeter: number;
  onPriceChange: (n: number) => void;
};

export function SummaryCard({ count, totalArea, pricePerMeter, onPriceChange }: Props) {
  const total = totalArea * pricePerMeter;
  return (
    <div className="rounded-2xl bg-white p-5 text-black shadow-lg border border-gray-200">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="عدد الشبابيك" value={String(count)} />
        <Stat label="إجمالي المساحة" value={`${formatNumber(totalArea)} م²`} />
        <div className="col-span-2 sm:col-span-1">
          <span className="mb-1 block text-xs font-semibold opacity-80">سعر المتر (جنيه)</span>
          <input
            type="number"
            inputMode="decimal"
            value={pricePerMeter || ""}
            onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-lg font-bold text-black focus:border-gray-500"          />
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
        <span className="text-sm opacity-80">الإجمالي النهائي</span>
        <span className="text-3xl font-extrabold text-black">
          {formatNumber(total, 0)} <span className="text-base font-semibold opacity-80">ج.م</span>
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3">
      <div className="text-xs font-semibold text-gray-600">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}