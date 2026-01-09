import tiles from "./tiles.json";
import { generateAdvancedDungeon } from "./ts/advanced";

//import { random } from "./ts/random";
//import { generateDungeonFlow } from "./ts/simplex";

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

  const drawDungeon = (grid: string[][]) =>
    grid.forEach((row, y) => {
      row.forEach((val, x) => {
        drawTile(tiles.grounds[val], x, y);
      });
    });

  const width = 20 / RATIO;
  const height = 10 / RATIO;

  // random
  // drawDungeon(random(width, height));

  // perlin / simplex
  // drawDungeon(generateDungeonFlow(width, height));

  // advanced
  drawDungeon(generateAdvancedDungeon(width, height));
});
