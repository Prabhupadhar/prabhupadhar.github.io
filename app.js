// Futuristic Portfolio Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initStatsCounter();
    initScrollAnimations();
    initHoverEffects();
    initLoadingAnimations();
    initScrollToTop();
    
    console.log('Portfolio initialized successfully');
});

// Navigation Functions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    updateActiveNavLink(this);
                }
            }
        });
    });

    // Active navigation highlighting on scroll
    function updateActiveNavOnScroll() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Throttled scroll handler for performance
    let scrollTicking = false;
    function handleScroll() {
        if (!scrollTicking) {
            requestAnimationFrame(function() {
                updateActiveNavOnScroll();
                updateNavbarBackground();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }

    // Update navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        }
    }

    window.addEventListener('scroll', handleScroll);
    updateActiveNavOnScroll(); // Initial call
}

// Statistics Counter Animation - Fixed
function initStatsCounter() {
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    // Reset counters to 0 initially
    counters.forEach(counter => {
        counter.textContent = '0';
    });
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                setTimeout(() => {
                    animateCounters();
                }, 300);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounters() {
        const duration = 2500; // Animation duration in ms

        counters.forEach(counter => {
            const targetValue = parseFloat(counter.getAttribute('data-target'));
            const startTime = performance.now();
            
            const animateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out cubic)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = targetValue * eased;
                
                // Format display based on target value - Fixed logic
                if (targetValue === 6) {
                    if (progress === 1) {
                        counter.textContent = '6+';
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                } else if (targetValue === 18) {
                    counter.textContent = Math.floor(current);
                } else if (targetValue === 33) {
                    if (progress === 1) {
                        counter.textContent = '33+';
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                } else if (targetValue === 4.5) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animateNumber);
                }
            };
            
            requestAnimationFrame(animateNumber);
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animation observer for cards and sections
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation delay
                const delay = index * 100;
                
                setTimeout(() => {
                    if (element.classList.contains('timeline-item')) {
                        element.classList.add('animate-fade-in-left');
                    } else {
                        element.classList.add('animate-fade-in-up');
                    }
                    
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) translateX(0)';
                }, delay);
                
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.card-futuristic, .stat-card, .timeline-item, .section-title'
    );

    animateElements.forEach(element => {
        // Set initial hidden state
        element.style.opacity = '0';
        if (element.classList.contains('timeline-item')) {
            element.style.transform = 'translateX(-30px)';
        } else {
            element.style.transform = 'translateY(30px)';
        }
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        animationObserver.observe(element);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 16));
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Card hover effects with holographic glow
    const cards = document.querySelectorAll('.card-futuristic, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add holographic glow based on card color
            const colorType = this.getAttribute('data-color');
            switch(colorType) {
                case 'success':
                    this.style.boxShadow = '0 20px 40px rgba(64, 221, 255, 0.4)';
                    break;
                case 'warning':
                    this.style.boxShadow = '0 20px 40px rgba(250, 18, 227, 0.4)';
                    break;
                case 'info':
                    this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.4)';
                    break;
                default:
                    this.style.boxShadow = '0 20px 40px rgba(118, 18, 250, 0.4)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Button hover effects with ripple
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(118, 18, 250, 0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        // Ripple effect on click
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.color = '#7612FA';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = 'rgba(255, 255, 255, 0.7)';
        });
    });
}

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Loading Animations
function initLoadingAnimations() {
    // Hero entrance animation
    const heroContent = document.querySelector('.hero .container');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Staggered animation for hero elements
    const heroElements = [
        '.hero__name',
        '.badge',
        '.hero__summary',
        '.hero__contacts'
    ];

    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 700 + (index * 200));
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    // Styles for scroll to top button
    Object.assign(scrollButton.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #7612FA 0%, #9945FF 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        opacity: '0',
        visibility: 'hidden',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(118, 18, 250, 0.3)'
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    function toggleScrollButton() {
        if (window.pageYOffset > 600) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', throttle(toggleScrollButton, 100));
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 8px 30px rgba(118, 18, 250, 0.5)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(118, 18, 250, 0.3)';
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to remove focus
    if (e.key === 'Escape') {
        if (document.activeElement && document.activeElement.blur) {
            document.activeElement.blur();
        }
    }
    
    // Ctrl + Arrow keys for section navigation
    if (e.ctrlKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const targetSection = e.key === 'ArrowDown' ? 
            getNextSection(currentSection) : 
            getPrevSection(currentSection);
            
        if (targetSection) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            window.scrollTo({
                top: targetSection.offsetTop - navbarHeight - 20,
                behavior: 'smooth'
            });
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('main section[id]');
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
            return section;
        }
    }
    return sections[0]; // Return first section as fallback
}

function getNextSection(currentSection) {
    return currentSection ? currentSection.nextElementSibling : null;
}

function getPrevSection(currentSection) {
    return currentSection ? currentSection.previousElementSibling : null;
}

// Performance optimization for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reduceMotionStyle = document.createElement('style');
    reduceMotionStyle.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(reduceMotionStyle);
}

// Intersection Observer fallback for older browsers
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported, using fallback...');
    
    // Simple fallback - show all elements after a delay
    setTimeout(() => {
        document.querySelectorAll('.card-futuristic, .stat-card, .timeline-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) translateX(0)';
        });
        
        // Trigger counter animation fallback
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            if (target === 6) counter.textContent = '6+';
            else if (target === 18) counter.textContent = '18';
            else if (target === 33) counter.textContent = '33+';
            else if (target === 4.5) counter.textContent = '4.5';
            else counter.textContent = target;
        });
    }, 1000);
}

// Add smooth scrolling polyfill for Safari
if (!CSS.supports('scroll-behavior', 'smooth')) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

console.log('Futuristic Portfolio JavaScript loaded successfully!');