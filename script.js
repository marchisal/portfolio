/**
 * Portfolio - Maria Chiara Salis
 * Interactive JavaScript functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const dom = {
        nav: document.getElementById('nav'),
        navToggle: document.getElementById('navToggle'),
        navLinks: document.getElementById('navLinks'),
        cursorGlow: document.getElementById('cursorGlow'),
        typingText: document.getElementById('typingText'),
        contactForm: document.getElementById('contactForm'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        projectCards: document.querySelectorAll('.project-card'),
        statNumbers: document.querySelectorAll('.stat-number'),
        navLinkItems: document.querySelectorAll('.nav-link')
    };

    // Configuration
    const config = {
        typingTexts: [
            'Full Stack Developer',
            'Co-founder @ FAM Vision',
            'Angular Specialist',
            'Spring Boot Developer',
            'Firebase Expert'
        ],
        typingSpeed: 80,
        deletingSpeed: 50,
        pauseDuration: 2000
    };

    // State
    const state = {
        currentTextIndex: 0,
        charIndex: 0,
        isDeleting: false,
        statsAnimated: false
    };

    /**
     * Initialize all functionality
     */
    function init() {
        setupNavigation();
        setupCursorGlow();
        setupTypingEffect();
        setupScrollReveal();
        setupProjectFilter();
        setupStatsCounter();
        setupSmoothScroll();
        setupContactForm();
    }

    /**
     * Navigation functionality
     */
    function setupNavigation() {
        // Scroll detection for nav background
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                dom.nav.classList.add('scrolled');
            } else {
                dom.nav.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });

        // Mobile menu toggle
        if (dom.navToggle) {
            dom.navToggle.addEventListener('click', () => {
                dom.navToggle.classList.toggle('active');
                dom.navLinks.classList.toggle('active');
                document.body.style.overflow = dom.navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu on link click
        dom.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                dom.navToggle.classList.remove('active');
                dom.navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && dom.navLinks.classList.contains('active')) {
                dom.navToggle.classList.remove('active');
                dom.navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /**
     * Cursor glow effect (desktop only)
     */
    function setupCursorGlow() {
        if (!dom.cursorGlow || window.matchMedia('(hover: none)').matches) return;

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        function animateGlow() {
            const dx = mouseX - glowX;
            const dy = mouseY - glowY;

            glowX += dx * 0.1;
            glowY += dy * 0.1;

            dom.cursorGlow.style.left = glowX + 'px';
            dom.cursorGlow.style.top = glowY + 'px';

            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    /**
     * Typing effect for hero subtitle
     */
    function setupTypingEffect() {
        if (!dom.typingText) return;

        function type() {
            const currentText = config.typingTexts[state.currentTextIndex];

            if (state.isDeleting) {
                dom.typingText.textContent = currentText.substring(0, state.charIndex - 1);
                state.charIndex--;
            } else {
                dom.typingText.textContent = currentText.substring(0, state.charIndex + 1);
                state.charIndex++;
            }

            let typeSpeed = state.isDeleting ? config.deletingSpeed : config.typingSpeed;

            if (!state.isDeleting && state.charIndex === currentText.length) {
                typeSpeed = config.pauseDuration;
                state.isDeleting = true;
            } else if (state.isDeleting && state.charIndex === 0) {
                state.isDeleting = false;
                state.currentTextIndex = (state.currentTextIndex + 1) % config.typingTexts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing effect
        setTimeout(type, 1000);
    }

    /**
     * Scroll reveal animations
     */
    function setupScrollReveal() {
        const revealElements = document.querySelectorAll('.section-header, .project-card, .skill-category, .about-card, .contact-item');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'visible');

                    // Trigger stats animation when hero stats come into view
                    if (entry.target.closest('.hero-stats')) {
                        animateStats();
                    }
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        // Also observe hero stats
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            observer.observe(heroStats);
        }
    }

    /**
     * Project filter functionality
     */
    function setupProjectFilter() {
        if (!dom.filterBtns.length) return;

        dom.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                dom.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // Filter projects
                dom.projectCards.forEach(card => {
                    const category = card.dataset.category;

                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    /**
     * Stats counter animation
     */
    function setupStatsCounter() {
        // Stats will be animated when they come into view
    }

    function animateStats() {
        if (state.statsAnimated) return;
        state.statsAnimated = true;

        dom.statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target, 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function updateCount() {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            }

            updateCount();
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = dom.nav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Contact form handling
     */
    function setupContactForm() {
        if (!dom.contactForm) return;

        dom.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = dom.contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Invio in corso...</span>';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            submitBtn.innerHTML = '<span>Messaggio Inviato!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

            // Reset form
            dom.contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    /**
     * Add CSS animation keyframes dynamically
     */
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Preload critical images
     */
    function preloadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Handle reduced motion preference
     */
    function handleReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-base', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addAnimationStyles();
            handleReducedMotion();
            init();
            preloadImages();
        });
    } else {
        addAnimationStyles();
        handleReducedMotion();
        init();
        preloadImages();
    }

    // Reinitialize on window resize (for responsive features)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reset mobile menu state on resize
            if (window.innerWidth > 768 && dom.navLinks.classList.contains('active')) {
                dom.navToggle.classList.remove('active');
                dom.navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    }, { passive: true });

})();
