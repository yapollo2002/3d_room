// Simple orbit animation to visualize the room
const room = document.getElementById("room");

let angleX = -10;
let angleY = -20;

function animate() {
    angleY += 0.3; // Slowly rotate around Y
    room.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    requestAnimationFrame(animate);
}

animate();

// OPTIONAL: Mouse control
let isDragging = false;
let prevX, prevY;

document.addEventListener("mousedown", e => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
});

document.addEventListener("mouseup", () => isDragging = false);

document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;
    prevX = e.clientX;
    prevY = e.clientY;
    angleY += dx * 0.5;
    angleX -= dy * 0.5;
});
