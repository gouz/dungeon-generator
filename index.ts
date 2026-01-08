import myPage from "./src/index.html";

Bun.serve({
  routes: {
    "/": myPage,
    "/assets/Scribble%20Dungeons/Tilesheet/tilesheet.png": async () =>
      new Response(
        await Bun.file(
          `${process.cwd()}/src/assets/Scribble Dungeons/Tilesheet/tilesheet.png`,
        ).bytes(),
      ),
  },
});

console.log("http://localhost:3000");
