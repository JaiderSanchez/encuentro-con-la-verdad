document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".fade-section");
    if (section) {
        section.classList.add("visible");
    }
})

// Lógica Menú Hamburguesa
if (toggle && nav && icon) {
    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");

        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });
}


links.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});

document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("active");
        resetIcon();
    }
});

