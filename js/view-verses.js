// 1. ANIMACIONES DE SCROLL (Fade-in Corregido)
const sections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Cuando entra en pantalla, lo mostramos
            entry.target.classList.add('visible');
            
            // 🔥 CLAVE: Le decimos al observer que deje de vigilar esta sección
            // Así NO desaparecerá cuando el usuario haga scroll hacia arriba
            observer.unobserve(entry.target); 
        }
    });
}, { 
    threshold: 0.1, // Reducido al 10% para que aparezca más rápido sin tener que bajar tanto
    rootMargin: "0px" // Reseteado para evitar cálculos extraños en móviles
});

sections.forEach(section => observer.observe(section));


// 2. MENÚ HAMBURGUESA
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const icon = toggle.querySelector("i");
const links = document.querySelectorAll(".nav-links a");

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


// 3. RENDERIZADO Y FILTRADO DE VERSÍCULOS
const contenedorVersiculos = document.getElementById("contenedor-versiculos");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderizarVersiculos(filtro = "todos") {
    if (!contenedorVersiculos || !window.versesHome) return;

    // 1. Limpiar el contenedor antes de inyectar los nuevos
    contenedorVersiculos.innerHTML = ""; 
    let versiculosARenderizar = [];

    // 2. Lógica de filtrado
    if (filtro === "todos") {
        // Extraer todos los versículos de todas las categorías
        Object.values(window.versesHome).forEach(categoria => {
            // Añadimos el título de la categoría al objeto del versículo para usarlo en el "Badge"
            const versiculosConCategoria = categoria.versiculos.map(v => ({ ...v, categoriaNombre: categoria.titulo }));
            versiculosARenderizar = [...versiculosARenderizar, ...versiculosConCategoria];
        });
    } else {
        // Extraer solo los de la categoría seleccionada
        if (window.versesHome[filtro]) {
            const categoria = window.versesHome[filtro];
            versiculosARenderizar = categoria.versiculos.map(v => ({ ...v, categoriaNombre: categoria.titulo }));
        }
    }

    // 3. Estado Vacío (Por si una categoría aún no tiene versículos en el JS)
    if (versiculosARenderizar.length === 0) {
        contenedorVersiculos.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-color); margin-top: 20px;">Aún no hay versículos en esta categoría.</p>`;
        return;
    }

    // 4. Inyectar el HTML de las Tarjetas (Cards)
    versiculosARenderizar.forEach(versiculo => {
        const article = document.createElement("article");
        article.classList.add("versiculo-card");

        article.innerHTML = `
            <div class="card-header">
                <span class="category-badge">${versiculo.categoriaNombre}</span>
                <h3 class="reference">${versiculo.referencia}</h3>
            </div>
            
            <div class="card-body">
                <p class="text">"${versiculo.texto}"</p>
            </div>
            
            <div class="card-footer">
                <span class="version">NVI</span>
                <button class="btn-explicacion" data-id="${versiculo.id}">
                    📖 Explicación
                </button>
            </div>
        `;
        contenedorVersiculos.appendChild(article);
    });

    // 5. Volver a asignar eventos a los nuevos botones que se acaban de crear
    agregarEventosModal();
}


// 4. EVENTOS DE LOS BOTONES DE FILTRO
filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Quitar la clase 'active' de todos los botones
        filterButtons.forEach(b => b.classList.remove("active"));
        
        // Agregar la clase 'active' solo al botón clickeado
        e.target.classList.add("active");
        
        // Obtener la categoría del data-filter y renderizar
        const categoriaSeleccionada = e.target.getAttribute("data-filter");
        renderizarVersiculos(categoriaSeleccionada);
    });
});


// 5. LÓGICA DEL MODAL
function agregarEventosModal() {
    const botones = document.querySelectorAll(".btn-explicacion");
    botones.forEach(boton => {
        // Limpiamos eventos previos clonando y reemplazando (opcional, pero seguro)
        boton.addEventListener("click", () => {
            const versiculoId = boton.getAttribute("data-id");
            abrirModal(versiculoId);
        });
    });
}

function abrirModal(id) {
    if (!window.versesHome) return;
    
    let versiculoEncontrado = null;

    // Buscar el versículo por ID
    Object.values(window.versesHome).forEach(categoria => {
        const encontrado = categoria.versiculos.find(v => v.id === id);
        if (encontrado) versiculoEncontrado = encontrado;
    });

    if (!versiculoEncontrado) return;

    // Obtener elementos del DOM
    const modal = document.getElementById("modal");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalTexto = document.getElementById("modal-texto");
    const modalImagen = document.getElementById("modal-imagen"); // ¡Añadiremos esto al HTML!

    // Inyectar datos
    modalTitulo.innerText = versiculoEncontrado.referencia;
    modalTexto.innerText = versiculoEncontrado.explicacion;
    
    // Si el versículo tiene imagen, la mostramos. Si no, la ocultamos.
    if (modalImagen && versiculoEncontrado.imagen) {
        modalImagen.src = `../${versiculoEncontrado.imagen}`;
        modalImagen.style.display = "block";
    } else if (modalImagen) {
        modalImagen.style.display = "none";
    }

    // Mostrar modal
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute("aria-hidden", "true");
}

// Cerrar con Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
});

// Cerrar al hacer clic fuera del contenido del modal
window.addEventListener("click", (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) cerrarModal();
});


// 6. INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
    // Al cargar la página, mostramos todos los versículos
    renderizarVersiculos("todos"); 
});
