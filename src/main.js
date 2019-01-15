import './styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Asteroid } from './asteroid.js';
import { Laser } from './laser.js';

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let distance;
let score = 0;

const FPS = 30;

const SHIP_SIZE = 30;

const SHIP_THRUST = 2;

let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: SHIP_SIZE / 2,
    a: 1.57,
    rot: 0,
    thrusting: false,
    thrust: {
        x: 0,
        y: 0
    }
}

function gameOver() {

    ctx.strokeStyle = "white";
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.beginPath();
    ctx.moveTo(
        ship.x + ship.r * Math.cos(ship.a),
        ship.y - ship.r * Math.sin(ship.a)
    );
    ctx.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
    );
    ctx.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
    document.removeEventListener("keydown", keypress);

    setTimeout(function () { alert("You Died!"); location.reload(); }, 200);

}

document.addEventListener("keydown", keypress);
document.addEventListener("keyup", keyup);

function keypress(event) {
    if (event.keyCode == 37) {
        ship.rot = .2;
    }
    if (event.keyCode == 39) {
        ship.rot = -.2;
    }
    if (event.keyCode == 38) {
        ship.thrusting = true;
    }
    if (event.keyCode == 32) {
        lasers.push(new Laser(ship.x + ship.r * Math.cos(ship.a), ship.y - ship.r * Math.sin(ship.a), ship.a));
        console.log(lasers[0]);
        console.log(ship.a)
    }
}

function keyup(event) {
    ship.rot = 0;
    ship.thrusting = false;
}



// CREATE ASTEROIDS
let lasers = [];

let asteroids = [];

function createAstroids() {
    for (let i = 0; i < 5; i++) {
        let radius = 60 * Math.random();
        asteroids.push(new Asteroid(700 * Math.random(), 500 * Math.random(), radius + 20, Math.random() > .5 ? 1 : -1, Math.random() > .5 ? 1 : -1));
    }
}

createAstroids();

setInterval(update, 1000 / FPS);

function update() {


    // DRAW SPACE
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 700, 500);
    ctx.fillText("score", 10, 10)
    // THRUST SHIP

    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a);
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a);

        // DRAW THE THRUSTER
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(
            ship.x + ship.r * Math.cos(ship.a),
            ship.y - ship.r * Math.sin(ship.a)
        );
        ctx.lineTo(
            ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
            ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
        );
        ctx.lineTo(
            ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
            ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.stroke();

    }
    else {
        ship.thrust.x = .95 * ship.thrust.x;
        ship.thrust.y = .95 * ship.thrust.y;
    }

    // DRAW SHIP

    ctx.strokeStyle = "white";
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.beginPath();
    ctx.moveTo(
        ship.x + ship.r * Math.cos(ship.a),
        ship.y - ship.r * Math.sin(ship.a)
    );
    ctx.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
    );
    ctx.lineTo(
        ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
    );
    ctx.closePath();
    ctx.stroke();

    // ROTATE SHIP
    ship.a = ship.a + ship.rot;

    // MOVE SHIP
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;

    // ASTEROIDS AND ASTEROIDS DETECTION

    for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < asteroids.length; j++) {
            distance = Math.sqrt(Math.pow((asteroids[i].x - asteroids[j].x), 2) + Math.pow((asteroids[i].y - asteroids[j].y), 2));
            if (distance < asteroids[j].r + asteroids[i].r && i != j) {
                asteroids[j].velocityX = -asteroids[j].velocityX;
             
               
            }
        }
    }


    // EDGE
    if (ship.x < 0 - ship.r * 2) {
        ship.x = 700;
    }
    if (ship.x > 700 + ship.r * 2) {
        ship.x = 0;
    }
    if (ship.y < 0 - ship.r * 2) {
        ship.y = 500;
    }
    if (ship.y > 500 + ship.r * 2) {
        ship.y = 0;
    }

    // ASTEROIDS

    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
        asteroids[i].move();
        asteroids[i].edgeDetection();
    }

    // LASERS

    for (let i = 0; i < lasers.length; i++) {
        lasers[i].draw();
        lasers[i].move();
    }

    //Laser AND ASTEROIDS DETECTION

    for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < lasers.length; j++) {
            distance = Math.sqrt(Math.pow((asteroids[i].x - lasers[j].x), 2) + Math.pow((asteroids[i].y - lasers[j].y), 2));
            if (distance < lasers[j].r + asteroids[i].r) {
                lasers.splice(j, 1);
                asteroids.splice(i, 1);
                score++;
                if (asteroids.length == 0) {
                    createAstroids();
                }
            }
        }
    }


    // SHIP AND ASTEROIDS DETECTION

    for (let i = 0; i < asteroids.length; i++) {
        distance = Math.sqrt(Math.pow((asteroids[i].x - ship.x), 2) + Math.pow((asteroids[i].y - ship.y), 2));
        if (distance < ship.r + asteroids[i].r) {
            gameOver();
        }
    }

}



