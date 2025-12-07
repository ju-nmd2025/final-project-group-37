let platforms = [];

//Base Platform class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.active = true; //platform is active by default
  }

  //scrolling
  update(scrollSpeed) {
  //move platform downwards
    this.y += scrollSpeed;
  }

  //default platform appearance
  show() {
    fill(200); //gray color
    rect(this.x, this.y, this.w, this.h);
  }

  //action when player jumps on platform
  onJump() {}
}

//Normal static platform
class NormalPlatform extends Platform {
  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  show() {
    fill(100, 200, 100); //green color
    rect(this.x, this.y, this.w, this.h);
  }
}

//Moving platform that moves horizontally
class MovingPlatform extends Platform {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.speed = 1.5; //horizontal speed
    this.direction = 1; //1 for right, -1 for left
  }

  update(scrollSpeed) {
    //call base update to handle vertical scrolling
    super.update(scrollSpeed);

    //update horizontal position
    this.x += this.speed * this.direction;

    //reverse direction on hitting screen edges
    if (this.x <= 0 || this.x + this.w >= width) {
      this.direction *= -1;
    }
  }

  show() {
    fill(100, 100, 255); //blue color
    rect(this.x, this.y, this.w, this.h);
  }
}

//Breaking platform that disappears after being jumped on
class BreakingPlatform extends Platform {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.broken = false;
  }

  show() {
    if (!this.broken) {
      fill(200, 100, 100); // red color
      rect(this.x, this.y, this.w, this.h);
    }
  }

  onJump() {
    //mark platform as broken
    this.broken = true;
    this.active = false;
  }
}

//Initialize platforms
function initPlatforms() {
  platforms = [];
  let y = height - 50;

  for (let i = 0; i < 8; i++) {
    let x = random(20, width - 100);
    let w = 80;
    let h = 15;

    let type = random(1);
    let p;

    if (type < 0.5) {
      p = new NormalPlatform(x, y, w, h);
    } else if (type < 0.8) {
      p = new MovingPlatform(x, y, w, h);
    } else {
      p = new BreakingPlatform(x, y, w, h);
    }

    platforms.push(p);
    y -= random(60, 100);
  }
}

//Update and draw all platforms
function updateAndDrawPlatforms() {
  let scrollSpeed = 1.2;

  for (let p of platforms) {
    p.update(scrollSpeed);
    p.show();
  }

  //Remove off-screen or inactive platforms and spawn new ones
  for (let i = platforms.length - 1; i >= 0; i--) {
    if (platforms[i].y > height + 40 || !platforms[i].active) {
      platforms.splice(i, 1);
      spawnNewPlatform();
    }
  }
}

//Spawn a new platform at the top
function spawnNewPlatform() {
  let x = random(20, width - 100);
  let y = random(-50, 0);
  let w = 80;
  let h = 15;

  let r = random(1);
  let p;

  if (r < 0.5) {
    p = new NormalPlatform(x, y, w, h);
  } else if (r < 0.8) {
    p = new MovingPlatform(x, y, w, h);
  } else {
    p = new BreakingPlatform(x, y, w, h);
  }

  platforms.push(p);
}
