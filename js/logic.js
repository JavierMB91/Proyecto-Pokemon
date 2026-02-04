/**
 * logic.js
 * 
 * UTILIDADES GENERALES (HELPERS)
 * ------------------------------
 * Funciones puras o de soporte usadas en múltiples partes de la aplicación.
 * (IDs, Fechas, Audio).
 */

/**
 * Genera un identificador único estandarizado para cualquier elemento del juego.
 * Combina el nombre de la región y el ID/Nombre del elemento, eliminando espacios y mayúsculas.
 * @param {string} nombreRegion - Nombre de la región (ej: "Kanto").
 * @param {string} idONombre - Identificador específico o nombre (ej: "Brock").
 * @returns {string} ID formateado (ej: "kanto-brock").
 */
function generarIdElemento(nombreRegion, idONombre) {
    return `${nombreRegion}-${idONombre}`.replace(/\s+/g, '-').toLowerCase();
}

/**
 * Formatea un objeto Date a una cadena legible en formato español (España).
 * @param {Date} fecha - Objeto fecha a formatear.
 * @returns {string} Fecha formateada (dd/mm/yyyy, hh:mm).
 */
function formatearFecha(fecha) {
    return fecha.toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

/**
 * Sistema de audio simple.
 */
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
