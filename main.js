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

        // Safety net: ensure animated elements become visible
        setTimeout(() => {
            document.querySelectorAll('.benefit-card, .service-card, .sector-card, .hero-service-card, .cta-form-card, .footer__brand').forEach(el => {
                const style = window.getComputedStyle(el);
                if (parseFloat(style.opacity) < 0.1) {
                    gsap.set(el, { opacity: 1, y: 0, x: 0, clearProps: 'all' });
                }
            });
            ScrollTrigger.refresh();
        }, 1200);
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
            const benefitGrid = benefitCards[0].closest('.benefits-grid') || benefitCards[0];
            // Check if section is already in view (e.g. page loaded scrolled)
            const rect = benefitGrid.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                // Already visible — just ensure cards are shown
                gsap.set(benefitCards, { opacity: 1, y: 0 });
            } else {
                gsap.from(benefitCards, {
                    scrollTrigger: {
                        trigger: benefitGrid,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    duration: 0.75,
                    y: 50,
                    opacity: 0,
                    stagger: 0.12,
                    ease: 'power3.out'
                });
            }
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

        // Force ScrollTrigger to recalculate positions
        ScrollTrigger.refresh();
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
    // 4. MOBILE NAVIGATION — Full-screen overlay
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');

    // Declared at this scope so the dropdown IIFE (section 5) can call closeNav
    function openNav() {
        if (!nav || !navToggle) return;
        nav.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        if (!nav || !navToggle) return;
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';

        // Also close any open dropdown
        const openDropdown = nav.querySelector('.nav__dropdown.is-open');
        if (openDropdown) {
            openDropdown.classList.remove('is-open');
            const trigger = openDropdown.querySelector('.nav__link');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
    }

    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            if (nav.classList.contains('active')) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close on nav link click (exclude dropdown trigger — handled by dropdown logic)
        nav.querySelectorAll('.nav__link:not(.nav__dropdown > .nav__link), .nav__cta').forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close on ESC key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeNav();
                navToggle.focus();
            }
        });
    }


    // ==========================================
    // 5. SERVICIOS DROPDOWN
    // ==========================================
    (function initServiciosDropdown() {
        const dropdown = document.querySelector('.nav__dropdown');
        if (!dropdown) return;

        const menu    = dropdown.querySelector('.nav__dropdown-menu');
        const trigger = dropdown.querySelector('.nav__link');
        if (!menu || !trigger) return;

        let openTimer  = null;
        let closeTimer = null;
        const DELAY    = 150; // ms

        // Detect mobile breakpoint
        const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

        // ---- Desktop: hover behaviour ----
        function openDropdown() {
            clearTimeout(closeTimer);
            openTimer = setTimeout(() => {
                dropdown.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
            }, DELAY);
        }

        function closeDropdown() {
            clearTimeout(openTimer);
            closeTimer = setTimeout(() => {
                dropdown.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }, DELAY);
        }

        dropdown.addEventListener('mouseenter', () => {
            if (!isMobile()) openDropdown();
        });

        dropdown.addEventListener('mouseleave', () => {
            if (!isMobile()) closeDropdown();
        });

        // Keep open when moving cursor into the menu itself
        menu.addEventListener('mouseenter', () => {
            if (!isMobile()) clearTimeout(closeTimer);
        });

        menu.addEventListener('mouseleave', () => {
            if (!isMobile()) closeDropdown();
        });

        // ---- Mobile: click-toggle behaviour ----
        trigger.addEventListener('click', function (e) {
            if (!isMobile()) {
                // On desktop the link still navigates — allow default
                return;
            }
            // On mobile: prevent navigation, toggle submenu instead
            e.preventDefault();
            e.stopPropagation();

            const isOpen = dropdown.classList.contains('is-open');
            dropdown.classList.toggle('is-open', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));
        });

        // Close dropdown when a sub-item link is clicked on mobile
        menu.querySelectorAll('.nav__dropdown-item, .nav__dropdown-all').forEach(link => {
            link.addEventListener('click', () => {
                dropdown.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                // Also close the whole drawer
                if (typeof closeNav === 'function') closeNav();
            });
        });

        // Close on ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    })();


    // ==========================================
    // 6. ACTIVE NAV LINK (auto-detect page)
    // ==========================================
    (function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');

        // Service sub-pages that should mark "Servicios" as active
        const serviciosPages = [
            'servicios.html',
            'servicio-contable.html',
            'servicio-financiero.html',
            'servicio-tributario.html',
            'servicio-laboral.html'
        ];

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkPage = href.split('#')[0].split('/').pop();

            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('nav__link--active');
            } else if (linkPage === 'servicios.html' && serviciosPages.includes(currentPage)) {
                // Mark parent Servicios link active on all service sub-pages
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
    // 7. FORM VALIDATION
    // ==========================================

    // Honeypot: silently reject submissions where the hidden field is filled
    // (bots fill all fields; humans never see or touch this field)
    function isHoneypotTripped(form) {
        const pot = form.querySelector('[name="_hp_website"]');
        return pot && pot.value.length > 0;
    }

    // Chilean phone: accepts +56 9 XXXX XXXX, 9XXXXXXXX, 56XXXXXXXXX, etc.
    const PHONE_RE = /^(\+?56\s?)?(\s*9\s*)?\d[\d\s\-]{6,14}$/;

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Honeypot check — fail silently to not reveal detection to bots
            if (isHoneypotTripped(this)) {
                return;
            }

            let isValid = true;

            // Required fields
            this.querySelectorAll('[required]').forEach(field => {
                const isEmpty = !field.value.trim();
                field.classList.toggle('is-error', isEmpty);
                if (isEmpty) isValid = false;
            });

            // Email format
            this.querySelectorAll('input[type="email"]').forEach(field => {
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
                if (field.value.trim() && !ok) {
                    field.classList.add('is-error');
                    isValid = false;
                }
            });

            // Phone format (optional, but validate format if provided)
            this.querySelectorAll('input[type="tel"]').forEach(field => {
                const val = field.value.trim();
                if (val && !PHONE_RE.test(val)) {
                    field.classList.add('is-error');
                    isValid = false;
                }
            });

            if (isValid) {
                // Success state — replace with real API call in production.
                // NOTE: btn.innerHTML is set only to a hardcoded SVG string
                // and then restored to a saved reference — never to user input.
                const btn = this.querySelector('[type="submit"]');
                if (btn) {
                    // Save the original text content (not innerHTML) to avoid
                    // any risk of re-inserting unexpected markup on restore.
                    const originalText = btn.textContent;
                    const originalHTML = btn.innerHTML;

                    // Build success state with safe DOM methods only
                    btn.textContent = '';
                    const checkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    checkSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                    checkSvg.setAttribute('width', '18');
                    checkSvg.setAttribute('height', '18');
                    checkSvg.setAttribute('viewBox', '0 0 24 24');
                    checkSvg.setAttribute('fill', 'none');
                    checkSvg.setAttribute('stroke', 'currentColor');
                    checkSvg.setAttribute('stroke-width', '2');
                    checkSvg.setAttribute('stroke-linecap', 'round');
                    checkSvg.setAttribute('stroke-linejoin', 'round');
                    checkSvg.setAttribute('aria-hidden', 'true');
                    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                    poly.setAttribute('points', '20 6 9 17 4 12');
                    checkSvg.appendChild(poly);
                    btn.appendChild(checkSvg);
                    btn.appendChild(document.createTextNode(' \u00a1Enviado!'));
                    btn.style.background = 'var(--color-success)';
                    btn.disabled = true;

                    setTimeout(() => {
                        // Restore original button content from the saved HTML
                        // (this was captured from the static template, not from user input)
                        btn.innerHTML = originalHTML;
                        btn.style.background = '';
                        btn.disabled = false;
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 4000);
                }
                this.reset();
                // Do not log sensitive form data to the console in production
            }
        });

        // Clear error state on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => field.classList.remove('is-error'));
            field.addEventListener('change', () => field.classList.remove('is-error'));
        });
    });


    // ==========================================
    // 8. LAZY LOADING IMAGES
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
    // 9. SCROLL REVEAL (CSS fallback for cards)
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
