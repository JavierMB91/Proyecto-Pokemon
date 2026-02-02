// Generar ID único para cada gimnasio
function obtenerIdGimnasio(nombreRegion, nombreLider) {
    return `${nombreRegion}-${nombreLider}`.replace(/\s+/g, '-').toLowerCase();
}

// Helper para extraer horas de los strings de bayas (ej: "44 horas" -> 44)
function analizarHorasBaya(cadenaTiempo) {
    const match = cadenaTiempo && cadenaTiempo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

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

// Función para actualizar los datos de encuentros con los legendarios del mes actual
function actualizarDatosEncuentros() {
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

// Helper para formatear fecha
function formatearFecha(fecha) {
    return fecha.toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

// Función para reproducir sonidos de notificación
function reproducirSonido(tipo) {
    let rutaAudio = '';
    // Se asume que los archivos de audio están en una carpeta 'audio' al mismo nivel que 'img'
    if (tipo === 'water') {
        rutaAudio = '../audio/water.mp3';
    } else if (tipo === 'harvest') {
        rutaAudio = '../audio/harvest.mp3';
    }

    if (rutaAudio) {
        const audio = new Audio(rutaAudio);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Error reproduciendo audio (verifica que el archivo exista en la carpeta audio):", e));
    }
}
