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


// JS DE LOS MODALES
const explicaciones = {
    salmo119: {
        titulo: "Salmos 119:9",
        texto: "Este versículo enseña que los jóvenes pueden vivir correctamente si siguen la palabra de Dios. Es una guía práctica para tomar decisiones correctas."
    }
};

function abrirModal(id) {
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('modal-titulo').innerText = explicaciones[id].titulo;
    document.getElementById('modal-texto').innerText = explicaciones[id].texto;
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}