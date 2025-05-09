const canvas = document.getElementById("circleCanvas");
const ctx = canvas.getContext("2d");
let circles = [];
let selectedCircle = null;
let isDragging = false;
const defaultRadius = 20;
const minRadius = 5;

function drawCircles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle === selectedCircle ? "red" : "blue";
    ctx.fill();
  });
}

function getCircleAt(x, y) {
  return circles.find(circle => {
    const dx = circle.x - x;
    const dy = circle.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
  });
}

canvas.addEventListener("mousedown", function(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const clickedCircle = getCircleAt(x, y);
  
  if (clickedCircle) {
    selectedCircle = clickedCircle;
    isDragging = true;
  } else {
    circles.push({ x, y, radius: defaultRadius });
    selectedCircle = null;
  }
  drawCircles();
});

canvas.addEventListener("mousemove", function(e) {
  if (isDragging && selectedCircle) {
    const rect = canvas.getBoundingClientRect();
    selectedCircle.x = e.clientX - rect.left;
    selectedCircle.y = e.clientY - rect.top;
    drawCircles();
  }
});

canvas.addEventListener("mouseup", function() {
  isDragging = false;
});

document.addEventListener("keydown", function(e) {
  if (e.key === "Delete" && selectedCircle) {
    circles = circles.filter(c => c !== selectedCircle);
    selectedCircle = null;
    drawCircles();
  }
});

canvas.addEventListener("wheel", function(e) {
  if (selectedCircle) {
    e.preventDefault();
    selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
    if (selectedCircle.radius < minRadius) {
      selectedCircle.radius = minRadius;
    }
    drawCircles();
  }
});
