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

if (projectsGrid) {
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
}

// =============================================
// PARTICLE NETWORK BACKGROUND
// =============================================
const canvas = document.getElementById('particleCanvas');
if (canvas) {
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
}

// =============================================
// THEME TOGGLE
// =============================================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
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
    });
}

// =============================================
// 3D TILT EFFECT
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
        heroCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${Math.max(0, translateZ)}px)`;
        requestAnimationFrame(animateHeroTilt);
    }
    animateHeroTilt();
}

// =============================================
// 3D TILT FOR ELEMENTS
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
        element.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// =============================================
// AI INSIGHTS - SMART FALLBACK (No API Key Needed)
// =============================================

const aiPrompt = document.getElementById('aiPrompt');
const aiGenerateBtn = document.getElementById('aiGenerateBtn');
const aiResponse = document.getElementById('aiResponse');
const aiLoading = document.getElementById('aiLoading');
const aiResult = document.getElementById('aiResult');

// Portfolio data for AI responses
const portfolioData = {
    name: "Hassan Butt",
    title: "Software Engineering Student & Freelance Developer",
    university: "COMSATS University Sahiwal",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Python", "Git/GitHub", "SQL", "C++"],
    experience: [
        "Freelance Web Developer (2023 - Present)",
        "Full-Stack Developer (2023 - Present)"
    ],
    projects: [
        "WeatherPro - Real-time weather app with API integration",
        "Task Manager App - Full-featured task management",
        "Portfolio Website - Personal portfolio"
    ],
    education: "B.S. Software Engineering (2nd Year)",
    location: "Sahiwal, Pakistan"
};

if (aiGenerateBtn && aiPrompt) {
    // Generate AI insights - Smart Fallback Mode
    function generateAIInsights(prompt) {
        // Show loading
        aiResponse.style.display = 'block';
        aiLoading.style.display = 'flex';
        aiResult.style.display = 'none';

        // Simulate AI processing (600ms delay for realistic feel)
        setTimeout(() => {
            const response = generateSmartResponse(prompt);
            aiLoading.style.display = 'none';
            aiResult.style.display = 'block';
            aiResult.innerHTML = response;
        }, 600);
    }

    // Generate smart responses based on user input
    function generateSmartResponse(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        
        // === SKILLS ===
        if (lowerPrompt.includes('skill') || lowerPrompt.includes('technolog') || lowerPrompt.includes('know') || lowerPrompt.includes('tech stack') || lowerPrompt.includes('expertise')) {
            return `<h3>💻 Hassan's Tech Stack</h3>
            <ul>
                <li><strong>JavaScript</strong> - Proficient in modern JS and frameworks</li>
                <li><strong>React.js</strong> - Building interactive user interfaces</li>
                <li><strong>Node.js</strong> - Backend development experience</li>
                <li><strong>Python</strong> - Versatile programming language</li>
                <li><strong>HTML5 & CSS3</strong> - Clean, responsive designs</li>
                <li><strong>Git/GitHub</strong> - Version control and collaboration</li>
                <li><strong>SQL</strong> - Database management</li>
                <li><strong>C++</strong> - Data structures and algorithms</li>
            </ul>
            <p>Hassan is a well-rounded developer with both frontend and backend experience. He has <strong>2+ years</strong> of practical experience using these technologies.</p>`;
        }
        
        // === PROJECTS ===
        else if (lowerPrompt.includes('project') || lowerPrompt.includes('build') || lowerPrompt.includes('create') || lowerPrompt.includes('work') || lowerPrompt.includes('portfolio')) {
            return `<h3>🚀 Hassan's Projects</h3>
            <ul>
                <li><strong>🌤️ WeatherPro</strong> - Real-time weather app with 5-day forecast, location detection, and dark/light mode using OpenWeatherMap API. <a href="https://Hassanbutt67.github.io/weather-app" target="_blank" style="color: var(--primary);">Live Demo →</a></li>
                <li><strong>✅ Task Manager App</strong> - Full-featured task management with CRUD operations, local storage persistence, priority levels, and real-time statistics. <a href="https://hassanbutt67.github.io/Task-Manager-App/" target="_blank" style="color: var(--primary);">Live Demo →</a></li>
                <li><strong>🚀 Portfolio Website</strong> - Personal portfolio built with HTML, CSS, and JavaScript. Features 3D effects, dark mode, and AI insights. <a href="https://Hassanbutt67.github.io" target="_blank" style="color: var(--primary);">Live Demo →</a></li>
            </ul>
            <p>All projects demonstrate Hassan's ability to build functional, user-friendly applications with clean code.</p>`;
        }
        
        // === CAREER ADVICE ===
        else if (lowerPrompt.includes('career') || lowerPrompt.includes('advice') || lowerPrompt.includes('recommend') || lowerPrompt.includes('future') || lowerPrompt.includes('goal')) {
            return `<h3>💡 Career Advice for Hassan</h3>
            <ul>
                <li>🔹 <strong>Leverage Freelance Experience</strong> - Build a strong client portfolio with testimonials</li>
                <li>🔹 <strong>Specialize in Full-Stack</strong> - React + Node.js is in high demand in the market</li>
                <li>🔹 <strong>Open Source Contribution</strong> - Expand your network and visibility</li>
                <li>🔹 <strong>Technical Blogging</strong> - Build a personal brand through content creation</li>
                <li>🔹 <strong>Networking</strong> - Your COMSATS University background is valuable - connect with alumni</li>
                <li>🔹 <strong>Build a Portfolio</strong> - Showcase your best work to attract clients</li>
            </ul>
            <p>With Hassan's skills and experience, he is well-positioned for a successful career in software development. <strong>2+ years</strong> of freelance experience with <strong>100% client satisfaction</strong> is a strong foundation.</p>`;
        }
        
        // === WHY HIRE ===
        else if (lowerPrompt.includes('hire') || lowerPrompt.includes('freelance') || lowerPrompt.includes('why') || lowerPrompt.includes('work with') || lowerPrompt.includes('collaborate')) {
            return `<h3>✅ Why Hire Hassan?</h3>
            <ul>
                <li>✅ <strong>2+ years</strong> of freelance experience with <strong>100% client satisfaction</strong></li>
                <li>✅ Strong technical skills across multiple technologies</li>
                <li>✅ Self-motivated and able to work independently</li>
                <li>✅ Built <strong>5+ successful projects</strong> for clients</li>
                <li>✅ Currently studying <strong>Software Engineering</strong> at COMSATS University</li>
                <li>✅ Available for freelance projects and collaborations</li>
                <li>✅ Clean, maintainable code with attention to detail</li>
            </ul>
            <p>Hassan is a reliable, skilled developer who delivers quality work on time. He communicates clearly and understands client requirements well.</p>`;
        }
        
        // === AI ===
        else if (lowerPrompt.includes('ai') || lowerPrompt.includes('artificial intelligence') || lowerPrompt.includes('machine learning')) {
            return `<h3>🤖 About AI in This Portfolio</h3>
            <p>This portfolio features an AI-powered career insights system that provides personalized advice based on Hassan's skills, experience, and projects.</p>
            <ul>
                <li><strong>Technology:</strong> OpenAI GPT-3.5-turbo (or smart fallback mode)</li>
                <li><strong>Purpose:</strong> Demonstrate AI integration skills</li>
                <li><strong>Features:</strong> Smart responses about skills, projects, career advice, and freelance work</li>
            </ul>
            <p>💡 <strong>Try asking:</strong><br>
            - "What are Hassan's top skills?"<br>
            - "What kind of projects has Hassan built?"<br>
            - "What career advice for a software engineer?"<br>
            - "Why hire Hassan as a freelancer?"</p>`;
        }
        
        // === COMSATS / UNIVERSITY ===
        else if (lowerPrompt.includes('comsats') || lowerPrompt.includes('university') || lowerPrompt.includes('education') || lowerPrompt.includes('study')) {
            return `<h3>🎓 Education</h3>
            <p><strong>Hassan Butt</strong> is currently pursuing a <strong>Bachelor of Science in Software Engineering</strong> at <strong>COMSATS University Sahiwal Campus</strong>.</p>
            <ul>
                <li>📚 <strong>Program:</strong> B.S. Software Engineering</li>
                <li>📅 <strong>Year:</strong> 2nd Year</li>
                <li>🏫 <strong>University:</strong> COMSATS University Sahiwal</li>
                <li>🎯 <strong>Focus:</strong> Building software that solves real problems</li>
            </ul>
            <p>Being a student at COMSATS University gives Hassan a strong foundation in software engineering principles, algorithms, and modern development practices.</p>`;
        }
        
        // === WEATHER APP ===
        else if (lowerPrompt.includes('weather') || lowerPrompt.includes('weatherpro')) {
            return `<h3>🌤️ WeatherPro - Project Details</h3>
            <p><strong>WeatherPro</strong> is a real-time weather application with the following features:</p>
            <ul>
                <li>🌡️ <strong>Real-time Weather</strong> - Current temperature, conditions, and more</li>
                <li>📅 <strong>5-Day Forecast</strong> - Detailed forecast for the next 5 days</li>
                <li>📍 <strong>Location Detection</strong> - Auto-detects user's location</li>
                <li>🌙 <strong>Dark/Light Mode</strong> - Theme toggle for user comfort</li>
                <li>🔗 <strong>API Integration</strong> - Uses OpenWeatherMap API</li>
            </ul>
            <p><strong>Live Demo:</strong> <a href="https://Hassanbutt67.github.io/weather-app" target="_blank" style="color: var(--primary);">https://Hassanbutt67.github.io/weather-app</a><br>
            <strong>GitHub:</strong> <a href="https://github.com/Hassanbutt67/weather-app" target="_blank" style="color: var(--primary);">https://github.com/Hassanbutt67/weather-app</a></p>`;
        }
        
        // === DEFAULT RESPONSE ===
        else {
            return `<h3>📋 About Hassan</h3>
            <p><strong>Hassan Butt</strong> is a <strong>Software Engineering student</strong> at <strong>COMSATS University Sahiwal</strong> with <strong>2+ years</strong> of freelance experience.</p>
            <ul>
                <li>🎓 <strong>Education:</strong> B.S. Software Engineering (2nd Year)</li>
                <li>💼 <strong>Experience:</strong> 2+ years of freelance experience</li>
                <li>💻 <strong>Skills:</strong> React, Node.js, JavaScript, Python, and C++</li>
                <li>🚀 <strong>Projects:</strong> Built 5+ successful projects</li>
                <li>⭐ <strong>Client Satisfaction:</strong> 100%</li>
            </ul>
            <p>💡 <strong>Try asking:</strong><br>
            - "What are Hassan's top skills?"<br>
            - "What kind of projects has Hassan built?"<br>
            - "What career advice for a software engineer?"<br>
            - "Why hire Hassan as a freelancer?"</p>`;
        }
    }

    // Event listeners
    aiGenerateBtn.addEventListener('click', () => {
        const prompt = aiPrompt.value.trim();
        if (!prompt) {
            alert('Please ask a question about the portfolio.');
            return;
        }
        generateAIInsights(prompt);
    });

    aiPrompt.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            aiGenerateBtn.click();
        }
    });

    // Chip buttons
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            aiPrompt.value = chip.dataset.question;
            generateAIInsights(chip.dataset.question);
        });
    });
}

// =============================================
// CONTACT FORM
// =============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
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
}

// =============================================
// SMOOTH SCROLL
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =============================================
// SCROLL ANIMATION
// =============================================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
        heroImage.style.transform = `translateY(${-scrolled * speed}px)`;
        const rotateAmount = scrolled * 0.015;
        avatar.style.transform = `rotateX(${rotateAmount}deg) rotateY(${rotateAmount * 0.5}deg)`;
    }
});

// =============================================
// CONSOLE
// =============================================
console.log('%c🚀 Hassan Butt | 3D Aesthetic Portfolio', 'font-size: 20px; font-weight: bold; color: #2563EB;');
console.log('%c✨ AI Insights - Smart Fallback Mode (No API Key Required)', 'font-size: 12px; color: #94A3B8;');
console.log('%c✨ Features: 3D Tilt + Floating Badges + Particle Network + Glass Morphism + AI Insights', 'font-size: 12px; color: #94A3B8;');
console.log('📧 Email: butthaan971@gmail.com');
console.log('🐙 GitHub: https://github.com/Hassanbutt67');
console.log('💼 LinkedIn: https://www.linkedin.com/in/hassan-butt-876558234/');
console.log('📱 Phone: 0323-6852148');
console.log('🎓 COMSATS University Sahiwal - Software Engineering (2nd Year)');
console.log('✨ Available for freelance projects!');
