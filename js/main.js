// Main.js
var canvas = document.getElementById('PartCanvas');
var ctx = canvas.getContext('2d');
var particles = [];

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.save();
ctx.translate(canvas.width / 2, canvas.height / 2);


function init(){
    for(i=0; i<20; i++){
        particles.push(new Particle(random(-5, 5), random(-5, 5), 1.5, 1.5));
    }

    setInterval(draw, 1000/30);
}

function draw(){
    ctx.fillStyle="#FF0000";
    for(i=0; i<particles.length; i++){
        var p = particles[i];

        p.x += p.xVel;
        p.y += p.yVel;

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
