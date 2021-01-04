const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.interWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "black";
ctx.fillRect(10, 10, 15, 50);












































/*
const ground = new Image();
ground.src = "/img/dog.jpg";

const drop = new Image();
drop.src = "/img/drop.png";

let score = 0;

canvas.width = window.interWidth;
canvas.height = window.innerHeight;

let drops = {
  x: Math.floor(((Math.random() * 10) + 1) * 100),
  y: 0,
};

function drawGame() {
  ctx.drawImage(ground, 0, 0);
  ctx.drawImage(drop, drops.x, y);
}

let game = setInterval(drawGame, 100);


*/