export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //		this.isOnPlatForm = false;

    this.speed = 3;
    this.gravity = 0.6;
    this.vx = 0;
    this.vy = 0;
    this.JumpStrength = -12;

    this.isOnPlatform = false;
  }

  draw() {
    strokeWeight(1);
    fill(100, 90, 200, 250);
    stroke(100, 70, 200, 250);
    circle(this.x + this.w * 0.5, this.y + this.h * 0.55, this.w * 0.5);

    strokeWeight(1);
    fill(80, 70, 200, 250);
    stroke(80, 50, 200, 250);
    circle(this.x + this.w * 0.25, this.y + this.h * 0.35, this.w * 0.2);

    strokeWeight(1);
    fill(200, 20, 200, 250);
    stroke(70, 40, 200, 250);
    circle(this.x + this.w * 0.25, this.y + this.h * 0.35, this.w * 0.1);

    strokeWeight(1);
    fill(80, 70, 200, 250);
    stroke(80, 50, 200, 250);
    circle(this.x + this.w * 0.75, this.y + this.h * 0.35, this.w * 0.2);

    strokeWeight(1);
    fill(200, 20, 200, 250);
    stroke(70, 40, 200, 250);
    circle(this.x + this.w * 0.75, this.y + this.h * 0.35, this.w * 0.1);

    // base + ears

    fill(250, 250, 250, 250);
    noStroke();
    ellipse(
      this.x + this.w * 0.4,
      this.y + this.h * 0.55,
      this.w * 0.1,
      this.h * 0.15
    ); // left eye

    fill(250, 250, 250, 250);
    noStroke();
    ellipse(
      this.x + this.w * 0.6,
      this.y + this.h * 0.55,
      this.w * 0.1,
      this.h * 0.15
    ); // right eye

    fill(10, 10, 10, 250);
    noStroke();
    ellipse(
      this.x + this.w * 0.4,
      this.y + this.h * 0.55,
      this.w * 0.05,
      this.h * 0.1
    ); // left pupil

    fill(10, 10, 10, 250);
    noStroke();
    ellipse(
      this.x + this.w * 0.6,
      this.y + this.h * 0.55,
      this.w * 0.05,
      this.h * 0.1
    ); // right pupil

    strokeWeight(1);
    fill(80, 70, 200, 250);
    stroke(70, 40, 200, 250);
    arc(
      this.x + this.w * 0.5,
      this.y + this.h * 0.67,
      this.w * 0.2,
      this.h * 0.15,
      0,
      PI
    ); // mouth

    fill(200, 20, 200, 250);
    noStroke();
    circle(this.x + this.w * 0.35, this.y + this.h * 0.65, this.w * 0.05);

    fill(200, 20, 200, 250);
    noStroke();
    circle(this.x + this.w * 0.65, this.y + this.h * 0.65, this.w * 0.05);

    // blush

    push();
    strokeWeight(1);
    fill(80, 70, 200, 250);
    stroke(70, 40, 200, 250);
    arc(
      this.x + this.w * 0.4,
      this.y + this.h * 0.55,
      this.w * 0.1,
      this.h * 0.2,
      PI,
      TWO_PI
    );
    pop();

    push();
    strokeWeight(1);
    fill(80, 70, 200, 250);
    stroke(70, 40, 200, 250);
    arc(
      this.x + this.w * 0.6,
      this.y + this.h * 0.55,
      this.w * 0.1,
      this.h * 0.2,
      PI,
      TWO_PI
    );
    pop();

    // eyelids
  }

  moveLeft() {
    this.vx = -this.speed;
    this.x += this.vx;
    this.x = constrain(this.x, 0, width - this.w);
  }

  moveRight() {
    this.vx = this.speed;
    this.x += this.vx;
    this.x = constrain(this.x, 0, width - this.w);
  }
  jump() {
    if (this.isOnPlatform) {
      this.vy = this.JumpStrength;
      this.isOnPlatform = false;
    }
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;
    this.x += this.vx;

    this.vx *= 0.9; // Friction

    this.x = constrain(this.x, 0, width - this.w);
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
