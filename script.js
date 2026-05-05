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

// CONSTANTES MENÚ HAMBURGUESA
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const icon = toggle.querySelector("i");
const links = document.querySelectorAll(".nav-links a");

// JS DE LOS MODALES
const explicaciones = {
    salmo119: {
        titulo: "Salmos 119:9",
        texto: "Este versículo enseña que los jóvenes pueden vivir correctamente si siguen la palabra de Dios. No habla de perfección, sino de dirección: tomar decisiones basadas en principios espirituales."
    },

    juan316: {
        titulo: "Juan 3:16",
        texto: "Este versículo resume el mensaje central del evangelio: el amor de Dios. No es un amor condicionado, sino un amor que da, que busca salvar y ofrecer vida eterna a quienes creen."
    },

    jeremias2911: {
        titulo: "Jeremías 29:11",
        texto: "Dios declara que tiene planes de bienestar. Aunque las circunstancias sean difíciles, este versículo recuerda que hay propósito, dirección y esperanza en el futuro."
    },

    filipenses413: {
        titulo: "Filipenses 4:13",
        texto: "Este versículo no significa que todo será fácil, sino que Dios da la fortaleza necesaria para enfrentar cualquier situación, ya sea buena o difícil."
    }
};

function abrirModal(id) {
    const data = explicaciones[id];

    if (!data) {
        console.error("No existe explicación para: ", id);
        return;
    }

    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-titulo').innerText = data.titulo;
    document.getElementById('modal-texto').innerText = data.texto;
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

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
