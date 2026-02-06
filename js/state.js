/**
 * state.js
 * 
 * GESTIÓN DEL ESTADO Y DATOS
 * --------------------------
 * Centraliza las variables globales, la carga de datos estáticos (JSON)
 * y la persistencia del progreso del usuario (LocalStorage / Archivos).
 */

// --- VARIABLES GLOBALES DE DATOS ESTÁTICOS ---
// Se llenan al inicio mediante cargarDatos()
var datosGimnasios = [];
var coordenadasKanto = {};
var coordenadasJohto = {};
var coordenadasHoenn = {};
var coordenadasSinnoh = {};
var coordenadasTeselia = {};
var medallasPorRegion = {};
var datosBayas = [];
var datosHuerto = [];
var datosRotacionLegendarios = [];

// --- ESTADO DE LA APLICACIÓN (DINÁMICO) ---
const CLAVE_ALMACENAMIENTO = 'pokemmo_gym_progress';
let progresoUsuario = {};
let contextoReinicio = null; // Variable para saber qué sección reiniciar
let estadoRegiones = {}; // Estado de colapso de las regiones

// Estados de selección de ciudades para los mapas
let ciudadSeleccionadaKanto = null;
let ciudadSeleccionadaJohto = null;
let ciudadSeleccionadaHoenn = null;
let ciudadSeleccionadaSinnoh = null;
let ciudadSeleccionadaTeselia = null;

/**
 * Carga el progreso desde LocalStorage al iniciar la app.
 */
async function cargarProgreso() {
    progresoUsuario = {};
    const almacenado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (almacenado) progresoUsuario = JSON.parse(almacenado);
}

/**
 * Persiste el estado actual en el navegador.
 */
async function guardarProgreso() {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(progresoUsuario));
}

/**
 * Exportar Datos: Genera y descarga un archivo JSON con el progreso.
 */
function exportarDatos() {
    const cadenaDatos = JSON.stringify(progresoUsuario, null, 2);
    const blob = new Blob([cadenaDatos], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemmo_tracker_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Importar Datos: Lee un archivo JSON subido por el usuario y restaura el estado.
 * @param {Event} evento - Evento del input file.
 */
function importarDatos(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            progresoUsuario = datos;
            guardarProgreso();
            renderizarAplicacion();
            alert('Datos cargados correctamente.');
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            alert('Error al leer el archivo. Asegúrate de que es un JSON válido.');
        }
    };
    lector.readAsText(archivo);
    evento.target.value = '';
}

/**
 * Carga inicial de datos estáticos (JSONs).
 * Utiliza Promise.all para cargar todo en paralelo por eficiencia.
 */
async function cargarDatos() {
    try {
        const [gymsRes, bayasRes, legendsRes] = await Promise.all([
            fetch('../js/data/gimnasios.json'),
            fetch('../js/data/bayas.json'),
            fetch('../js/data/legendarios.json')
        ]);

        if (!gymsRes.ok || !bayasRes.ok || !legendsRes.ok) throw new Error("Error cargando archivos JSON");

        const gymsData = await gymsRes.json();
        datosGimnasios = gymsData.datosGimnasios;
        coordenadasKanto = gymsData.coordenadasKanto;
        coordenadasJohto = gymsData.coordenadasJohto;
        coordenadasHoenn = gymsData.coordenadasHoenn;
        coordenadasSinnoh = gymsData.coordenadasSinnoh;
        coordenadasTeselia = gymsData.coordenadasTeselia;
        medallasPorRegion = gymsData.medallasPorRegion;

        const bayasData = await bayasRes.json();
        datosBayas = bayasData.datosBayas;
        datosHuerto = bayasData.datosHuerto;

        datosRotacionLegendarios = await legendsRes.json();
        
    } catch (e) {
        console.error("Error inicializando datos:", e);
        alert("Error cargando los datos del juego. Revisa la consola.");
    }
}

/**
 * Limpia completamente el progreso guardado y recarga la página.
 */
function limpiarProgreso() {
    localStorage.removeItem(CLAVE_ALMACENAMIENTO);
    progresoUsuario = {};
    location.reload();
}
