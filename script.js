// --- DATOS DE LOS GIMNASIOS (PokeMMO) ---
const regionsData = [
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

// --- LÓGICA DE LA APLICACIÓN ---

const STORAGE_KEY = 'pokemmo_gym_progress';
let userProgress = {};

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
function toggleGym(regionName, leaderName, element) {
    const id = getGymId(regionName, leaderName);
    
    // Si ya existe, lo borramos. Si no, guardamos objeto con timestamp.
    if (userProgress[id]) {
        delete userProgress[id];
    } else {
        userProgress[id] = {
            timestamp: new Date().toISOString()
        };
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
        if (!timestamp) return;

        const date = new Date(timestamp);
        const resetTime = date.getTime() + (18 * 60 * 60 * 1000);
        const timeLeft = resetTime - now;

        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            timer.innerHTML = `⏳ ${hours}h ${minutes}m ${seconds}s`;
            timer.classList.remove('ready');
        } else {
            timer.innerHTML = `✅ Disponible`;
            timer.classList.add('ready');
        }
    });
}

// Helper para crear el elemento HTML de un gimnasio/entrenador
function createGymItem(regionName, gym) {
    const gymId = getGymId(regionName, gym.leader);
    const progressData = userProgress[gymId];
    const isCompleted = !!progressData;

    const item = document.createElement('li');
    item.className = `gym-item ${isCompleted ? 'completed' : ''}`;
    
    // Evento Click
    item.onclick = () => toggleGym(regionName, gym.leader, item);

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
                <p class="gym-timer" data-timestamp="${progressData.timestamp}"></p>
                <p class="gym-date">📅 ${dateStr}</p>
            </div>`;
    }

    // HTML interno del item
    item.innerHTML = `
        <div class="checkbox-wrapper">
            <div class="custom-checkbox"></div>
        </div>
        <div class="gym-info">
            <h3>${gym.city}</h3>
            <p>Líder: ${gym.leader}</p>
        </div>
        ${dateHtml}
    `;
    
    return item;
}

// Renderizar la interfaz
function renderApp() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = ''; // Limpiar

    regionsData.forEach(region => {
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

        // Rellenar huecos visuales para mantener la altura homogénea (si hay menos de 8)
        const maxGyms = 8;
        if (region.gyms.length < maxGyms) {
            for (let i = region.gyms.length; i < maxGyms; i++) {
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

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
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
});
