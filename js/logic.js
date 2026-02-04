/**
 * logic.js
 * 
 * Este archivo contiene funciones de utilidad general que son utilizadas transversalmente
 * por toda la aplicación. Incluye helpers para la generación de identificadores únicos,
 * formateo de fechas y gestión de reproducción de sonidos. Actúa como una biblioteca
 * de herramientas base para la lógica de negocio.
 */

// Generar ID único para un elemento (gimnasio, paso de huerto, encuentro, etc.).
function generarIdElemento(nombreRegion, idONombre) {
    return `${nombreRegion}-${idONombre}`.replace(/\s+/g, '-').toLowerCase();
}

// Helper para formatear fecha
function formatearFecha(fecha) {
    return fecha.toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// Función para reproducir sonidos de notificación
function reproducirSonido(tipo) {
    let rutaAudio = '';
    // Se asume que los archivos de audio están en una carpeta 'audio' al mismo nivel que 'img'
    if (tipo === 'water') {
        rutaAudio = '../audio/water.mp3';
    } else if (tipo === 'harvest') {
        rutaAudio = '../audio/harvest.mp3';
    }

    if (rutaAudio) {
        const audio = new Audio(rutaAudio);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error reproduciendo audio (verifica que el archivo exista en la carpeta audio):", e));
    }
}
