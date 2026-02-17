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
 * Formatea un objeto Date a una cadena legible.
 * @param {Date|string} fecha - Objeto fecha o string ISO a formatear.
 * @returns {string} Fecha formateada (dd/mm/yyyy, hh:mm).
 */
function formatearFecha(fecha) {
    const d = new Date(fecha);
    return d.toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

/**
 * Genera un ID único y consistente para un gimnasio.
 * Formato: "region-lider" en minúsculas
 * @param {string} region - Nombre de la región
 * @param {string} id - ID único del gimnasio (nombre del líder)
 * @returns {string} ID consistente
 */
function obtenerIdGimnasio(region, id) {
    if (!region || !id) return 'unknown-id';
    return `${region}-${id}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

/**
 * Normaliza el nombre de un líder para construir rutas de imágenes.
 * Remueve acentos, caracteres especiales y convierte a minúsculas.
 * @param {string} nombreLider - Nombre del líder
 * @returns {string} Nombre normalizado
 */
function normalizarNombreLider(nombreLider) {
    return nombreLider
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\./g, '')
        .replace(/,/g, '')
        .replace(/\s+/g, '_')
        .toLowerCase();
}

/**
 * Sistema de audio simple.
 */
function reproducirSonido(tipo) {
    let rutaAudio = '';
    if (tipo === 'water') {
        rutaAudio = '../audio/water.mp3';
    } else if (tipo === 'harvest') {
        rutaAudio = '../audio/harvest.mp3';
    }

    if (rutaAudio) {
        const audio = new Audio(rutaAudio);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error reproduciendo audio:", e));
    }
}
