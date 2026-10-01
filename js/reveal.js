(() => {
    const items = document.querySelectorAll('.fade-section');
    if (!items.length) return;

    // Plan B: sin IntersectionObserver, mostrar todo
    if (!('IntersectionObserver' in window)) {
        items.forEach((el) => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);   // una sola vez: deja de vigilarla
            });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0 }   // sirve para secciones de cualquier altura
    );

    items.forEach((el) => observer.observe(el));
})();
