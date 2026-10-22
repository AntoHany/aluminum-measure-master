export type Measurement = {
  id: string;
  width: number; // cm
  height: number; // cm
  qty: number; // عدد الشبابيك بنفس المقاس
};

export const calcArea = (width: number, height: number, minOneMeter = false): number => {
  const area = (width * height) / 10000;
  if (minOneMeter && area < 1) return 1;
  return area;
};

/** مساحة الشباك الواحد (قبل ضرب الكمية) */
export const unitArea = (m: Measurement, minOneMeter = false): number =>
  calcArea(m.width, m.height, minOneMeter);

export const totalArea = (items: Measurement[], minOneMeter = false): number =>
  items.reduce((sum, m) => sum + unitArea(m, minOneMeter) * (m.qty ?? 1), 0);

export const totalQuantity = (items: Measurement[]): number =>
  items.reduce((sum, m) => sum + (m.qty ?? 1), 0);

export const totalPrice = (area: number, pricePerMeter: number): number =>
  area * pricePerMeter;

export const groupMeasurements = (
  items: Measurement[],
): { width: number; height: number; count: number }[] => {
  const map = new Map<string, { width: number; height: number; count: number }>();
  for (const m of items) {
    const key = `${m.width}x${m.height}`;
    const existing = map.get(key);
    if (existing) existing.count += m.qty ?? 1;
    else map.set(key, { width: m.width, height: m.height, count: m.qty ?? 1 });
  }
  return Array.from(map.values());
};

export const formatNumber = (n: number, digits = 2): string =>
  Number.isFinite(n) ? n.toLocaleString("ar-EG", { maximumFractionDigits: digits }) : "0";
