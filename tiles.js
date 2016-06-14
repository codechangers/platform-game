var tile_manifest = [
  {src: "./assets/art/spritesheet_mario.png", id: "mario"},
  {src: "./assets/art/spritesheet_boy.png", id: "grant"},
  {src: "./assets/art/spritesheet_girl.png", id: "ada"},
  {src: "./assets/art/spritesheet_girl_2.png", id: "jill"},
  {src: "./assets/art/spritesheet_fox.png", id: "fox"},
  {src: "./assets/art/spritesheet_robot.png", id: "isaac"},
  {src: "./assets/art/spritesheet_cat.png", id: "satoshi"},
  {src: "./assets/art/spritesheet_girl_3.png", id: "grace"},
  {src: "./assets/art/flag_red.png", id: "flag"},
  {src: "./assets/art/grass_top.png", id: "grass_top"},
  {src: "./assets/art/tile_metal.png", id: "metal_top"},
  {src: "./assets/art/dirt_top.png", id: "dirt_top"},
  {src: "./assets/art/grass_mid.png", id: "grass_mid"},
  {src: "./assets/art/background.png", id: "bg_city"},
  {src: "./assets/art/background_circuits.png", id: "bg_circuits"},
  {src: "./assets/art/background_cave.png", id: "bg_cave"},
];

var tilemaps = {
  city: {
    name: "city",
    bg: "bg_city",
    tiles: [
      null,
      "grass_top",
      "grass_mid",
      "flag",
      "grant",
    ]
  },
  circuits: {
    name: "circuits",
    bg: "bg_circuits",
    tiles: [
      null,
      "metal_top",
      "grass_mid",
      "flag",
      "grant",
    ]
  },
  cave: {
    name: "cave",
    bg: "bg_cave",
    tiles: [
      null,
      "dirt_top",
      "grass_mid",
      "flag",
      "grant",
    ]
  }
};
