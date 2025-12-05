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
    circle(this.x + this.w / 2, this.y + this.h * 0.7, this.w * 0.75);

    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(80, 50, 200, 250);
    circle(this.x + this.w * 0.25, this.y + this.h * 0.2, this.w * 0.35);

    strokeWeight(3);
    fill(200, 20, 200, 500);
    stroke(70, 40, 200, 250);
    circle(this.x + this.w * 0.25, this, y + this.h * 0.2, this.w * 0.2);

    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(80, 50, 200, 250);
    circle(this.x + this.w * 0.75, this.y + this.h * 0.2, this.w * 0.35);

    strokeWeight(3);
    fill(200, 20, 200, 500);
    stroke(70, 40, 200, 250);
    circle(this.x + this.w * 0.75, this.y + this.h * 0.2, this.w * 0.2);
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
