document.addEventListener('DOMContentLoaded', () => {

    // --- Live Time and Date for Kathmandu ---
    const timeElement = document.getElementById('live-status');

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kathmandu',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        };
        const kathmanduTime = new Intl.DateTimeFormat('en-US', options).formatToParts(now);
        const timeParts = {};
        kathmanduTime.forEach(part => { timeParts[part.type] = part.value; });
        const formattedString = `${timeParts.hour}:${timeParts.minute} ${timeParts.dayPeriod} NPT | ${timeParts.month} ${timeParts.day}, ${timeParts.year}`;
        if (timeElement) { timeElement.textContent = formattedString; }
    }
    if (timeElement) {
        updateTime();
        setInterval(updateTime, 1000);
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Staggered Fade-in Animation on Scroll ---
    const animatedSections = document.querySelectorAll('.scroll-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const animatedChildren = entry.target.querySelectorAll('[data-anim]');
                animatedChildren.forEach((child, index) => {
                    setTimeout(() => { child.classList.add('visible'); }, (index + 1) * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    animatedSections.forEach(section => { observer.observe(section); });

    // --- Back to Top Button ---
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function changeNav() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        if(index >= 0) { // Check if there's a valid section in view
           const activeLink = document.querySelector(`.nav-links a[href="#${sections[index].id}"]`);
           if (activeLink) {
               activeLink.classList.add('active');
           }
        }
    }
    
    changeNav(); // Call on load
    window.addEventListener('scroll', changeNav);

});