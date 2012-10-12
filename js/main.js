// Main.js
debugger
var canvas = document.getElementById('PartCanvas');

var ctx = canvas.getContext('2d');

var particles = [];

function init(){
    for(i=0; i<20; i++){
        particles.push(new Particle(random(-5, 5), random(-5, 5), 1, 1));
    }
    
    setInterval(draw, 1000/30);
}

function draw(){
    ctx.fillStyle="#FF0000";
    for(i=0; i<particles.length; i++){
        var p = particles[i];
        ctx.fillRect(p.x,p.y,5,5);
    }
}

function random(min, max){
    return (Math.random()*max)+min;
}

function Particle(x, y, xVel, yVel){
    
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
}

init();
