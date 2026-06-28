// ===== SMOOTH SCROLL =====
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

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
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

// ===== 3D TILT EFFECT =====
const card = document.getElementById('card3d');
const heroSection = document.getElementById('hero');

if (card && heroSection) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let isTouching = false;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetX = (x - centerX) / centerX;
        targetY = -(y - centerY) / centerY;
    });

    heroSection.addEventListener('touchstart', (e) => {
        isTouching = true;
        const touch = e.touches[0];
        const rect = heroSection.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetX = (x - centerX) / centerX;
        targetY = -(y - centerY) / centerY;
    });

    heroSection.addEventListener('touchmove', (e) => {
        if (!isTouching) return;
        const touch = e.touches[0];
        const rect = heroSection.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetX = (x - centerX) / centerX;
        targetY = -(y - centerY) / centerY;
    });

    heroSection.addEventListener('touchend', () => {
        isTouching = false;
        targetX = 0;
        targetY = 0;
    });

    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    function animateTilt() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        const rotateX = currentY * 8;
        const rotateY = currentX * 8;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
        requestAnimationFrame(animateTilt);
    }
    animateTilt();
}

// ===== CONSOLE =====
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
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease-out';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
});
// ========================================
// ⭐ DYNAMIC STARS GENERATOR
// ========================================

function createDynamicStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    // Remove existing stars (keep shooting stars and sparkles)
    const existingStars = container.querySelectorAll('.star');
    existingStars.forEach(star => star.remove());

    // Create 40-60 additional stars
    const starCount = Math.floor(Math.random() * 20) + 40;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Random size (1-5px)
        const size = Math.random() * 4 + 1;
        
        // Random animation duration (2-6s)
        const duration = Math.random() * 4 + 2;
        
        // Random delay (0-5s)
        const delay = Math.random() * 5;
        
        star.style.cssText = `
            top: ${top}%;
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            --duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(star);
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', createDynamicStars);
