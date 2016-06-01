var levels = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ],
];

var tiles = [
  null,
  "grass_top",
  "grass_mid",
];

var stage_tiles = [];

function load_level(num) {
  level = levels[num];
  for (var y = 0; y < level.length; y++) {
    for (var x = 0; x < level[y].length; x++) {
      if (tiles[level[y][x]]) {
        bg = loader.getResult(tiles[level[y][x]]);
        tile = new createjs.Shape();
        tile.width = 50;
        tile.height = 50;
        tile.graphics.beginBitmapFill(bg).drawRect(0, 0, tile.width, tile.height);
        tile.x = x * 50;
        tile.y = y * 50;
        console.log(x * 50, y * 50);
        stage.addChild(tile);
        stage_tiles.push(tile);
      }
    }
  }
}
