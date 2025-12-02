let platforms = [];

class Platform {
  constructor(x, y, w, h, type = "normal") {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.active = true;
  }

// Update platform position based on scroll
  update(scroll) {
    this.y += scroll;
  }

// Draw the platform
  show() {
    rect(this.x, this.y, this.w, this.h);
  }
}

// Initialize platforms at random positions
function initPlatforms() {
  platforms = [];
  for (let i = 0; i < 8; i++) {
    let x = random(20, width - 100);
    let y = height - 50 - i * 60; // Staggered vertically
    let w = 80;
    let h = 15;
    platforms.push(new Platform(x, y, w, h));
  }
}

// Update and draw all platforms
function updateAndDrawPlatforms() {
  for (let p of platforms) {
// Simulate scrolling effect
    p.update(0);
    p.show();
  }
}
