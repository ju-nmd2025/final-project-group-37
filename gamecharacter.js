export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //		this.isOnPlatForm = false;
  }

  draw() {
    strokeWeight(3);
    fill(100, 90, 200, 250);
    stroke(100, 70, 200, 250);
    circle(this.x + 200, this.y + 140, 150);

    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(80, 50, 200, 250);
    circle(this.x + 150, this.y + 50, 70);

    strokeWeight(3);
    fill(200, 20, 200, 250);
    stroke(70, 40, 200, 250);
    circle(this.x + 150, this.y + 50, 40);

    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(80, 50, 200, 250);
    circle(this.x + 250, this.y + 50, 70);

    strokeWeight(3);
    fill(200, 20, 200, 250);
    stroke(70, 40, 200, 250);
    circle(this.x + 250, this.y + 50, 40);
  }

  isColliding(character, platform) {
    if (
      platform.y === character.y + character.w &&
      platform.x <= character.x + character.w
    ) {
      return true;
    } else {
      return false;
    }
  }
}
