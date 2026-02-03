const pokedexContainer = document.getElementById('pokedex-container');
let allPokemon = [];
let monsterDataMap = {};

async function loadPokedex() {
    try {
        // Cargar ambos archivos JSON en paralelo
        const [pokedexRes, monstersRes] = await Promise.all([
            fetch('../js/data/pokedex.json'),
            fetch('../js/data/pokemons.json')
        ]);

        const pokedexData = await pokedexRes.json();
        const monstersData = await monstersRes.json();
        
        allPokemon = pokedexData;
        
        // Indexar detalles técnicos por ID para acceso rápido
        if (Array.isArray(monstersData)) {
            monstersData.forEach(m => monsterDataMap[m.id] = m);
        }

        setupSearch();
        renderPokemonList(allPokemon);
    } catch (error) {
        console.error('Error al cargar la pokedex:', error);
    }
}

function setupSearch() {
    const searchContainer = document.querySelector('.pokedex-search-container');
    if (searchContainer) {
        searchContainer.innerHTML = ''; // Limpiar contenedor
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Buscar Pokémon...';
        input.className = 'modal-input'; // Reutilizar estilo existente
        input.style.marginBottom = '0';
        
        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allPokemon.filter(p => p.name.toLowerCase().includes(term));
            renderPokemonList(filtered);
        });
        searchContainer.appendChild(input);
    }
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
                ${pokemon.types.map(t => `<span class="type-badge">${t}</span>`).join('')}
            </div>
        `;
        
        card.addEventListener('click', () => {
            const details = monsterDataMap[pokemon.dex];
            if (details) {
                alert(`ID Técnico: ${details.id}\nStats: ${JSON.stringify(details.baseStats)}`);
            } else {
                alert(`ID: ${pokemon.dex} (Sin detalles técnicos)`);
            }
        });
        
        pokedexContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadPokedex);