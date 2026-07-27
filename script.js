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
// AI INSIGHTS
// =============================================

const aiPrompt = document.getElementById('aiPrompt');
const aiGenerateBtn = document.getElementById('aiGenerateBtn');
const aiResponse = document.getElementById('aiResponse');
const aiLoading = document.getElementById('aiLoading');
const aiResult = document.getElementById('aiResult');
const setApiKeyBtn = document.getElementById('setApiKeyBtn');

// Portfolio context data
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
        "WeatherPro - Real-time weather app",
        "Task Manager App - Full-featured task management",
        "Portfolio Website - Personal portfolio"
    ],
    education: "B.S. Software Engineering (2nd Year)",
    location: "Sahiwal, Pakistan"
};

// Set API Key
setApiKeyBtn.addEventListener('click', () => {
    const apiKey = prompt('Enter your OpenAI API key (starts with sk-proj-):');
    if (apiKey && apiKey.startsWith('sk-proj-')) {
        localStorage.setItem('openai_api_key', apiKey);
        alert('✅ API key saved successfully!');
    } else if (apiKey) {
        alert('❌ Invalid API key. Please make sure it starts with "sk-proj-"');
    }
});

// Generate AI insights
async function generateAIInsights(prompt) {
    const apiKey = localStorage.getItem('openai_api_key');
    
    // If no API key, use fallback
    if (!apiKey) {
        aiResponse.style.display = 'block';
        aiLoading.style.display = 'none';
        aiResult.style.display = 'block';
        aiResult.innerHTML = formatAIResponse(generateFallbackInsights(prompt));
        aiResult.innerHTML += `
            <br><br>
            <div style="font-size: 0.8rem; color: var(--text-light); padding: 0.5rem; background: var(--bg-secondary); border-radius: 8px; margin-top: 0.5rem;">
                💡 <button onclick="document.getElementById('setApiKeyBtn').click()" style="background: none; border: none; color: var(--primary); cursor: pointer; font-weight: 600; text-decoration: underline;">
                    Click here</button> to add your OpenAI API key for enhanced AI insights.
            </div>
        `;
        return;
    }

    // Show loading
    aiResponse.style.display = 'block';
    aiLoading.style.display = 'flex';
    aiResult.style.display = 'none';

    const systemPrompt = `You are a career advisor AI assistant for Hassan Butt's portfolio. 
    ${portfolioData.name} is a ${portfolioData.title} at ${portfolioData.university}.
    Skills: ${portfolioData.skills.join(', ')}
    Experience: ${portfolioData.experience.join('. ')}
    Projects: ${portfolioData.projects.join('. ')}
    Location: ${portfolioData.location}
    Education: ${portfolioData.education}
    
    Provide helpful, professional, and encouraging career advice based on this portfolio.
    Keep responses concise (under 150 words) and actionable.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 300
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const result = data.choices[0].message.content;

        // Show result
        aiLoading.style.display = 'none';
        aiResult.style.display = 'block';
        aiResult.innerHTML = formatAIResponse(result);

    } catch (error) {
        aiLoading.style.display = 'none';
        aiResult.style.display = 'block';
        aiResult.innerHTML = `
            <div style="color: #EF4444; padding: 1rem; border: 1px solid #EF4444; border-radius: 8px;">
                <strong>❌ Error:</strong> ${error.message}
                <br><br>
                <small>Make sure your OpenAI API key is valid and has credits.</small>
                <br><br>
                <button onclick="document.getElementById('setApiKeyBtn').click()" style="background: var(--primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">
                    Update API Key
                </button>
            </div>
        `;
    }
}

// Format AI response with markdown-like styling
function formatAIResponse(text) {
    // Convert bold text
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet points
    text = text.replace(/^- (.*?)$/gm, '<li>$1</li>');
    text = text.replace(/^• (.*?)$/gm, '<li>$1</li>');
    
    if (text.includes('<li>')) {
        text = '<ul>' + text + '</ul>';
    }
    
    // Convert line breaks
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// Generate insights on button click
aiGenerateBtn.addEventListener('click', () => {
    const prompt = aiPrompt.value.trim();
    if (!prompt) {
        alert('Please ask a question about the portfolio.');
        return;
    }
    generateAIInsights(prompt);
});

// Auto-generate on Enter key (Ctrl+Enter)
aiPrompt.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        aiGenerateBtn.click();
    }
});

// Suggestion chips
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        aiPrompt.value = chip.dataset.question;
        aiGenerateBtn.click();
    });
});

// =============================================
// FALLBACK AI - IF NO API KEY
// =============================================

function generateFallbackInsights(prompt) {
    const responses = {
        'skills': `Based on Hassan's portfolio, his top skills are:
        
• JavaScript - Proficient in modern JS and frameworks
• React.js - Building interactive user interfaces
• Node.js - Backend development experience
• Python - Versatile programming language
• HTML5 & CSS3 - Clean, responsive designs

He also has experience with Git/GitHub, SQL, and C++.`,

        'projects': `Hassan has built several impressive projects:

1. 🌤️ WeatherPro - Real-time weather app with API integration
2. ✅ Task Manager App - Full CRUD operations with priority levels
3. 🚀 Portfolio Website - Personal brand and work showcase

All projects demonstrate his ability to build functional, user-friendly applications.`,

        'career': `Career advice for Hassan Butt:

• Leverage your freelance experience to build a strong client portfolio
• Consider specializing in full-stack development
• Contribute to open-source projects to expand your network
• Build a personal brand through technical blogging
• Your COMSATS University background is valuable - network with alumni`,

        'hire': `Why hire Hassan?

✅ 2+ years of freelance experience with 100% client satisfaction
✅ Strong technical skills across multiple technologies
✅ Self-motivated and able to work independently
✅ Built 5+ successful projects for clients
✅ Currently studying Software Engineering at COMSATS University
✅ Available for freelance projects and collaborations`
    };

    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('skill') || lowerPrompt.includes('technolog') || lowerPrompt.includes('know')) {
        return responses.skills;
    } else if (lowerPrompt.includes('project') || lowerPrompt.includes('build') || lowerPrompt.includes('create')) {
        return responses.projects;
    } else if (lowerPrompt.includes('career') || lowerPrompt.includes('advice') || lowerPrompt.includes('recommend')) {
        return responses.career;
    } else if (lowerPrompt.includes('hire') || lowerPrompt.includes('freelance') || lowerPrompt.includes('why')) {
        return responses.hire;
    } else {
        return `Based on Hassan's portfolio:

• Hassan is a Software Engineering student at COMSATS University Sahiwal
• Has 2+ years of freelance experience
• Specializes in web development with React, Node.js, and JavaScript
• Built 5+ successful projects
• Available for freelance work

Ask me about his skills, projects, career advice, or why you should hire him!`;
    }
}

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
console.log('%c✨ Features: 3D Tilt + Floating Badges + Particle Network + Glass Morphism + AI Insights', 'font-size: 12px; color: #94A3B8;');
console.log('📧 Email: butthaan971@gmail.com');
console.log('🐙 GitHub: https://github.com/Hassanbutt67');
console.log('💼 LinkedIn: https://www.linkedin.com/in/hassan-butt-876558234/');
console.log('📱 Phone: 0323-6852148');
console.log('🎓 COMSATS University Sahiwal - Software Engineering (2nd Year)');
console.log('💼 2+ Years Freelance Experience');
console.log('✨ Available for freelance projects!');
console.log('🤖 AI Insights: Ask about skills, projects, or career advice!');
