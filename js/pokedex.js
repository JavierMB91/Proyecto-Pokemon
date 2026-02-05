/**
 * pokedex.js
 * 
 * MÓDULO DE POKÉDEX
 * ----------------
 * Gestiona la visualización y funcionalidad de la Pokédex
 * Carga pokémons desde los datos JSON y los muestra con sprites
 */

let datosPokemonsSprites = [];
let datosPokemonsInfo = [];
let datosHabilidades = {};
let datosTipos = {};
let pokemonsRenderizados = [];

/**
 * Carga los datos de pokémons desde los archivos JSON
 */
async function cargarDatosPokedex() {
    try {
        const [spritesRes, infoRes, habilidadesRes, tiposRes] = await Promise.all([
            fetch('../js/data/pokemons_sprites.json'),
            fetch('../js/data/pokemons.json'),
            fetch('../js/data/habilidades.json'),
            fetch('../js/data/tipos.json')
        ]);

        if (!spritesRes.ok || !infoRes.ok || !habilidadesRes.ok || !tiposRes.ok) {
            console.error('Error cargando datos de pokémons');
            return;
        }

        const spritesData = await spritesRes.json();
        const infoData = await infoRes.json();
        const habilidadesData = await habilidadesRes.json();
        const tiposData = await tiposRes.json();

        // Convertir a arrays
        datosPokemonsSprites = Object.values(spritesData);
        datosPokemonsInfo = infoData;
        datosHabilidades = habilidadesData;
        datosTipos = tiposData;

        console.log(`Cargados ${datosPokemonsSprites.length} pokémons con sprites`);
        
        // Renderizar la galería
        renderizarGaleriaPokedex();
    } catch (error) {
        console.error('Error al cargar datos de pokémons:', error);
    }
}

/**
 * Renderiza la galería de pokémons en el grid
 */
function renderizarGaleriaPokedex() {
    const gridSection = document.getElementById('pokemonGrid');
    if (!gridSection) return;

    gridSection.innerHTML = '';
    pokemonsRenderizados = [];

    datosPokemonsSprites.forEach(pokemon => {
        const tarjeta = crearTarjetaPokemon(pokemon);
        if (tarjeta) {
            gridSection.appendChild(tarjeta);
            pokemonsRenderizados.push(pokemon);
        }
    });

    if (pokemonsRenderizados.length === 0) {
        gridSection.innerHTML = '<p class="loading-msg">No se encontraron pokémons</p>';
    }
}

/**
 * Crea una tarjeta visual de un pokémon
 * @param {Object} pokemon - Datos del pokémon con sprites
 * @returns {HTMLElement} Elemento de tarjeta
 */
function crearTarjetaPokemon(pokemon) {
    if (!pokemon || !pokemon.id) return null;

    const tarjeta = document.createElement('div');
    tarjeta.className = 'pokemon-card';
    tarjeta.setAttribute('data-pokemon-name', pokemon.name);
    tarjeta.setAttribute('data-pokemon-id', pokemon.id);

    // Obtener sprite - usar el mejor disponible
    const sprite = obtenerMejorSprite(pokemon.sprites);
    
    // Obtener información adicional si existe
    const info = datosPokemonsInfo[pokemon.name] || {};

    tarjeta.innerHTML = `
        <div class="pokemon-image">
            <img 
                src="${sprite}" 
                alt="${pokemon.name}" 
                loading="lazy"
                onerror="this.src='../img/pokeball.png'"
            >
        </div>
        <div class="pokemon-info">
            <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
            <div class="pokemon-name">${pokemon.name}</div>
            ${info.types ? `<div class="pokemon-types">${generarTipoBadges(info.types)}</div>` : ''}
        </div>
    `;

    tarjeta.addEventListener('click', () => mostrarDetallesPokemon(pokemon, info));

    return tarjeta;
}

/**
 * Selecciona el mejor sprite disponible para un pokémon
 * @param {Object} sprites - Objeto de sprites del pokémon
 * @returns {string} URL del sprite
 */
function obtenerMejorSprite(sprites) {
    if (!sprites) return '../img/pokeball.png';

    // Intentar en orden de preferencia
    if (sprites.other?.['official-artwork']?.front_default) {
        return sprites.other['official-artwork'].front_default;
    }
    if (sprites.other?.home?.front_default) {
        return sprites.other.home.front_default;
    }
    if (sprites.front_default) {
        return sprites.front_default;
    }
    
    return '../img/pokeball.png';
}

/**
 * Genera badges HTML para los tipos de un pokémon
 * @param {Array} types - Array de tipos
 * @returns {string} HTML de badges
 */
function generarTipoBadges(types) {
    if (!Array.isArray(types)) return '';
    
    return types.map(type => {
        // Manejar si es un string simple o un objeto con propiedad type
        const nombreTipo = typeof type === 'string' ? type : type.type?.name || type;
        const nombreTipoES = obtenerNombreTipoES(nombreTipo);
        return `<span class="type-badge" style="background-color: ${obtenerColorTipo(nombreTipo)}">${nombreTipoES}</span>`;
    }).join('');
}

/**
 * Obtiene el color correspondiente a un tipo de pokémon
 * @param {string} tipo - Nombre del tipo
 * @returns {string} Color hexadecimal
 */
function obtenerColorTipo(tipo) {
    const coloresTipo = {
        'normal': '#A8A878',
        'fire': '#F08030',
        'water': '#6890F0',
        'electric': '#F8D030',
        'grass': '#78C850',
        'ice': '#98D8D8',
        'fighting': '#C03028',
        'poison': '#A040A0',
        'ground': '#E0C068',
        'flying': '#A890F0',
        'psychic': '#F85888',
        'bug': '#A8B820',
        'rock': '#B8A038',
        'ghost': '#705898',
        'dragon': '#7038F8',
        'dark': '#705848',
        'steel': '#B8B8D0',
        'fairy': '#EE99AC'
    };
    return coloresTipo[tipo.toLowerCase()] || '#A8A878';
}

/**
 * Obtiene el nombre en español de un tipo
 * @param {string} tipoIngles - Nombre del tipo en inglés
 * @returns {string} Nombre en español
 */
function obtenerNombreTipoES(tipoIngles) {
    const tiposES = {
        'normal': 'Normal',
        'fire': 'Fuego',
        'water': 'Agua',
        'electric': 'Eléctrico',
        'grass': 'Planta',
        'ice': 'Hielo',
        'fighting': 'Lucha',
        'poison': 'Veneno',
        'ground': 'Tierra',
        'flying': 'Volador',
        'psychic': 'Psíquico',
        'bug': 'Bicho',
        'rock': 'Roca',
        'ghost': 'Fantasma',
        'dragon': 'Dragón',
        'dark': 'Siniestro',
        'steel': 'Acero',
        'fairy': 'Hada'
    };
    return tiposES[tipoIngles.toLowerCase()] || tipoIngles;
}

/**
 * Obtiene el nombre en español de una habilidad
 * @param {string} abilityName - Nombre de la habilidad en inglés
 * @returns {string} Nombre en español o el original si no lo encuentra
 */
function obtenerNombreHabilidadES(abilityName) {
    if (!abilityName || !datosHabilidades[abilityName]) {
        return abilityName;
    }
    const ability = datosHabilidades[abilityName];
    return ability.name_translations?.es?.name || abilityName;
}

/**
 * Obtiene el nombre en español de una estadística
 * @param {string} statName - Nombre de la estadística en inglés
 * @returns {string} Nombre en español
 */
function obtenerNombreStatES(statName) {
    const statsES = {
        'hp': 'PS',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'At. Esp.',
        'special-defense': 'Def. Esp.',
        'speed': 'Velocidad'
    };
    return statsES[statName.toLowerCase()] || statName;
}

/**
 * Muestra los detalles de un pokémon en un modal
 * @param {Object} pokemon - Datos del pokémon
 * @param {Object} info - Información adicional
 */
function mostrarDetallesPokemon(pokemon, info) {
    const modal = document.createElement('div');
    modal.className = 'pokedex-modal-overlay active';
    modal.id = 'pokemonModal';

    const sprite = obtenerMejorSprite(pokemon.sprites);

    let contenidoModal = `
        <div class="pokedex-detail-content">
            <button class="pokedex-close-btn" onclick="document.getElementById('pokemonModal').remove()">×</button>
            
            <div class="pokedex-modal-header">
                <img src="${sprite}" alt="${pokemon.name}" class="pokedex-modal-img">
                <h2 class="pokedex-modal-title">${pokemon.name}</h2>
                <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
            </div>

            ${info.types ? `
                <div style="text-align: center;">
                    ${generarTipoBadges(info.types)}
                </div>
            ` : ''}
    `;

    // Agregar información adicional si existe
    if (info && Object.keys(info).length > 0) {
        contenidoModal += `
            <div class="pokedex-stats-container">
                ${info.base_experience ? `<p><strong>Experiencia Base:</strong> ${info.base_experience}</p>` : ''}
                ${info.capture_rate ? `<p><strong>Tasa de Captura:</strong> ${info.capture_rate}%</p>` : ''}
                ${info.is_legendary ? `<p><strong style="color: var(--poke-red)">Legendario</strong></p>` : ''}
                ${info.is_mythical ? `<p><strong style="color: var(--poke-yellow)">Mítico</strong></p>` : ''}
            </div>
        `;
    }

    // Agregar habilidades si existen
    if (info.abilities && info.abilities.length > 0) {
        const habilidades = info.abilities.map(a => {
            let nombre;
            if (typeof a === 'string') {
                nombre = a;
            } else if (a.ability?.name) {
                nombre = a.ability.name;
            } else if (a.ability_name) {
                nombre = a.ability_name;
            } else {
                nombre = a;
            }
            // Obtener nombre en español
            const nombreES = obtenerNombreHabilidadES(nombre);
            return `<li>${nombreES}</li>`;
        }).join('');
        
        contenidoModal += `
            <div class="pokedex-stats-container">
                <h4>Habilidades</h4>
                <ul style="list-style: none; padding: 0;">${habilidades}</ul>
            </div>
        `;
    }

    // Agregar estadísticas base si existen
    if (info.stats && info.stats.length > 0) {
        const statsHTML = info.stats.map(stat => {
            const statName = stat.stat_name || stat.name || '';
            const baseStat = stat.base_stat || 0;
            const nombreES = obtenerNombreStatES(statName);
            const porcentaje = Math.min((baseStat / 150) * 100, 100); // Máximo visual al 150
            
            return `
                <div class="pokedex-stat-row">
                    <div class="pokedex-stat-label">${nombreES}</div>
                    <div class="pokedex-stat-value">${baseStat}</div>
                    <div class="pokedex-stat-bar">
                        <div class="pokedex-stat-bar-fill" style="width: ${porcentaje}%"></div>
                    </div>
                </div>
            `;
        }).join('');

        contenidoModal += `
            <div class="pokedex-stats-container">
                <h4>Estadísticas Base</h4>
                ${statsHTML}
            </div>
        `;
    }

    contenidoModal += `
            <button 
                class="btn-plant-confirm" 
                style="width: 100%; margin-top: 15px;"
                onclick="document.getElementById('pokemonModal').remove()"
            >
                Cerrar
            </button>
        </div>
    `;

    modal.innerHTML = contenidoModal;
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}

/**
 * Filtra y busca pokémons
 */
function filtrarPokemons() {
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const generationFilter = document.getElementById('generationFilter');
    const regionFilter = document.getElementById('regionFilter');

    if (!searchInput) return;

    const searchValue = searchInput.value.toLowerCase();
    const typeValue = typeFilter?.value?.toLowerCase() || '';
    const genValue = generationFilter?.value || '';
    const regionValue = regionFilter?.value || '';

    const gridSection = document.getElementById('pokemonGrid');
    const tarjetas = gridSection.querySelectorAll('.pokemon-card');

    let visibles = 0;
    tarjetas.forEach(tarjeta => {
        const nombre = tarjeta.getAttribute('data-pokemon-name').toLowerCase();
        const id = tarjeta.getAttribute('data-pokemon-id');
        
        const cumpleBusqueda = nombre.includes(searchValue) || id.includes(searchValue);
        
        if (cumpleBusqueda) {
            tarjeta.style.display = 'flex';
            visibles++;
        } else {
            tarjeta.style.display = 'none';
        }
    });

    if (visibles === 0) {
        if (!gridSection.querySelector('.loading-msg')) {
            const msg = document.createElement('p');
            msg.className = 'loading-msg';
            msg.textContent = 'No se encontraron pokémons con ese criterio';
            gridSection.appendChild(msg);
        }
    } else {
        const msg = gridSection.querySelector('.loading-msg');
        if (msg) msg.remove();
    }
}

/**
 * Inicializa los eventos de búsqueda y filtros
 */
function inicializarEventosPokedex() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarPokemons);
    }

    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', filtrarPokemons);
    }

    const generationFilter = document.getElementById('generationFilter');
    if (generationFilter) {
        generationFilter.addEventListener('change', filtrarPokemons);
    }

    const regionFilter = document.getElementById('regionFilter');
    if (regionFilter) {
        regionFilter.addEventListener('change', filtrarPokemons);
    }
}

// Inicializar cuando se renderize la pokedex
// Este listener se ejecutará desde script.js después de renderizarAplicacion()
function inicializarPokedex() {
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('pokedex')) {
        cargarDatosPokedex();
        setTimeout(inicializarEventosPokedex, 500);
    }
}
