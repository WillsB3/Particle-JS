// Main.js
var canvas = document.getElementById('PartCanvas');
var ctx = canvas.getContext('2d');
var particles = [];
var numParticles = 2000;
var targetFPS = 30;

// Set the canvas dimensions
sizeCanvas()

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

    window.onresize = sizeCanvas;

    setTimeout(update, 1000 / targetFPS);
    setTimeout(draw, 1000 / targetFPS);
}

function update() {
	var particlesToRemove = [];

	// Update particles
	for (i = 0; i < particles.length; i++){
		if (particles[i].isOffScreen()) {
			particlesToRemove.push(i);


		} else {
        	particles[i].update();
		}
    }

    // Remove any off screen particles
    for (var p = 0; p < particlesToRemove.length; p++) {
    	console.log('Particle ' + i + ' is off screen - removing');
		particles.shift(p, p + 1);
    }

    // Schedule the next update
	setTimeout(update, 1000 / targetFPS);
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

    // Schedule a redraw for the next frame
    setTimeout(draw, 1000 / targetFPS);
}

function random(min, max){
    return Math.random() * (max - min) + min;
}

function sizeCanvas() {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
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
		// Draw the particle
        ctx.fillRect(this.x * this.drag, this.y * this.drag, 5, 5);
    }
}

Particle.prototype.isOffScreen = function() {
	if (this.x < -canvas.width / 2 || this.x > canvas.width / 2) {
		return true;
	} else if (this.y < -canvas.height / 2 || this.y > canvas.height / 2) {
		return true;
	}

	return false;
}

Particle.prototype.update = function() {
	// Update position
    this.x += this.xVel;
    this.y += this.yVel;

    // Update velocity
    this.xVel *= this.drag;
	this.yVel *= this.drag;
}

//Initialise
init();