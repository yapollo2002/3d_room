const room = document.getElementById("room");

let angleX = 0;
let angleY = 0;

// Mouse look
let isDragging = false;
let prevX, prevY;

document.addEventListener("mousedown", e => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

document.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const dx = e.clientX - prevX;
    const dy = e.clientY - prevY;

    prevX = e.clientX;
    prevY = e.clientY;

    angleY += dx * 0.3;  // look left/right
    angleX -= dy * 0.3;  // look up/down

    // Clamp vertical rotation
    angleX = Math.max(-80, Math.min(80, angleX));

    room.style.transform = `translateZ(300px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});
