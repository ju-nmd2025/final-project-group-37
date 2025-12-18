import { platformManager, BreakingPlatform } from "./platform.js";
import Character from "./character.js";

// Game state management
let gameState = 0; // 0: Start, 1: Playing, 2: Game Over
let score = 0; // starts counting the points from 0
let lastPlatform = null;
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
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h; // Returns true if mouse is within button bounds
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  platformManager.init();
}

// Canvas dimensions
let canvasWidth = 400;
let canvasHeight = 400;
let character = new Character(50, 50, 50, 50);

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
    text("Press WASD to move", 200, 150);
    drawButton(125, 200, 150, 50, "Start Game");
    return;
  }

  // Game Over screen
  if (gameState === 2) {
    character.draw();
    platformManager.update(0); // No scrolling on game over
    fill(0, 0, 0, 150);
    rect(0, 0, 400, 400);
    fill(255, 0, 0);
    textSize(40);
    textAlign(CENTER);
    text("Game Over!", 200, 150);

    fill(255);
    textSize(20);
    text("Total Score: " + score, 200, 180);

    drawButton(125, 200, 150, 50, "Play Again");
    return;
  }

  push(); 
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text("Score: " + Math.floor(score), 200, 30); // Display score
  pop();

  // Left and right character movement
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

  // Platform collision detection
  let currentPlatform = null;

  let activePlatforms = platformManager.getActivePlatforms();
  for (let i = 0; i < activePlatforms.length; i++) {
    let platform = activePlatforms[i];
    if (character.vy >= 0 && character.isColliding(platform)) {
      character.isOnPlatform = true;
      currentPlatform = platform;

      // Increase score only when landing on a new platform
      if (platform !== lastPlatform) {
        score++;
      }
      // Start breaking if it's a breaking platform
      if (platform.breaking !== undefined && !platform.breaking) { // Check if platform is a BreakingPlatform
        platform.startBreaking();
      }

      character.jump();
      character.y = platform.y - character.h;
      break;
    }
  }

  // Handle breaking platforms
  if (lastPlatform && lastPlatform.breaking && !lastPlatform.broken) { // If lastPlatform is breaking and not yet broken
    if (lastPlatform !== currentPlatform) {
      lastPlatform.break();
    }
  }

  // Update lastPlatform for next frame
  lastPlatform = currentPlatform;

  // Game in progress
  character.draw();

  let scroll = 0;
  let cameraLine = 150;

  // Scroll the screen up when character reaches camera line
  if (character.y < cameraLine) {
    scroll = cameraLine - character.y;
    character.y = cameraLine;
  }

  platformManager.update(scroll); // Update and draw platforms

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
    character = new Character(50, 50, 50, 50);
    platformManager.init();
    score = 0;
    lastPlatform = null; // Reset lastPlatform
  } else if (gameState === 2 && isMouseOnButton(125, 200, 150, 50)) {
    gameState = 1;
    character = new Character(50, 50, 50, 50);
    platformManager.init();
    score = 0;
    lastPlatform = null; // Reset lastPlatform
  }
}

window.setup = setup; // Attach setup to window

window.draw = draw;  // Attach draw to window

window.mousePressed = mousePressed;  // Attach mousePressed to window

window.keyPressed = keyPressed;  // Attach keyPressed to window
