// Main.js
var canvas = document.getElementById('PartCanvas');
var ctx = canvas.getContext('2d');
var particles = [];

// Set the canvas dimensions
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Fill the screen with black
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Save the canvas state as this is our initial starting point
ctx.save();

// Move the canvas origin to the centre of the screen
ctx.translate(canvas.width / 2, canvas.height / 2);

function init(){
    for(i=0; i<20; i++){
        particles.push(new Particle(random(-5, 5), random(-5, 5)));
    }

    setInterval(draw, 1000/30);
}

function draw(){
    // Clear the screen
    ctx.fillStyle = "#000000";
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    // Draw particles
    ctx.fillStyle="#FF0000";
    for(i=0; i<particles.length; i++){
        var p = particles[i];

        p.x += p.xVel;
        p.y += p.yVel;

        ctx.fillRect(p.x,p.y,5,5);
    }
}

function random(min, max){
    return Math.random() * (max - min) + min;
}

function Particle(x, y, xVel, yVel){
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
}

function Particle(x, y){
    this.x = x;
    this.y = y;
    debugger;
    this.xVel = random(-10, 10);
    this.yVel = random(-10, 10);
}

init();
