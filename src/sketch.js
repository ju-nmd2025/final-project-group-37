function setup() {
  createCanvas(400, 600);
  initPlatforms(); // Call the new initialization function
}

function draw() {
  background(30);
  updateAndDrawPlatforms(); // Call the updated function
}
