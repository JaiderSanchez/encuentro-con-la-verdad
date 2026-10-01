(() => {
    const nav = document.querySelector('.smart-nav');
    if (!nav) return;

    // Solo secciones que realmente tienen enlace en la nav
    const linkBySection = new Map();
    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
        const section = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (section) linkBySection.set(section, link);
    });

    let current = null;
    const setActive = (link) => {
        if (!link || link === current) return;
        current?.removeAttribute('aria-current');
        link.setAttribute('aria-current', 'location');
        current = link;
    };

    // Franja central del viewport: funciona con secciones de cualquier altura
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries.filter((e) => e.isIntersecting).at(-1);
            if (visible) setActive(linkBySection.get(visible.target));
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    linkBySection.forEach((_, section) => observer.observe(section));
})();
