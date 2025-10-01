document.addEventListener('DOMContentLoaded', () => {
    const room = document.getElementById('room');
    let rotateX = 0; // Initial rotation around X-axis (up/down)
    let rotateY = 0; // Initial rotation around Y-axis (left/right)

    let isDragging = false;
    let startX;
    let startY;

    // Mouse down event to start dragging
    room.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        room.style.cursor = 'grabbing';
    });

    // Mouse move event to rotate the room
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Adjust rotation sensitivity
        rotateY += deltaX * 0.1; // Horizontal movement affects Y-axis rotation
        rotateX -= deltaY * 0.1; // Vertical movement affects X-axis rotation (inverted for natural feel)

        // Limit vertical rotation to prevent flipping
        rotateX = Math.max(-80, Math.min(80, rotateX)); // Example limits

        room.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        startX = e.clientX;
        startY = e.clientY;
    });

    // Mouse up event to stop dragging
    document.addEventListener('mouseup', () => {
        isDragging = false;
        room.style.cursor = 'grab';
    });

    // Initial cursor style
    room.style.cursor = 'grab';
});