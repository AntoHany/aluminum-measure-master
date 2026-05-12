export type SectorType = "bs_small" | "bs_large" | "jumbo" | "tango";

export const SECTOR_LABELS: Record<SectorType, string> = {
  bs_small: "BS صغير",
  bs_large: "BS كبير",
  jumbo: "Jumbo",
  tango: "Tango",
};

export type CuttingPiece = { width: number; height: number } | null;

export type CuttingResult = {
  glassFrame: CuttingPiece;
  meshFrame: CuttingPiece;
  glass: CuttingPiece;
  notes?: string;
};

/**
 * All inputs/outputs are in centimeters.
 * Each window: جرار 2 ضلفة
 */
export function calculateCutting(
  sector: SectorType,
  frameWidth: number,
  frameHeight: number,
): CuttingResult {
  switch (sector) {
    case "bs_small": {
      const gfW = frameWidth / 2;
      const gfH = frameHeight - 6.6;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: gfW, height: gfH + 0.3 },
        glass: { width: gfW - 11, height: gfH - 11 },
      };
    }
    case "bs_large": {
      const gfW = (frameWidth + 2) / 2;
      const gfH = frameHeight - 6.6;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: gfW, height: gfH + 0.3 },
        glass: { width: gfW - 12.5, height: gfH - 12.5 },
      };
    }
    case "jumbo": {
      const gfW = frameWidth / 2;
      const gfH = frameHeight - 8.4;
      const mfW = (frameWidth - 4.4) / 2;
      const mfH = frameHeight - 0.9;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: mfW, height: mfH },
        glass: { width: gfW - 29.5, height: gfH - 29.5 },
      };
    }
    case "tango": {
      const gfW = (frameWidth + 1) / 2;
      const gfH = frameHeight - 7.3;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: null,
        glass: null,
        notes: "صيغ الشبك والزجاز لـ Tango ستُضاف لاحقاً.",
      };
    }
  }
}