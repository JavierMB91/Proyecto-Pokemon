// c:\Users\thafl\Desktop\Proyecto Pokemon\transitions.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efecto Fade-In (Aparecer) al cargar la página
    // Usamos un pequeño timeout para asegurar que el navegador detecta el cambio de clase
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 10);

    // 2. Interceptar clics en enlaces para efecto Fade-Out (Desvanecer)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        // Verificamos que sea un enlace válido, interno y que no abra en nueva pestaña
        if (link && link.href && !link.target && 
            link.hostname === window.location.hostname && 
            !e.ctrlKey && !e.metaKey) {
            
            // Ignorar si es un enlace ancla en la misma página (ej: #seccion)
            if (link.pathname === window.location.pathname && link.hash) return;

            e.preventDefault(); // Evitamos la navegación brusca inmediata

            // Quitamos la clase para iniciar el Fade-Out
            document.body.classList.remove('page-loaded');

            // Esperamos a que termine la animación (300ms) antes de ir a la nueva página
            setTimeout(() => {
                window.location.href = link.href;
            }, 300); 
        }
    });
});

// 3. Solución para el botón "Atrás" del navegador (bfcache)
// Si el usuario vuelve atrás, forzamos que la página sea visible
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.add('page-loaded');
    }
});
