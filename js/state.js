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

// --- CARGA DE DATOS LOCALES ---
async function cargarPokemonsLocales() {
    // Rutas a los archivos JSON locales.
    // Asegúrate de que estos archivos están en la carpeta `data` en la raíz de tu proyecto.
    const url = '../data/monster.json';
    const urlMoves = '../data/moves.json';
    const urlPokedex = '../data/pokedex.json';

    // Usamos Promise.allSettled para que un fallo en un archivo no detenga la carga de los otros.
    // Esto hace la carga de datos mucho más robusta.
    const results = await Promise.allSettled([
        fetch(url),
        fetch(urlMoves),
        fetch(urlPokedex)
    ]);

    const [resMonstersResult, resMovesResult, resPokedexResult] = results;

    // 1. Cargar Pokémon (esencial)
    if (resMonstersResult.status === 'fulfilled' && resMonstersResult.value.ok) {
        try {
            datosPokemons = await resMonstersResult.value.json();
            const cantidad = Array.isArray(datosPokemons) ? datosPokemons.length : Object.keys(datosPokemons).length;
            console.log(`✅ Datos de Pokémon cargados: ${cantidad} entradas.`);
        } catch (e) {
            console.error("❌ Error al parsear monster.json:", e);
            datosPokemons = []; // Asegurar que es un array vacío en caso de error
        }
    } else {
        const reason = resMonstersResult.reason || `Error HTTP ${resMonstersResult.value?.status}`;
        console.error(`❌ Fallo CRÍTICO al cargar monster.json: ${reason}. La Pokédex no funcionará.`);
    }

    // 2. Cargar Movimientos (opcional)
    if (resMovesResult.status === 'fulfilled' && resMovesResult.value.ok) {
        try {
            const movesRaw = await resMovesResult.value.json();
            // Convertir array a mapa por ID para búsqueda rápida
            if (Array.isArray(movesRaw)) {
                datosMovimientos = movesRaw.reduce((acc, m) => {
                    acc[m.id] = m;
                    return acc;
                }, {});
            } else {
                datosMovimientos = movesRaw;
            }
            console.log(`✅ Datos de Movimientos cargados: ${Object.keys(datosMovimientos).length} entradas.`);
        } catch (e) {
            console.error("❌ Error al parsear moves.json:", e);
        }
    } else {
        const reason = resMovesResult.reason || `Error HTTP ${resMovesResult.value?.status}`;
        console.warn(`⚠️ No se pudieron cargar los datos de movimientos (moves.json): ${reason}`);
    }

    // 3. Cargar Pokédex Extra (descripciones, opcional)
    if (resPokedexResult.status === 'fulfilled' && resPokedexResult.value.ok) {
        try {
            const pokedexRaw = await resPokedexResult.value.json();
            if (Array.isArray(pokedexRaw)) {
                datosPokedexExtra = pokedexRaw.reduce((acc, p) => {
                    acc[p.id] = p;
                    return acc;
                }, {});
            } else {
                datosPokedexExtra = pokedexRaw;
            }
            window.datosPokedexExtra = datosPokedexExtra;
            console.log(`✅ Datos extra de Pokédex cargados: ${Object.keys(datosPokedexExtra).length} entradas.`);
        } catch (e) {
            console.error("❌ Error al parsear pokedex.json:", e);
        }
    } else {
        const reason = resPokedexResult.reason || `Error HTTP ${resPokedexResult.value?.status}`;
        console.warn(`⚠️ No se pudieron cargar las descripciones (pokedex.json): ${reason}`);
    }
}

// Exponemos la promesa de carga para que otras partes de la UI puedan esperarla.
window.promesaCargaDatos = cargarPokemonsLocales();
