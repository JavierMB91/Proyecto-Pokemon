// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async () => {
    // Añadir favicon dinámicamente para todas las páginas
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/png';
    faviconLink.href = '../img/favicon.png'; // Ruta al favicon
    document.head.appendChild(faviconLink);

    cargarNavegacion();
    configurarModalImagen();
    
    // Actualizar datos de encuentros solo una vez al cargar
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('semillas')) {
        document.body.classList.add('page-semillas');
    }
    if (ruta.includes('rotacionlegendarios')) {
        actualizarDatosEncuentros();
    }

    // Iniciar aplicación local
    configurarInterfazAuth();
    await cargarProgreso();
    renderizarAplicacion();
    
    // Renderizar información de bayas si estamos en la página de semillas
    if (ruta.includes('semillas')) {
        renderizarInfoBayas();
    }

    // Actualizar temporizadores cada segundo (1000 ms)
    setInterval(actualizarTemporizadores, 1000);
    
    // Asignar evento al botón de reset
    const botonReinicio = document.getElementById('btn-reset');
    if(botonReinicio) {
        botonReinicio.addEventListener('click', mostrarModalReinicio);
    }

    // Eventos del modal
    const cancelarModal = document.getElementById('modal-cancel');
    if (cancelarModal) {
        cancelarModal.addEventListener('click', ocultarModalReinicio);
    }
    const confirmarModal = document.getElementById('modal-confirm');
    if (confirmarModal) {
        confirmarModal.addEventListener('click', confirmarReinicio);
    }
});
