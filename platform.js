export let platforms = [];

export class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.active = true;
  }

  update(scroll) {
    this.y += scroll;
  }

  show() {
    rect(this.x, this.y, this.w, this.h);
  }
}


export class MovingPlatform extends Platform {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.speed = 1.5;
    this.dir = 1;
  }

  update(scroll) {
    super.update(scroll);
    this.x += this.speed * this.dir;

    if (this.x <= 0 || this.x + this.w >= width) {
      this.dir *= -1;
    }
  }
}


export class BreakingPlatform extends Platform {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.broken = false;
  }

  show() {
    if (!this.broken) {
      rect(this.x, this.y, this.w, this.h);
    }
  }

  break() {
    this.broken = true;
    this.active = false;
  }
}


function spawnPlatform(y) {
  let x = random(20, width - 100);
  let w = 80;
  let h = 15;
  let r = random(1);

  if (r < 0.6) {
    return new Platform(x, y, w, h);
  } else if (r < 0.85) {
    return new MovingPlatform(x, y, w, h);
  } else {
    return new BreakingPlatform(x, y, w, h);
  }
}


export function initPlatforms() {
  platforms = [];
  let y = 260; 

  for (let i = 0; i < 5; i++) {
    platforms.push(spawnPlatform(y));
    y -= 60;
  }
}


export function updatePlatforms(scroll = 0) {
  for (let p of platforms) {
    p.update(scroll);
    p.show();
  }
}
