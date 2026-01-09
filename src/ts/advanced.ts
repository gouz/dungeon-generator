import { createNoise2D } from "simplex-noise";

// Types pour la structure
type TileType =
  | "grass"
  | "water"
  | "tile"
  | "tiles"
  | "tiles_center"
  | "tiles_cracked"
  | "tiles_decorative";

interface BiomeConfig {
  name: "outside" | "inside";
  threshold: number; // Jusqu'à quelle valeur ce biome s'étend (0 à 1)
  subTiles: { type: TileType; max: number }[]; // Répartition interne
}

const WORLD_CONFIG: BiomeConfig[] = [
  {
    name: "outside",
    threshold: 0.3, // 30% de la carte sera l'extérieur
    subTiles: [
      { type: "water", max: 0.5 },
      { type: "grass", max: 1.0 },
    ],
  },
  {
    name: "inside",
    threshold: 1.0, // Le reste sera l'intérieur
    subTiles: [
      { type: "tiles_center", max: 0.1 }, // Rare
      { type: "tiles_decorative", max: 0.2 },
      { type: "tiles_cracked", max: 0.4 },
      { type: "tiles", max: 0.7 },
      { type: "tile", max: 1.0 }, // Le plus commun
    ],
  },
];

export function generateAdvancedDungeon(
  width: number,
  height: number,
  scaleBiome: number = 0.08,
  scaleDetail: number = 0.2,
): TileType[][] {
  const noiseBiome = createNoise2D(); // Pour la forme du donjon
  const noiseDetail = createNoise2D(); // Pour la variété des tuiles
  const grid: TileType[][] = [];

  for (let y = 0; y < height; y++) {
    const row: TileType[] = [];
    for (let x = 0; x < width; x++) {
      // 1. Déterminer le biome (Extérieur vs Intérieur)
      const bVal = (noiseBiome(x * scaleBiome, y * scaleBiome) + 1) / 2;
      const biome = WORLD_CONFIG.find((b) => bVal <= b.threshold)!;

      // 2. Déterminer la variante de tuile dans ce biome
      // On utilise une échelle différente pour que les détails ne suivent pas
      // exactement la forme des biomes
      const dVal = (noiseDetail(x * scaleDetail, y * scaleDetail) + 1) / 2;
      const tile = biome.subTiles.find((t) => dVal <= t.max)!;

      row.push(tile.type);
    }
    grid.push(row);
  }
  return grid;
}
