document.addEventListener('DOMContentLoaded', () => {

    // --- SPARK ANIMATION SCRIPT (OPTIMIZED FOR MOBILE) ---
    const createSparks = () => {
        // Only run the animation on screens wider than 768px (tablets/desktops)
        if (window.innerWidth < 768) {
            return;
        }
    
        const sparkContainer = document.getElementById('spark-container');
        if (!sparkContainer) return;
    
        const sparkCount = 50; 
    
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
    
            const size = Math.random() * 4 + 1; // Slightly larger max size for more impact
            const leftPosition = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const animationDelay = Math.random() * 5;
            const opacity = Math.random() * 0.7 + 0.3; // Random opacity for bright/dark effect
    
            spark.style.width = `${size}px`;
            spark.style.height = `${size}px`;
            spark.style.left = `${leftPosition}vw`;
            spark.style.opacity = opacity;
            spark.style.animationDuration = `${animationDuration}s`;
            spark.style.animationDelay = `-${animationDelay}s`;
    
            // Add a brighter glow for more prominent sparks
            if (opacity > 0.8 && size > 2) {
                 spark.style.boxShadow = '0 0 4px 1px rgba(255, 255, 255, 0.7)';
            }
    
            sparkContainer.appendChild(spark);
        }
    };
    createSparks(); // Call the function to create the sparks

    // --- PRELOADER SCRIPT ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('preloader-hidden');
            preloader.addEventListener('transitionend', () => preloader.remove());
        });
    }

    // --- HEADER & NAVIGATION ---
    const header = document.querySelector('.header');
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    if (hamburger && navMenu) {
        const navLinks = navMenu.querySelectorAll(".nav-link");

        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            hamburger.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };
        
        hamburger.addEventListener("click", toggleMenu);

        navLinks.forEach(link => link.addEventListener("click", () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
    
    // --- FIX STICKY HEADER ON RESIZE ---
    const handleResize = () => {
        if (window.innerWidth > 992) {
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    };
    window.addEventListener('resize', handleResize);

    // --- HERO SECTION SCROLL EFFECT ---
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    const handleHeroScroll = () => {
        const scrollY = window.scrollY;
        
        if (heroTitle && scrollY < window.innerHeight) {
            const titleTranslateY = scrollY * 0.5;
            const opacity = 1 - (scrollY / 500);

            heroTitle.style.transform = `translateY(${titleTranslateY}px)`;
            heroTitle.style.opacity = opacity < 0 ? 0 : opacity;

            if (heroSubtitle) {
                const subtitleTranslateY = scrollY * 0.4;
                heroSubtitle.style.transform = `translateY(${subtitleTranslateY}px)`;
                heroSubtitle.style.opacity = opacity < 0 ? 0 : opacity;
            }
        }
    };
    window.addEventListener('scroll', handleHeroScroll, { passive: true });

    // --- DYNAMIC YEAR IN FOOTER ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }

                if (entry.target.id === 'stats-counter') {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        if (counter.dataset.animated) return;
                        counter.dataset.animated = true;
                        
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000;
                        
                        let start = 0;
                        const stepTime = Math.abs(Math.floor(duration / target));

                        const timer = setInterval(() => {
                            start += 1;
                            counter.innerText = start;
                            if (start === target) {
                                clearInterval(timer);
                            }
                        }, stepTime);
                    });
                    observer.unobserve(entry.target);
                }
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.15,
    });

    const elementsToAnimate = document.querySelectorAll('.fade-in, #stats-counter');
    elementsToAnimate.forEach(el => observer.observe(el));
});
