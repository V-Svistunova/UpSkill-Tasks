const canvas = document.getElementById("draw"),
    ctx = canvas.getContext("2d"),
    color = document.getElementById("color"),
    size = document.getElementById("size"),
    clear = document.getElementById("clear"),
    controls = document.querySelector('.controls');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - controls.offsetHeight;
ctx.strokeStyle = color.value;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = size.value;


let isDrawning = false,
  lastX ,
  lastY ;

function draw(e) {
  if (!isDrawning) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function updateColor() {
  ctx.strokeStyle = this.value;
}
function updateSize() {
    ctx.lineWidth = this.value;
}

color.addEventListener("blur", updateColor);
size.addEventListener('mousemove', updateSize);
clear.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawning = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawning = false));
canvas.addEventListener("mouseout", () => (isDrawning = false));
