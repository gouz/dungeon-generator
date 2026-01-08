import tiles from "./tiles.json";

document.addEventListener("DOMContentLoaded", async () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const TILE_SIZE = 64;
  const RATIO = 1;

  const drawTile = (source: number[], destGridX: number, destGridY: number) => {
    const [sourceX, sourceY] = source;
    ctx.drawImage(
      tilesheet,
      sourceX! * TILE_SIZE,
      sourceY! * TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      destGridX * TILE_SIZE * RATIO - (destGridX !== 0 ? destGridX * 4 : 0),
      destGridY * TILE_SIZE * RATIO - (destGridY !== 0 ? destGridY * 4 : 0),
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

  for (let x = 0; x < 20; x++)
    for (let y = 0; y < 10; y++)
      drawTile(
        tiles.grounds[grounds[Math.floor(Math.random() * grounds.length)]],
        x,
        y,
      );
});
