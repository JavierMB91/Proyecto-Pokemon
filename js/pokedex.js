const pokedexContainer = document.getElementById('pokedex-container');
let allPokemon = [];
let monsterDataMap = {};
let regionsData = [];
let movesDataMap = {};

// --- Diccionarios de Traducción ---
const typeTranslations = {
    "Normal": "Normal",
    "Fire": "Fuego",
    "Water": "Agua",
    "Grass": "Planta",
    "Electric": "Eléctrico",
    "Ice": "Hielo",
    "Fighting": "Lucha",
    "Poison": "Veneno",
    "Ground": "Tierra",
    "Flying": "Volador",
    "Psychic": "Psíquico",
    "Bug": "Bicho",
    "Rock": "Roca",
    "Ghost": "Fantasma",
    "Dragon": "Dragón",
    "Steel": "Acero",
    "Dark": "Siniestro",
    "Fairy": "Hada"
};

const abilityTranslations = {
    "Overgrow": "Espesura",
    "Chlorophyll": "Clorofila",
    "Blaze": "Mar Llamas",
    "Solar Power": "Poder Solar",
    "Torrent": "Torrente",
    "Rain Dish": "Cura Lluvia",
    "Shield Dust": "Polvo Escudo",
    "Run Away": "Fuga",
    "Shed Skin": "Mudar",
    "Compoundeyes": "Ojo Compuesto",
    "Tinted Lens": "Cromolente",
    "Keen Eye": "Vista Lince",
    "Tangled Feet": "Tumbos",
    "Big Pecks": "Sacapecho",
    "Guts": "Agallas",
    "Hustle": "Entusiasmo",
    "Intimidate": "Intimidación",
    "Unnerve": "Nerviosismo",
    "Static": "Elec. Estática",
    "Lightningrod": "Pararrayos",
    "Sand Veil": "Velo Arena",
    "Sand Rush": "Ímpetu Arena",
    "Poison Point": "Punto Tóxico",
    "Rivalry": "Rivalidad",
    "Sheer Force": "Potencia Bruta",
    "Cute Charm": "Gran Encanto",
    "Magic Guard": "Muro Mágico",
    "Friend Guard": "Compiescolta",
    "Competitive": "Tenacidad",
    "Frisk": "Cacheo",
    "Inner Focus": "Foco Interno",
    "Infiltrator": "Allanamiento",
    "Stench": "Hedor",
    "Effect Spore": "Efecto Espora",
    "Dry Skin": "Piel Seca",
    "Damp": "Humedad",
    "Wonder Skin": "Piel Milagro",
    "Arena Trap": "Trampa Arena",
    "Sand Force": "Poder Arena",
    "Pickup": "Recogida",
    "Technician": "Experto",
    "Limber": "Flexibilidad",
    "Cloud Nine": "Aclimatación",
    "Swift Swim": "Nado Rápido",
    "Vital Spirit": "Espíritu Vital",
    "Anger Point": "Irascible",
    "Defiant": "Competitivo",
    "Justified": "Justiciero",
    "Water Absorb": "Absorbe Agua",
    "Synchronize": "Sincronía",
    "No Guard": "Indefenso",
    "Steadfast": "Impasible",
    "Gluttony": "Gula",
    "Clear Body": "Cuerpo Puro",
    "Liquid Ooze": "Lodo Líquido",
    "Rock Head": "Cabeza Roca",
    "Sturdy": "Robustez",
    "Oblivious": "Despiste",
    "Own Tempo": "Ritmo Propio",
    "Regenerator": "Regeneración",
    "Magnet Pull": "Imán",
    "Analytic": "Cálculo Final",
    "Early Bird": "Madrugar",
    "Thick Fat": "Sebo",
    "Hydration": "Hidratación",
    "Ice Body": "Gélido",
    "Shell Armor": "Caparazón",
    "Skill Link": "Encadenado",
    "Overcoat": "Funda",
    "Weak Armor": "Armadura Frágil",
    "Natural Cure": "Cura Natural",
    "Serene Grace": "Dicha",
    "Healer": "Alma Cura",
    "Hyper Cutter": "Corte Fuerte",
    "Soundproof": "Insonorizar",
    "Aftermath": "Resquicio",
    "Levitate": "Levitación",
    "Reactive Gas": "Gas Reactivo",
    "Insomnia": "Insomnio",
    "Forewarn": "Alerta",
    "Harvest": "Cosecha",
    "Battle Armor": "Armadura Batalla",
    "Adaptability": "Adaptable",
    "Anticipation": "Anticipación",
    "Water Veil": "Velo Agua",
    "Filter": "Filtro",
    "Pressure": "Presión",
    "Snow Cloak": "Manto Níveo",
    "Marvel Scale": "Escama Especial",
    "Multiscale": "Compensación",
    "Immunity": "Inmunidad",
    "Imposter": "Impostor",
    "Moxie": "Autoestima",
    "Sticky Hold": "Viscosidad",
    "Poison Touch": "Toque Tóxico",
    "Mold Breaker": "Rompemoldes",
    "Iron Fist": "Puño Férreo",
    "Prankster": "Bromista",
    "Sand Stream": "Chorro Arena",
    "Snow Warning": "Nevada",
    "Flame Body": "Cuerpo Llama",
    "Minus": "Menos",
    "Plus": "Más",
    "Download": "Descarga",
    "Motor Drive": "Motor",
    "Unaware": "Ignorante",
    "Simple": "Simple",
    "Solid Rock": "Roca Sólida",
    "Sniper": "Francotirador",
    "Super Luck": "Afortunado",
    "Solar Power": "Poder Solar",
    "Drought": "Sequía",
    "Drizzle": "Llovizna",
    "Trace": "Rastro",
    "Snow Plow": "Quitanieves",
    "Cursed Body": "Cuerpo Maldito",
    "Rattled": "Cobardía",
    "Leaf Guard": "Defensa Hoja",
    "Reckless": "Audaz",
    "Unburden": "Liviano",
    "Scrappy": "Intrépido",
    "Klutz": "Zoquete",
    "Rough Skin": "Piel Tosca",
    "Telepathy": "Telepatía",
    "Flash Fire": "Absorbe Fuego",
    "Air Lock": "Bucle Aire",
    "Bad Dreams": "Mal Sueño",
    "Color Change": "Cambio Color",
    "Defeatist": "Flaqueza",
    "Forecast": "Predicción",
    "Heatproof": "Ignífugo",
    "Heavy Metal": "Metal Pesado",
    "Honey Gather": "Recogemiel",
    "Huge Power": "Potencia",
    "Illuminate": "Iluminación",
    "Illusion": "Ilusión",
    "Iron Barbs": "Punta Acero",
    "Light Metal": "Metal Liviano",
    "Magma Armor": "Escudo Magma",
    "Magic Bounce": "Espejo Mágico",
    "Moody": "Veleta",
    "Mummy": "Momia",
    "Multitype": "Multitipo",
    "Normalize": "Normalidad",
    "Pickpocket": "Hurto",
    "Poison Heal": "Antídoto",
    "Pure Power": "Energía Pura",
    "Quick Feet": "Pies Rápidos",
    "Sap Sipper": "Herbívoro",
    "Shadow Tag": "Sombra Trampa",
    "Slow Start": "Inicio Lento",
    "Speed Boost": "Impulso",
    "Stall": "Rezagado",
    "Storm Drain": "Colector",
    "Suction Cups": "Ventosas",
    "Swarm": "Enjambre",
    "Teravolt": "Terravoltaje",
    "Toxic Boost": "Ímpetu Tóxico",
    "Truant": "Ausente",
    "Turboblaze": "Turbollama",
    "Victory Star": "Tino Victoria",
    "White Smoke": "Humo Blanco",
    "Wonder Guard": "Superguarda",
    "Zen Mode": "Modo Daruma",
    "Flare Boost": "Ímpetu Ardiente"
};

function translateType(type) {
    if (!type) return type;
    // Normalizar entrada: primera mayúscula, resto minúscula (ej: "FIRE" -> "Fire")
    const normalized = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    return typeTranslations[normalized] || type;
}

function translateCategory(category) {
    if (category === 'Physical') return 'Físico';
    if (category === 'Special') return 'Especial';
    if (category === 'Status') return 'Estado';
    return category || '-';
}

function translateAbility(ability) {
    return abilityTranslations[ability] || ability;
}

async function loadPokedex() {
    try {
        // Cargar archivos JSON en paralelo (incluyendo regiones)
        const [pokedexRes, monstersRes, regionsRes, movesRes] = await Promise.all([
            fetch('../js/data/pokedex.json'),
            fetch('../js/data/pokemons.json'),
            fetch('../js/data/filtro_region.json'),
            fetch('../js/data/movimientos.json')
        ]);

        const pokedexData = await pokedexRes.json();
        const monstersData = await monstersRes.json();
        regionsData = await regionsRes.json();
        const movesData = await movesRes.json();
        
        allPokemon = pokedexData;
        
        // Indexar detalles técnicos por ID para acceso rápido
        if (Array.isArray(monstersData)) {
            monstersData.forEach(m => monsterDataMap[m.id] = m);
        }

        // Indexar movimientos por ID
        if (Array.isArray(movesData)) {
            movesData.forEach(m => movesDataMap[m.id] = m);
        }

        // Inicializar el modal en el DOM
        createModalHTML();

        setupFilters();
        renderPokemonList(allPokemon);
    } catch (error) {
        console.error('Error al cargar la pokedex:', error);
    }
}

function setupFilters() {
    const searchContainer = document.querySelector('.pokedex-search-container');
    if (!searchContainer) return;

    searchContainer.innerHTML = ''; // Limpiar contenedor
    
    // Estilos para alinear input y select
    searchContainer.style.display = 'flex';
    searchContainer.style.gap = '10px';
    searchContainer.style.flexWrap = 'wrap';

    // Input de búsqueda
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar Pokémon...';
    input.className = 'modal-input';
    input.style.marginBottom = '0';
    input.style.flex = '2';
    input.style.minWidth = '200px';

    // Select de región
    const select = document.createElement('select');
    select.className = 'modal-input';
    select.style.marginBottom = '0';
    select.style.flex = '1';
    select.style.minWidth = '150px';
    select.style.cursor = 'pointer';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.textContent = 'Todas las Regiones';
    select.appendChild(defaultOption);

    // Obtener regiones únicas del objeto regionsData
    const regionsSet = new Set();
    if (regionsData && typeof regionsData === 'object') {
        Object.values(regionsData).forEach(entry => {
            if (entry && typeof entry === 'object') {
                Object.keys(entry).forEach(region => {
                    if (region !== 'National') {
                        regionsSet.add(region);
                    }
                });
            }
        });
    }

    // Ordenar regiones (Kanto, Johto, Hoenn, Sinnoh, Unova/Teselia, etc.)
    const regionOrder = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Teselia', 'Kalos', 'Alola', 'Galar'];
    const sortedRegions = Array.from(regionsSet).sort((a, b) => {
        const indexA = regionOrder.indexOf(a);
        const indexB = regionOrder.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
    });

    sortedRegions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        select.appendChild(option);
    });

    // Función de filtrado unificada
    const applyFilters = () => {
        const term = input.value.toLowerCase();
        const selectedRegion = select.value;

        let filtered = allPokemon;

        // 1. Filtrar por región
        if (selectedRegion !== 'all') {
            filtered = filtered.filter(p => {
                // Intentar buscar por nombre exacto
                let regionEntry = regionsData[p.name];
                
                // Fallback para nombres con caracteres especiales (ej: Farfetch'd vs Farfetch’d)
                if (!regionEntry) {
                    const normalizedName = p.name.replace('’', "'");
                    regionEntry = regionsData[normalizedName];
                }

                return regionEntry && regionEntry[selectedRegion] !== undefined;
            });

            // Ordenar por número de dex regional
            filtered.sort((a, b) => {
                let entryA = regionsData[a.name] || regionsData[a.name.replace('’', "'")];
                let entryB = regionsData[b.name] || regionsData[b.name.replace('’', "'")];
                
                const valA = entryA ? entryA[selectedRegion] : 9999;
                const valB = entryB ? entryB[selectedRegion] : 9999;
                
                return valA - valB;
            });
        } else {
            // Ordenar por ID nacional por defecto
            filtered.sort((a, b) => a.dex - b.dex);
        }

        // 2. Filtrar por nombre
        if (term) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(term));
        }

        renderPokemonList(filtered);
    };

    input.addEventListener('input', applyFilters);
    select.addEventListener('change', applyFilters);

    searchContainer.appendChild(input);
    searchContainer.appendChild(select);
}

function renderPokemonList(pokemons) {
    pokedexContainer.innerHTML = ''; // Limpiar contenedor

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${pokemon.dex}.png`;
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${pokemon.name}" class="pokemon-image" loading="lazy" onerror="this.style.display='none'">
            <span class="pokemon-id">#${pokemon.dex}</span>
            <h3 class="pokemon-name">${pokemon.name}</h3>
            <div class="pokemon-types">
                ${pokemon.types.map(t => `<span class="type-badge">${translateType(t)}</span>`).join('')}
            </div>
        `;
        
        card.addEventListener('click', () => {
            const details = monsterDataMap[pokemon.dex];
            openModal(pokemon, details, imageUrl);
        });
        
        pokedexContainer.appendChild(card);
    });
}

// --- Funciones del Modal ---

function createModalHTML() {
    // Verificar si el modal y su cuerpo ya existen correctamente
    const existingModal = document.getElementById('pokedex-modal');
    const existingBody = document.getElementById('pokedex-modal-body');

    if (existingModal && existingBody) return;

    // Si el modal existe pero está incompleto (versión vieja), eliminarlo
    if (existingModal) existingModal.remove();

    const modalHTML = `
        <div id="pokedex-modal" class="pokedex-modal-overlay">
            <div class="pokedex-detail-content">
                <button class="pokedex-close-btn" onclick="closeModal()">&times;</button>
                <div id="pokedex-modal-body">
                    <!-- El contenido se llenará dinámicamente -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Cerrar al hacer clic fuera del contenido
    document.getElementById('pokedex-modal').addEventListener('click', (e) => {
        if (e.target.id === 'pokedex-modal') closeModal();
    });
}

function openModal(basicInfo, details, imageUrl) {
    const modal = document.getElementById('pokedex-modal');
    const modalBody = document.getElementById('pokedex-modal-body');

    // Seguridad extra: si por alguna razón no existe el cuerpo, intentar recrearlo
    if (!modalBody) {
        console.error("Error: Modal body not found. Recreating...");
        createModalHTML();
        return openModal(basicInfo, details, imageUrl);
    }

    if (!details) {
        alert("Detalles no disponibles para este Pokémon.");
        return;
    }

    // Mapeo de nombres de stats
    const statNames = {
        hp: 'HP',
        attack: 'Ataque',
        defense: 'Defensa',
        sp_attack: 'Atq. Esp',
        sp_defense: 'Def. Esp',
        speed: 'Velocidad'
    };

    // Colores para las barras
    const statColors = {
        hp: '#ff5959',
        attack: '#f5ac78',
        defense: '#fae078',
        sp_attack: '#9db7f5',
        sp_defense: '#a7db8d',
        speed: '#fa92b2'
    };

    // Orden específico para PokeMMO: HP, Atk, Def, SpA, SpD, Spe
    const statOrder = ['hp', 'attack', 'defense', 'sp_attack', 'sp_defense', 'speed'];

    let statsHTML = '';
    // Usamos details.stats que viene de pokemons.json
    if (details.stats) {
        statOrder.forEach(key => {
            const value = details.stats[key];
            if (value !== undefined) {
                const width = Math.min((value / 255) * 100, 100); 
                statsHTML += `
                    <div class="pokedex-stat-row">
                        <span class="stat-label" style="width: 80px;">${statNames[key] || key}</span>
                        <div class="stat-bar-bg">
                            <div class="stat-bar-fill" style="width: ${width}%; background-color: ${statColors[key] || '#4CAF50'};"></div>
                        </div>
                        <span class="stat-val">${value}</span>
                    </div>
                `;
            }
        });
    }

    const uniqueAbilities = details.abilities 
        ? [...new Set(details.abilities.map(a => translateAbility(a.name)))]
        : [];
    const abilitiesString = uniqueAbilities.length > 0 ? uniqueAbilities.join(', ') : 'N/A';
    const uniqueTypes = [...new Set(basicInfo.types)];

    // --- Generar Tabla de Movimientos ---
    let movesTableHTML = '';
    if (details.moves && details.moves.length > 0) {
        const rows = details.moves.map(move => {
            const moveData = movesDataMap[move.id];
            if (!moveData) return '';

            let method = move.type;
            if (move.type === 'level') method = `Nv. ${move.level}`;
            else if (move.type === 'EGG') method = 'Huevo';
            else if (move.type === 'TUTOR') method = 'Tutor';
            else if (move.type.startsWith('TM')) method = 'MT';
            else if (move.type === 'EVOLVE') method = 'Evol.';
            else if (move.type === 'PREVO') method = 'Prevo.';

            return `
                <tr>
                    <td>${method}</td>
                    <td>${moveData.name}</td>
                    <td>${translateType(moveData.type)}</td>
                    <td>${translateCategory(moveData.skill_damage_type)}</td>
                    <td>${moveData.base_power || '-'}</td>
                    <td>${moveData.base_accuracy || '-'}</td>
                    <td>${moveData.base_pp}</td>
                </tr>
            `;
        }).join('');

        movesTableHTML = `
            <div class="moves-table-container" style="margin-top: 20px;">
                <h4 style="margin-bottom: 10px; color: var(--light-purple); position: sticky; top: 0; background: var(--bg-panel); z-index: 2;">Movimientos</h4>
                <table class="moves-table">
                    <thead>
                        <tr>
                            <th>Método</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Cat.</th>
                            <th>Pot.</th>
                            <th>Prec.</th>
                            <th>PP</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    modalBody.innerHTML = `
        <div class="pokedex-modal-header">
            <img src="${imageUrl}" alt="${basicInfo.name}" class="pokedex-modal-img">
            <h2 class="pokedex-modal-title">${basicInfo.name} <span style="font-size: 1rem; color: #888;">#${basicInfo.dex}</span></h2>
            <div class="poke-types" style="justify-content: center; margin-bottom: 1rem;">
                ${uniqueTypes.map(t => `<span class="type-badge">${translateType(t)}</span>`).join('')}
            </div>
        </div>
        
        <div class="pokedex-stats-container">
            <h4 style="margin-bottom: 1rem; border-bottom: 1px solid #444; padding-bottom: 0.5rem; color: var(--text-main);">Estadísticas Base</h4>
            ${statsHTML}
            
            <div class="pokedex-abilities-list">
                <strong>Habilidades:</strong> ${abilitiesString}
            </div>

            ${movesTableHTML}
        </div>
    `;

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('pokedex-modal');
    if (modal) modal.classList.remove('active');
}

// Exponer closeModal globalmente para el botón de cierre en el HTML inyectado
window.closeModal = closeModal;

document.addEventListener('DOMContentLoaded', loadPokedex);