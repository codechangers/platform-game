var local_levels = [
  {
    map: "cave",
    tiles: [
      [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
      [2, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2],
      [2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ],
  },
  {
    map: "circuits",
    tiles:
    [
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2],
      [2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    ]
  },
  {
    map: "city",
    tiles: [
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
      [2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2],
      [2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2],
      [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
      [2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 2],
      [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    ],
  }
];

var level;
var stage_tiles = [];

function load_level_helper(level) {
  current_tileset = tilemaps[level.map];

  console.log("Loading level", level)
  // Load the new background.
  sky.graphics.beginBitmapFill(loader.getResult(tilemaps[level.map].bg)).drawRect(0, 0, 1667, 500);

  // Reset stage position and remove previous stage tiles.
  stage.x = 0;
  for (var i = 0; i < stage_tiles.length; i++) {
    stage.removeChild(stage_tiles[i]);
  }
  stage_tiles = [];

  // Remove bullets. (Bullets with speed 0 will persist through levels without this.)
  for (var n = 0; n < bullets.length; n++) {
    stage.removeChild(bullets[n]);
  }
  bullets = [];
  boxes = [];

  // Build the level tiles.
  console.log(level.tiles[0], level.tiles[0].length, level.tiles[0].length * 50);
  level.width = level.tiles[0].length * 50;
  _lvl = level.tiles;
  count = 0;
  for (var y = 0; y < _lvl.length; y++) {
    for (var x = 0; x < _lvl[y].length; x++) {
      bg = loader.getResult(current_tileset.tiles[_lvl[y][x]]);
      tile = new createjs.Shape();
      tile.regX = 0;
      tile.regY = 0;
      tile.width = 50;
      tile.height = 50;
      // console.log(bg);
      if (current_tileset.tiles[_lvl[y][x]] !== null && current_tileset.tiles[_lvl[y][x]] !== "grant") {
        tile.graphics.beginBitmapFill(bg).drawRect(0, 0, 50, 50);
      }
      tile.x = x * 50;
      tile.y = y * 50;
      tile.name = tilemaps[level.map].tiles[_lvl[y][x]];
      tile.id = count;
      if (current_tileset.tiles[_lvl[y][x]] === "grant") {
        // Create a null tile in grant's place.
        tile.name = null;
        grant.x = x * 50;
        grant.y = y * 50;
      }
      if (tile.name === "flag") {
        flag = tile;
      }
      if (tile.name === "box") {
        boxes.push(tile);
      }
      stage.addChild(tile);
      stage_tiles.push(tile);
      count += 1;
    }
  }
  loading = false;
  addStageChildren();
}

function load_level(num) {
  // round-robin the level in case someone put a flag in the last level.
  if (num >= local_levels.length) {
    console.log(num)
    num = num % local_levels.length;
    current_level = num;
    load_level(num);
  }

  level = local_levels[num];
  load_level_helper(level);
}
