document.addEventListener('DOMContentLoaded', () => {

    // --- SNOW ANIMATION SCRIPT ---
    const createSnowflakes = () => {
        const snowContainer = document.getElementById('snow-container');
        if (!snowContainer) return;

        const snowflakeCount = 100; // Adjust number of snowflakes

        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');

            // Randomize properties for a natural look
            const size = Math.random() * 4 + 2; // Size between 2px and 6px
            const leftPosition = Math.random() * 100; // Horizontal position in %
            const animationDuration = Math.random() * 10 + 8; // Duration between 8s and 18s
            const animationDelay = Math.random() * 10; // Start delay up to 10s

            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.left = `${leftPosition}vw`;
            snowflake.style.animationDuration = `${animationDuration}s`;
            snowflake.style.animationDelay = `-${animationDelay}s`; // Using negative delay starts animations partway through

            snowContainer.appendChild(snowflake);
        }
    };
    createSnowflakes(); // Call the function to create the snow

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

    // Scrolled header effect
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true }); // Use passive listener for better scroll performance

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        const navLinks = navMenu.querySelectorAll(".nav-link");

        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            hamburger.setAttribute('aria-expanded', !isExpanded);
            // This prevents the main content from scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };
        
        hamburger.addEventListener("click", toggleMenu);

        // Close menu when a link is clicked
        navLinks.forEach(link => link.addEventListener("click", () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }));

        // Close menu with Escape key for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
    
    // --- DYNAMIC YEAR IN FOOTER ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle general fade-in elements
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Unobserve after animating
                }

                // Handle the number counter animation
                if (entry.target.id === 'stats-counter') {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        if (counter.dataset.animated) return; // Prevent re-animating
                        counter.dataset.animated = true;
                        
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000; // Animation duration in milliseconds
                        
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
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.15, // trigger when 15% of the element is visible
    });

    const elementsToAnimate = document.querySelectorAll('.fade-in, #stats-counter');
    elementsToAnimate.forEach(el => observer.observe(el));
});