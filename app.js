/* ==========================================================================
   Che Malbec — Custom Interactions & Scroll Reveal Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item, .nav-btn');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle menu icon
            const icon = mobileToggle.querySelector('i');
            if (icon.classList.contains('lucide-align-right')) {
                icon.classList.remove('lucide-align-right');
                icon.classList.add('lucide-x');
            } else {
                icon.classList.remove('lucide-x');
                icon.classList.add('lucide-align-right');
            }
        });

        // Close menu when clicking navigation items
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('lucide-x');
                    icon.classList.add('lucide-align-right');
                }
            });
        });
    }

    // 2. Scroll Reveal Animations (Motion Intensity: 5)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Header Styling on Scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.height = '70px';
            header.style.backgroundColor = 'rgba(244, 224, 197, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(43, 30, 26, 0.04)';
        } else {
            header.style.height = '80px';
            header.style.backgroundColor = 'rgba(244, 224, 197, 0.85)';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Sync Active Class on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
