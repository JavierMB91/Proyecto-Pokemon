// --- DATOS DE LOS GIMNASIOS (PokeMMO) ---
const gymsData = [
    {
        name: "Kanto",
        money: "63.700",
        gyms: [
            { city: "Ciudad Plateada", leader: "Brock" },
            { city: "Ciudad Celeste", leader: "Misty" },
            { city: "Ciudad Carmín", leader: "Lt. Surge" },
            { city: "Ciudad Azulona", leader: "Erika" },
            { city: "Ciudad Fucsia", leader: "Koga" },
            { city: "Ciudad Azafrán", leader: "Sabrina" },
            { city: "Isla Canela", leader: "Blaine" }
        ]
    },
    {
        name: "Johto",
        money: "72.800",
        gyms: [
            { city: "Ciudad Malva", leader: "Pegaso" },
            { city: "Pueblo Azalea", leader: "Antón" },
            { city: "Ciudad Trigal", leader: "Blanca" },
            { city: "Ciudad Iris", leader: "Morti" },
            { city: "Ciudad Orquídea", leader: "Aníbal" },
            { city: "Ciudad Olivo", leader: "Yasmina" },
            { city: "Pueblo Caoba", leader: "Fredo" },
            { city: "Ciudad Endrino", leader: "Débora" }
        ]
    },
    {
        name: "Hoenn",
        money: "72.800",
        gyms: [
            { city: "Ciudad Férrica", leader: "Petra" },
            { city: "Pueblo Azuliza", leader: "Marcial" },
            { city: "Ciudad Malvalona", leader: "Erico" },
            { city: "Pueblo Lavacalda", leader: "Candela" },
            { city: "Ciudad Petalia", leader: "Norman" },
            { city: "Ciudad Arborada", leader: "Alana" },
            { city: "Ciudad Algaria", leader: "Vito y Leti" },
            { city: "Ciudad Arrecípolis", leader: "Galano" }
        ]
    },
    {
        name: "Sinnoh",
        money: "72.800",
        gyms: [
            { city: "Ciudad Pirita", leader: "Roco" },
            { city: "Ciudad Vetusta", leader: "Gardenia" },
            { city: "Ciudad Rocavelo", leader: "Brega" },
            { city: "Ciudad Pradera", leader: "Mananti" },
            { city: "Ciudad Corazón", leader: "Fantina" },
            { city: "Ciudad Canal", leader: "Acerón" },
            { city: "Ciudad Puntaneva", leader: "Inverna" },
            { city: "Ciudad Marina", leader: "Lectro" }
        ]
    },
    {
        name: "Teselia",
        money: "72.800",
        gyms: [
            { city: "Ciudad Gres", leader: "Zeo, Maíz y Millo" },
            { city: "Ciudad Esmalte", leader: "Aloe" },
            { city: "Ciudad Porcelana", leader: "Camus" },
            { city: "Ciudad Mayólica", leader: "Camila" },
            { city: "Ciudad Fayenza", leader: "Yakón" },
            { city: "Ciudad Loza", leader: "Gerania" },
            { city: "Ciudad Teja", leader: "Junco" },
            { city: "Ciudad Caolín", leader: "Lirio" }
        ],
        specialTrainers: [
            { city: "Game Freak (Porcelana)", leader: "Morimoto" },
            { city: "Pueblo Arenisca", leader: "Cintia" }
        ]
    }
];

// --- DATOS DEL ALTO MANDO ---
const eliteFourData = [
    {
        name: "Kanto",
        money: "60.000", // Estimado
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "kanto-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Johto",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "johto-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Hoenn",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "hoenn-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Sinnoh",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "sinnoh-elite4", cooldown: 24 }
        ]
    },
    {
        name: "Teselia",
        money: "60.000",
        gyms: [
            { city: "Liga Pokémon", leader: "Alto Mando", id: "teselia-elite4", cooldown: 24 }
        ]
    }
];

// --- DATOS DE SEMILLAS ---
const seedsData = [
    {
        name: "Huerto",
        money: "-",
        gyms: [
            { city: "Semillas Picantes", leader: "Plantar", id: "spicy-seeds-plant", type: "seed-plant", duration: 5, timerPrefix: "Riego en:", readyLabel: "Regar", nextId: "spicy-seeds-water" },
            { city: "Riego de Semillas", leader: "Regar", id: "spicy-seeds-water", type: "seed-water", prevId: "spicy-seeds-plant", waitHours: 5, duration: 16, timerPrefix: "Recogida en:", readyLabel: "Recoger", nextId: "spicy-seeds-harvest" },
            { city: "Recogida de Semillas", leader: "Recoger", id: "spicy-seeds-harvest", type: "seed-harvest", prevId: "spicy-seeds-water", rootId: "spicy-seeds-plant", waitHours: 16 }
        ]
    }
];

// --- DATOS DE ENCUENTROS ---
const encountersData = [
    {
        name: "Mes Actual",
        money: "-",
        gyms: [] // Se actualizará dinámicamente
    }
];

// --- LÓGICA DE LA APLICACIÓN ---

// --- CONFIGURACIÓN LOCAL (SIN SERVIDOR) ---

const STORAGE_KEY = 'pokemmo_gym_progress';
let userProgress = {};
let pendingSeedData = null; // Variable temporal para guardar datos mientras el modal está abierto
let pendingEncounterId = null; // Variable temporal para el modal de encuentros

// Cargar progreso desde LocalStorage
async function loadProgress() {
    userProgress = {};
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) userProgress = JSON.parse(stored);
}

// Guardar progreso en LocalStorage
async function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
}

// Generar ID único para cada gimnasio
function getGymId(regionName, leaderName) {
    return `${regionName}-${leaderName}`.replace(/\s+/g, '-').toLowerCase();
}

// Función para calcular qué legendario errante toca según el mes (1-12)
function getRoamingLegendaries(month) {
    // Rotación Kanto: Zapdos -> Moltres -> Articuno
    const kantoRotation = ["Zapdos", "Moltres", "Articuno"];
    
    // Rotación Johto: Entei -> Suicune -> Raikou
    const johtoRotation = ["Entei", "Suicune", "Raikou"];

    // Calculamos el índice (0, 1 o 2) basado en el mes
    // (Mes - 1) % 3 asegura que Enero (1) sea índice 0
    const index = (month - 1) % 3;

    return {
        kanto: kantoRotation[index],
        johto: johtoRotation[index]
    };
}

// Función para actualizar los datos de encuentros con los legendarios del mes actual
function updateEncountersData() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1; // Obtener mes actual (1-12)
    const monthName = date.toLocaleString('es-ES', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    
    const legendaries = getRoamingLegendaries(currentMonth);

    // Actualizar la tarjeta del mes (Índice 0 en encountersData)
    encountersData[0].name = capitalizedMonth;
    encountersData[0].gyms = [
        {
            city: "Kanto",
            leader: legendaries.kanto,
            id: `${legendaries.kanto.toLowerCase()}-kanto`,
            type: "encounter",
            average: "8.000"
        },
        {
            city: "Johto",
            leader: legendaries.johto,
            id: `${legendaries.johto.toLowerCase()}-johto`,
            type: "encounter",
            average: "8.000"
        }
    ];
}

// Alternar estado del gimnasio
function toggleGym(regionName, gymData, element) {
    const uniqueId = gymData.id || gymData.leader;
    const id = getGymId(regionName, uniqueId);
    
    if (gymData.type === 'seed-plant') {
        if (!userProgress[id]) {
            pendingSeedData = { regionName, gymData };
            openSeedModal();
        } else {
            // Si se desmarca plantar, borramos todo el ciclo
            delete userProgress[id];
            if (gymData.nextId) {
                const waterId = getGymId(regionName, "spicy-seeds-water");
                const harvestId = getGymId(regionName, "spicy-seeds-harvest");
                delete userProgress[waterId];
                delete userProgress[harvestId];
            }
        }
    } else if (gymData.type === 'seed-water') {
        if (userProgress[id]) {
            delete userProgress[id];
            // Si se desmarca riego, borramos cosecha
            const harvestId = getGymId(regionName, "spicy-seeds-harvest");
            delete userProgress[harvestId];
        } else {
            userProgress[id] = { timestamp: new Date().toISOString() };
        }
    } else if (gymData.type === 'seed-harvest') {
        // Al recoger, reiniciamos todo el ciclo
        const plantId = getGymId(regionName, gymData.rootId);
        const waterId = getGymId(regionName, gymData.prevId);
        delete userProgress[id];
        delete userProgress[waterId];
        delete userProgress[plantId];
    } else {
        // Lógica normal de gimnasios
        if (userProgress[id]) {
            delete userProgress[id];
        } else {
            userProgress[id] = {
                timestamp: new Date().toISOString()
            };
        }
    }
    
    saveProgress();
    renderApp(); // Re-renderizamos para mostrar la fecha actualizada
}

// Actualizar temporizadores
function updateTimers() {
    const timers = document.querySelectorAll('.gym-timer[data-timestamp]');
    const now = new Date().getTime();

    timers.forEach(timer => {
        const timestamp = timer.getAttribute('data-timestamp');
        const cooldown = parseInt(timer.getAttribute('data-cooldown') || 18);
        if (!timestamp) return;

        const date = new Date(timestamp);
        const resetTime = date.getTime() + (cooldown * 60 * 60 * 1000);
        const timeLeft = resetTime - now;

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            const prefix = timer.getAttribute('data-prefix') || '⏳';
            timer.innerHTML = `${prefix} ${hours}h ${minutes}m ${seconds}s`;
            timer.classList.remove('ready');
        } else {
            const readyLabel = timer.getAttribute('data-ready-label') || 'Disponible';
            timer.innerHTML = `✅ ${readyLabel}`;
            timer.classList.add('ready');
            
            // Habilitar el siguiente paso visualmente si existe
            const currentGymId = timer.getAttribute('data-gym-id');
            if (currentGymId) {
                const nextStageItem = document.querySelector(`.gym-item[data-prev-id="${currentGymId}"]`);
                if (nextStageItem) {
                    nextStageItem.classList.remove('disabled');
                }
            }
        }
    });
}

// Helper para crear el elemento HTML de un gimnasio/entrenador
function createGymItem(regionName, gym) {
    const uniqueId = gym.id || gym.leader;
    const gymId = getGymId(regionName, uniqueId);
    const progressData = userProgress[gymId];
    const isCompleted = !!progressData;
    
    let cooldown = gym.duration || gym.cooldown || 18;
    let prefix = gym.timerPrefix || '⏳';
    let readyLabel = gym.readyLabel || 'Disponible';
    let isDisabled = false;

    // Lógica de dependencias para semillas (Deshabilitar si no es el momento)
    if (gym.prevId) {
        const prevGymId = getGymId(regionName, gym.prevId);
        const prevProgress = userProgress[prevGymId];
        
        if (!prevProgress) {
            isDisabled = true;
        } else if (gym.waitHours) {
            // Verificar si ha pasado el tiempo necesario desde el paso anterior
            const prevDate = new Date(prevProgress.timestamp);
            const now = new Date();
            const elapsedHours = (now - prevDate) / (1000 * 60 * 60);
            if (elapsedHours < gym.waitHours) {
                isDisabled = true;
            }
        }
    }

    const item = document.createElement('li');
    item.className = `gym-item ${isCompleted ? 'completed' : ''} ${isDisabled ? 'disabled' : ''}`;
    
    // Evento Click
    item.onclick = () => toggleGym(regionName, gym, item);
    
    // Atributos para encadenamiento
    const fullId = getGymId(regionName, uniqueId);
    item.setAttribute('data-gym-id', fullId);
    if (gym.prevId) {
        const prevFullId = getGymId(regionName, gym.prevId);
        item.setAttribute('data-prev-id', prevFullId);
    }

    // Formatear fecha si existe (Hora Española)
    let dateHtml = '';
    if (isCompleted && progressData.timestamp) {
        const date = new Date(progressData.timestamp);
        const dateStr = date.toLocaleString('es-ES', {
            timeZone: 'Europe/Madrid',
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        dateHtml = `
            <div class="gym-status-right">
                <p class="gym-timer" data-timestamp="${progressData.timestamp}" data-cooldown="${cooldown}" data-gym-id="${gymId}"
                   data-prefix="${prefix}" data-ready-label="${readyLabel}"></p>
                <p class="gym-date">📅 ${dateStr}</p>
            </div>`;
    }

    // Determinar qué mostrar en la info (Líder o Cantidad de semillas)
    let infoText = `<p>Líder: ${gym.leader}</p>`;
    if (gym.type === 'seed-plant') {
        infoText = (isCompleted && progressData.count) ? `<p>Semillas: ${progressData.count}</p>` : '';
    } else if (gym.type === 'seed-water' || gym.type === 'seed-harvest') {
        infoText = ''; // Ocultar texto de líder para pasos intermedios
    }

    // HTML interno del item
    item.innerHTML = `
        <div class="checkbox-wrapper">
            <div class="custom-checkbox"></div>
        </div>
        <div class="gym-info">
            <h3>${gym.city}</h3>
            ${infoText}
        </div>
        ${dateHtml}
    `;
    
    return item;
}

// Helper para crear el elemento de Encuentros
function createEncounterItem(regionName, gym) {
    const uniqueId = gym.id;
    const gymId = getGymId(regionName, uniqueId);
    const progress = userProgress[gymId] || { count: 0 };
    const count = progress.count;
    
    // Cálculo de probabilidad dinámico
    // Si gym.shinyRate está definido (Shiny Hunting), lo usamos. Si no, usamos 8000 (Legendarios).
    const rate = gym.shinyRate || 8000;
    const currentProb = (1 - Math.pow(1 - 1/rate, count)) * 100;

    // Calcular hitos dinámicamente
    const m50 = Math.ceil(Math.log(0.5) / Math.log(1 - 1/rate));
    const m63 = rate;
    const m90 = Math.ceil(Math.log(0.1) / Math.log(1 - 1/rate));

    // Formateadores
    const f = (n) => n.toLocaleString('es-ES');
    const rateTitle = rate >= 1000 ? (rate/1000) + 'k' : rate;
    
    const item = document.createElement('li');
    item.className = 'gym-item';
    
    // Imagen personalizada para Legendarios
    let pokemonGif = '';
    const legendaries = ['Zapdos', 'Moltres', 'Articuno', 'Entei', 'Suicune', 'Raikou'];
    if (legendaries.includes(gym.leader)) {
        pokemonGif = `<img src="../img/${gym.leader.toLowerCase()}.gif" alt="${gym.leader}" style="height: 60px; vertical-align: middle; margin-left: 10px;" onerror="this.style.display='none'">`;
    }

    item.innerHTML = `
        <div class="gym-info">
            <h3>${gym.leader}${pokemonGif}</h3>
            ${gym.average ? `<p>Promedio Encuentros: ${gym.average}</p>` : ''}
            <div style="margin: 10px 0;">
                 <span class="encounter-count">${count.toLocaleString('es-ES')}</span>
            </div>
            
            <!-- Formulario Inline para añadir combates -->
            <div class="encounter-form">
                <input type="number" id="input-${gymId}" class="encounter-input-inline" placeholder="Cant." min="1">
                <button class="btn-add-inline" onclick="addEncounter('${gymId}', 'input-${gymId}')">Añadir</button>
            </div>

            <div class="encounter-stats">
                <p>Probabilidad actual: <strong>${currentProb.toFixed(2)}%</strong></p>
                <div class="encounter-milestones">
                    <p><small>50%: ${f(m50)} | 90%: ${f(m90)}</small></p>
                </div>
            </div>
        </div>
    `;
    
    return item;
}

// Función para añadir encuentros directamente desde la tarjeta
window.addEncounter = function(gymId, inputId) {
    const input = document.getElementById(inputId);
    if (!input || !input.value) return;
    
    const amount = parseInt(input.value);
    if (isNaN(amount) || amount <= 0) return;

    if (!userProgress[gymId]) {
        userProgress[gymId] = { count: 0 };
    }
    
    userProgress[gymId].count += amount;
    userProgress[gymId].timestamp = new Date().toISOString();
    
    saveProgress();
    renderApp();
};

// Renderizar la interfaz
function renderApp() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return; // Evitar error en index.html

    appContainer.innerHTML = ''; // Limpiar

    // Determinar qué datos mostrar según la URL
    let currentData = [];
    let maxSlots = 8; // Por defecto para gimnasios
    const path = window.location.pathname.toLowerCase();

    if (path.includes('altomandotracker')) {
        currentData = eliteFourData;
        maxSlots = 1; // El Alto Mando es 1 combate (run completa)
    } else if (path.includes('semillas')) {
        currentData = seedsData;
        maxSlots = 1; 
    } else if (path.includes('encuentros')) {
        updateEncountersData(); // Calcular rotación mensual antes de renderizar
        currentData = encountersData;
        maxSlots = 2; // Igualar altura (2 slots para legendarios, 1+1 para shiny)
    } else {
        currentData = gymsData;
    }

    currentData.forEach(region => {
        // Crear tarjeta de región
        const card = document.createElement('div');
        card.className = 'region-card';

        // Header de la región
        const header = document.createElement('div');
        header.className = 'region-header';
        
        header.innerHTML = `${region.name}`;
        card.appendChild(header);

        // Lista de gimnasios
        const list = document.createElement('ul');
        list.className = 'gym-list';
        
        if (path.includes('encuentros')) {
            list.classList.add('horizontal-layout');
            card.classList.add('wide-card');
        }

        region.gyms.forEach(gym => {
            if (gym.type === 'encounter') {
                list.appendChild(createEncounterItem(region.name, gym));
            } else {
                list.appendChild(createGymItem(region.name, gym));
            }
        });

        // Rellenar huecos visuales para mantener la altura homogénea
        if (region.gyms.length < maxSlots) {
            for (let i = region.gyms.length; i < maxSlots; i++) {
                const placeholder = document.createElement('li');
                placeholder.className = 'gym-item placeholder';
                placeholder.innerHTML = `
                    <div class="checkbox-wrapper" style="visibility: hidden;"></div>
                    <div class="gym-info"><h3 style="color: #ddd;">---</h3></div>
                `;
                list.appendChild(placeholder);
            }
        }

        card.appendChild(list);

        // Renderizar Entrenadores Especiales (si existen)
        if (region.specialTrainers && region.specialTrainers.length > 0) {
            appContainer.appendChild(card);

            const specialBox = document.createElement('div');
            specialBox.className = 'special-trainers-box standalone';
            
            const specialHeader = document.createElement('div');
            specialHeader.className = 'region-header';
            specialHeader.innerHTML = `Combates Especiales`;
            specialBox.appendChild(specialHeader);
            
            const specialList = document.createElement('ul');
            specialList.className = 'gym-list';
            
            region.specialTrainers.forEach(trainer => {
                specialList.appendChild(createGymItem(region.name, trainer));
            });
            
            specialBox.appendChild(specialList);
            appContainer.appendChild(specialBox);
        } else {
            appContainer.appendChild(card);
        }
    });

    // Actualizar timers inmediatamente tras renderizar
    updateTimers();
}

// --- NAVEGACIÓN ---
async function loadNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    try {
        const response = await fetch('nav.html');
        if (response.ok) {
            placeholder.innerHTML = await response.text();
        } else {
            console.error(`Error cargando nav.html: ${response.status}. Verifica si el archivo en Git se llama 'Nav.html' (mayúscula) en lugar de 'nav.html'.`);
        }
    } catch (error) {
        console.error("Error cargando navegación (posiblemente por protocolo file://):", error);
        // Fallback visual si falla la carga local
        placeholder.innerHTML = '<div style="text-align:center; padding:10px; background:#eee;">Menú no cargado (requiere servidor local)</div>';
    }
}

// Funciones del Modal
function showResetModal() {
    document.getElementById('modal-overlay').classList.add('active');
    const modal = document.getElementById('modal-overlay');
    
    const path = window.location.pathname.toLowerCase();
    // Lógica específica para la página de encuentros
    if (path.includes('encuentros')) {
        const content = modal.querySelector('.modal-content');
        
        // Generar botones dinámicamente según las regiones disponibles en encountersData
        let buttonsHtml = '';
        encountersData.forEach(region => {
            const safeId = region.name.replace(/\s+/g, '-').toLowerCase();
            buttonsHtml += `<button class="btn-modal btn-confirm" id="reset-${safeId}">${region.name}</button>`;
        });

        content.innerHTML = `
            <h3>Reiniciar Encuentros</h3>
            <p>Selecciona la región a reiniciar:</p>
            <div class="modal-actions" style="flex-wrap: wrap; gap: 10px;">
                <button class="btn-modal btn-cancel" id="modal-cancel-dynamic">Cancelar</button>
                ${buttonsHtml}
            </div>
        `;
        
        // Asignar eventos a los nuevos botones
        document.getElementById('modal-cancel-dynamic').onclick = hideResetModal;
        encountersData.forEach(region => {
            const safeId = region.name.replace(/\s+/g, '-').toLowerCase();
            const btn = document.getElementById(`reset-${safeId}`);
            if (btn) btn.onclick = () => resetSpecificRegion(region.name);
        });
    }
    
    modal.classList.add('active');
}

function hideResetModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function resetSpecificRegion(regionName) {
    const region = encountersData.find(r => r.name === regionName);
    if (region) {
        region.gyms.forEach(item => {
            const uniqueId = item.id || item.leader;
            const id = getGymId(region.name, uniqueId);
            delete userProgress[id];
        });
        saveProgress();
        renderApp();
    }
    hideResetModal();
}

function confirmReset() {
    // Determinar qué datos corresponden a la página actual para borrar solo esos
    let currentData = [];
    const path = window.location.pathname.toLowerCase();
    if (path.includes('altomandotracker')) {
        currentData = eliteFourData;
    } else if (path.includes('semillas')) {
        currentData = seedsData;
    } else if (path.includes('encuentros')) {
        currentData = encountersData;
    } else {
        currentData = gymsData;
    }

    // Borrar solo las claves asociadas a los datos de la página actual
    currentData.forEach(region => {
        region.gyms.forEach(item => {
            const uniqueId = item.id || item.leader;
            const id = getGymId(region.name, uniqueId);
            delete userProgress[id];
        });

        if (region.specialTrainers) {
            region.specialTrainers.forEach(trainer => {
                const uniqueId = trainer.id || trainer.leader;
                const id = getGymId(region.name, uniqueId);
                delete userProgress[id];
            });
        }
    });

    saveProgress();
    renderApp();
    hideResetModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- FUNCIONES MODAL SEMILLAS ---
function openSeedModal() {
    const modal = document.getElementById('seed-modal');
    if (modal) modal.classList.add('active');
    // Enfocar el input
    const input = document.getElementById('seed-input');
    if (input) setTimeout(() => input.focus(), 100);
}

function closeSeedModal() {
    const modal = document.getElementById('seed-modal');
    if (modal) modal.classList.remove('active');
    // Limpiar
    const input = document.getElementById('seed-input');
    if (input) input.value = '';
    const error = document.getElementById('seed-error');
    if (error) error.style.display = 'none';
    pendingSeedData = null;
}

function handleSeedSubmit() {
    const input = document.getElementById('seed-input');
    if (!input) return;

    // validateSeedInput está en validations.js
    let validation = { valid: false, message: "Error de validación" };
    
    if (typeof validateSeedInput === 'function') {
        validation = validateSeedInput(input.value);
    } else {
        console.error("Error: validateSeedInput no existe. Verifica que 'validaciones.js' se haya cargado correctamente.");
        validation = { valid: false, message: "Error interno: No se pudo cargar el validador." };
    }

    if (!validation.valid) {
        const error = document.getElementById('seed-error');
        if (error) {
            error.textContent = validation.message;
            error.style.display = 'block';
        }
        return;
    }

    // Si es válido, procedemos a guardar
    if (pendingSeedData) {
        const { regionName, gymData } = pendingSeedData;
        const uniqueId = gymData.id || gymData.leader;
        const id = getGymId(regionName, uniqueId);
        
        userProgress[id] = {
            timestamp: new Date().toISOString(),
            count: parseInt(input.value)
        };
        
        saveProgress();
        renderApp();
    }
    
    closeSeedModal();
}

// --- FUNCIONES MODAL ENCUENTROS ---
function openEncounterModal() {
    const modal = document.getElementById('encounter-modal');
    if (modal) modal.classList.add('active');
    const input = document.getElementById('encounter-input');
    if (input) setTimeout(() => input.focus(), 100);
}

function closeEncounterModal() {
    const modal = document.getElementById('encounter-modal');
    if (modal) modal.classList.remove('active');
    const input = document.getElementById('encounter-input');
    if (input) input.value = '';
    const error = document.getElementById('encounter-error');
    if (error) error.style.display = 'none';
    pendingEncounterId = null;
}

function handleEncounterSubmit() {
    const input = document.getElementById('encounter-input');
    if (!input) return;

    // Validar input de encuentros
    let validation = { valid: false, message: "Error" };
    if (typeof validateEncounterInput === 'function') {
        validation = validateEncounterInput(input.value);
    } else {
        console.error("Error: validateEncounterInput no existe. Verifica que 'validaciones.js' se haya cargado correctamente.");
        validation = { valid: false, message: "Error interno: No se pudo cargar el validador." };
    }

    if (!validation.valid) {
        const error = document.getElementById('encounter-error');
        if (error) {
            error.textContent = validation.message;
            error.style.display = 'block';
        }
        return;
    }

    if (pendingEncounterId) {
        const currentCount = userProgress[pendingEncounterId]?.count || 0;
        const addAmount = parseInt(input.value);
        
        userProgress[pendingEncounterId] = {
            count: currentCount + addAmount,
            timestamp: new Date().toISOString()
        };
        
        saveProgress();
        renderApp();
    }
    closeEncounterModal();
}

// --- GESTIÓN DE DATOS (EXPORTAR/IMPORTAR) ---
function setupAuthUI() {
    const header = document.querySelector('header');
    if (!header) return;

    let userContainer = document.getElementById('user-auth-container');
    if (!userContainer) {
        userContainer = document.createElement('div');
        userContainer.id = 'user-auth-container';
        userContainer.style.position = 'absolute';
        userContainer.style.top = '50%';
        userContainer.style.right = '20px';
        userContainer.style.transform = 'translateY(-50%)';
        userContainer.style.display = 'flex';
        userContainer.style.gap = '10px';
        header.appendChild(userContainer);
        header.style.position = 'relative';
    }

    userContainer.innerHTML = '';

    // Botón Exportar
    const btnExport = document.createElement('button');
    btnExport.textContent = '💾 Guardar Archivo';
    btnExport.className = 'btn-data';
    btnExport.style.padding = '5px 10px';
    btnExport.style.fontSize = '0.8rem';
    btnExport.onclick = exportData;

    // Botón Importar
    const btnImport = document.createElement('button');
    btnImport.textContent = '📂 Cargar Archivo';
    btnImport.className = 'btn-data';
    btnImport.style.padding = '5px 10px';
    btnImport.style.fontSize = '0.8rem';
    btnImport.style.backgroundColor = '#4CAF50';
    btnImport.onclick = () => document.getElementById('import-file').click();

    // Input oculto para importar
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = 'import-file';
    inputFile.accept = '.json';
    inputFile.style.display = 'none';
    inputFile.onchange = importData;

    userContainer.appendChild(btnExport);
    userContainer.appendChild(btnImport);
    userContainer.appendChild(inputFile);
}

function exportData() {
    const dataStr = JSON.stringify(userProgress, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokemmo_tracker_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            userProgress = data;
            saveProgress();
            renderApp();
            alert('Datos cargados correctamente.');
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            alert('Error al leer el archivo. Asegúrate de que es un JSON válido.');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async () => {
    loadNav();
    
    // Iniciar aplicación local
    setupAuthUI();
    await loadProgress();
    renderApp();
    
    // Actualizar temporizadores cada segundo (1000 ms)
    setInterval(updateTimers, 1000);
    
    // Asignar evento al botón de reset
    const resetBtn = document.getElementById('btn-reset');
    if(resetBtn) {
        resetBtn.addEventListener('click', showResetModal);
    }

    // Eventos del modal
    const modalCancel = document.getElementById('modal-cancel');
    if (modalCancel) {
        modalCancel.addEventListener('click', hideResetModal);
    }
    const modalConfirm = document.getElementById('modal-confirm');
    if (modalConfirm) {
        modalConfirm.addEventListener('click', confirmReset);
    }

    // Eventos del modal de semillas (solo si existe en la página)
    const seedConfirmBtn = document.getElementById('seed-confirm');
    if (seedConfirmBtn) {
        seedConfirmBtn.addEventListener('click', handleSeedSubmit);
        const seedCancelBtn = document.getElementById('seed-cancel');
        if (seedCancelBtn) {
            seedCancelBtn.addEventListener('click', closeSeedModal);
        }
    }

    // Eventos del modal de encuentros
    const encounterConfirmBtn = document.getElementById('encounter-confirm');
    if (encounterConfirmBtn) {
        encounterConfirmBtn.addEventListener('click', handleEncounterSubmit);
        const encounterCancelBtn = document.getElementById('encounter-cancel');
        if (encounterCancelBtn) {
            encounterCancelBtn.addEventListener('click', closeEncounterModal);
        }
    }
});
