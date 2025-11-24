// ================================
// SMOOTH SCROLLING
// ================================
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

// ================================
// NAVBAR SCROLL EFFECT
// ================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature boxes
document.addEventListener('DOMContentLoaded', () => {
    const featureBoxes = document.querySelectorAll('.feature-box');
    const protocolSteps = document.querySelectorAll('.protocol-step');
    
    featureBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(box);
    });
    
    protocolSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(step);
    });
});

// ================================
// HERO PARTICLES EFFECT (OPTIONAL)
// ================================
const createParticles = () => {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 2;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
};

// Add particle styles dynamically
const addParticleStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .hero-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background: rgba(45, 122, 62, 0.6);
            border-radius: 50%;
            animation: float-particle infinite ease-in-out;
            opacity: 0;
        }
        
        @keyframes float-particle {
            0%, 100% {
                opacity: 0;
                transform: translateY(0) translateX(0);
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    addParticleStyles();
    createParticles();
});

// ================================
// STAT COUNTER ANIMATION
// ================================
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        
        // Only animate numbers
        if (!isNaN(target)) {
            const targetNumber = parseInt(target);
            const duration = 2000; // 2 seconds
            const increment = targetNumber / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < targetNumber) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        }
    });
};

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// ================================
// DOWNLOAD BUTTON CLICK HANDLER
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.querySelector('.btn-download');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            // If the href is still "#", prevent default and show message
            if (downloadBtn.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Please upload your APK file and update the download link in the HTML file!\n\nReplace the "#" in the download button href with your APK file path.');
            }
        });
    }
});

// ================================
// MOBILE MENU TOGGLE (FOR FUTURE USE)
// ================================
const createMobileMenu = () => {
    const nav = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add hamburger styles
    const style = document.createElement('style');
    style.textContent = `
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
        }
        
        .hamburger span {
            width: 25px;
            height: 3px;
            background: var(--text-primary);
            transition: all 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
            
            .nav-menu {
                display: flex;
                position: fixed;
                top: 70px;
                right: -100%;
                flex-direction: column;
                background: rgba(13, 17, 23, 0.98);
                backdrop-filter: blur(10px);
                width: 100%;
                padding: 30px;
                border-top: 2px solid var(--primary-red);
                transition: right 0.3s ease;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
            }
            
            .nav-menu.active {
                right: 0;
            }
            
            .nav-menu li {
                margin: 10px 0;
            }
            
            .nav-menu a {
                font-size: 1.3rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert hamburger before nav menu
    const navContainer = document.querySelector('.nav-container');
    navContainer.appendChild(hamburger);
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
};

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);

// ================================
// GLITCH EFFECT ON HOVER
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const glitchText = document.querySelector('.glitch');
    
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = 'glitch-text 0.3s';
            }, 10);
        });
    }
});

// ================================
// PARALLAX EFFECT FOR HERO
// ================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ================================
// LOADING ANIMATION
// ================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ================================
// CONSOLE MESSAGE
// ================================
console.log('%c🚨 JISHIN ALERT 🚨', 'font-size: 24px; font-weight: bold; color: #2d7a3e;');
console.log('%cEarthquake Safety Training Game', 'font-size: 16px; color: #b8d4b8;');
console.log('%cDeveloped as a Capstone Project - CSCQC', 'font-size: 12px; color: #b8d4b8;');
console.log('%c\nRemember: DROP, COVER, and HOLD ON!', 'font-size: 14px; font-weight: bold; color: #ffd700;');
// ================================
// SCROLL TO TOP BUTTON
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});