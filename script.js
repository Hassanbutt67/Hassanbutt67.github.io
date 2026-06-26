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
    const hero = document.querySelector('.hero-text');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease-out';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
// ===== PROJECTS DATA (For Console Display) =====
console.log("🚀 My Projects:");
console.log("🌤️ WeatherPro: https://Hassanbutt67.github.io/weather-app");
console.log("✅ Task Manager: https://Hassanbutt67.github.io/task-manager");
console.log("🚀 Portfolio: https://Hassanbutt67.github.io");});
