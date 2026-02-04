/**
 * semillas.js
 * 
 * Módulo dedicado a la funcionalidad del Huerto de Bayas. Contiene toda la lógica
 * del ciclo de vida de las plantas: plantado, riego y cosecha. Gestiona los temporizadores
 * específicos de crecimiento, la selección de bayas, la validación de inputs de plantado
 * y la renderización de la información detallada de cada tipo de baya.
 */

// Lógica específica de Semillas y Huerto

/**
 * Gestiona la lógica principal del huerto cuando el usuario interactúa con una parcela.
 * Controla el flujo: Plantar -> Regar (con espera) -> Cosechar (con espera).
 * Actualiza el estado en `progresoUsuario` y guarda los cambios.
 * @param {string} nombreRegion - Contexto de la región (generalmente "Huerto").
 * @param {object} datosEtapaHuerto - Datos de configuración de la etapa actual.
 * @param {HTMLElement} elemento - Elemento DOM clicado.
 */
function procesarClickSemilla(nombreRegion, datosEtapaHuerto, elemento) {
    const idUnico = datosEtapaHuerto.id || datosEtapaHuerto.lider;
    const id = generarIdElemento(nombreRegion, idUnico);
    
    if (datosEtapaHuerto.tipo === 'seed-plant') {
        return;
    } else if (datosEtapaHuerto.tipo === 'seed-water') {
        const temporizador = elemento.querySelector('.temporizador-huerto');
        if (temporizador && !temporizador.classList.contains('ready')) {
            return; 
        }
        progresoUsuario[id] = { timestamp: new Date().toISOString() };
    } else if (datosEtapaHuerto.tipo === 'seed-harvest') {
        const idRaiz = generarIdElemento(nombreRegion, datosEtapaHuerto.idRaiz); 
        const idRiego = generarIdElemento(nombreRegion, datosEtapaHuerto.idAnterior); 
        
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
 * @param {string} cadenaTiempo - Cadena como "16 horas".
 * @returns {number} Número de horas (ej: 16).
 */
function analizarHorasBaya(cadenaTiempo) {
    const match = cadenaTiempo && cadenaTiempo.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

/**
 * Genera y renderiza el panel de información detallada de las bayas.
 * Crea un selector desplegable y muestra datos (sabor, tiempo, combinación) de la baya seleccionada.
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
 
    selector.addEventListener('change', (evento) => {
        const nombreSeleccionado = evento.target.value;
 
        if (nombreSeleccionado) {
            const baya = datosBayas.find(b => b.nombre === nombreSeleccionado);
            if (baya) {
                const nombreImagenFinal = generarNombreImagen(baya.nombre);
                
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
 * Maneja el evento de plantar semillas directamente desde la interfaz de la tarjeta.
 * Valida la entrada, calcula tiempos de riego/cosecha y guarda el estado inicial del cultivo.
 * @param {string} nombreRegion - Región del huerto.
 * @param {string} idUnico - ID de la parcela.
 * @param {HTMLElement} elementoBoton - Botón que disparó la acción.
 */
window.manejarPlantadoEnLinea = function(nombreRegion, idUnico, elementoBoton) {
    const contenedor = elementoBoton.parentElement;
    const selectorBaya = contenedor.querySelector('.selector-baya');
    const inputCantidadSemillas = contenedor.querySelector('.input-cantidad-semillas');

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

    const baya = datosBayas.find(b => b.nombre === nombreBaya);
    const horasCosecha = analizarHorasBaya(baya.tiempoCosecha);
    const horasRiego = analizarHorasBaya(baya.tiempoRiego);

    const id = generarIdElemento(nombreRegion, idUnico);
    progresoUsuario[id] = {
        timestamp: new Date().toISOString(),
        cantidad: cantidad,
        nombreBaya: nombreBaya,
        intervaloCosecha: horasCosecha,
        intervaloRiego: horasRiego
    };

    guardarProgreso();
    renderizarAplicacion();
};