// Platform 类定义
class Platform {
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

class MovingPlatform extends Platform {
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

class BreakingPlatform extends Platform {
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

// Character 类定义
class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    rect(this.x, this.y, this.w, this.h);
  }

  isColliding(character, platform) {
    // 检查角色是否在平台上
    return (
      character.x < platform.x + platform.w &&
      character.x + character.w > platform.x &&
      character.y + character.h >= platform.y &&
      character.y + character.h <= platform.y + platform.h
    );
  }
}

// 全局变量
let platforms = [];
let canvasWidth = 400;
let canvasHeight = 400;
let floor = 300;
let character;

// 辅助函数
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

function initPlatforms() {
  platforms = [];
  let y = 260;
  for (let i = 0; i < 5; i++) {
    platforms.push(spawnPlatform(y));
    y -= 60;
  }
}

function updatePlatforms(scroll = 0) {
  for (let p of platforms) {
    p.update(scroll);
    p.show();
  }
}

// p5.js 主函数
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  character = new Character(50, 50, 50, 50);
  initPlatforms();
}

function draw() {
  background(100, 100, 100);
  
  character.draw();
  updatePlatforms(0);
  
  let onPlatform = false;
  for (let p of platforms) {
    if (character.isColliding(character, p)) {
      onPlatform = true;
      break;
    }
  }
  
  if (character.y + character.h < floor && !onPlatform) {
    character.y += 10;
  }
  
  line(0, floor, canvasWidth, floor);
}

function keyPressed() {
  if (character.y + character.h === floor) {
    character.y -= 120;
  }
}