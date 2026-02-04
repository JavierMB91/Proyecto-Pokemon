/**
 * script.js
 * 
 * Punto de entrada principal (Entry Point) de la aplicación.
 * Se encarga de la inicialización cuando el DOM está listo: carga la navegación,
 * configura los eventos iniciales, determina el contexto de la página actual (semillas, legendarios, etc.),
 * inicia la carga de datos de progreso y establece los intervalos de actualización para los temporizadores.
 */

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async () => {
    cargarNavegacion();
    configurarModalImagen();
    
    // Cargar datos estáticos antes de cualquier lógica
    await cargarDatos();

    // Actualizar rotación mensual solo una vez al cargar
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('semillas')) {
        document.body.classList.add('page-semillas');
    }
    if (ruta.includes('rotacionlegendarios')) {
        actualizarRotacionMensual();
    }

    // Iniciar aplicación local
    configurarInterfazDatos();
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
