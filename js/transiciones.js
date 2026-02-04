/**
 * transiciones.js
 * 
 * EFECTOS VISUALES Y UX
 * ---------------------
 * Controla la aparición suave (fade-in) de la página y corrige problemas
 * de visualización con el caché del navegador (bfcache).
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Fade-In (Aparecer) al cargar la página
    // Usamos un pequeño timeout para asegurar que el navegador detecta el cambio de clase
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 10);
});

// FIX: Solución para el botón "Atrás" del navegador (bfcache)
// Algunos navegadores guardan el estado "oculto" (opacity: 0) al salir.
// Al volver, el evento 'pageshow' nos permite restaurar la visibilidad.
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.add('page-loaded');
    }
});
