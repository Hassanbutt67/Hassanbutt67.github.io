// =============================================
// PROJECT DATA
// =============================================
const projectsData = [
    {
        title: "WeatherPro",
        description: "Real-time weather app with 5-day forecast, location detection, and dark/light mode using OpenWeatherMap API.",
        tags: ["JavaScript", "API", "CSS3"],
        icon: "🌤️",
        code: "https://github.com/Hassanbutt67/weather-app",
        demo: "https://Hassanbutt67.github.io/weather-app"
    },
    {
        title: "Task Manager App",
        description: "Full-featured task management with CRUD operations, local storage persistence, priority levels, and real-time statistics.",
        tags: ["JavaScript", "Local Storage", "CSS3"],
        icon: "✅",
        code: "https://github.com/Hassanbutt67/Task-Manager-App",
        demo: "https://hassanbutt67.github.io/Task-Manager-App/"
    },
    {
        title: "Portfolio Website",
        description: "My personal portfolio built with HTML, CSS, and JavaScript. Showcases my work, skills, and freelance experience.",
        tags: ["HTML", "CSS", "JavaScript"],
        icon: "🚀",
        code: "https://github.com/Hassanbutt67/Hassanbutt67.github.io",
        demo: "https://Hassanbutt67.github.io"
    }
];

// =============================================
// RENDER PROJECTS
// =============================================
const projectsGrid = document.getElementById('projectsGrid');

projectsData.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
    
    card.innerHTML = `
        <div class="project-thumbnail">${project.icon}</div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tagsHTML}</div>
            <div class="project-links">
                <a href="${project.code}" target="_blank"><i class="fab fa-github"></i> Code</a>
                <a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            </div>
        </div>
    `;
    
    projectsGrid.appendChild(card);
});

// =============================================
// PARTICLE NETWORK BACKGROUND
// =============================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = null;
let mouseY = null;
let isDarkMode = false;

function checkTheme() {
    isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode 
            ? `rgba(148, 163, 184, ${this.opacity})` 
            : `rgba(37, 99, 235, ${this.opacity * 0.5})`;
        ctx.fill();
    }
}

const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const maxDistance = 150;
            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = isDarkMode 
                    ? `rgba(148, 163, 184, ${opacity})` 
                    : `rgba(37, 99, 235, ${opacity * 0.5})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    checkTheme();
    
    particles.forEach(particle => {
        if (mouseX !== null && mouseY !== null) {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
                const force = 0.02;
                particle.x += dx * force;
                particle.y += dy * force;
            }
        }
        
        particle.update();
        particle.draw();
    });
    
    drawLines();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// =============================================
// THEME TOGGLE
// =============================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);
const toggleIcon = themeToggle.querySelector('i');
toggleIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    toggleIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    checkTheme();
});

// =============================================
// 3D TILT EFFECT - HERO CARD
// =============================================
const heroCard = document.getElementById('heroCard');
const heroSection = document.querySelector('.hero');

if (heroCard && heroSection) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
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

    heroSection.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
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

    function animateHeroTilt() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        
        const rotateX = currentY * 8;
        const rotateY = currentX * 8;
        const translateZ = 20 - Math.abs(currentX + currentY) * 5;
        
        heroCard.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(${Math.max(0, translateZ)}px)
        `;
        
        requestAnimationFrame(animateHeroTilt);
    }
    animateHeroTilt();
}

// =============================================
// 3D TILT FOR ALL ELEMENTS WITH data-tilt
// =============================================
document.querySelectorAll('[data-tilt]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 6;
        const rotateY = ((x - centerX) / centerX) * 6;
        
        element.style.transform = `
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-8px) 
            scale(1.02)
        `;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// =============================================
// BADGE 3D TILT
// =============================================
const floatingBadges = document.querySelectorAll('.floating-badge');

floatingBadges.forEach((badge) => {
    badge.addEventListener('mousemove', (e) => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        badge.style.transform = `
            rotateX(${-rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-12px) 
            translateZ(50px) 
            scale(1.08)
        `;
    });
    
    badge.addEventListener('mouseleave', () => {
        badge.style.transform = '';
    });
});

// =============================================
// SCROLL PARALLAX FOR BADGES
// =============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    floatingBadges.forEach((badge, index) => {
        const speed = 0.02 + (index * 0.01);
        const yPos = scrolled * speed;
        const rot = scrolled * 0.008 * (index % 2 === 0 ? 1 : -1);
        
        badge.style.setProperty('--scroll-y', `${-yPos}px`);
        badge.style.setProperty('--scroll-rot', `${rot}deg`);
    });
});

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#059669';
    btn.style.boxShadow = '0 4px 20px rgba(5, 150, 105, 0.3)';
    
    contactForm.reset();
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.boxShadow = '';
    }, 3000);
});

// =============================================
// SMOOTH SCROLL FOR NAVIGATION
// =============================================
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

// =============================================
// SCROLL ANIMATION (Intersection Observer)
// =============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .experience-card, .skill-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) rotateX(5deg)';
    el.style.transition = `all 0.7s ease ${index * 0.1}s`;
    observer.observe(el);
});

// =============================================
// 3D PARALLAX ON SCROLL
// =============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const avatar = document.querySelector('.profile-avatar');
    
    if (heroImage && avatar) {
        const speed = 0.03;
        const yPos = scrolled * speed;
        heroImage.style.transform = `translateY(${-yPos}px)`;
        
        const rotateAmount = scrolled * 0.015;
        avatar.style.transform = `rotateX(${rotateAmount}deg) rotateY(${rotateAmount * 0.5}deg)`;
    }
});

// =============================================
// CONSOLE
// =============================================
console.log('%c🚀 Hassan Butt | 3D Aesthetic Portfolio', 'font-size: 20px; font-weight: bold; color: #2563EB;');
console.log('%c✨ Features: 3D Tilt + Floating Badges + Particle Network + Glass Morphism', 'font-size: 12px; color: #94A3B8;');
console.log('📧 Email: butthaan971@gmail.com');
console.log('🐙 GitHub: https://github.com/Hassanbutt67');
console.log('💼 LinkedIn: https://www.linkedin.com/in/hassan-butt-876558234/');
console.log('📱 Phone: 0323-6852148');
console.log('🎓 COMSATS University Sahiwal - Software Engineering (2nd Year)');
console.log('💼 2+ Years Freelance Experience');
console.log('✨ Available for freelance projects!');
