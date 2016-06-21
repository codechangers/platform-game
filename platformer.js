var stage = new createjs.Stage("game-canvas");
var loader;
var loading = false;
var w, h;
var sky;
var keys = {};
var gravity = 0.2;
var spriteSheet;
var bullets = [];
var current_level = 0;


var KEYCODE_LEFT = 37,
  KEYCODE_RIGHT = 39,
  KEYCODE_UP = 38,
  KEYCODE_DOWN = 40,
  KEYCODE_SPACE = 32;

if (typeof jump === "undefined") {
  function jump() {}
}
if (typeof move === "undefined") {
  function move() {}
}
if (typeof shoot === "undefined") {
  function shoot() {}
}
if (typeof hit_flag === "undefined") {
  function hit_flag() {}
}

function keydown(event) {
    keys[event.keyCode] = true;
    if (event.keyCode === KEYCODE_SPACE) {
      shoot();
    }
}

function keyup(event) {
    delete keys[event.keyCode];
}

function init() {
  w = stage.canvas.width;
  h = stage.canvas.height;

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(tile_manifest, true, "http://codechangers.com/files/camp/assets/art/");
}

function addStageChildren() {
  for (var i = 0; i < stage_tiles.length; i++) {
    stage.addChild(stage_tiles[i]);
  }
  stage.addChild(grant);
}

function handleComplete() {
  sky = new createjs.Shape();
  sky.graphics.beginBitmapFill(loader.getResult("bg_city")).drawRect(0, 0, 1667, 500);
  stage.addChild(sky);

  grant_spriteSheet = new createjs.SpriteSheet({
		framerate: 6,
		"images": [loader.getResult("grant")],
		"frames": {"width":48, "height":48, "count":4, "regX": 6, "regY": -2, "spacing":1, "margin":0},
		// define two animations, run (loops, 1.5x speed) and jump (returns to run):
		"animations": {
      "stand": {
        frames: [0],
        next: "stand",
        speed: 10,
      },
			"run": {
        frames: [1, 2],
        next: "run",
        speed: 1,
      },
			"jump": {
        frames: [3],
        speed: 10,
      }
		}
	});
	grant = new createjs.Sprite(grant_spriteSheet, "stand");
  grant.setBounds(0, 0, 35, 48);
  grant.x = 60;
	grant.y = 350;
  grant.dx = 0;
  grant.dy = 0;
  grant.jumping = false;
  grant.xSpeed = 2;
  grant.ySpeed = 0;
  grant.grv = 0.2;
  grant.topSpeed = 6;
  grant.look = function(direction) {
    if (direction === "left") {
      grant.regX = 32;
      grant.scaleX = -1;
    }
    if (direction === "right") {
      grant.regX = 8;
      grant.scaleX = 1;
    }
  };

  grant.check_collision = function (bounds) {
    row_length = level.tiles[0].length;
    yPos = row_length * ((grant.y - grant.y % 50) / 50);
    xPos = (grant.x - grant.x % 50) / 50;
    /*
      [a, b, c]
      [d, e, f]
      [g, h, i]
    */
    tiles_to_check = [];
    if (Math.ceil(grant.y) > 50) {
      tiles_to_check.push(stage_tiles[(yPos - row_length + xPos - 1)]); // a
      tiles_to_check.push(stage_tiles[(yPos - row_length + xPos)]); // b
      tiles_to_check.push(stage_tiles[(yPos - row_length + xPos + 1)]); // c
    }

    tiles_to_check.push(stage_tiles[(yPos + xPos - 1)]); // d
    tiles_to_check.push(stage_tiles[(yPos + xPos)]); // e
    tiles_to_check.push(stage_tiles[(yPos + xPos + 1)]); // f

    if (grant.y < (level.tiles.length - 1) * 50) {
      tiles_to_check.push(stage_tiles[(yPos + row_length + xPos - 1)]); // g
      tiles_to_check.push(stage_tiles[(yPos + row_length + xPos)]); // h
      tiles_to_check.push(stage_tiles[(yPos + row_length + xPos + 1)]); // i
    } else {
      return false;
    }
    for (var i = 0; i < tiles_to_check.length; i++) {
      tile = tiles_to_check[i];
      if (tile.name === null) {
        continue;
      }
      if (bounds.x < tile.x + tile.width &&
         bounds.x + bounds.width > tile.x &&
         bounds.y < tile.y + tile.height &&
         bounds.height + bounds.y > tile.y) {
          if (tile.name == "flag") {
            hit_flag();
          }
          // console.log(tile);
          return tile;
      }
    }
    return false;
  };

  grant.head_collided = function () {
    sensor_a = grant.check_collision({x: grant.x + 2, y: grant.y - 5, height: 2, width: 1});
    sensor_b = grant.check_collision({x: grant.x + 23, y: grant.y - 5, height: 2, width: 1});
    if (sensor_a === false && sensor_b === false) {
      return false;
    } else {
      if (grant.ySpeed < 0 && grant.y > 50) {
        grant.y = sensor_a.y + sensor_a.height || sensor_b.y + sensor_b.height;
        grant.y += gravity;
      }
      return true;
    }
  };

  grant.in_air = function () {
    // if (grant.check_collision({x: grant.x + 2, y: grant.y + 48, height: 1, width: 26})) {
    //   while (grant.check_collision({x: grant.x + 5, y: grant.y + 47, height: 1, width: 20})) {
    //     grant.y = Math.floor(grant.y - 1);
    //   }
    // }
    sensor_a = grant.check_collision({x: grant.x + 2, y: grant.y + 48, height: 5, width: 1});
    sensor_b = grant.check_collision({x: grant.x + 23, y: grant.y + 48, height: 5, width: 1});
    if (sensor_a === false && sensor_b === false) {
      return true;
    } else {
      if (grant.ySpeed >= 0 && grant.y > 0) {
        if (!sensor_a.y || isNaN(sensor_a.y)) {
          sensor_a = {y: -1};
        }
        if (!sensor_b.y || isNaN(sensor_b.y)) {
          sensor_b = {y: -1};
        }
        grant.y = Math.max(sensor_a.y - 50, sensor_b.y - 50);
      }
      return false;
    }
  }

  grant.move_left = function(speed) {
    if (!grant.check_collision({x: grant.x - speed, y: grant.y + 48, height: 1, width: speed}) &&
        !grant.check_collision({x: grant.x - speed, y: grant.y, height: 1, width: speed})) {
      grant.x -= speed;
    }
  };

  grant.move_right = function(speed) {
    if (!grant.check_collision({x: grant.x + 25, y: grant.y + 48, height: 1, width: 3}) &&
        !grant.check_collision({x: grant.x + 25, y: grant.y, height: 1, width: 3})) {
      grant.x += speed;
    }
  };

  grant.play_run_animation = function() {
    if (grant.currentAnimation != "run") {
      grant.gotoAndPlay("run");
    }
  };

  grant.play_stand_animation = function () {
    grant.gotoAndPlay("stand");
  };

  grant.play_jump_animation = function () {
    grant.gotoAndPlay("jump");
  };

  grant.play_jump_animation = function () {
    grant.gotoAndPlay("win");
  };

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);

  this.document.onkeydown = keydown;
  this.document.onkeyup = keyup;
  load_level(current_level);
  load_code();
}

function tick(event) {
  if (!createjs.Ticker.paused) {
    move();
    jump();
    handle_bullets();
    grant.x = Math.floor(grant.x);
    if (grant.y === NaN) {
      grant.y = 0;
    }
    if (grant.y < 0) {
      grant.y = 0;
      grant.ySpeed = 0;
    }
    if (grant.y > h && !loading) {
      loading = true;
      setTimeout(function () {
        load_level(current_level)
      }, 750);
    }

    if (grant.x < grant.xSpeed) {
      grant.x = grant.xSpeed;
    }
    if (grant.x > ((stage.x + w) / 2) && grant.x < level.width - w / 2) {
      // grant.x = w;
      stage.x = -grant.x + (w / 2);
    }
    if (grant.x > level.width - 25) {
      grant.x = level.width - 25;
    }
    stage.update(event);
  }
}

init();

/* Helper Function */
function check_key(keycode) {
  return keys[keycode] || false;
}

function handle_bullets() {
  for (var i = 0; i < bullets.length; i++) {
    bullet = bullets[i];
    bullet.x += bullets[i].xSpeed;
    if (bullet.x < 0 || bullet.x > (-stage.x + w)) {
      stage.removeChild(bullet);
      bullets.splice(i, 1);
    }
    for (var n = 0; n < boxes.length; n++) {
      box = boxes[n];
      if (bullet.x < box.x + box.width &&
         bullet.x + bullet.width > box.x &&
         bullet.y < box.y + box.height &&
         bullet.height + bullet.y > box.y) {
           for (var e = 0; e < stage_tiles.length; e++) {
             if (box === stage_tiles[e]) {
               console.log("hello")
               tile = new createjs.Shape();
               tile.regX = 0;
               tile.regY = 0;
               tile.width = 50;
               tile.height = 50;
               tile.x = box.x;
               tile.y = box.y;
               tile.name = null;
               stage.addChild(tile);
               stage_tiles[e] = tile;
             }
           }
           stage.removeChild(bullet);
           stage.removeChild(box);
           bullets.splice(i, 1);
           boxes.splice(n, 1);
      }
    }
  }
}

function add_bullet() {
  bullet = new createjs.Shape();
  bullet.graphics.beginFill("red").drawCircle(0, 0, 5);
  bullet.x = grant.x + 8;
  bullet.y = grant.y + 24;
  bullet.width = 5;
  bullet.height = 5;
  stage.addChild(bullet);
  bullet.xSpeed = 9 * grant.scaleX;
  bullets.push(bullet);
  return bullet;
}

function remove_object(obj) {
  stage.removeChild(obj);
  for (var i = 0; i < stage_tiles.length; i++) {
    if (obj.id == stage_tiles[i].id) {
      stage_tiles.splice(i, 1);
    }
  }
}

function switch_character(character) {
  switch(character) {
    case "mario":
    case "jill":
    case "grant":
    case "fox":
    case "isaac":
    case "satoshi":
    case "ada":
    case "grace":
      new_spriteSheet = new createjs.SpriteSheet({
        framerate: 6,
        "images": [loader.getResult(character)],
        "frames": {"width":48, "height":48, "count":4, "regX": 8, "regY": -2, "spacing":1, "margin":0},
        // define two animations, run (loops, 1.5x speed) and jump (returns to run):
        "animations": {
          "stand": {
            frames: [0],
            next: "stand",
            speed: 10,
          },
          "run": {
            frames: [1, 2],
            next: "run",
            speed: 1,
          },
          "jump": {
            frames: [3],
            speed: 10,
          }
        }
      });
      grant.spriteSheet = new_spriteSheet;
      break;
    default:
      switch_character("grant");
      return;
  }
}


function debug_bounds() {
  s = new createjs.Shape();
  s.graphics.beginFill("red").drawRect(0, 0, grant.getBounds().width, grant.getBounds().height);
  s.x = grant.x;
  s.y = grant.y;
  stage.addChild(s);
}

function debug_collision() {
  for(var i = 0; i < tiles_to_check.length; i++) {
    tile = tiles_to_check[i];
    s = new createjs.Shape();
    s.graphics.beginFill("red").drawRect(0, 0, 50, 50);
    s.x = tile.x;
    s.y = tile.y;
    stage.addChild(s);
  }
  stage.update();
}

console.log((level.tiles[0].length * ((grant.y - grant.y % 50) / 50) - 1), (grant.x - grant.x % 50) / 50);
console.log((level.tiles[0].length * ((grant.y - grant.y % 50) / 50) - 1), ((grant.x - grant.x % 50) / 50) - 1);
console.log((level.tiles[0].length * ((grant.y - grant.y % 50) / 50) - 1), ((grant.x - grant.x % 50) / 50) + 1);
console.log((level.tiles[0].length * ((grant.y - grant.y % 50) / 50) + 1), (grant.x - grant.x % 50) / 50);
console.log((level.tiles[0].length * ((grant.y - grant.y % 50) / 50) + 1), ((grant.x - grant.x % 50) / 50) - 1);
console.log((level.tiles[0].length * ((grant.y - grant.y % 50) / 50) + 1), ((grant.x - grant.x % 50) / 50) + 1);
