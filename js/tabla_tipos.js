const typeData = {
    normal: { roca: 0.5, fantasma: 0, acero: 0.5 },
    fuego: { fuego: 0.5, agua: 0.5, planta: 2, hielo: 2, bicho: 2, roca: 0.5, dragon: 0.5, acero: 2 },
    agua: { fuego: 2, agua: 0.5, planta: 0.5, tierra: 2, roca: 2, dragon: 0.5 },
    electrico: { agua: 2, electrico: 0.5, planta: 0.5, tierra: 0, volador: 2, dragon: 0.5 },
    planta: { fuego: 0.5, agua: 2, planta: 0.5, veneno: 0.5, tierra: 2, volador: 0.5, bicho: 0.5, roca: 2, dragon: 0.5, acero: 0.5 },
    hielo: { fuego: 0.5, agua: 0.5, planta: 2, hielo: 0.5, tierra: 2, volador: 2, dragon: 2, acero: 0.5 },
    lucha: { normal: 2, hielo: 2, veneno: 0.5, volador: 0.5, psiquico: 0.5, bicho: 0.5, roca: 2, fantasma: 0, siniestro: 2, acero: 2, hada: 0.5 },
    veneno: { planta: 2, veneno: 0.5, tierra: 0.5, roca: 0.5, fantasma: 0.5, acero: 0, hada: 2 },
    tierra: { fuego: 2, electrico: 2, planta: 0.5, veneno: 2, volador: 0, bicho: 0.5, roca: 2, acero: 2 },
    volador: { electrico: 0.5, planta: 2, lucha: 2, bicho: 2, roca: 0.5, acero: 0.5 },
    psiquico: { lucha: 2, veneno: 2, psiquico: 0.5, siniestro: 0, acero: 0.5 },
    bicho: { fuego: 0.5, planta: 2, lucha: 0.5, veneno: 0.5, volador: 0.5, psiquico: 2, fantasma: 0.5, siniestro: 2, acero: 0.5, hada: 0.5 },
    roca: { fuego: 2, hielo: 2, lucha: 0.5, tierra: 0.5, volador: 2, bicho: 2, acero: 0.5 },
    fantasma: { normal: 0, psiquico: 2, fantasma: 2, siniestro: 0.5 },
    dragon: { dragon: 2, acero: 0.5, hada: 0 },
    siniestro: { lucha: 0.5, psiquico: 2, fantasma: 2, siniestro: 0.5, hada: 0.5 },
    acero: { fuego: 0.5, agua: 0.5, electrico: 0.5, hielo: 2, roca: 2, acero: 0.5, hada: 2 },
    hada: { fuego: 0.5, lucha: 2, veneno: 0.5, dragon: 2, siniestro: 2, acero: 0.5 }
};

const types = Object.keys(typeData).sort();

let selectedDefensiveTypes = [];

document.addEventListener('DOMContentLoaded', () => {
    renderTypeSelection();
    updateEffectiveness();
});

function renderTypeSelection() {
    const container = document.getElementById('type-selection');
    if (!container) return;

    types.forEach(type => {
        const typeBtn = document.createElement('div');
        typeBtn.className = 'type-badge';
        typeBtn.id = `type-${type}`;
        typeBtn.innerHTML = `<img src="../img/tipos/${type}.png" alt="${type}"><span>${type.charAt(0).toUpperCase() + type.slice(1)}</span>`;
        
        typeBtn.onclick = () => toggleDefensiveType(type);
        container.appendChild(typeBtn);
    });
}

function toggleDefensiveType(type) {
    const index = selectedDefensiveTypes.indexOf(type);
    if (index > -1) {
        selectedDefensiveTypes.splice(index, 1);
        document.getElementById(`type-${type}`).classList.remove('selected');
    } else {
        if (selectedDefensiveTypes.length < 2) {
            selectedDefensiveTypes.push(type);
            document.getElementById(`type-${type}`).classList.add('selected');
        } else {
            // Replace the last one if we try to add a third
            const lastType = selectedDefensiveTypes.shift();
            document.getElementById(`type-${lastType}`).classList.remove('selected');
            selectedDefensiveTypes.push(type);
            document.getElementById(`type-${type}`).classList.add('selected');
        }
    }
    updateEffectiveness();
}

function updateEffectiveness() {
    const resultsContainer = document.getElementById('effectiveness-results');
    if (!resultsContainer) return;

    const effectivenessMap = {};
    types.forEach(attackType => {
        let multiplier = 1;
        selectedDefensiveTypes.forEach(defenseType => {
            const m = typeData[attackType][defenseType] !== undefined ? typeData[attackType][defenseType] : 1;
            multiplier *= m;
        });
        effectivenessMap[attackType] = multiplier;
    });

    displayResults(effectivenessMap);
}

function displayResults(map) {
    const container = document.getElementById('effectiveness-results');
    container.innerHTML = '';

    const categories = [
        { label: 'Debilidades (x4)', mult: 4, class: 'very-weak' },
        { label: 'Debilidades (x2)', mult: 2, class: 'weak' },
        { label: 'Daño Normal (x1)', mult: 1, class: 'neutral' },
        { label: 'Resistencias (x0.5)', mult: 0.5, class: 'resistant' },
        { label: 'Resistencias (x0.25)', mult: 0.25, class: 'very-resistant' },
        { label: 'Inmunidades (x0)', mult: 0, class: 'immune' }
    ];

    categories.forEach(cat => {
        const filteredTypes = types.filter(t => map[t] === cat.mult);
        // Always render the section to maintain layout, but maybe add a class if empty
        const section = document.createElement('div');
        section.className = `effect-section ${cat.class} ${filteredTypes.length === 0 ? 'empty-section' : ''}`;
        section.innerHTML = `<h3>${cat.label}</h3>`;
        
        const badgesContainer = document.createElement('div');
        badgesContainer.className = 'badges-grid';

        filteredTypes.forEach(t => {
            const badge = document.createElement('div');
            badge.className = 'type-badge-result';
            badge.innerHTML = `<img src="../img/tipos/${t}.png" alt="${t}">`;
            badgesContainer.appendChild(badge);
        });

        section.appendChild(badgesContainer);
        container.appendChild(section);
    });

    const headerText = document.getElementById('selected-types-header');
    if (headerText) {
        headerText.innerText = selectedDefensiveTypes.length > 0 
            ? selectedDefensiveTypes.map(t => t.toUpperCase()).join(' / ')
            : 'SELECCIONA TIPO(S)';
    }
}
