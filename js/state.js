// Variables globales de datos (antes en archivos JS separados)
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

// --- CONFIGURACIÓN LOCAL (SIN SERVIDOR) ---
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

// Cargar progreso desde LocalStorage
async function cargarProgreso() {
    progresoUsuario = {};
    const almacenado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (almacenado) progresoUsuario = JSON.parse(almacenado);
}

// Guardar progreso en LocalStorage
async function guardarProgreso() {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(progresoUsuario));
}

// Exportar datos a archivo JSON
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

// Importar datos desde archivo JSON
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

// Función para cargar los datos estáticos desde JSON
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
