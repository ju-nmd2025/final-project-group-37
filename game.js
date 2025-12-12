import { platforms, initPlatforms, updatePlatforms } from "./platform.js";

import { Character } from "./character.js";

let canvasWidth = 400;
let canvasHeight = 400;
let floor = 300;

let character;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  character = new Character(50, 50, 50, 50);

  initPlatforms();
}

function draw() {
  background(100, 100, 100);

  
  character.draw();

  updatePlatforms(0); 

  let onPlatform = false;
  for (let p of platforms) {
    if (character.isColliding(character, p)) { 
      onPlatform = true;
      break;
    }
  }

  if (character.y + character.h < floor && !onPlatform) {
    character.y += 10;
  }

  line(0, floor, canvasWidth, floor);
}

function keyPressed() {
  if (character.y + character.h === floor) {
    character.y -= 120;
  }
}
