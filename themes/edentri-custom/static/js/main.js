// ===== THEME TOGGLE FUNCTIONALITY =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        this.updateTheme();
        this.bindEvents();
        this.watchSystemTheme();
    }

    updateTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.updateTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.updateTheme();
            }
        });
    }
}

// ===== MOBILE NAVIGATION =====
class MobileNav {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== INSTANT SCROLLING =====
class InstantScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle anchor links with instant scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    // Use instant scroll to avoid warnings
                    window.scrollTo(0, targetPosition);
                }
            });
        });

        // Handle scroll indicator
        const scrollIndicator = document.getElementById('scroll-to-services');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = servicesSection.offsetTop - headerHeight;
                    
                    // Use instant scroll to avoid warnings
                    window.scrollTo(0, targetPosition);
                }
            });
        }
    }
}

// ===== SIMPLE ANIMATIONS =====
class SimpleAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Simple animations without any scroll detection
        this.setupBasicAnimations();
        this.setupStaticHeader();
    }

    setupBasicAnimations() {
        // Just add animate-in class to all elements after a delay
        setTimeout(() => {
            document.querySelectorAll('.service-card, .about__content, .contact__content').forEach(el => {
                el.classList.add('animate-in');
            });
        }, 500);
    }

    setupStaticHeader() {
        const header = document.querySelector('.header');
        if (header) {
            // Add scrolled class after a delay for styling, no scroll detection
            setTimeout(() => {
                header.classList.add('scrolled');
            }, 1000);
        }
    }
}

// ===== FORM HANDLING =====
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('.form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Disable submit button and show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Here you would normally send the form data to your backend
            // For demo purposes, we'll just simulate success
            await this.simulateFormSubmission(formData);
            
            // Show success message
            this.showMessage('Thank you! We\'ll be in touch soon.', 'success');
            form.reset();
        } catch (error) {
            // Show error message
            this.showMessage('Sorry, something went wrong. Please try again.', 'error');
        } finally {
            // Restore submit button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    showMessage(message, type) {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        // Add styles for notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: type === 'success' ? '#10B981' : '#EF4444',
            color: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// ===== VIDEO OPTIMIZATION =====
class VideoOptimizer {
    constructor() {
        this.videos = document.querySelectorAll('video');
        this.init();
    }

    init() {
        this.handleVideoLoad();
        this.handleVisibilityChange();
    }

    handleVideoLoad() {
        this.videos.forEach(video => {
            video.addEventListener('loadedmetadata', () => {
                // Ensure video is ready before playing
                if (video.readyState >= 3) {
                    video.play().catch(() => {
                        // Fallback if autoplay fails
                        console.log('Video autoplay failed');
                    });
                }
            });
        });
    }

    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            this.videos.forEach(video => {
                if (document.hidden) {
                    video.pause();
                } else {
                    video.play().catch(() => {
                        // Ignore autoplay failures
                    });
                }
            });
        });
    }
}

// ===== SMART BACK TO TOP BUTTON =====
class SmartBackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.isVisible = false;
        this.checkCount = 0;
        this.init();
    }

    init() {
        if (!this.button) {
            console.warn('Back to top button not found');
            return;
        }
        
        console.log('Back to top button initialized');
        this.bindEvents();
        this.startPeriodicCheck();
    }

    bindEvents() {
        // Handle click
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
    }

    startPeriodicCheck() {
        // Use periodic checks instead of scroll events
        const checkInterval = setInterval(() => {
            this.checkCount++;
            
            // Start checking after 2 seconds
            if (this.checkCount > 4) {
                this.checkScrollPosition();
            }
            
            // Stop checking after 30 seconds to save resources
            if (this.checkCount > 60) {
                clearInterval(checkInterval);
                // Keep button visible after stopping checks
                if (!this.isVisible) {
                    this.showButton();
                }
            }
        }, 500);
    }

    checkScrollPosition() {
        // Use idle callback to avoid performance issues
        if (window.requestIdleCallback) {
            window.requestIdleCallback(() => {
                this.doScrollCheck();
            });
        } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(() => {
                this.doScrollCheck();
            }, 16);
        }
    }

    doScrollCheck() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (scrollTop > 300 && !this.isVisible) {
            this.showButton();
        } else if (scrollTop <= 300 && this.isVisible) {
            this.hideButton();
        }
    }

    showButton() {
        this.button.classList.add('visible');
        this.isVisible = true;
    }

    hideButton() {
        this.button.classList.remove('visible');
        this.isVisible = false;
    }

    scrollToTop() {
        // Instant scroll to top
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }
    }
}

// ===== INITIALIZATION =====
class App {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        this.components = [
            new ThemeManager(),
            new MobileNav(),
            new InstantScroll(),
            new SimpleAnimations(),
            new FormHandler(),
            new VideoOptimizer(),
            new SmartBackToTop(),
            new PerformanceOptimizer()
        ];

        console.log('Edentri website initialized successfully');
    }
}

// Start the application
new App();

// ===== CSS ANIMATIONS (injected via JS for better performance) =====
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }

    .header.scrolled {
        background-color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    [data-theme="dark"] .header.scrolled {
        background-color: rgba(33, 37, 41, 0.98);
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);