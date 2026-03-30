document.addEventListener('DOMContentLoaded', () => {

    // Turn on focus mode immediately via JS
    document.body.classList.add('focus-mode-active');

    // 1. First-time fade in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

    // 2. Presentation Focus Mode (Dims/blurs inactive sections)
    const focusObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('focused');
            } else {
                entry.target.classList.remove('focused');
            }
        });
    }, { 
        rootMargin: '-25% 0px -25% 0px', // Section must reach the middle of the screen to focus
        threshold: 0 
    });

    document.querySelectorAll('.hero, .section').forEach(sec => focusObserver.observe(sec));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

});
