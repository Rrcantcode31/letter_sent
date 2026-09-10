document.addEventListener('DOMContentLoaded', () => {
    const heartEmojis = ['💖', '💕', '💗', '💓', '❤️', '🌸', '✨'];

    // Helper function to create heart burst particles
    function createPoppingHeart(x, y, count = 8) {
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('span');
            heart.classList.add('pop-heart');
            heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            // Random spread directions
            const angle = Math.random() * Math.PI * 2;
            const velocity = 40 + Math.random() * 80;
            const dx = Math.cos(angle) * velocity + 'px';
            const dy = Math.sin(angle) * velocity + 'px';
            const rot = (Math.random() - 0.5) * 60 + 'deg';

            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.setProperty('--dx', dx);
            heart.style.setProperty('--dy', dy);
            heart.style.setProperty('--rot', rot);

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 800);
        }
    }

    // 1. Automatic ambient popping hearts across the screen
    setInterval(() => {
        // Spawn hearts at random positions anywhere in the viewport
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        // Spawn smaller mini-bursts automatically (2-4 hearts at a time)
        createPoppingHeart(randomX, randomY, Math.floor(Math.random() * 3) + 2);
    }, 400); // Triggers every 400ms for continuous ambient pops

    // 2. Interactive popping hearts on click
    document.addEventListener('click', (e) => {
        // Ignore link clicks so navigation works smoothly
        if (e.target.tagName === 'A') return;
        
        // Larger burst on manual click (10 hearts)
        createPoppingHeart(e.clientX, e.clientY, 10);
    });
});