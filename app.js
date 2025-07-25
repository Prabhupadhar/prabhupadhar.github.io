// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Progress bar animations
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate progress bars when hero section is visible
                if (entry.target.classList.contains('hero')) {
                    setTimeout(animateProgressBars, 500);
                }
                
                // Animate statistics counters
                if (entry.target.classList.contains('statistics')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = counter.textContent;
            
            // Handle different number formats
            if (target.includes('$')) {
                // Handle money format like $4.5M
                const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = '$' + current.toFixed(1) + 'M';
                    }
                }, 40);
            } else if (target.includes('+')) {
                // Handle numbers with + like 6+, 33+
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
                let current = 0;
                const increment = Math.max(1, numericValue / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 40);
            } else {
                // Handle regular numbers like 18
                const numericValue = parseInt(target);
                let current = 0;
                const increment = Math.max(1, numericValue / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 40);
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle?.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show success message (simulate form submission)
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });

    // Download CV button functionality
    const downloadBtn = document.querySelector('.btn--primary');
    downloadBtn?.addEventListener('click', function(e) {
        if (this.textContent.includes('Download CV')) {
            e.preventDefault();
            showNotification('CV download will be available soon!', 'info');
        }
    });

    // Contact Me button functionality
    const contactBtn = document.querySelector('.btn--secondary');
    contactBtn?.addEventListener('click', function(e) {
        if (this.textContent.includes('Contact Me')) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Education card interactions
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });

    // Certification item hover effects
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social links functionality
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-linkedin')) {
                // Allow default behavior for LinkedIn (will open in new tab)
                showNotification('Opening LinkedIn profile...', 'info');
            } else if (icon.classList.contains('fa-envelope')) {
                // Allow default behavior for email (mailto link)
                showNotification('Opening email client...', 'info');
            } else if (icon.classList.contains('fa-phone')) {
                // Allow default behavior for phone (tel link)
                showNotification('Initiating phone call...', 'info');
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getIconForType(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${getColorForType(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }

    function getIconForType(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }

    function getColorForType(type) {
        switch(type) {
            case 'success': return 'linear-gradient(45deg, #22c55e, #16a34a)';
            case 'error': return 'linear-gradient(45deg, #ef4444, #dc2626)';
            case 'warning': return 'linear-gradient(45deg, #f59e0b, #d97706)';
            default: return 'linear-gradient(45deg, var(--color-teal-500), var(--color-teal-600))';
        }
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add scroll reveal animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.service-card, .education-card, .timeline-item, .cert-item');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .education-card, .timeline-item, .cert-item {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.6s ease;
        }
        
        .service-card.revealed, .education-card.revealed, .timeline-item.revealed, .cert-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar.scrolled {
            background: rgba(10, 10, 10, 0.98);
            box-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(10, 10, 10, 0.98);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for visible elements
    revealOnScroll();

    // Smooth page load animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Add CSS for active nav
    const navStyle = document.createElement('style');
    navStyle.textContent = `
        .nav-menu a.active {
            color: var(--color-teal-300) !important;
        }
        
        .nav-menu a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(navStyle);

    // Timeline item hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        item.addEventListener('mouseenter', function() {
            content.style.transform = 'scale(1.02)';
            content.style.borderColor = 'var(--color-teal-300)';
        });
        
        item.addEventListener('mouseleave', function() {
            content.style.transform = 'scale(1)';
            content.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // About section text animation
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.2 });
        
        aboutText.style.transform = 'translateY(30px)';
        aboutText.style.opacity = '0';
        aboutText.style.transition = 'all 0.8s ease';
        aboutObserver.observe(aboutText);
    }

    // Statistics section enhancement
    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statItems = entry.target.querySelectorAll('.stat-item');
                    statItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = 'translateY(0) scale(1)';
                            item.style.opacity = '1';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        const statItems = statsSection.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.style.transform = 'translateY(30px) scale(0.9)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.6s ease';
        });
        
        statsObserver.observe(statsSection);
    }
});

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Portfolio loaded successfully!');
    });
} else {
    console.log('Portfolio loaded successfully!');
}