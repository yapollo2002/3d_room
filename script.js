const room = document.getElementById("room");

let angleX = 0;
let angleY = 0;
let zoom = 300; // camera distance

// -------------------------
// Desktop Mouse Controls
// -------------------------

let isDragging = false;
let prevX = 0, prevY = 0;

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

    angleY += dx * 0.3;
    angleX -= dy * 0.3;

    angleX = Math.max(-80, Math.min(80, angleX));

    updateView();
});

// -------------------------
// Touchscreen Controls
// -------------------------

let touchMode = ""; // "rotate" or "zoom"
let startX = 0, startY = 0;
let startDist = 0;

document.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
        touchMode = "rotate";
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        touchMode = "zoom";
        startDist = getDistance(e.touches);
    }
});

document.addEventListener("touchmove", e => {
    e.preventDefault();

    if (touchMode === "rotate" && e.touches.length === 1) {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        angleY += dx * 0.3;
        angleX -= dy * 0.3;

        angleX = Math.max(-80, Math.min(80, angleX));
    }

    if (touchMode === "zoom" && e.touches.length === 2) {
        const newDist = getDistance(e.touches);
        zoom += (startDist - newDist) * 0.6;
        zoom = Math.max(100, Math.min(800, zoom));
        startDist = newDist;
    }

    updateView();
}, { passive: false });

document.addEventListener("touchend", () => {
    if (event.touches.length === 0) {
        touchMode = "";
    }
});

// Distance between two fingers
function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// -------------------------
// Update camera transform
// -------------------------

function updateView() {
    room.style.transform =
        `translateZ(${zoom}px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
}
