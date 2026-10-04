(() => {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('nav-links');
    if (!toggle || !menu) return;

    const icon = toggle.querySelector('i');
    const isOpen = () => menu.classList.contains('active');

    const setOpen = (open) => {
        menu.classList.toggle('active', open);          // tu clase original
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        icon?.classList.toggle('fa-bars', !open);
        icon?.classList.toggle('fa-xmark', open);
    };

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Cerrar al elegir un enlace
    menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) setOpen(false);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    // Cerrar con Escape y devolver el foco al botón
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Al pasar a escritorio, restablecer (mismo breakpoint que tu media.css)
    matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
        if (e.matches) setOpen(false);
    });
})();
