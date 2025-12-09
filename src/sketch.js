function setup() {
  createCanvas(400, 600);
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
    return;
  }

  if (gameState === "playing") {
    background(30);

    updateAndDrawPlatforms();   
    score++;

    return;
  }

  if (gameState === "gameover") {
    drawGameOverScreen(score);
  }
}

function keyPressed() {
  if (key === ' ') {
    if (gameState === "start") startGame();
    else if (gameState === "gameover") startGame();
  }
}
