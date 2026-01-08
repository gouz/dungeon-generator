import { createNoise2D } from "simplex-noise";

/**
 * Génère une grille de fonds cohérente via Perlin/Simplex
 * @param width Largeur de la grille
 * @param height Hauteur de la grille
 * @param backgrounds Tableau des types de sols (ex: ['eau', 'terre', 'pierre'])
 * @param scale Échelle du bruit (plus petit = zones plus larges et lisses)
 */
export const generateDungeonFlow = (
  width: number,
  height: number,
  backgrounds: string[],
  scale: number = 0.1,
): string[][] => {
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

      // 3. Mapper vers l'index du tableau backgrounds
      // On s'assure que l'index ne dépasse pas la taille du tableau
      const index = Math.floor(normalized * backgrounds.length);
      const finalIndex = Math.min(index, backgrounds.length - 1);

      row.push(backgrounds[finalIndex]);
    }
    grid.push(row);
  }

  return grid;
};
