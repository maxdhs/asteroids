export class Laser {
    constructor(x, y, ship) {
    this.x = x;
    this.y = y;
    this.r = 2; 
    this.velocityX = (Math.cos(ship)) * 15;
    this.velocityY = -(Math.sin(ship)) * 15;  
    }

    draw() {
        let canvas = document.getElementById("gameCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "white"
        ctx.fill();
    }

    move() {
        this.x = this.x + this.velocityX;
        this.y = this.y + this.velocityY;
    }
}