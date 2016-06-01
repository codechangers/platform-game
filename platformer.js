var stage = new createjs.Stage("game-canvas");
var loader;
var w, h;
var keys = {};
var gravity = 0.2;
var spriteSheet;
var bullets = [];
var may;

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

  manifest = [
    {src: "./_assets/art/spritesheet_boy.png", id: "grant"},
    {src: "./_assets/art/spritesheet_girl.png", id: "may"},
    {src: "./_assets/art/spritesheet_girl_2.png", id: "jill"},
    {src: "./_assets/art/background.png", id: "sky"},
    {src: "./_assets/art/grass_top.png", id: "grass_top"},
    {src: "./_assets/art/grass_mid.png", id: "grass_mid"},
    // {src: "ground.png", id: "ground"},
    // {src: "hill1.png", id: "hill"},
    // {src: "hill2.png", id: "hill2"}
  ];

  loader = new createjs.LoadQueue(false);
  loader.addEventListener("complete", handleComplete);
  loader.loadManifest(manifest, true, "./_assets/art/");
}

function handleComplete() {
  bg = new Image();
  bg.src = "./_assets/art/background.png";
  bg.onload = function () {
    sky = new createjs.Shape();
    sky.graphics.beginBitmapFill(bg).drawRect(0, 0, w + 50, h);
    stage.addChild(sky);
    stage.addChild(ground, grant);
  }
	ground = new createjs.Shape();
	ground.graphics.beginFill("green").drawRect(0, 416, w, h);

  grant_spriteSheet = new createjs.SpriteSheet({
		framerate: 6,
		"images": [loader.getResult("jill")],
		"frames": {"width":48, "height":48, "count":4, "regX": 0, "regY":0, "spacing":1, "margin":0},
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
  grant.x = 48;
	grant.y = 400;
  grant.dx = 0;
  grant.dy = 0;
  grant.jumping = false;
  grant.xSpeed = 2;
  grant.ySpeed = 0;
  grant.grv = 0.2;
  grant.topSpeed = 6;
  grant.look = function(direction) {
    if (direction === "left") {
      grant.scaleX = -1;
    }
    if (direction === "right") {
      grant.scaleX = 1;
    }
  };

  grant.in_air = function () {
    // var flag = false;
    // for (var i = 0; i < stage_tiles.length; i++) {
    //   tile = stage_tiles[i];
    //   if (grant.x < tile.x + tile.width &&
    //      grant.x + grant.width > tile.x &&
    //      grant.y < tile.y + tile.height &&
    //      grant.height + grant.y > tile.y) {
    //        console.log("holy shit")
    //       return false;
    //   }
    // }
    // return true;
    return grant.y < 400;
  };

  grant.move_left = function(speed) {
    grant.x -= speed;
  };

  grant.move_right = function(speed) {
    grant.x += speed;
  };

  grant.play_run_animation = function() {
    if (grant.currentAnimation != "run") {
      grant.gotoAndPlay("run");
    }
  };

  grant.play_stand_animation = function () {
    grant.gotoAndPlay("stand");
  };

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);

  this.document.onkeydown = keydown;
  this.document.onkeyup = keyup;
  load_code();
}

function tick(event) {
  if (!createjs.Ticker.paused) {
    move();
    jump();
    handle_bullets();

    // var grantW = grant.getBounds().width;
    // if (grant.x < -48) {
    //   grant.x = w;
    // }
    // if (grant.x > w + grantW) {
    //   grant.x = -grantW;
    // }
    if (grant.x < grant.xSpeed) {
      grant.x = grant.xSpeed;
    }
    if (grant.x > ((stage.x + w) / 2)) {
      // grant.x = w;
      stage.x = -grant.x + (w / 2);
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
    bullets[i].x += bullets[i].xSpeed;
    if (bullets[i].x < 0 || bullets[i].x > (-stage.x + w)) {
      stage.removeChild(bullets[i]);
      bullets.splice(i, 1);
    }
  }
}

function add_bullet() {
  bullet = new createjs.Shape();
  bullet.graphics.beginFill("red").drawCircle(0, 0, 5);
  bullet.x = grant.x - 10;
  bullet.y = grant.y - 15;
  stage.addChild(bullet);
  bullet.xSpeed = 9 * grant.scaleX;
  bullets.push(bullet);
}

function switch_character(character) {
  switch(character) {
    case "jill":
    case "grant":
    case "ada":
      new_spriteSheet = new createjs.SpriteSheet({
        framerate: 6,
        "images": [loader.getResult(character)],
        "frames": {"width":48, "height":48, "count":4, "regX": 32, "regY":32, "spacing":1, "margin":0},
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
      return;
  }
}
