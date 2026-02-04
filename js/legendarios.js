/**
 * legendarios.js
 * 
 * LÓGICA DE LEGENDARIOS ERRANTES
 * ------------------------------
 * Calcula qué legendario está activo en Kanto y Johto basándose en el mes actual.
 * Sigue un patrón cíclico de 3 meses.
 */

// Lógica específica de Legendarios

/**
 * Determina qué Pokémon legendarios errantes están activos basándose en el mes actual.
 * Aplica la rotación de Kanto (Zapdos/Moltres/Articuno) y Johto (Entei/Suicune/Raikou).
 * @param {number} mes - Número del mes (1-12).
 * @returns {object} Objeto con los nombres de los legendarios para Kanto y Johto.
 */
function obtenerLegendariosErrantes(mes) {
    // Rotación Kanto: Zapdos -> Moltres -> Articuno
    const rotacionKanto = ["Zapdos", "Moltres", "Articuno"];
    
    // Rotación Johto: Entei -> Suicune -> Raikou
    const rotacionJohto = ["Entei", "Suicune", "Raikou"];

    // FÓRMULA DE ROTACIÓN:
    // (Mes - 1) % 3 nos da un ciclo 0, 1, 2 que se repite trimestralmente.
    const indice = (mes - 1) % 3;

    return {
        kanto: rotacionKanto[indice],
        johto: rotacionJohto[indice]
    };
}

/**
 * Inyecta los legendarios activos del mes en la estructura de datos global.
 */
function actualizarRotacionMensual() {
    const fecha = new Date();
    const mesActual = fecha.getMonth() + 1; // Obtener mes actual (1-12)
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    const mesCapitalizado = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    
    const legendarios = obtenerLegendariosErrantes(mesActual);

    // Modificamos directamente el objeto de datos que usa el renderizador
    datosRotacionLegendarios[0].nombre = mesCapitalizado;
    datosRotacionLegendarios[0].gimnasios = [
        {
            ciudad: "Kanto",
            lider: legendarios.kanto,
            id: `${legendarios.kanto.toLowerCase()}-kanto`,
            tipo: "encounter"
        },
        {
            ciudad: "Johto",
            lider: legendarios.johto,
            id: `${legendarios.johto.toLowerCase()}-johto`,
            tipo: "encounter"
        }
    ];
}

/**
 * Generador de DOM para las tarjetas de encuentro (Items de la lista).
 * @returns {HTMLElement} Elemento de lista (li) listo para insertar en el DOM.
 */
function crearElementoEncuentro(encuentro) {
    const elementoLista = document.createElement('li');
    elementoLista.className = 'gym-item';
    
    let gifPokemon = '';
    const legendarios = ['Zapdos', 'Moltres', 'Articuno', 'Entei', 'Suicune', 'Raikou'];
    if (legendarios.includes(encuentro.lider)) {
        gifPokemon = `<div style="margin-top: 5px;"><img src="../img/${encuentro.lider.toLowerCase()}.gif" alt="${encuentro.lider}" style="height: 90px;" onerror="this.style.display='none'"></div>`;
    }

    elementoLista.innerHTML = `
        <div class="gym-info">
            <h3>${encuentro.lider}</h3>
            ${gifPokemon}
            <p>Región: ${encuentro.ciudad}</p>
        </div>
    `;
    
    return elementoLista;
}