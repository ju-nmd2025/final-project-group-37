class Platform {
    constructor(x, y, w, h) {
        this.x = x;  
        this.y = y;  
        this.w = w;  
        this.h = h; 
        this.active = true;  
    }

    // Update platform position based on scroll
    update(scroll) {
        this.y += scroll;
    }

    // Draw the platform
    show() {
        fill(100, 200, 100); // Green color
        rect(this.x, this.y, this.w, this.h);
    }
}

// Moving platform subclass
class MovingPlatform extends Platform {
    constructor(x, y, w, h) {
        super(x, y, w, h);  
        this.speed = 2;    
        this.dir = 1;      
    }
    // Override update method to include horizontal movement
    update(scroll) {
        super.update(scroll);  
        
        // Move horizontally
        this.x += this.speed * this.dir;
        
        // Reverse direction on hitting canvas edges
        if (this.x <= 0 || this.x + this.w >= 400) {
            this.dir *= -1;
        }
    }
    
    show() {
        fill(100, 100, 200);  // Blue color
        rect(this.x, this.y, this.w, this.h);
    }
}

// Breaking platform subclass
export class BreakingPlatform extends Platform {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.broken = false; 
        this.breaking = false; 
    }

    show() {
        if (!this.broken) {
            fill(200, 100, 100);  // Red color
            rect(this.x, this.y, this.w, this.h);
        }
    }
    // Method to start the breaking process
    startBreaking() {
    this.breaking = true;
}

    // Method to break the platform
    break() {
        this.broken = true;
        this.active = false;
    }
}

// Platform manager to handle multiple platforms
export let platformManager = {
    platforms: [], 
    
  
    init() {
        this.platforms = []; // Reset platform list
        let y = 300;
        
      
        for (let i = 0; i < 8; i++) {  // Create 8 platforms
            this.platforms.push(this.createPlatform(y));
            y -= 60;  
        }
    },
    
    // Factory method to create different types of platforms
    createPlatform(y) {
        let x = Math.random() * 300 + 20;  
        let w = 80;  
        let h = 15;  
        let r = Math.random();  
        
      
        if (r < 0.6) {
            return new Platform(x, y, w, h);
        } else if (r < 0.85) {
            return new MovingPlatform(x, y, w, h);
        } else {
            return new BreakingPlatform(x, y, w, h);
        }
    },
    
    // Update all platforms
    update(scroll) {
       
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].update(scroll);
            this.platforms[i].show();
        }
        
        // Remove platforms that have moved off screen
        for (let i = this.platforms.length - 1; i >= 0; i--) {
            if (this.platforms[i].y > 450) {
                this.platforms.splice(i, 1);
            }
        }
        
        // Add new platforms at the top
        if (this.platforms.length < 8) {
            let topY = this.platforms[0].y - 60;
            this.platforms.unshift(this.createPlatform(topY));
        }
    },
    
    // Get active platforms for collision detection
    getActivePlatforms() {
        let active = [];
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].active) {
                active.push(this.platforms[i]);
            }
        }
        return active;
    }
};