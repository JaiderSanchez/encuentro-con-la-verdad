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
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
});

sections.forEach(section => {
    observer.observe(section);
});

// CONSTANTES MENÚ HAMBURGUESA
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const icon = toggle.querySelector("i");
const links = document.querySelectorAll(".nav-links a");

const contenedorVersiculos = document.getElementById("contenedor-versiculos");

function renderizarVersiculos() {
    if (!contenedorVersiculos || !window.versesHome) return;

    contenedorVersiculos.innerHTML = "";

    Object.values(window.versesHome).forEach(categoria => {
        categoria.versiculos.forEach(versiculo => {
            const article = document.createElement("article");
            article.classList.add("versiculo");

            article.innerHTML = `
                <h3>${versiculo.referencia}</h3>

                <img 
                    src="../${versiculo.imagen}" 
                    alt="${versiculo.referencia}" 
                    class="versiculo-imagen"
                >

                <p class="version">
                    ${versiculo.texto}
                </p>

                <button 
                    class="btn-explicacion"
                    data-id="${versiculo.id}">
                    📖 Explicación
                </button>
            `;

            contenedorVersiculos.appendChild(article);
        });
    });

    agregarEventosModal();
}


function agregarEventosModal() {
    const botones = document.querySelectorAll(".btn-explicacion");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const versiculoId = boton.dataset.id;
            abrirModal(versiculoId);
        });
    });
}


function abrirModal(id) {
    if (!window.versesHome) return;

    let versiculoEncontrado = null;

    Object.values(window.versesHome).forEach(categoria => {
        categoria.versiculos.forEach(versiculo => {
            if (versiculo.id === id) {
                versiculoEncontrado = versiculo;
            }
        });
    });

    if (!versiculoEncontrado) return;

    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    document.getElementById("modal-titulo").innerText = versiculoEncontrado.referencia;
    document.getElementById("modal-texto").innerText = versiculoEncontrado.explicacion;

    document.querySelector(".cerrar").focus();
}


function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute("aria-hidden", "true");
}


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        cerrarModal();
    }
});


document.querySelectorAll(".btn-explicacion").forEach(btn => {
    btn.addEventListener("click", () => {
        abrirModal(btn.getAttribute("onclick").match(/'(.*?)'/)[1]);
    });
});



// Lógica Menú Hamburguesa
if (toggle && nav && icon) {
    toggle.addEventListener("click", () => {
        const expanded = nav.classList.toggle("active");
        toggle.setAttribute("aria-expanded", expanded);
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


function resetIcon() {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
}


document.addEventListener("DOMContentLoaded", () => {
    renderizarVersiculos();
});
