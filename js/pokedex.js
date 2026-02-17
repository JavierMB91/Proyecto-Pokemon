/**
 * pokedex.js
 * 
 * Lógica específica para la Pokédex de PokeMMO.
 * Maneja la carga masiva de datos, filtrado y renderizado eficiente.
 */

/* Variables locales para caché de datos */
let fullPokedex = []; // Array completo de IDs/Claves
let pokedexData = {}; // Objeto completo (pokédex.json)
let habilidadesData = {}; // habilidades.json
let movimientosData = {}; // movimientos.json

/* Configuración de paginación/scroll infinito */
const ITEMS_PER_PAGE = 30;
let currentPage = 1;
let currentFilteredList = []; // Lista actual filtrada
let currentPokemon = null;

/**
 * Función de entrada llamada desde script.js
 */
async function inicializarPokedex() {
    console.log("Inicializando Pokédex In-Game...");
    const grid = document.getElementById('pokedex-grid');
    if (!grid) {
        console.error("No se encontró el grid de la Pokédex (#pokedex-grid)");
        return;
    }

    // Mostrar loader elegante
    grid.innerHTML = '<div class="loading-spinner">Cargando base de datos...</div>';

    try {
        // Carga de JSONs
        await cargarDatosPokedex();
        
        if (!pokedexData || Object.keys(pokedexData).length === 0) {
            throw new Error("La base de datos de Pokémon está vacía.");
        }

        // Preparar lista inicial
        prepararListaInicial();
        console.log(`Pokédex cargada: ${fullPokedex.length} pokémon encontrados.`);

        // Renderizar primera página
        renderizarPagina(1, true);

        // Configurar eventos
        configurarFiltros();

    } catch (e) {
        console.error("Error inicializando Pokédex:", e);
        grid.innerHTML = `<div class="error-message" style="color:white; padding:20px;">Error: ${e.message}</div>`;
    }
}

/**
 * Carga los JSONs necesarios
 */
async function cargarDatosPokedex() {
    const [pokeRes, habRes, movRes] = await Promise.all([
        fetch('../js/data/pokedex.json'),
        fetch('../js/data/habilidades.json'),
        fetch('../js/data/movimientos.json')
    ]);

    if (!pokeRes.ok || !habRes.ok || !movRes.ok) {
        throw new Error(`Error HTTP: ${pokeRes.status}/${habRes.status}/${movRes.status}`);
    }

    pokedexData = await pokeRes.json();
    habilidadesData = await habRes.json();
    movimientosData = await movRes.json();
}

/**
 * Transforma el objeto de datos en una lista ordenada y filtrable
 */
function prepararListaInicial() {
    fullPokedex = Object.values(pokedexData).sort((a, b) => a.id - b.id);
    currentFilteredList = [...fullPokedex];
    actualizarContador();
}

/**
 * Renderiza una "página" de Pokémon en el grid.
 */
function renderizarPagina(page, clear = false) {
    const grid = document.getElementById('pokedex-grid');
    if (!grid) return;

    if (clear) {
        grid.innerHTML = '';
        currentPage = 1;
        // window.scrollTo(0, 0); // Opcional
    }

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = currentFilteredList.slice(start, end);

    if (items.length === 0 && clear) {
        grid.innerHTML = '<div class="no-results" style="color:white; padding:20px;">No se encontraron Pokémon.</div>';
        return;
    }

    items.forEach(pokemon => {
        try {
            const card = crearTarjetaPokemon(pokemon);
            grid.appendChild(card);
        } catch (err) {
            console.error("Error renderizando Pokémon:", pokemon.name, err);
        }
    });

    // Autoseleccionar el primero (Visualmente, sin abrir modal)
    if (clear && items.length > 0) {
        currentPokemon = items[0];
        setTimeout(() => {
            const firstHex = grid.querySelector('.pokemon-hex');
            if (firstHex) firstHex.classList.add('active');
        }, 50);
    }
}

/**
 * Crea el elemento HTML para un Pokémon en la cuadrícula (HEXÁGONO)
 */
function crearTarjetaPokemon(pokemon) {
    const hex = document.createElement('div');
    hex.className = 'pokemon-hex';
    hex.setAttribute('data-id', pokemon.id);
    
    hex.onclick = () => seleccionarPokemon(pokemon, hex);

    const nombre = pokemon.name_translations?.es?.name || pokemon.name || "Desconocido";
    const imgSrc = `../img/sprites/${pokemon.id}-0.png`;

    hex.innerHTML = `
        <img src="${imgSrc}" alt="${nombre}" class="hex-img" loading="lazy" onerror="this.src='../img/master_ball.png'">
        <span class="hex-id">${pokemon.id.toString().padStart(3, '0')}</span>
    `;

    return hex;
}

/**
 * Muestra los detalles del Pokémon en el Panel de Resumen (Modal In-Game)
 */
function seleccionarPokemon(pokemon, element) {
    currentPokemon = pokemon;
    
    // 1. Manejar estado visual de la cuadrícula
    document.querySelectorAll('.pokemon-hex').forEach(h => h.classList.remove('active'));
    if (element) element.classList.add('active');

    const modal = document.getElementById('summary-modal');
    const summaryBody = document.getElementById('summary-body');
    if (!modal || !summaryBody) return;

    // 2. Preparar Datos
    const nombre = pokemon.name_translations?.es?.name || pokemon.name;
    const imgSrc = `../img/sprites/${pokemon.id}-0.png`;

    // Tipos
    const tiposHtml = pokemon.types.map(tipo => {
        const nombreArchivo = tipo.toLowerCase().replace('é', 'e').replace('í', 'i').replace('ó', 'o');
        return `<img src="../img/tipos/${nombreArchivo}.png" alt="${tipo}" class="type-icon-large" title="${tipo}">`;
    }).join('');

    // Stats
    let htmlStats = '';
    pokemon.stats.forEach(s => {
        const percent = Math.min((s.base_stat / 255) * 100, 100);
        htmlStats += `
            <div class="stat-row">
                <span class="stat-name">${s.stat_name}</span>
                <span class="stat-val">${s.base_stat}</span>
                <div class="stat-bar-bg">
                    <div class="stat-bar-fill" style="width: ${percent}%"></div>
                </div>
            </div>
        `;
    });

    // Habilidades
    let htmlAbilities = '';
    pokemon.abilities.forEach(ab => {
        let desc = "Sin descripción.";
        const foundAbility = Object.values(habilidadesData).find(h => 
            h.name_translations?.es?.name === ab.ability_name
        );
        if (foundAbility?.effect_translations?.es) {
            desc = foundAbility.effect_translations.es.effect;
        }
        htmlAbilities += `
            <div class="ability-item">
                <div class="ability-name">${ab.ability_name} ${ab.is_hidden ? '<span style="color:#d21212;">(Oculta)</span>' : ''}</div>
                <div class="ability-desc">${desc}</div>
            </div>
        `;
    });

    // 3. Renderizar Contenido
    summaryBody.innerHTML = `
        <div class="sum-main">
            <img src="${imgSrc}" class="sum-img" alt="${nombre}">
            <div class="sum-title">
                <div class="sum-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                <h2 class="sum-name">${nombre}</h2>
            </div>
        </div>

        <div id="stab-datos" class="tab-content active">
            <div class="sum-section">
                <h4>Tipos</h4>
                <div class="detail-types">${tiposHtml}</div>
            </div>
            <div class="sum-section" style="margin-top:20px;">
                <h4>Habilidades</h4>
                ${htmlAbilities}
            </div>
        </div>

        <div id="stab-stats" class="tab-content">
            <div class="sum-section">
                <h4>Estadísticas Base</h4>
                <div class="stats-container">${htmlStats}</div>
            </div>
        </div>

        <div id="stab-moves" class="tab-content">
            <div class="sum-section">
                <h4>Movimientos</h4>
                <div class="moves-container-full">${generarHTMLMovimientosClasificados(pokemon)}</div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    configurarEventosSummary();
}

function configurarEventosSummary() {
    const modal = document.getElementById('summary-modal');
    const closeBtn = document.getElementById('close-summary');
    const tabBtns = document.querySelectorAll('.s-tab-btn');

    if(closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

    tabBtns.forEach(btn => {
        btn.onclick = () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`stab-${tabId}`).classList.add('active');
        };
    });
}

function configurarFiltros() {
    const searchInput = document.getElementById('pokedex-search');
    const typeSelect = document.getElementById('filter-type');
    const genSelect = document.getElementById('filter-gen');
    if(!searchInput || !genSelect) return;

    const typeMap = {
        'all': 'all', 'normal': 'Normal', 'fire': 'Fuego', 'water': 'Agua',
        'grass': 'Planta', 'electric': 'Eléctrico', 'ice': 'Hielo',
        'fighting': 'Lucha', 'poison': 'Veneno', 'ground': 'Tierra',
        'flying': 'Volador', 'psychic': 'Psíquico', 'bug': 'Bicho',
        'rock': 'Roca', 'ghost': 'Fantasma', 'dragon': 'Dragón',
        'steel': 'Acero', 'dark': 'Siniestro'
    };

    const aplicarFiltros = () => {
        const query = searchInput.value.toLowerCase();
        const typeValue = typeSelect?.value || 'all';
        const targetType = typeMap[typeValue] || typeValue;
        const gen = genSelect.value;

        currentFilteredList = fullPokedex.filter(p => {
            const pName = (p.name_translations?.es?.name || p.name).toLowerCase();
            const matchName = pName.includes(query) || p.id.toString() === query;
            const matchType = typeValue === 'all' || p.types.includes(targetType);
            
            let matchGen = true;
            if (gen !== 'all') {
                const id = p.id;
                if (gen === '1') matchGen = id <= 151;
                else if (gen === '2') matchGen = id > 151 && id <= 251;
                else if (gen === '3') matchGen = id > 251 && id <= 386;
                else if (gen === '4') matchGen = id > 386 && id <= 493;
                else if (gen === '5') matchGen = id > 493 && id <= 649;
            }
            return matchName && matchType && matchGen;
        });

        actualizarContador();
        renderizarPagina(1, true);
    };

    let timeout = null;
    searchInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(aplicarFiltros, 300);
    });

    if(typeSelect) typeSelect.addEventListener('change', aplicarFiltros);
    genSelect.addEventListener('change', aplicarFiltros);
}

function actualizarContador() {
    const total = fullPokedex.length || 649;
    const seen = currentFilteredList.length;
    const owned = Math.floor(seen * 0.95);
    const ot = Math.floor(owned * 0.88);
    const alpha = Math.floor(ot * 0.12);

    actualizarBarra('seen', seen, total);
    actualizarBarra('owned', owned, total);
    actualizarBarra('ot', ot, total);
    actualizarBarra('alpha', alpha, total);
}

function actualizarBarra(id, val, total) {
    const label = document.getElementById(`stat-${id}`);
    const bar = document.querySelector(`.stat-bar.${id} .bar-fill`);
    if(label) label.textContent = `${val} / ${total}`;
    if(bar) bar.style.width = `${(val / total) * 100}%`;
}

function generarHTMLMovimientosClasificados(pokemon) {
    if (!pokemon.moves || pokemon.moves.length === 0) return '<p>No hay datos.</p>';
    const listaMOs = ['Corte', 'Vuelo', 'Surf', 'Fuerza', 'Destello', 'Torbellino', 'Cascada', 'Golpe Roca', 'Buceo', 'Treparrocas'];
    const categorias = { 'Nivel': [], 'MT': [], 'MO': [], 'Tutor': [], 'Huevo': [] };

    pokemon.moves.forEach(m => {
        if (m.type === 'Nivel') categorias['Nivel'].push(m);
        else if (m.type === 'Mov. Huevo') categorias['Huevo'].push(m);
        else if (m.type === 'Tutor') categorias['Tutor'].push(m);
        else if (m.type === 'MT/MO') {
            if (listaMOs.includes(m.name)) categorias['MO'].push(m);
            else categorias['MT'].push(m);
        }
    });

    categorias['Nivel'].sort((a, b) => a.level - b.level);
    let html = '<div class="moves-grid-columns">';
    const crearCol = (titulo, lista, extraFn) => {
        if (lista.length === 0) return '';
        let itemsHtml = lista.map(m => `<div class="move-row">${m.name} ${extraFn?extraFn(m):''}</div>`).join('');
        return `<div class="move-column"><h5 class="move-cat-title">${titulo}</h5><div class="move-cat-list">${itemsHtml}</div></div>`;
    };

    html += crearCol('Nivel', categorias['Nivel'], (m) => `<span class="move-level">Nv.${m.level}</span>`);
    html += crearCol('MT', categorias['MT']);
    html += crearCol('MO', categorias['MO']);
    html += crearCol('Tutor', categorias['Tutor']);
    html += crearCol('Huevo', categorias['Huevo']);
    return html + '</div>';
}
isan
