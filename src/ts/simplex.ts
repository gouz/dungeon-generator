import { createNoise2D } from "simplex-noise";

export interface TileThreshold {
  type: string;
  maxThreshold: number; // La valeur (0 à 1) jusqu'à laquelle ce type s'applique
}

/**
 * Génère une grille de fonds cohérente via Perlin/Simplex
 * @param width Largeur de la grille
 * @param height Hauteur de la grille
 * @param thresholds Tableau des types de sols (ex: ['eau', 'terre', 'pierre'])
 * @param scale Échelle du bruit (plus petit = zones plus larges et lisses)
 */
export const generateDungeonFlow = (
  width: number,
  height: number,
  thresholds: TileThreshold[],
  scale: number = 0.1,
): string[][] => {
  const sortedThresholds = [...thresholds].sort(
    (a, b) => a.maxThreshold - b.maxThreshold,
  );
  const noise2D = createNoise2D(); // Initialise le générateur
  const grid: string[][] = [];

  for (let y = 0; y < height; y++) {
    const row: string[] = [];
    for (let x = 0; x < width; x++) {
      // 1. Obtenir la valeur de bruit (-1 à 1)
      // On multiplie x et y par 'scale' pour contrôler la fréquence
      const noiseValue = noise2D(x * scale, y * scale);

      // 2. Normaliser la valeur entre 0 et 1
      const normalized = (noiseValue + 1) / 2;

      // On cherche le premier seuil qui est supérieur à notre valeur de bruit
      const tile = sortedThresholds.find((t) => normalized <= t.maxThreshold);

      // Si aucun n'est trouvé (ex: 0.99 alors que le max est 0.95),
      // on prend le dernier par sécurité
      row.push(
        tile ? tile.type : sortedThresholds[sortedThresholds.length - 1].type,
      );
    }
    grid.push(row);
  }

  return grid;
};
