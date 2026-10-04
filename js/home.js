// VERSÍCULO DESTACADO
document.addEventListener('DOMContentLoaded', () => {
    if (typeof versesHome === 'undefined') return;   // verses.js no cargó

    const categorias = Object.keys(versesHome);
    const categoria = versesHome[categorias[Math.floor(Math.random() * categorias.length)]];
    const versiculo = categoria.versiculos[Math.floor(Math.random() * categoria.versiculos.length)];

    document.getElementById('categoria-versiculo').textContent = categoria.titulo;
    document.getElementById('versiculo-imagen').src = versiculo.imagen;
    document.getElementById('versiculo-imagen').alt = versiculo.referencia;
    document.getElementById('versiculo-referencia').textContent = versiculo.referencia;
    document.getElementById('versiculo-texto').textContent = versiculo.texto;
    document.getElementById('versiculo-descripcion').textContent = categoria.descripcion;

    // Nuevas categorías en verses.js entran solas en la selección aleatoria.
});
