/**
 * transiciones.js
 * 
 * Archivo encargado de los efectos visuales y transiciones de la página.
 * Maneja principalmente el efecto de "fade-in" al cargar la web para una experiencia
 * de usuario más suave, y asegura que la página se visualice correctamente al navegar
 * hacia atrás en el historial del navegador (bfcache).
 */

// c:\Users\thafl\Desktop\Proyecto Pokemon\transitions.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Fade-In (Aparecer) al cargar la página
    // Usamos un pequeño timeout para asegurar que el navegador detecta el cambio de clase
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 10);
});

// 3. Solución para el botón "Atrás" del navegador (bfcache)
// Si el usuario vuelve atrás, forzamos que la página sea visible
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.add('page-loaded');
    }
});
