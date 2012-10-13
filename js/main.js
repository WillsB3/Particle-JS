// Main.js
var canvas = document.getElementById('PartCanvas');
var ctx = canvas.getContext('2d');
var particles = [];
var numParticles = 100;
var targetFPS = 30;
var gravity = 1.05;
var pixelSize = 1;
var particleOrigin = (canvas.width/2, canvas.height/2);
var maxParticles = 2000;
// Set the canvas dimensions
sizeCanvas()

// Fill the screen with black
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Save the canvas state as this is our initial starting point
ctx.save();

// Move the canvas origin to the centre of the screen
//ctx.translate(canvas.width / 2, canvas.height / 2);

function init(){
    for(i = 0; i < numParticles; i++){
        particles.push(new Particle(i, particleOrigin[0], particleOrigin[1], gravity));
    }

    window.onresize = sizeCanvas;

    setTimeout(update, 1000 / targetFPS);
    setTimeout(draw, 1000 / targetFPS);
}

function update() {
	var particlesToRemove = [];

	// Update particles
	for (var i = 0; i < particles.length; i++){
		if (particles[i].isOffScreen()) {
			particles.shift();
			particlesToRemove.push(i);
		} else {
        	particles[i].update();
		}
    }

    // Remove any off screen particles
    for (var p = 0; p < particlesToRemove.length; p++) {
    	debugger;
    	//console.log('Particle ' + p + ' is off screen - removing');
		particles.slice(p, p + 1);
    }
    
    for(var i = particles.length; i<maxParticles; i++){
        particles.push(new Particle(i, canvas.width/2, canvas.height/2, gravity));
    }
    // Schedule the next update
	setTimeout(update, 1000 / targetFPS);
	
	document.getElementById('particleCount').innerHTML = particles.length;
	document.getElementById('gravityLevel').innerHTML = gravity;
}

function draw(){
    // Clear the screen
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    for(i=0; i<particles.length; i++){
        ctx.fillStyle= particles[i].color;
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

function Particle(id, x, y, weight) {
	this.id = id;
    this.x = x;
    this.y = y;
    this.drag = 0.96;
    this.xVel = random(-15, 15);
    this.yVel = random(-15, 15);
    this.weight = weight;
    this.color = "hsl("+random(180, 260)+", 100%, "+random(50, 100)+"%)";
}

Particle.prototype.render = function() {
	this.render = function () {
		// Draw the particle
        ctx.fillRect(this.x, this.y, pixelSize, pixelSize);
    }
}

Particle.prototype.isOffScreen = function() {
	if (this.x < 0|| this.x > canvas.width ) {
		return true;
	} else if (this.y < 0|| this.y > canvas.height) {
		return true;
	}

	return false;
}

Particle.prototype.update = function() {
	// Update position
    this.yVel *= this.drag;
    this.xVel *= this.drag;
    
    //this.yVel *= this.weight;
    //console.log("x:" + this.x + " Y:" + this.y + " xVel:"+this.xVel + " yVel:" + this.yVel);
    this.x += this.xVel;
    this.y += this.yVel; this.y *= this.weight;
    
    // Update velocity
    //this.xVel *= this.drag;
	//this.yVel *= this.drag;
	
	
}

//Initialise
init();