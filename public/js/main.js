// Global Helper: Spawns floating/popping heart emojis
function spawnHeartBurst(x, y, count = 12) {
    const heartEmojis = ['💖', '💕', '💗', '💓', '❤️', '🌸'];
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.classList.add('pop-heart');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random trajectory offsets
        const angle = Math.random() * Math.PI * 2;
        const velocity = 60 + Math.random() * 80;
        const dx = Math.cos(angle) * velocity + 'px';
        const dy = Math.sin(angle) * velocity + 'px';
        const rot = (Math.random() - 0.5) * 60 + 'deg';

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.setProperty('--dx', dx);
        heart.style.setProperty('--dy', dy);
        heart.style.setProperty('--rot', rot);

        document.body.appendChild(heart);

        // Remove element after animation completes
        setTimeout(() => heart.remove(), 800);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. Envelope & Letter Click Handlers
    // -----------------------------------------------------------------
    const envelope = document.getElementById('envelope');
    const popTarget = document.getElementById('pop-target');

    if (envelope) {
        envelope.addEventListener('click', (e) => {
            // Don't close envelope if clicking the message link
            if (e.target.tagName === 'A') return;
            
            const isOpen = envelope.classList.toggle('open');
            if (isOpen) {
                const rect = envelope.getBoundingClientRect();
                spawnHeartBurst(rect.left + rect.width / 2, rect.top + 40, 16);
            }
        });
    }

    if (popTarget) {
        popTarget.addEventListener('click', (e) => {
            spawnHeartBurst(e.clientX, e.clientY, 8);
        });
    }

    // -----------------------------------------------------------------
    // 2. Three.js Floating Hearts Background
    // -----------------------------------------------------------------
    const container = document.getElementById('heart-bg');
    
    // Skip Three.js initialization if the canvas wrapper isn't on the page
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Heart Shape
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0.5, -0.5, 1, -1, 1);
    heartShape.bezierCurveTo(-1.5, 1, -1.5, 0.3, -1.5, 0.3);
    heartShape.bezierCurveTo(-1.5, -0.3, -0.7, -0.8, 0, -1.4);
    heartShape.bezierCurveTo(0.7, -0.8, 1.5, -0.3, 1.5, 0.3);
    heartShape.bezierCurveTo(1.5, 0.3, 1.5, 1, 1, 1);
    heartShape.bezierCurveTo(0.5, 1, 0, 0.5, 0, 0);

    const geometry = new THREE.ShapeGeometry(heartShape);

    // Color palette
    const colors = [0xf40933, 0x101010]; 
    const hearts = [];

    // Spawn 40 floating background hearts
    for (let i = 0; i < 40; i++) {
        const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75
        });

        const heart = new THREE.Mesh(geometry, material);
        
        heart.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
        );
        
        const scale = Math.random() * 0.3 + 0.1;
        heart.scale.set(scale, scale, scale);
        heart.rotation.z = Math.PI; // Flip heart right-side up
        
        heart.userData = {
            speedY: Math.random() * 0.02 + 0.005,
            rotSpeed: (Math.random() - 0.5) * 0.02
        };

        scene.add(heart);
        hearts.push(heart);
    }

    camera.position.z = 10;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        hearts.forEach(heart => {
            heart.position.y += heart.userData.speedY;
            heart.rotation.y += heart.userData.rotSpeed;

            // Reset heart to bottom once it floats off-screen
            if (heart.position.y > 10) {
                heart.position.y = -10;
                heart.position.x = (Math.random() - 0.5) * 20;
            }
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});