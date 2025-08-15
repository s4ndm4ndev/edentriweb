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

// ===== SMOOTH SCROLLING =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
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
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.handleHeaderScroll();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.service-card, .about__content, .contact__content').forEach(el => {
            observer.observe(el);
        });
    }

    handleHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide header on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
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

// ===== BACK TO TOP BUTTON =====
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.scrollThreshold = 100; // Show button after 100px scroll
        this.isVisible = false;
        this.ticking = false;
        this.init();
    }

    init() {
        if (!this.button) {
            console.warn('Back to top button not found');
            return;
        }
        
        console.log('Back to top button initialized');
        this.bindEvents();
        this.setupIntersectionObserver();
        // Initial check
        this.requestTick();
    }

    bindEvents() {
        // Handle click
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Handle scroll with requestAnimationFrame throttling
        window.addEventListener('scroll', () => this.requestTick(), { passive: true });
    }

    setupIntersectionObserver() {
        // Create a sentinel element at the top of the page
        const sentinel = document.createElement('div');
        sentinel.style.position = 'absolute';
        sentinel.style.top = '100px';
        sentinel.style.height = '1px';
        sentinel.style.width = '1px';
        sentinel.style.opacity = '0';
        sentinel.style.pointerEvents = 'none';
        document.body.appendChild(sentinel);

        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.hideButton();
                    } else {
                        this.showButton();
                    }
                });
            }, {
                rootMargin: '0px',
                threshold: 0
            });

            observer.observe(sentinel);
        }
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.handleScroll());
            this.ticking = true;
        }
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.scrollThreshold && !this.isVisible) {
            this.showButton();
        } else if (scrollTop <= this.scrollThreshold && this.isVisible) {
            this.hideButton();
        }
        
        this.ticking = false;
    }

    showButton() {
        if (!this.isVisible) {
            this.button.classList.add('visible');
            this.isVisible = true;
        }
    }

    hideButton() {
        if (this.isVisible) {
            this.button.classList.remove('visible');
            this.isVisible = false;
        }
    }

    scrollToTop() {
        // Use CSS scroll-behavior if supported, otherwise fallback
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Fallback smooth scroll implementation
            const scrollStep = -window.scrollY / (500 / 15);
            const scrollInterval = setInterval(() => {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        }
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
            new SmoothScroll(),
            new ScrollAnimations(),
            new FormHandler(),
            new VideoOptimizer(),
            new BackToTop(),
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