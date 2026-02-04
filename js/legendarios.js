/**
 * legendarios.js
 * 
 * Módulo encargado de la lógica específica para los Encuentros con Pokémon Legendarios.
 * Gestiona la rotación mensual de legendarios errantes (Kanto y Johto), actualiza
 * los datos de encuentros según la fecha actual y genera los elementos del DOM
 * necesarios para visualizar estos eventos especiales en la interfaz.
 */

// Lógica específica de Legendarios

// Función para calcular qué legendario errante toca según el mes (1-12)
function obtenerLegendariosErrantes(mes) {
    // Rotación Kanto: Zapdos -> Moltres -> Articuno
    const rotacionKanto = ["Zapdos", "Moltres", "Articuno"];
    
    // Rotación Johto: Entei -> Suicune -> Raikou
    const rotacionJohto = ["Entei", "Suicune", "Raikou"];

    // Calculamos el índice (0, 1 o 2) basado en el mes
    // (Mes - 1) % 3 asegura que Enero (1) sea índice 0
    const indice = (mes - 1) % 3;

    return {
        kanto: rotacionKanto[indice],
        johto: rotacionJohto[indice]
    };
}

// Función para actualizar la rotación de legendarios según el mes actual
function actualizarRotacionMensual() {
    const fecha = new Date();
    const mesActual = fecha.getMonth() + 1; // Obtener mes actual (1-12)
    const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
    const mesCapitalizado = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
    
    const legendarios = obtenerLegendariosErrantes(mesActual);

    // Actualizar la tarjeta del mes (Índice 0 en datosRotacionLegendarios)
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

// Helper para crear el elemento de Encuentros
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