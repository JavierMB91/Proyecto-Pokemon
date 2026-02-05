/**
 * semillas.js
 * 
 * MÓDULO DE HUERTO Y BAYAS
 * ------------------------
 * Gestiona el ciclo de vida completo de las plantas:
 * 1. Plantado (Input de usuario)
 * 2. Riego (Temporizador de espera)
 * 3. Cosecha (Recolección y limpieza)
 */

/**
 * Máquina de estados para las parcelas del huerto.
 * Determina qué acción realizar según el estado actual de la parcela (tipo).
 * 
 * @param {string} nombreRegion - Contexto de la región (generalmente "Huerto").
 * @param {object} datosEtapaHuerto - Datos de configuración de la etapa actual.
 * @param {HTMLElement} elemento - Elemento DOM clicado.
 */
function procesarClickSemilla(nombreRegion, datosEtapaHuerto, elemento) {
    // Generamos el ID único para buscar en el progreso guardado
    const idUnico = datosEtapaHuerto.id || datosEtapaHuerto.lider;
    const id = obtenerIdGimnasio(nombreRegion, idUnico);
    
    // CASO 1: PLANTAR
    // Este paso se maneja vía UI (botón "Plantar"), no por click directo en la tarjeta vacía aquí.
    if (datosEtapaHuerto.tipo === 'seed-plant') {
        return;
    
    // CASO 2: REGAR
    } else if (datosEtapaHuerto.tipo === 'seed-water') {
        const temporizador = elemento.querySelector('.temporizador-huerto');
        // Si el temporizador no ha terminado (no tiene clase 'ready'), no permitimos regar.
        if (temporizador && !temporizador.classList.contains('ready')) {
            return; 
        }
        
        // Obtenemos el ID de la parcela plantada (para saber cuántos riegos quedan)
        const idRaiz = obtenerIdGimnasio(nombreRegion, datosEtapaHuerto.idAnterior);
        const datosPlanta = progresoUsuario[idRaiz];
        
        if (datosPlanta && datosPlanta.numRiegos && datosPlanta.riegosRealizados !== undefined) {
            datosPlanta.riegosRealizados++;
            
            // Reiniciamos el temporizador de riego
            progresoUsuario[id] = { timestamp: new Date().toISOString() };
        } else {
            // Caso antiguo: riego simple sin múltiples riegos (legacy)
            progresoUsuario[id] = { timestamp: new Date().toISOString() };
        }
    
    // CASO 3: COSECHAR
    } else if (datosEtapaHuerto.tipo === 'seed-harvest') {
        // Al cosechar, debemos limpiar todo el historial de esa parcela (plantado, riego y cosecha)
        // para dejarla libre de nuevo.
        const idRaiz = obtenerIdGimnasio(nombreRegion, datosEtapaHuerto.idRaiz); 
        const idRiego = obtenerIdGimnasio(nombreRegion, datosEtapaHuerto.idAnterior); 
        
        if (progresoUsuario[id]) delete progresoUsuario[id];
        if (progresoUsuario[idRaiz]) delete progresoUsuario[idRaiz];
        if (progresoUsuario[idRiego]) delete progresoUsuario[idRiego];
        
        guardarProgreso();
        renderizarAplicacion();
        return;
    }
    
    guardarProgreso();
    renderizarAplicacion(); 
}

/**
 * Extrae el valor numérico de horas de una cadena de texto.
 * Ej: "16 horas" -> 16
 * @param {string} cadenaTiempo - Cadena como "16 horas".
 * @returns {number} Número de horas (ej: 16).
 */
function analizarHorasBaya(cadenaTiempo) {
    const match = cadenaTiempo && cadenaTiempo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

/**
 * Construye el panel interactivo de "Información sobre Bayas".
 * Incluye el selector (dropdown) y la tarjeta de detalles dinámica.
 */
function renderizarInfoBayas() {
    const contenedor = document.getElementById('berry-info-container');
    if (!contenedor) return;

    contenedor.innerHTML = ''; 
 
    const tarjeta = document.createElement('div');
    tarjeta.className = 'region-card';
 
    const cabecera = document.createElement('div');
    cabecera.className = 'region-header';
    cabecera.innerHTML = `<span style="flex-grow: 1; text-align: center;">Información sobre Bayas</span>`;
    cabecera.style.cursor = 'default';
    tarjeta.appendChild(cabecera);
 
    const envoltorio = document.createElement('div');
    envoltorio.className = 'berry-selector-wrapper';
 
    const selector = document.createElement('select');
    selector.className = 'berry-select';
    selector.innerHTML = `<option value="">Seleccione una baya...</option>`;
 
    // Ordenamos las bayas alfabéticamente para facilitar la búsqueda
    const bayasOrdenadas = [...datosBayas].sort((a, b) => a.nombre.localeCompare(b.nombre));
 
    bayasOrdenadas.forEach(baya => {
        selector.innerHTML += `<option value="${baya.nombre}">${baya.nombre}</option>`;
    });
 
    const contenedorInfo = document.createElement('div');
    contenedorInfo.id = 'selected-berry-info';
    contenedorInfo.className = 'berry-content-display';
    contenedorInfo.innerHTML = '<p class="berry-placeholder">Selecciona una baya para ver su información</p>';
 
    const generarNombreImagen = (nombre) => {
        return nombre.toLowerCase().replace('baya ', 'baya_').replace(/\s+/g, '_') + '.png';
    };
 
    // Evento: Cuando el usuario cambia la baya seleccionada
    selector.addEventListener('change', (evento) => {
        const nombreSeleccionado = evento.target.value;
 
        if (nombreSeleccionado) {
            const baya = datosBayas.find(b => b.nombre === nombreSeleccionado);
            if (baya) {
                const nombreImagenFinal = generarNombreImagen(baya.nombre);
                
                // Función auxiliar para convertir texto de recetas (ej: "Sem. Picante") 
                // en imágenes HTML pequeñas inline.
                const procesarCombinacion = (texto) => {
                    const procesarLinea = (linea) => {
                        return linea.replace(/Sem\.\s+([^x\+\n]+)/gi, (match, sabor) => {
                            let nombreLimpio = sabor.trim().toLowerCase()
                                .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'n')
                                .replace(/\s+/g, '_');
                            const nombreImagen = `sem_${nombreLimpio}.png`;
                            return `<img src="../img/bayas/${nombreImagen}" alt="${sabor.trim()}" title="${sabor.trim()}" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 4px;" onerror="this.style.display='none';">${match}`;
                        });
                    };

                    const lineas = texto.split('\n');
                    return `<ul style="margin: 0; padding-left: 0; list-style-type: none;">${lineas.map(l => `<li style="margin-bottom: 4px;">${procesarLinea(l)}</li>`).join('')}</ul>`;
                };
 
                let htmlContenido = `
                    <div class="selected-berry-header">
                        <img src="../img/bayas/${nombreImagenFinal}" alt="${baya.nombre}" class="berry-image" onerror="this.src='../img/bayas/sem_picante.png'; this.style.filter='grayscale(1)';">
                        <span class="berry-name">${baya.nombre}</span>
                    </div>
                    <div class="selected-berry-details">
                        <table class="berry-info-table">
                            <tbody>
                                <tr><th>Uso</th><td>${baya.uso}</td></tr>
                                <tr><th>Combinación</th><td>${procesarCombinacion(baya.combinacion)}</td></tr>
                                <tr><th>Riego</th><td>Cada ${baya.tiempoRiego}</td></tr>
                                <tr><th>Cosecha</th><td>${baya.tiempoCosecha}</td></tr>
                                <tr><th>Sabor</th><td>${baya.sabor}</td></tr>
                                <tr><th>Color</th><td>${baya.color}</td></tr>
                            </tbody>
                        </table>
                    </div>`;
                
                contenedorInfo.innerHTML = htmlContenido;
            }
        } else {
            contenedorInfo.innerHTML = '<p class="berry-placeholder">Selecciona una baya para ver su información</p>';
        }
    });
 
    envoltorio.appendChild(selector);
    envoltorio.appendChild(contenedorInfo);
    tarjeta.appendChild(envoltorio);
    contenedor.appendChild(tarjeta);
}

/**
 * Acción de Plantar: Valida inputs y guarda el estado inicial.
 * Se invoca desde el botón "Plantar" en la tarjeta del huerto.
 * @param {string} nombreRegion - Región del huerto.
 * @param {string} idUnico - ID de la parcela.
 * @param {HTMLElement} elementoBoton - Botón que disparó la acción.
 */
window.manejarPlantadoEnLinea = function(nombreRegion, idUnico, elementoBoton) {
    const contenedor = elementoBoton.parentElement;
    const selectorBaya = contenedor.querySelector('.selector-baya');
    const inputCantidadSemillas = contenedor.querySelector('.input-cantidad-semillas');
    const inputNumRiegos = contenedor.querySelector('.input-num-riegos');

    const nombreBaya = selectorBaya.value;

    if (!nombreBaya) {
        alert("Por favor, selecciona una baya.");
        return;
    }

    const validacion = validarInputSemillas(inputCantidadSemillas.value);
    if (!validacion.valid) {
        alert(validacion.message);
        return;
    }

    const cantidad = parseInt(inputCantidadSemillas.value);
    const numRiegos = parseInt(inputNumRiegos.value) || 1;

    if (numRiegos < 1 || numRiegos > 5) {
        alert("El número de riegos debe estar entre 1 y 5.");
        return;
    }

    const baya = datosBayas.find(b => b.nombre === nombreBaya);
    const horasCosecha = analizarHorasBaya(baya.tiempoCosecha);
    const horasRiego = analizarHorasBaya(baya.tiempoRiego);

    const id = obtenerIdGimnasio(nombreRegion, idUnico);
    
    // Guardamos toda la info necesaria para calcular los temporizadores después
    progresoUsuario[id] = {
        timestamp: new Date().toISOString(),
        cantidad: cantidad,
        nombreBaya: nombreBaya,
        intervaloCosecha: horasCosecha,
        intervaloRiego: horasRiego,
        numRiegos: numRiegos,
        riegosRealizados: 0
    };

    guardarProgreso();
    renderizarAplicacion();
};