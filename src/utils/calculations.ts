export type Measurement = {
  id: string;
  width: number; // cm
  height: number; // cm
};

export const calcArea = (width: number, height: number, minOneMeter = false): number => {
  const area = (width * height) / 10000;
  if (minOneMeter && area < 1) return 1;
  return area;
};

export const totalArea = (items: Measurement[], minOneMeter = false): number =>
  items.reduce((sum, m) => sum + calcArea(m.width, m.height, minOneMeter), 0);

export const totalPrice = (area: number, pricePerMeter: number): number =>
  area * pricePerMeter;

export const groupMeasurements = (
  items: Measurement[],
): { width: number; height: number; count: number }[] => {
  const map = new Map<string, { width: number; height: number; count: number }>();
  for (const m of items) {
    const key = `${m.width}x${m.height}`;
    const existing = map.get(key);
    if (existing) existing.count += 1;
    else map.set(key, { width: m.width, height: m.height, count: 1 });
  }
  return Array.from(map.values());
};

export const formatNumber = (n: number, digits = 2): string =>
  Number.isFinite(n) ? n.toLocaleString("ar-EG", { maximumFractionDigits: digits }) : "0";