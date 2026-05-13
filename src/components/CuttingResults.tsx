import type { CuttingResult } from "../utils/cuttingRules";
import { formatNumber } from "../utils/calculations";

type Props = {
  width: number;
  height: number;
  result: CuttingResult;
};

export function CuttingResults({ width, height, result }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-bold">
          الشباك: <span className="text-primary">{width} × {height}</span>
        </h4>
        <span className="text-xs text-muted-foreground">القياسات بالسنتيمتر</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Piece label="درفه الزجاج" piece={result.glassFrame} accent="from-blue-500/20 to-blue-500/5" />
        <Piece label="درفه السلك" piece={result.meshFrame} accent="from-slate-500/20 to-slate-500/5" />
        <Piece label="مقاس الزجاج" piece={result.glass} accent="from-cyan-500/20 to-cyan-500/5" />
      </div>
      {result.notes && (
        <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          {result.notes}
        </p>
      )}
    </div>
  );
}

function Piece({
  label,
  piece,
  accent,
}: {
  label: string;
  piece: { width: number; height: number } | null;
  accent: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-gradient-to-br ${accent} p-4`}>
      <div className="mb-2 text-xs font-semibold text-muted-foreground">{label}</div>
      {piece ? (
        <div className="text-2xl font-extrabold tracking-tight text-foreground">
          {formatNumber(piece.width)} × {formatNumber(piece.height)}
        </div>
      ) : (
        <div className="text-sm font-semibold text-muted-foreground">— غير متوفر —</div>
      )}
    </div>
  );
}