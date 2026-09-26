// =========================================
// MENÚ HAMBURGUESA
// =========================================

const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const icon = toggle?.querySelector("i");
const links = document.querySelectorAll(".nav-links a");


if (toggle && nav && icon) {

    toggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        const menuOpen = nav.classList.contains("active");

        toggle.setAttribute("aria-expanded", menuOpen);

        icon.classList.toggle("fa-bars", !menuOpen);
        icon.classList.toggle("fa-xmark", menuOpen);

    });

}


// =========================================
// CERRAR MENÚ AL SELECCIONAR UN ENLACE
// =========================================

links.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        toggle?.setAttribute("aria-expanded", "false");

    });

});


// =========================================
// CERRAR AL HACER CLIC FUERA
// =========================================

document.addEventListener("click", (event) => {

    if (
        nav &&
        toggle &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
    ) {

        nav.classList.remove("active");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        toggle.setAttribute("aria-expanded", "false");
    }

});
