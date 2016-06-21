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
  {src: "./assets/art/metal_mid.png", id: "metal_mid"},
  {src: "./assets/art/tile_box.png", id: "box"},
  {src: "./assets/art/dirt_top.png", id: "dirt_top"},
  {src: "./assets/art/grass_mid.png", id: "grass_mid"},
  {src: "./assets/art/tile_stone.png", id: "stone_top"},
  {src: "./assets/art/stone_mid.png", id: "stone_mid"},
  {src: "./assets/art/tile_spring.png", id: "spring"},
  {src: "./assets/art/tile_delete.png", id: "delete"},
  {src: "./assets/art/background.png", id: "bg_city"},
  {src: "./assets/art/background_circuits.png", id: "bg_circuits"},
  {src: "./assets/art/background_cave.png", id: "bg_cave"},
  {src: "./assets/art/background_space.png", id: "bg_space"},
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
      "box",
      "spring",
    ]
  },
  space: {
    name: "space",
    bg: "bg_space",
    tiles: [
      null,
      "stone_top",
      "stone_mid",
      "flag",
      "grant",
      "box",
      "spring",
    ]
  },
  circuits: {
    name: "circuits",
    bg: "bg_circuits",
    tiles: [
      null,
      "metal_top",
      "metal_mid",
      "flag",
      "grant",
      "box",
      "spring",
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
      "box",
      "spring",
    ]
  }
};
