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

    // base + ears

    fill(250, 250, 250, 250);
    noStroke();
    ellipse(this.x + 170, this.y + 130, 30, 50); // left eye

    fill(250, 250, 250, 250);
    noStroke();
    ellipse(this.x + 230, this.y + 130, 30, 50); // right eye

    fill(10, 10, 10, 250);
    noStroke();
    ellipse(this.x + 170, this.y + 130, 20, 30); // left pupil

    fill(10, 10, 10, 250);
    noStroke();
    ellipse(this.x + 230, this.y + 130, 20, 30); // right pupil

    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(70, 40, 200, 250);
    arc(this.x + 200, this.y + 170, 60, 50, 0, PI); // mouth

    fill(200, 20, 200, 250);
    noStroke();
    circle(this.x + 150, this.y + 170, 20);

    fill(200, 20, 200, 250);
    noStroke();
    circle(this.x + 250, this.y + 170, 20);

    // blush

    push();
    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(70, 40, 200, 250);
    arc(this.x + 170, this.y + 130, 30, 50, PI, TWO_PI);
    pop();

    push();
    strokeWeight(3);
    fill(80, 70, 200, 250);
    stroke(70, 40, 200, 250);
    arc(this.x + 230, this.y + 130, 30, 50, PI, TWO_PI);
    pop();

    // eyelids
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
