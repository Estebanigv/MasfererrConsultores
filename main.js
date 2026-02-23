// ==========================================
// MASFERRER & PARTNERS — MAIN JAVASCRIPT
// Polished interactions · GSAP animations
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. LUCIDE ICONS
    // ==========================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }


    // ==========================================
    // 2. GSAP SETUP
    // ==========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initGSAPAnimations();
    } else {
        // Fallback: mark body so CSS-only reveals work
        document.body.classList.add('no-gsap');
    }

    function initGSAPAnimations() {

        // ---- Hero entrance sequence ----
        const heroContent = document.querySelector('.hero__content');

        if (heroContent) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('.hero__badge', {
                duration: 0.7,
                y: 20,
                opacity: 0,
                delay: 0.15
            })
            .from('.hero__title', {
                duration: 0.9,
                y: 40,
                opacity: 0,
                letterSpacing: '0.02em'
            }, '-=0.4')
            .from('.hero__subtitle', {
                duration: 0.8,
                y: 28,
                opacity: 0
            }, '-=0.55')
            .from('.hero__cta-group', {
                duration: 0.7,
                y: 24,
                opacity: 0
            }, '-=0.45')
            .from('.hero__metrics', {
                duration: 0.7,
                y: 20,
                opacity: 0
            }, '-=0.35')
            .from('.hero-service-card', {
                duration: 0.7,
                y: 30,
                opacity: 0,
                stagger: 0.12,
                ease: 'power2.out'
            }, '-=0.5');
        }

        // ---- Metric number count-up ----
        gsap.utils.toArray('.hero-metric__number').forEach(el => {
            const fullText = el.textContent;
            const numMatch = fullText.match(/[\d.]+/);
            if (!numMatch) return;

            const finalNum = parseFloat(numMatch[0]);
            const suffix = fullText.replace(/[\d.]+/, '');
            const prefix = '';

            // Simple count-up on ScrollTrigger
            ScrollTrigger.create({
                trigger: el,
                start: 'top 90%',
                once: true,
                onEnter: () => {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: finalNum,
                        duration: 1.6,
                        ease: 'power2.out',
                        onUpdate: () => {
                            el.textContent = Math.round(obj.val) + suffix;
                        }
                    });
                }
            });
        });

        // ---- Section headings ----
        gsap.utils.toArray('.section-title').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                duration: 0.9,
                y: 36,
                opacity: 0,
                ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.section-label').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                duration: 0.6,
                y: 16,
                opacity: 0,
                ease: 'power2.out'
            });
        });

        gsap.utils.toArray('.section-subtitle').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                y: 20,
                opacity: 0,
                ease: 'power2.out',
                delay: 0.15
            });
        });

        // ---- Benefit cards stagger ----
        const benefitCards = gsap.utils.toArray('.benefit-card');
        if (benefitCards.length) {
            gsap.from(benefitCards, {
                scrollTrigger: {
                    trigger: benefitCards[0].closest('.benefits-grid') || benefitCards[0],
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                duration: 0.75,
                y: 50,
                opacity: 0,
                stagger: 0.12,
                ease: 'power3.out'
            });

        }

        // ---- Service cards stagger ----
        const serviceCards = gsap.utils.toArray('.service-card');
        if (serviceCards.length) {
            const serviceGrid = serviceCards[0].closest('.services-grid') || serviceCards[0];
            gsap.from(serviceCards, {
                scrollTrigger: {
                    trigger: serviceGrid,
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.14,
                ease: 'power3.out'
            });

        }

        // ---- Sector cards ----
        const sectorCards = gsap.utils.toArray('.sector-card');
        if (sectorCards.length) {
            gsap.from(sectorCards, {
                scrollTrigger: {
                    trigger: sectorCards[0].closest('.sectors-grid') || sectorCards[0],
                    start: 'top 82%',
                    toggleActions: 'play none none none'
                },
                duration: 0.75,
                y: 50,
                opacity: 0,
                stagger: 0.14,
                ease: 'power3.out'
            });

        }

        // ---- CTA section ----
        const ctaTitle = document.querySelector('.cta-title');
        if (ctaTitle) {
            const ctaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaTitle,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            ctaTl
                .from('.cta-title', { duration: 0.9, y: 40, opacity: 0, ease: 'power3.out' })
                .from('.cta-subtitle', { duration: 0.8, y: 28, opacity: 0, ease: 'power3.out' }, '-=0.5')
                .from('.cta-actions', { duration: 0.7, y: 24, opacity: 0, ease: 'power3.out' }, '-=0.4')
                .from('.cta-form-card', {
                    duration: 0.9,
                    x: 50,
                    opacity: 0,
                    ease: 'power3.out'
                }, '<-0.6');
        }

        // ---- Footer brand ----
        gsap.from('.footer__brand', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });

        // ---- Generic legacy .card elements (other pages) ----
        gsap.utils.toArray('.card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 86%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                y: 48,
                opacity: 0,
                ease: 'power3.out',
                delay: (index % 4) * 0.1
            });
        });
    }


    // ==========================================
    // 3. HEADER SCROLL EFFECT
    // ==========================================
    const header = document.getElementById('header');

    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run once on load
    }


    // ==========================================
    // 4. MOBILE NAVIGATION
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');

    // Create overlay element dynamically
    let navOverlay = document.querySelector('.nav__overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav__overlay';
        document.body.appendChild(navOverlay);
    }

    function openNav() {
        nav.classList.add('active');
        navToggle.classList.add('active');
        navOverlay.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            if (nav.classList.contains('active')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close on nav link click
        nav.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close on overlay click
        navOverlay.addEventListener('click', closeNav);

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeNav();
                navToggle.focus();
            }
        });
    }


    // ==========================================
    // 5. ACTIVE NAV LINK (auto-detect page)
    // ==========================================
    (function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkPage = href.split('#')[0].split('/').pop();
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('nav__link--active');
            } else {
                link.classList.remove('nav__link--active');
            }
        });
    })();


    // ==========================================
    // 6. SMOOTH SCROLLING (anchor links)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') { e.preventDefault(); return; }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = (header ? header.offsetHeight : 80) + 16;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({ top: targetTop, behavior: 'smooth' });
            }
        });
    });


    // ==========================================
    // 7. ACCORDION (FAQ page support)
    // ==========================================
    document.querySelectorAll('.accordion__header').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = this.closest('.accordion__item');
            const content = item.querySelector('.accordion__content');
            const isActive = this.classList.contains('active');

            // Close all
            document.querySelectorAll('.accordion__header.active').forEach(activeBtn => {
                activeBtn.classList.remove('active');
                activeBtn.closest('.accordion__item')
                    .querySelector('.accordion__content')
                    .classList.remove('active');
            });

            // Open this one if it wasn't already open
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });


    // ==========================================
    // 8. HERO SLIDER (legacy support)
    // ==========================================
    const heroSlider = document.getElementById('heroSlider');

    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.slider__slide');
        const dots   = heroSlider.querySelectorAll('.slider__dot');
        let current  = 0;
        let timer;

        const showSlide = (idx) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[idx].classList.add('active');
            dots[idx].classList.add('active');
        };

        const next = () => { current = (current + 1) % slides.length; showSlide(current); };
        const start = () => { timer = setInterval(next, 8000); };
        const stop  = () => clearInterval(timer);

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { stop(); current = i; showSlide(i); start(); });
        });

        heroSlider.addEventListener('mouseenter', stop);
        heroSlider.addEventListener('mouseleave', start);
        start();
    }


    // ==========================================
    // 9. FORM VALIDATION
    // ==========================================
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Required fields
            this.querySelectorAll('[required]').forEach(field => {
                const isEmpty = !field.value.trim();
                field.classList.toggle('is-error', isEmpty);
                if (isEmpty) isValid = false;
            });

            // Email pattern
            this.querySelectorAll('input[type="email"]').forEach(field => {
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
                if (field.value && !ok) {
                    field.classList.add('is-error');
                    isValid = false;
                }
            });

            if (isValid) {
                // Success state — replace with real API call in production
                const btn = this.querySelector('[type="submit"]');
                if (btn) {
                    const original = btn.innerHTML;
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ¡Enviado!';
                    btn.style.background = 'var(--color-success)';
                    btn.disabled = true;

                    setTimeout(() => {
                        btn.innerHTML = original;
                        btn.style.background = '';
                        btn.disabled = false;
                        lucide && lucide.createIcons();
                    }, 4000);
                }
                this.reset();
                console.log('[Masferrer] Form submitted successfully');
            }
        });

        // Clear error state on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => field.classList.remove('is-error'));
            field.addEventListener('change', () => field.classList.remove('is-error'));
        });
    });


    // ==========================================
    // 10. LAZY LOADING IMAGES
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });

        document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
    }


    // ==========================================
    // 11. SCROLL REVEAL (CSS fallback for cards)
    //     — Only for pages without GSAP loaded
    // ==========================================
    if (typeof gsap === 'undefined' && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal-card').forEach(el => revealObserver.observe(el));
    }

});


// ==========================================
// DEVELOPER CONSOLE SIGNATURE
// ==========================================
console.log(
    '%c M&P %c Masferrer & Partners ',
    'background:#0e2841;color:#fff;padding:6px 10px;font-weight:700;font-size:14px;border-radius:4px 0 0 4px',
    'background:#bc1a04;color:#fff;padding:6px 10px;font-size:13px;border-radius:0 4px 4px 0'
);
