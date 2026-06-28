// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 3D TILT EFFECT =====
const card = document.getElementById('card3d');
const scene = document.querySelector('.scene-container');

if (card && scene) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Mouse tracking
    scene.addEventListener('mousemove', (e) => {
        const rect = scene.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = (x - centerX) / centerX;
        targetY = -(y - centerY) / centerY;
    });

    // Smooth animation loop
    function animateTilt() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        const rotateX = currentY * 12;
        const rotateY = currentX * 12;

        card.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1)
        `;

        // Dynamic shadow
        const shadowX = currentX * 20;
        const shadowY = currentY * 20;
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.5),
            0 0 60px rgba(108,99,255,0.15)
        `;

        requestAnimationFrame(animateTilt);
    }

    animateTilt();

    // Reset on leave
    scene.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    // Touch support
    scene.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = scene.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = (x - centerX) / centerX;
        targetY = -(y - centerY) / centerY;
    });

    scene.addEventListener('touchend', () => {
        targetX = 0;
        targetY = 0;
    });
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        localStorage.setItem('theme', newTheme);
    });
}

// ===== CONSOLE GREETING =====
console.log("👋 Hey there! Thanks for checking out Hassan Butt's portfolio.");
console.log("📧 Email: butthaan971@gmail.com");
console.log("🐙 GitHub: https://github.com/Hassanbutt67");
console.log("💼 LinkedIn: https://www.linkedin.com/in/hassan-butt-876558234/");
console.log("📱 Phone: 0323-6852148");
console.log("🎓 COMSATS University Sahiwal - Software Engineering (2nd Year)");
console.log("💼 2+ Years Freelance Experience");
console.log("🚀 Available for freelance projects!");

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.card-3d');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }
});
