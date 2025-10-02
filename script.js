document.addEventListener('DOMContentLoaded', () => {
    const room = document.getElementById('room');
    let rotateX = 0; // Current rotation around X-axis (looking up/down)
    let rotateY = 0; // Current rotation around Y-axis (looking left/right)

    let isDragging = false;
    let startX;
    let startY;

    // Mouse down event to start dragging
    document.addEventListener('mousedown', (e) => { // Listen on document for better dragging experience
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        room.style.cursor = 'grabbing';
    });

    // Mouse move event to rotate the room (which gives the illusion of rotating our view)
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // For an "inside" view, dragging RIGHT should rotate the ROOM LEFT (decreasing Y)
        // Dragging DOWN should rotate the ROOM UP (decreasing X)
        rotateY += deltaX * 0.1; // Invert deltaX for Y rotation
        rotateX -= deltaY * 0.1; // Invert deltaY for X rotation (already felt natural, but confirming)

        // Limit vertical rotation (looking up/down)
        rotateX = Math.max(-80, Math.min(80, rotateX)); // Max 80 degrees up/down from horizontal

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
    document.body.style.cursor = 'grab'; // Apply to body
});