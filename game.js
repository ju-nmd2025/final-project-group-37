import { platformManager } from "./platform";
import Character from "./character";

// Game state management
let gameState = 0; // 0: Start, 1: Playing, 2: Game Over
// Button drawing and interaction
function drawButton(x, y, w, h, label) {
  fill(100, 200, 100);
  rect(x, y, w, h);
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}
// Check if mouse is over button
function isMouseOnButton(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  platformManager.init();
}

// Obstacle / Spike / Death
function drawObstacle() {
  push();
  fill("red");
  triangle(180, 300, 210, 240, 240, 300);
  pop();
}

let canvasWidth = 400;
let canvasHeight = 400;
let character = new Character(50, 10, 50, 50);

function getPlatform() {
  let active = platformManager.getActivePlatforms();
  for (let i = 0; i < active.length; i++) {
    if (character.isColliding(active[i])) {
      return active[i];
    }
  }
  return null;
}

// Main game loop
function draw() {
  background(100, 100, 100); // Grey background

  // Start screen
  if (gameState === 0) {
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("Doodle Jump", 200, 100);
    textSize(16);
    text("Press SPACE to jump", 200, 150);
    textSize(16);
    text("WASD to move", 200, 170);
    drawButton(125, 200, 150, 50, "Start Game");
    return;
  }
  // Game Over screen
  if (gameState === 2) {
    character.draw();
    platformManager.update(0);
    fill(0, 0, 0, 150);
    rect(0, 0, 400, 400);
    fill(255, 0, 0);
    textSize(40);
    textAlign(CENTER);
    text("Game Over!", 200, 150);
    drawButton(125, 200, 150, 50, "Play Again");
    return;
  }

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    character.vx -= character.speed;
    character.moveLeft();
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    character.vx += character.speed;
    character.moveRight();
  }

  character.update();
  character.isOnPlatform = false;

  // Check for collisions with platforms

  let activePlatforms = platformManager.getActivePlatforms();
  for (let i = 0; i < activePlatforms.length; i++) {
    let platform = activePlatforms[i];
    if (character.vy >= 0 && character.isColliding(platform)) {
      character.isOnPlatform = true;
      character.jump();
      character.y = platform.y - character.h;
      break;
    }
  }
  // Game in progress
  character.draw();

  let scroll = 0;
  let cameraLine = 150;

  if (character.y < cameraLine) {
    scroll = cameraLine - character.y;
    character.y = cameraLine;
  }

  platformManager.update(scroll);

  if (character.y > canvasHeight) {
    gameState = 2;
  }
}
// Handle key presses for jumping
function keyPressed() {
  // Only allow jumping when game is in progress
  if (gameState !== 1) return;

  if (character.isOnPlatform || character.y + character.h >= floor - 1) {
    if (key === " " || key === "W" || key === "w" || keyCode === UP_ARROW) {
      character.jump();
    }
  }
}

// Handle mouse clicks for buttons
function mousePressed() {
  if (gameState === 0 && isMouseOnButton(125, 200, 150, 50)) {
    gameState = 1;
    character = new Character(50, 10, 50, 50);
    platformManager.init();
  } else if (gameState === 2 && isMouseOnButton(125, 200, 150, 50)) {
    gameState = 1;
    character = new Character(50, 10, 50, 50);
    platformManager.init();
  }
}
