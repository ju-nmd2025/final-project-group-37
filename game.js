import { platformManager } from "./platform";
import { Character } from "./character";

let character;
let velocityY = 0;
let wasKeyPressed = false;
let scrollSpeed = 0;

function setup() {
    createCanvas(400, 400);
    character = new Character(175, 250, 50, 50);
    platformManager.init();

let active = platformManager.getActivePlatforms();
if (active.length > 0) {
    let firstPlatform = active[0];
    character.x = firstPlatform.x + firstPlatform.w / 2 - character.w / 2;
    character.y = firstPlatform.y - character.h;
}

}

function draw() {
    background(135, 206, 235);
    
    character.move();
    
    if (character.y < 200 && velocityY < 0) {
        scrollSpeed = -velocityY;
        character.y = 200;
    } else {
        scrollSpeed = 0;
    }
    
    character.y += velocityY;
    
    let onPlatform = false;
    let platforms = platformManager.getActivePlatforms();
    
    for (let i = 0; i < platforms.length; i++) {
        if (character.isColliding(character, platforms[i])) {
            onPlatform = true;
            character.y = platforms[i].y - character.h;
            velocityY = 0;
            
    
            if (platforms[i].broken === false && platforms[i].break) {
                platforms[i].break();
            }
            break;
        }
    }


    if (!onPlatform) {
        velocityY += 0.8;
    }
    
// Handle jump input
    let jumpKey = keyIsDown(32) || keyIsDown(87) || keyIsDown(UP_ARROW);
    if (jumpKey && !wasKeyPressed && onPlatform) {
        velocityY = -15;
    }
    wasKeyPressed = jumpKey;
    
// Update and draw platforms
    platformManager.update(scrollSpeed);
    

    character.draw();
    
    fill(0);
    noStroke();
    textSize(12);
    text("A/D or Arrow keys: Move", 10, 20);
    text("SPACE/W/Up: Jump", 10, 35);
    
// Game Over condition
    if (character.y > 400) {
        fill(255, 0, 0);
        textSize(32);
        textAlign(CENTER);
        text("Game Over!", 200, 200);
        noLoop();
    }
}