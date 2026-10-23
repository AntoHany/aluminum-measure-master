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
      const gfH = frameHeight - 6.5;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: gfW, height: gfH },
        glass: { width: ((frameHeight - 22) / 2), height: frameHeight - 17.5 },
      };
    }
    case "bs_large": {
      const gfW = (frameWidth - 1.5) / 2;
      const gfH = frameHeight - 9.5;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: gfW, height: gfH },
        glass: { width: ((frameWidth - 27) / 2), height: frameHeight - 21.5 },
      };
    }
    case "jumbo": {
      const gfW = frameWidth / 2;
      const gfH = frameHeight - 8.5;

      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: gfW, height: gfH },
        glass: { width: ((frameWidth - 28) / 2), height: frameHeight - 22.5 },
      };
    }
    case "tango": {
      const gfW = (frameWidth - 1) / 2;
      const gfH = frameHeight - 7.5;
      return {
        glassFrame: { width: gfW, height: gfH },
        meshFrame: { width: gfW, height: gfH },
        glass: { width: ((frameWidth - 22) / 2), height: frameHeight - 17.5 },
        notes: "صيغ الشبك والزجاز لـ Tango ستُضاف لاحقاً.",
      };
    }
  }
}
