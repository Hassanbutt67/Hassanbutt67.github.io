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

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme
        html.setAttribute('data-theme', newTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
    });
}

// ===== 3D TILT EFFECT =====
const card = document.getElementById('card3d');
const heroSection = document.getElementById('hero');

if (card && heroSection) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isTouching = false;

    // Mouse tracking
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = (x - centerX) / centerX;
        targetY = -(y - centerY) / centerY;
    });

    // Touch tracking
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

    // Reset on mouse leave
    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });

    // Smooth animation loop
    function animateTilt() {
        // Smooth follow
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        // Apply rotation
        const rotateX = currentY * 10;
        const rotateY = currentX * 10;

        card.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1)
        `;

        // Dynamic shadow
        const shadowX = currentX * 15;
        const shadowY = currentY * 15;
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.3),
            0 0 60px rgba(108,99,255,0.1)
        `;

        requestAnimationFrame(animateTilt);
    }

    animateTilt();
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
console.log("🌓 Theme: " + (document.documentElement.getAttribute('data-theme') || 'light'));

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
