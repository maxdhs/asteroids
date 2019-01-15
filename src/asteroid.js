export class Asteroid {
    constructor(x, y, r, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    draw() {
        let canvas = document.getElementById("gameCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "white"
        ctx.fill();
    }

    move() {
        this.x = this.x + this.velocityX;
        this.y = this.y + this.velocityY;
    }

    edgeDetection() {
        if (this.x < 0 - this.r * 2) {
            this.x = 700;
        }
        if (this.x > 700 + this.r * 2) {
            this.x = 0;
        }
        if (this.y < 0 - this.r * 2) {
            this.y = 500;
        }
        if (this.y > 500 + this.r * 2) {
            this.y = 0;
        }
    }

    
}