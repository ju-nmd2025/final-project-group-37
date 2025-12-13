export class Character {
    constructor(x, y, w, h) {
        this.x = x;    
        this.y = y;     
        this.w = w;     
        this.h = h;      
        this.speed = 5;  
    }

    draw() {
        fill(255, 0, 0);  
        rect(this.x, this.y, this.w, this.h);
    }

    // Handle character movement based on key input
    move() {
        // Move left
        if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
        }
        
        // Move right
        if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
        }
        
        // Keep character within canvas bounds
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.w > 400) {
            this.x = 400 - this.w;
        }
    }

    // AABB collision detection
    isColliding(character, platform) {
    // AABB collision detection
        return (
            character.x < platform.x + platform.w &&
            character.x + character.w > platform.x &&
            character.y + character.h >= platform.y &&
            character.y + character.h <= platform.y + 10 &&
            character.y < platform.y
        );
    }
}