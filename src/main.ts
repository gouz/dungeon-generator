import tiles from "./tiles.json";
import { generateDungeonFlow, type TileThreshold } from "./ts/simplex";

document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const TILE_SIZE = 64;
  const RATIO = 0.5;
  const DECAY = 4;

  canvas.width = 20 * (TILE_SIZE - DECAY) + DECAY;
  canvas.height = 10 * (TILE_SIZE - DECAY) + DECAY;

  const drawTile = (source: number[], destGridX: number, destGridY: number) => {
    const [sourceX, sourceY] = source;
    ctx.drawImage(
      tilesheet,
      sourceX * TILE_SIZE,
      sourceY * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      destGridX * TILE_SIZE * RATIO -
        (destGridX !== 0 ? destGridX * DECAY : 0) * RATIO,
      destGridY * TILE_SIZE * RATIO -
        (destGridY !== 0 ? destGridY * DECAY : 0) * RATIO,
      TILE_SIZE * RATIO,
      TILE_SIZE * RATIO,
    );
  };

  const tilesheet = new Image();
  tilesheet.src = "/assets/Scribble Dungeons/Tilesheet/tilesheet.png";
  await new Promise((resolve) => {
    tilesheet.onload = resolve;
  });

  const grounds: string[] = [...Object.keys(tiles.grounds)];

  // random
  for (let x = 0; x < 20 / RATIO; x++)
    for (let y = 0; y < 10 / RATIO; y++)
      drawTile(
        tiles.grounds[grounds[Math.floor(Math.random() * grounds.length)]],
        x,
        y,
      );

  // perlin / simplex
  const dungeonConfig: TileThreshold[] = [
    { type: "water", maxThreshold: 0.15 }, // Très rare (bas)
    { type: "tiles", maxThreshold: 0.7 }, // Très commun (le milieu)
    { type: "grass", maxThreshold: 0.85 }, // Un peu de verdure
    { type: "wood", maxThreshold: 1.0 }, // Rare (haut)
  ];
  generateDungeonFlow(20 / RATIO, 10 / RATIO, dungeonConfig).forEach(
    (row, y) => {
      row.forEach((val, x) => {
        drawTile(tiles.grounds[val], x, y);
      });
    },
  );
});
