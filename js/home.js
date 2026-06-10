const sections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); // para animar también al subir
        }
    });
}, {
    threshold: 0.2
});

sections.forEach(section => {
    observer.observe(section);
});


function resetIcon() {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
}


// CONSTANTES MENÚ HAMBURGUESA
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const icon = toggle.querySelector("i");
const links = document.querySelectorAll(".nav-links a");


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



/* ==========================
   VERSÍCULO DESTACADO
========================== */
document.addEventListener("DOMContentLoaded", () => {

    const categorias = Object.keys(versesHome);

    const categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];

    const categoriaSeleccionada = versesHome[categoriaAleatoria];

    const versiculos = categoriaSeleccionada.versiculos;

    const versiculoAleatorio = versiculos[Math.floor(Math.random() * versiculos.length)];

    document.getElementById("categoria-versiculo").textContent = categoriaSeleccionada.titulo;

    document.getElementById("versiculo-imagen").src = versiculoAleatorio.imagen;

    document.getElementById("versiculo-imagen").alt = versiculoAleatorio.referencia;

    document.getElementById("versiculo-referencia").textContent = versiculoAleatorio.referencia;

    document.getElementById("versiculo-texto").textContent = versiculoAleatorio.texto;

    document.getElementById("versiculo-descripcion").textContent = categoriaSeleccionada.descripcion;

    // Lo mejor es que, cuando agregue más categorías como: fe, esperanza, perdon, familia, oracionfe, esperanza, perdon, familia y oracion no tendrés que modificar el algoritmo. Automáticamente empezarán a participar en la selección aleatoria. Esa es precisamente la ventaja de la estructura escalable que se estableció en verses.js.
});
