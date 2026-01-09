import tiles from "../tiles.json";

const grounds: string[] = [...Object.keys(tiles.grounds)];

export function random(width: number, height: number): string[][] {
  const grid: string[][] = [];
  for (let y = 0; y < height; y++) {
    const row: string[] = [];
    for (let x = 0; x < width; x++) {
      row.push(
        tiles.grounds[grounds[Math.floor(Math.random() * grounds.length)]],
      );
    }
    grid.push(row);
  }
  return grid;
}
