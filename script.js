document.addEventListener('DOMContentLoaded', () => {

    // ── Typing animation ──────────────────────────────
    const roles = [
        'BS Information Technology · De La Salle Lipa',
        '3rd Year IT Student',
        'Tech Enthusiast',
    ];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typedEl = document.getElementById('typed-text');

    function typeEffect() {
        if (!typedEl) return;
        const current = roles[roleIndex];
        typedEl.textContent = isDeleting
            ? current.slice(0, --charIndex)
            : current.slice(0, ++charIndex);

        let delay = isDeleting ? 40 : 80;
        if (!isDeleting && charIndex === current.length) {
            delay = 2000; isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 400;
        }
        setTimeout(typeEffect, delay);
    }
    typeEffect();

    // ── Scroll-reveal animations ──────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // ── Mobile navigation toggle ──────────────────────
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');

    toggle?.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    links?.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ── Active nav link on scroll ─────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                active?.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

});
