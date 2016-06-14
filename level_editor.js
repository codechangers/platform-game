var loader;
var level;
var stage = new createjs.Stage("game-canvas");
var stage_tiles = [];
var sky = new createjs.Shape();
var save_button = document.getElementById("save-level");

var canvas = document.getElementById("game-canvas");

function init() {
  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(tile_manifest, true, "http://codechangers.com/files/camp/assets/art/");
}

function handleComplete() {
  level = {
    width: 20,
    height: 10,
    map: "city",
    tiles: [],
  }
  current_tileset = tilemaps.city;
  current_tile = 1;
  canvas.width = level.width * 50;

  sky.graphics.beginBitmapFill(loader.getResult(current_tileset.bg)).drawRect(0, 0, level.width * 50, 500);
  stage.addChild(sky);

  drawGrid();
}

init()

function drawGrid() {
  for (var y = 0; y < level.height; y++) {
    for (var x = 0; x < level.width; x++) {
      s = new createjs.Shape();
      s.x = x * 50;
      s.y = y * 50;
      s.graphics.setStrokeStyle(1).beginStroke('rgba(0, 0, 0, 0.5)').setStrokeDash([10, 15], 0).drawRect(0, 0, 50, 50);
      s.tileID = 0;
      stage.addChild(s);
      stage_tiles.push(s);
    }
  }
  stage.update();
}

function hitGridSquare(s) {
  // Check if mouse is within bounding box for a given grid square.
  if (stage.mouseX > s.x && stage.mouseX < s.x + 50) {
    if (stage.mouseY > s.y && stage.mouseY < s.y + 50) {
      return true;
    }
  }
  return false;
}

canvas.onclick = function (e) {
  if (current_tileset.tiles[current_tile] === "grant") {
    for (var n = 0; n < stage_tiles.length; n++) {
      if (current_tileset.tiles[stage_tiles[n].tileID] === "grant") {
        stage_tiles[n].tileID = 0;
        break;
      }
    }
  }
  for (var i = 0; i < stage_tiles.length; i++) {
    if (hitGridSquare(stage_tiles[i])) {
      stage_tiles[i].tileID = current_tile;
    }
  }
  redrawMap();
};

function changeTile(num) {
  current_tile = num;
}

function changeTileset(tileset_name) {
  current_tileset = tilemaps[tileset_name];
  redrawMap();
}

function buildMapArray() {
  map = [];
  row = [];
  // Add each tile to row, then if row is finished (width == level.width), make a new row.
  // This will convert the 1-dimensional stage_tiles list to a 2-dimensional list.
  for (var i = 0; i < stage_tiles.length; i++) {
    row.push(stage_tiles[i].tileID);
    if (row.length === level.width) {
      map.push(row);
      row = [];
    }
  }
  return map;
}


function redrawMap() {
  for (var i = 0; i < stage_tiles.length; i++) {
    child = stage_tiles[i];
    child.graphics.clear();
    if (child.tileID && child.tileID !== 0) {
      tileName = current_tileset.tiles[child.tileID];
      child.graphics.setStrokeStyle(0).beginBitmapFill(loader.getResult(tileName)).drawRect(0, 0, 50, 50);
    } else {
      child.graphics.setStrokeStyle(1).beginStroke('rgba(0, 0, 0, 0.5)').setStrokeDash([10, 15], 0).drawRect(0, 0, 50, 50);
    }
  }
  sky.graphics.beginBitmapFill(loader.getResult(current_tileset.bg)).drawRect(0, 0, level.width * 50, 500);
  stage.update();
}

save_button.addEventListener("click", function () {
  var built_level = {
    map: current_tileset.name,
    tiles: buildMapArray(),
  };
  app.database().ref("levels/" + "test").set(built_level);
})
