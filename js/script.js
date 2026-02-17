/**
 * script.js
 * 
 * PUNTO DE ENTRADA (ENTRY POINT)
 * ------------------------------
 * Orquesta la inicialización de la aplicación. Garantiza que los datos estáticos y
 * el progreso del usuario estén listos antes de pintar la interfaz.
 */

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async () => {
    // Carga la barra de navegación común desde nav.html
    cargarNavegacion();
    // Configura el modal para visualizar imágenes ampliadas (mapas, puzzles)
    configurarModalImagen();
    
    // 1. CARGA DE DATOS ESTÁTICOS (JSONs)
    // Es vital esperar (await) a que esto termine antes de intentar renderizar nada.
    await cargarDatos();

    // 2. LÓGICA ESPECÍFICA POR PÁGINA
    // Detectamos en qué URL estamos para activar lógicas específicas (ej: rotación de legendarios).
    const ruta = window.location.pathname.toLowerCase();
    
    if (ruta.includes('semillas')) {
        document.body.classList.add('page-semillas');
    }
    
    if (ruta.includes('rotacionlegendarios')) {
        actualizarRotacionMensual();
    }

    // 3. GESTIÓN DE PROGRESO Y UI
    // Configura los listeners para Importar/Exportar datos.
    configurarInterfazDatos();
    // Recupera el estado guardado en LocalStorage.
    await cargarProgreso();
    
    // 4. RENDERIZADO INICIAL
    // Pinta la aplicación basándose en los datos cargados y el progreso recuperado.
    renderizarAplicacion();
    
    // Si estamos en la sección de huerto, inicializamos el panel de información de bayas.
    if (ruta.includes('semillas')) {
        renderizarInfoBayas();
    }


    // 5. BUCLE PRINCIPAL (TICK)
    // Actualiza los contadores de tiempo cada segundo.
    setInterval(actualizarTemporizadores, 1000);
    
    // 6. EVENTOS GLOBALES (Reset y Modales)
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
