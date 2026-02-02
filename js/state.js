// --- CONFIGURACIÓN LOCAL (SIN SERVIDOR) ---
const CLAVE_ALMACENAMIENTO = 'pokemmo_gym_progress';
let progresoUsuario = {};
let contextoReinicio = null; // Variable para saber qué sección reiniciar
let estadoRegiones = {}; // Estado de colapso de las regiones

// Estados de selección de ciudades para los mapas
let datosPokemons = []; // Variable global para almacenar los datos externos
let datosMovimientos = {}; // Variable global para movimientos (Mapa optimizado)
let datosPokedexExtra = {}; // Variable global para datos extra (descripciones)
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

// --- CARGA DE DATOS EXTERNOS (Opción 1) ---
async function cargarPokemonsExternos() {
    const url = 'https://cdn.jsdelivr.net/gh/PokeMMO-Tools/pokemmo-data@main/data/monster.json';
    const urlMoves = 'https://cdn.jsdelivr.net/gh/PokeMMO-Tools/pokemmo-data@main/data/moves.json';
    const urlPokedex = 'https://cdn.jsdelivr.net/gh/PokeMMO-Tools/pokemmo-data@main/data/pokedex.json';

    try {
        // Cargamos los tres archivos en paralelo para mayor velocidad
        const [resMonsters, resMoves, resPokedex] = await Promise.all([
            fetch(url),
            fetch(urlMoves),
            fetch(urlPokedex)
        ]);

        if (!resMonsters.ok) throw new Error(`Error HTTP Monsters: ${resMonsters.status} en ${url}`);
        
        datosPokemons = await resMonsters.json();
        
        if (resMoves.ok) {
            const movesRaw = await resMoves.json();
            // Optimización CRÍTICA: Convertir array a objeto para búsquedas instantáneas O(1)
            if (Array.isArray(movesRaw)) {
                datosMovimientos = {};
                movesRaw.forEach(m => { datosMovimientos[m.id] = m; });
            } else {
                datosMovimientos = movesRaw;
            }
        }
        
        if (resPokedex.ok) {
            const pokedexRaw = await resPokedex.json();
            // Convertimos a mapa por ID para acceso rápido
            if (Array.isArray(pokedexRaw)) {
                datosPokedexExtra = {};
                pokedexRaw.forEach(p => { datosPokedexExtra[p.id] = p; });
            } else {
                datosPokedexExtra = pokedexRaw;
            }
            // Exponer globalmente para facilitar la depuración
            window.datosPokedexExtra = datosPokedexExtra;
        } else {
            console.warn("⚠️ No se pudo cargar el archivo de descripciones (pokedex.json).");
        }

        const cantidad = Array.isArray(datosPokemons) ? datosPokemons.length : Object.keys(datosPokemons).length;
        const cantidadMoves = Object.keys(datosMovimientos).length;
        const cantidadPokedex = Object.keys(datosPokedexExtra).length;
        console.log(`✅ Datos externos cargados: ${cantidad} Pokémons, ${cantidadMoves} Movimientos y ${cantidadPokedex} Entradas extra listos.`);
    } catch (error) {
        console.error("❌ Error al cargar pokemons externos:", error);
    }
}

// Iniciamos la carga automáticamente al leer este script
cargarPokemonsExternos();
