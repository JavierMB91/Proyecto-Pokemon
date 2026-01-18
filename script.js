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
            { city: "Semillas Picantes", leader: "Huerto", id: "spicy-seeds", type: "seed", waterTime: 5, harvestTime: 16 }
        ]
    }
];

// --- LÓGICA DE LA APLICACIÓN ---

const STORAGE_KEY = 'pokemmo_gym_progress';
let userProgress = {};
let pendingSeedData = null; // Variable temporal para guardar datos mientras el modal está abierto

// Cargar progreso desde LocalStorage
function loadProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        userProgress = JSON.parse(stored);
    }
}

// Guardar progreso en LocalStorage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
}

// Generar ID único para cada gimnasio
function getGymId(regionName, leaderName) {
    return `${regionName}-${leaderName}`.replace(/\s+/g, '-').toLowerCase();
}

// Alternar estado del gimnasio
function toggleGym(regionName, gymData, element) {
    const uniqueId = gymData.id || gymData.leader;
    const id = getGymId(regionName, uniqueId);
    
    if (gymData.type === 'seed') {
        const progress = userProgress[id];
        const now = new Date();
        
        if (!progress) {
            // Estado 1: Abrir Modal para Plantar
            pendingSeedData = { regionName, gymData };
            openSeedModal();
            return; // Detenemos aquí, el guardado se hará al confirmar el modal
        } else {
            const date = new Date(progress.timestamp);
            const elapsed = now - date;
            
            if (progress.stage === 'planted') {
                const waterTimeMs = gymData.waterTime * 60 * 60 * 1000;
                if (elapsed >= waterTimeMs) {
                    // Estado 2: Regar (Inicia timer de 16h)
                    userProgress[id] = {
                        timestamp: now.toISOString(),
                        stage: 'watered'
                    };
                } else {
                    // Cancelar si se pulsa antes de tiempo
                    delete userProgress[id];
                }
            } else if (progress.stage === 'watered') {
                // Estado 3: Recoger (Borrar/Resetear)
                delete userProgress[id];
            }
        }
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
        }
    });
}

// Helper para crear el elemento HTML de un gimnasio/entrenador
function createGymItem(regionName, gym) {
    const uniqueId = gym.id || gym.leader;
    const gymId = getGymId(regionName, uniqueId);
    const progressData = userProgress[gymId];
    const isCompleted = !!progressData;
    
    let cooldown = gym.cooldown || 18;
    let prefix = '⏳';
    let readyLabel = 'Disponible';

    // Configuración especial para semillas
    if (gym.type === 'seed' && isCompleted) {
        if (progressData.stage === 'planted') {
            cooldown = gym.waterTime;
            prefix = 'Riego en:';
            readyLabel = 'Regar';
        } else if (progressData.stage === 'watered') {
            cooldown = gym.harvestTime;
            prefix = 'Recolección en:';
            readyLabel = 'Recoger';
        }
    }

    const item = document.createElement('li');
    item.className = `gym-item ${isCompleted ? 'completed' : ''}`;
    
    // Evento Click
    item.onclick = () => toggleGym(regionName, gym, item);

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
                <p class="gym-timer" data-timestamp="${progressData.timestamp}" data-cooldown="${cooldown}"
                   data-prefix="${prefix}" data-ready-label="${readyLabel}"></p>
                <p class="gym-date">📅 ${dateStr}</p>
            </div>`;
    }

    // Determinar qué mostrar en la info (Líder o Cantidad de semillas)
    let infoText = `<p>Líder: ${gym.leader}</p>`;
    if (gym.type === 'seed') {
        infoText = (isCompleted && progressData.count) ? `<p>Semillas: ${progressData.count}</p>` : '';
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

// Renderizar la interfaz
function renderApp() {
    const appContainer = document.getElementById('app');
    if (!appContainer) return; // Evitar error en index.html

    appContainer.innerHTML = ''; // Limpiar

    // Determinar qué datos mostrar según la URL
    let currentData = [];
    let maxSlots = 8; // Por defecto para gimnasios

    if (window.location.pathname.includes('altoMandoTracker.html')) {
        currentData = eliteFourData;
        maxSlots = 1; // El Alto Mando es 1 combate (run completa)
    } else if (window.location.pathname.includes('semillas.html')) {
        currentData = seedsData;
        maxSlots = 1; 
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
        header.innerHTML = `${region.name}<br><span style="font-size: 0.8rem; color: var(--poke-white);">${region.money} ¥</span>`;
        card.appendChild(header);

        // Lista de gimnasios
        const list = document.createElement('ul');
        list.className = 'gym-list';

        region.gyms.forEach(gym => {
            list.appendChild(createGymItem(region.name, gym));
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
            specialHeader.innerHTML = `Combates Especiales<br><span style="font-size: 0.8rem; color: var(--poke-white);">18.300 ¥</span>`;
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
        }
    } catch (error) {
        console.error("Error cargando navegación (posiblemente por protocolo file://):", error);
        // Fallback visual si falla la carga local
        placeholder.innerHTML = '<div style="text-align:center; padding:10px; background:#eee;">Menú no cargado (requiere servidor local)</div>';
    }
}

// --- FOOTER ---
async function loadFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    try {
        const response = await fetch('footer.html');
        if (response.ok) {
            placeholder.innerHTML = await response.text();
        }
    } catch (error) {
        console.error("Error cargando footer:", error);
    }
}

// Funciones del Modal
function showResetModal() {
    document.getElementById('modal-overlay').classList.add('active');
}

function hideResetModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function confirmReset() {
    userProgress = {};
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
            stage: 'planted',
            count: parseInt(input.value)
        };
        
        saveProgress();
        renderApp();
    }
    
    closeSeedModal();
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    loadNav();
    loadFooter();
    loadProgress();
    renderApp();
    
    // Actualizar temporizadores cada segundo (1000 ms)
    setInterval(updateTimers, 1000);
    
    // Asignar evento al botón de reset
    const resetBtn = document.getElementById('btn-reset');
    if(resetBtn) {
        resetBtn.addEventListener('click', showResetModal);
    }

    // Eventos del modal
    document.getElementById('modal-cancel').addEventListener('click', hideResetModal);
    document.getElementById('modal-confirm').addEventListener('click', confirmReset);

    // Eventos del modal de semillas (solo si existe en la página)
    const seedConfirmBtn = document.getElementById('seed-confirm');
    if (seedConfirmBtn) {
        seedConfirmBtn.addEventListener('click', handleSeedSubmit);
        document.getElementById('seed-cancel').addEventListener('click', closeSeedModal);
    }
});
