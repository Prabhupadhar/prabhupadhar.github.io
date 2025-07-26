// ClickUp-inspired Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links - Fixed implementation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link immediately
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background change on scroll
    function updateNavbarBackground() {
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(118, 18, 250, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }

    // Animated counters for statistics with ClickUp-style animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const duration = 2000; // Animation duration in ms

        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const startTime = performance.now();
            
            const animateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation (easeOutCubic)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;
                
                // Format the display based on target value
                if (target === 6) {
                    counter.textContent = Math.floor(current) + '+';
                } else if (target === 33) {
                    counter.textContent = Math.floor(current) + '+';
                } else if (target === 4.5) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animateNumber);
                } else {
                    // Final values - ensure consistency
                    if (target === 6) {
                        counter.textContent = '6+';
                    } else if (target === 33) {
                        counter.textContent = '33+';
                    } else if (target === 4.5) {
                        counter.textContent = '4.5';
                    } else {
                        counter.textContent = target.toString();
                    }
                }
            };
            
            requestAnimationFrame(animateNumber);
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Stats animation observer - ensure it only runs once
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true; // Prevent re-animation
                
                // Animate counters
                animateCounters();
                
                // Add animation class to stat items
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200); // Stagger animation
                });
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // General fade-in animation observer
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add a slight delay for better visual effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        fadeInObserver.observe(element);
    });

    // ClickUp-style button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 20px 40px rgba(118, 18, 250, 0.3)';
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.skill-card, .achievement-card, .timeline-content, .education-content, .stat-item, .certification-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Initialize hero title with correct name - no animation to avoid bugs
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Simply ensure the correct name is displayed without typing animation
        heroTitle.textContent = 'Chaitanyaprabhu Deepak Padhar';
        
        // Add a simple fade-in animation instead
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-in-out';
            heroTitle.style.opacity = '1';
        }, 500);
    }

    // Parallax effect for hero section (subtle)
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Add scroll to top functionality
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        
        // ClickUp-style button styling
        Object.assign(scrollBtn.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #7612FA, #40DDFF)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: '1000',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 20px rgba(118, 18, 250, 0.3)'
        });
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        // Hover effects
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
            this.style.boxShadow = '0 8px 30px rgba(118, 18, 250, 0.4)';
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(118, 18, 250, 0.3)';
        });
        
        // Scroll to top functionality
        scrollBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize scroll to top button
    createScrollToTop();

    // Page load animations
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(40px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }

        // Animate navigation on load
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.style.opacity = '0';
            navContainer.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                navContainer.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                navContainer.style.opacity = '1';
                navContainer.style.transform = 'translateY(0)';
            }, 100);
        }
    });

    // Enhanced timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item, .education-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        timelineObserver.observe(item);
    });

    // Certification cards special animations
    const certificationCards = document.querySelectorAll('.certification-card');
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    certificationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        certObserver.observe(card);
        
        // Add special hover effect for featured certification
        if (card.classList.contains('featured')) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(118, 18, 250, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        }
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function throttledScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavLink();
                updateNavbarBackground();
                parallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Use throttled scroll handler
    window.addEventListener('scroll', throttledScroll);
    
    // Initial calls
    updateActiveNavLink();
    updateNavbarBackground();

    // Add focus visible support for better accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
});

// Add CSS for additional animations and effects
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Ripple effect animation */
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Blinking cursor animation */
    @keyframes blink {
        0%, 50% { border-color: #7612FA; }
        51%, 100% { border-color: transparent; }
    }
    
    /* Loading state */
    body:not(.loaded) .hero-content {
        opacity: 0;
        transform: translateY(40px);
    }
    
    /* Keyboard focus styles */
    .using-keyboard *:focus {
        outline: 2px solid #7612FA !important;
        outline-offset: 2px;
    }
    
    /* Enhanced hover states for ClickUp feel */
    .btn--primary {
        position: relative;
        overflow: hidden;
    }
    
    .btn--primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .btn--primary:hover::before {
        left: 100%;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    /* Enhanced card shadows on hover */
    .skill-card:hover,
    .achievement-card:hover,
    .certification-card:hover {
        box-shadow: 0 20px 40px rgba(118, 18, 250, 0.15);
    }
    
    /* Timeline dot pulse animation */
    .timeline-dot,
    .education-dot {
        animation: pulse-dot 2s infinite;
    }
    
    @keyframes pulse-dot {
        0% { box-shadow: 0 0 0 0 rgba(118, 18, 250, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(118, 18, 250, 0); }
        100% { box-shadow: 0 0 0 0 rgba(118, 18, 250, 0); }
    }
    
    /* Mobile menu animation improvements */
    .nav-menu.active {
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Featured certification special effects */
    .certification-card.featured {
        animation: featuredGlow 3s ease-in-out infinite;
    }
    
    @keyframes featuredGlow {
        0%, 100% { box-shadow: 0 0 5px rgba(118, 18, 250, 0.3); }
        50% { box-shadow: 0 0 20px rgba(118, 18, 250, 0.4), 0 0 30px rgba(64, 221, 255, 0.2); }
    }
`;

document.head.appendChild(additionalStyles);