// Main.js
var canvas = document.getElementById('PartCanvas');
var ctx = canvas.getContext('2d');
var particles = [];
var numParticles = 2000;

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
    for(i = 0; i < numParticles; i++){
        particles.push(new Particle(random(-5, 5), random(-5, 5)));
    }

    setInterval(update, 1000/30);
    setInterval(draw, 1000/30);
}

function update() {
	// Update particles
	for(i=0; i<particles.length; i++){
        particles[i].update();
    }
}

function draw(){
    // Clear the screen
    ctx.fillStyle = "#000000";
    ctx.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    // Draw particles
    ctx.fillStyle="#FF0000";
    for(i=0; i<particles.length; i++){
        particles[i].render(ctx);
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

function Particle(x, y, weight){
    this.x = x;
    this.y = y;
    this.weight = weight;
    this.xVel = random(-10, 10);
    this.yVel = random(-10, 10);
    this.drag = 0.998;
}

Particle.prototype.render = function() {
	this.render = function () {
        ctx.fillRect(this.x * this.drag, this.y * this.drag, 5, 5);
    }
}

Particle.prototype.update = function() {
	// Update position
    this.x += this.xVel;
    this.y += this.yVel;

    // Update velocity
    this.xVel *= this.drag;
	this.yVel *= this.drag;
}

init();