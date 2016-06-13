var levels = [
  [
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
    [2, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2],
    [2, 0,-1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ],
  [
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2],
    [2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  ],
  [
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2],
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
    [2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  ],
];

var tiles = [
  null,
  "grass_top",
  "grass_mid",
  "flag",
  "grant",
];

var level;
var stage_tiles = [];

function load_level(num) {
  // round-robin the level in case someone put a flag in the last level.
  if (num >= levels.length) {
    console.log(num)
    num = num % levels.length;
    current_level = num;
    load_level(num);
  }

  stage.x = 0;
  for (var i = 0; i < stage_tiles.length; i++) {
    stage.removeChild(stage_tiles[i]);
  }
  stage_tiles = [];

  level = {width: levels[num][0].length * 50};
  _lvl = levels[num];
  count = 0;
  for (var y = 0; y < _lvl.length; y++) {
    for (var x = 0; x < _lvl[y].length; x++) {
      if (_lvl[y][x] == -1) {
        grant.x = x * 50;
        grant.y = y * 50;
      }
      if (_lvl[y][x] > 0) {
        bg = loader.getResult(tiles[_lvl[y][x]]);
        tile = new createjs.Shape();
        tile.regX = 0;
        tile.regY = 0;
        tile.width = 50;
        tile.height = 50;
        tile.graphics.beginBitmapFill(bg).drawRect(0, 0, 50, 50);
        tile.x = x * 50;
        tile.y = y * 50;
        tile.name = tiles[_lvl[y][x]];
        tile.id = count;
        if (tile.name === "flag") {
          flag = tile;
        }
        stage.addChild(tile);
        stage_tiles.push(tile);
        count += 1;
      }
    }
  }
  addStageChildren();
}
