let score = 0;

function startGame() {
  score = 0;
  initPlatforms();      // Re-initialize platforms
  gameState = "playing";
}

function endGame() {
  gameState = "gameover";
}
