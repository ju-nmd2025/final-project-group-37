function drawStartScreen() {
  background(0);//black color
  fill(255);//white color
  textAlign(CENTER, CENTER);
  textSize(24);
  text("DOODLE JUMP", width / 2, height / 2 - 20);
  textSize(14);
  text("Press SPACE to start", width / 2, height / 2 + 20);
}

function drawGameOverScreen(score = 0) {
  background(0);//black color
  fill(255);//white color
  textAlign(CENTER, CENTER);
  textSize(24);
  text("GAME OVER", width / 2, height / 2 - 30);
  textSize(16);
  text("Score: " + score, width / 2, height / 2);
  textSize(14);
  text("Press SPACE to restart", width / 2, height / 2 + 30);
}
