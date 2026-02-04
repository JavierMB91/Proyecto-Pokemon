/**
 * ui.js
 * 
 * Controlador principal de la Interfaz de Usuario. Este archivo orquesta la renderización
 * completa de la aplicación, delegando lógica específica a otros módulos cuando es necesario.
 * Gestiona la actualización global de temporizadores, la creación de tarjetas de región,
 * el manejo de modales (reinicio, imágenes), la navegación y las funciones de importación/exportación de datos.
 */

/**
 * Controlador principal de clics en elementos de lista (Gimnasios o Huerto).
 * Delega la acción a `procesarClickSemilla` o `procesarClickGimnasio` según el tipo.
 */
function alternarGimnasio(nombreRegion, datosGimnasio, elemento) {
    // Delegar a la lógica específica según el tipo
    if (datosGimnasio.tipo && datosGimnasio.tipo.startsWith('seed')) {
        procesarClickSemilla(nombreRegion, datosGimnasio, elemento);
    } else {
        procesarClickGimnasio(nombreRegion, datosGimnasio, elemento);
    }
}

/**
 * Recorre todos los temporizadores activos en el DOM y actualiza su tiempo restante.
 * Gestiona la finalización de cuentas atrás, mostrando "Disponible" o reiniciando automáticamente.
 * Se ejecuta periódicamente (cada segundo).
 */
function actualizarTemporizadores() {
    const temporizadores = document.querySelectorAll('.gym-timer[data-timestamp]');
    const ahora = new Date().getTime();
    const idsParaReiniciar = [];

    temporizadores.forEach(temporizador => {
        const timestamp = temporizador.getAttribute('data-timestamp');
        const enfriamiento = parseFloat(temporizador.getAttribute('data-cooldown') || 18);
        if (!timestamp) return;

        const fecha = new Date(timestamp);
        const tiempoReinicio = fecha.getTime() + (enfriamiento * 60 * 60 * 1000);
        const tiempoRestante = tiempoReinicio - ahora;

        if (tiempoRestante > 0) {
            const horas = Math.floor(tiempoRestante / (1000 * 60 * 60)).toString().padStart(2, '0');
            const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000).toString().padStart(2, '0');
            const prefijo = temporizador.getAttribute('data-prefix') || '⏳';
            temporizador.innerHTML = `${prefijo} ${horas}h ${minutos}m ${segundos}s`;
            temporizador.classList.remove('ready');
        } else {
            if (temporizador.getAttribute('data-auto-reset') === 'true') {
                idsParaReiniciar.push(temporizador.getAttribute('data-gym-id'));
            } else {
                if (!temporizador.classList.contains('ready')) {
                    const etiquetaListo = temporizador.getAttribute('data-ready-label') || 'Disponible';
                    temporizador.innerHTML = `✅ ${etiquetaListo}`;
                    temporizador.classList.add('ready');
                    
                    const idGimnasioActual = temporizador.getAttribute('data-gym-id');
                    if (idGimnasioActual) {
                        const itemSiguienteEtapa = document.querySelector(`.gym-item[data-prev-id="${idGimnasioActual}"]`);
                        if (itemSiguienteEtapa) {
                            itemSiguienteEtapa.classList.remove('disabled');
                        }
                        if (idGimnasioActual.includes('spicy-seeds-water')) {
                            reproducirSonido('water');
                        } else if (idGimnasioActual.includes('spicy-seeds-harvest')) {
                            reproducirSonido('harvest');
                        }
                    }
                }
            }
        }
    });

    if (idsParaReiniciar.length > 0) {
        let cambiado = false;
        idsParaReiniciar.forEach(id => {
            if (progresoUsuario[id]) {
                delete progresoUsuario[id];
                cambiado = true;
            }
        });
        if (cambiado) {
            guardarProgreso();
            renderizarAplicacion();
        }
    }
}

/**
 * Genera el componente visual (HTML) para un gimnasio, entrenador o parcela de huerto.
 * Calcula estados como: completado, deshabilitado (por cooldown o requisitos previos) y construye la interfaz.
 * @param {string} nombreRegion - Región a la que pertenece.
 * @param {object} gimnasio - Datos del gimnasio/entrenador/parcela.
 * @returns {HTMLElement} Elemento <li> completo con eventos y estilos.
 */
function crearElementoGimnasio(nombreRegion, gimnasio) {
    const idUnico = gimnasio.id || gimnasio.lider;
    const idGimnasio = obtenerIdGimnasio(nombreRegion, idUnico);
    const datosProgreso = progresoUsuario[idGimnasio];
    const estaCompletado = !!datosProgreso;
    
    let enfriamiento = gimnasio.duracion || gimnasio.enfriamiento || 18;
    let timestampAUsar = datosProgreso ? datosProgreso.timestamp : null;

    if (gimnasio.tipo === 'seed-water') {
        const idPlantado = obtenerIdGimnasio(nombreRegion, gimnasio.idAnterior);
        const progresoPlantado = progresoUsuario[idPlantado];
        if (progresoPlantado && progresoPlantado.intervaloRiego) {
            enfriamiento = progresoPlantado.intervaloRiego;
            if (!timestampAUsar) {
                timestampAUsar = progresoPlantado.timestamp;
            }
        }
    } else if (gimnasio.tipo === 'seed-harvest') {
        const idPlantado = obtenerIdGimnasio(nombreRegion, gimnasio.idRaiz);
        const progresoPlantado = progresoUsuario[idPlantado];
        if (progresoPlantado && progresoPlantado.intervaloCosecha) {
            enfriamiento = progresoPlantado.intervaloCosecha;
            timestampAUsar = progresoPlantado.timestamp;
        }
    } else if (estaCompletado && datosProgreso.duracionPersonalizada) {
        enfriamiento = datosProgreso.duracionPersonalizada;
    }
    let prefijo = gimnasio.prefijoTemporizador || '⏳';
    let etiquetaListo = gimnasio.etiquetaListo || 'Disponible';
    let estaDeshabilitado = false;

    if (gimnasio.idAnterior) {
        const idGimnasioAnterior = obtenerIdGimnasio(nombreRegion, gimnasio.idAnterior);
        const progresoAnterior = progresoUsuario[idGimnasioAnterior];
        
        if (!progresoAnterior) {
            estaDeshabilitado = true;
        } else if (gimnasio.horasEspera) {
            const fechaAnterior = new Date(progresoAnterior.timestamp);
            const ahora = new Date();
            let esperaRequerida = progresoAnterior.duracionPersonalizada || gimnasio.horasEspera;
            if (gimnasio.tipo === 'seed-harvest') esperaRequerida = 0; 

            const horasTranscurridas = (ahora - fechaAnterior) / (1000 * 60 * 60);
            if (horasTranscurridas < esperaRequerida) {
                estaDeshabilitado = true;
            }
        }
    }

    const elementoLista = document.createElement('li');
    
    let esFilaClicable = true;
    if (gimnasio.tipo === 'seed-plant') {
        esFilaClicable = false; 
    } else if ((gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest') && estaCompletado) {
        esFilaClicable = false; 
    }
    elementoLista.className = `gym-item ${estaCompletado ? 'completed' : ''} ${estaDeshabilitado ? 'disabled' : ''} ${!esFilaClicable ? 'no-pointer' : ''}`;
    elementoLista.style.cursor = 'default'; 
    
    const idCompleto = obtenerIdGimnasio(nombreRegion, idUnico);
    elementoLista.setAttribute('data-gym-id', idCompleto);
    if (gimnasio.idAnterior) {
        const idAnteriorCompleto = obtenerIdGimnasio(nombreRegion, gimnasio.idAnterior);
        elementoLista.setAttribute('data-prev-id', idAnteriorCompleto);
    }

    let htmlFecha = '';
    let yaTerminado = false;
    if ((estaCompletado && datosProgreso.timestamp) || (timestampAUsar && (gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest'))) {
        const fecha = new Date(timestampAUsar);
        const horaFin = new Date(fecha.getTime() + (enfriamiento * 60 * 60 * 1000));
        const debeReiniciarseAuto = !gimnasio.tipo;
        const ahora = new Date();
        yaTerminado = ahora >= horaFin;
        let claseTimer = "gym-timer";
        let contenidoTimer = "";
        
        if (yaTerminado && !debeReiniciarseAuto) {
            claseTimer += " ready";
            contenidoTimer = `✅ ${etiquetaListo}`;
        }

        if (gimnasio.tipo === 'seed-plant') {
            htmlFecha = '';
        } else {
            const esHuerto = gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest';
            const claseTimerHuerto = esHuerto ? claseTimer + ' temporizador-huerto' : claseTimer;
            const cadenaHoraFin = formatearFecha(horaFin);
            htmlFecha = `
                <div class="gym-status-right">
                    <p class="${claseTimerHuerto}" data-timestamp="${timestampAUsar}" data-cooldown="${enfriamiento}" data-gym-id="${idGimnasio}"
                       data-prefix="${prefijo}" data-ready-label="${etiquetaListo}" ${debeReiniciarseAuto ? 'data-auto-reset="true"' : ''}>${contenidoTimer}</p>
                    <p class="gym-end-time large-date">${cadenaHoraFin}</p>
                </div>`;
        }
    }

    let textoInfo = `<p>Líder: ${gimnasio.lider}</p>`;
    if (gimnasio.tipo === 'seed-plant') {
        if (estaCompletado) {
            const nombreBaya = datosProgreso.nombreBaya || "Semilla";
            textoInfo = `
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    <p class="planted-berry-title" style="margin-bottom: 0;">${nombreBaya}</p>
                    <button class="btn-reset" onclick="window.mostrarModalReinicio()" style="font-size: 0.85rem; padding: 6px 12px; margin-left: 10px; text-transform: none; line-height: 1;">Reiniciar Huerto</button>
                </div>
                <p>Semillas: ${datosProgreso.cantidad}</p>`;
        } else {
            const bayasOrdenadas = [...datosBayas].sort((a, b) => a.nombre.localeCompare(b.nombre));
            let opciones = `<option value="">-- Elegir Baya --</option>`;
            bayasOrdenadas.forEach(b => {
                opciones += `<option value="${b.nombre}">${b.nombre}</option>`;
            });
            
            textoInfo = `
                <div class="controles-plantar" onclick="event.stopPropagation()">
                    <div class="control-group">
                        <label class="input-label">Seleccionar Baya</label>
                        <select class="selector-baya">${opciones}</select>
                    </div>
                    <div class="control-group">
                        <label class="input-label">Nº Semillas</label>
                        <input type="number" class="input-cantidad-semillas" placeholder="Cantidad" min="1">
                    </div>
                    <button class="btn-plant-confirm" onclick="window.manejarPlantadoEnLinea('${nombreRegion}', '${idUnico}', this)">✔</button>
                </div>
            `;
        }
    } else if (gimnasio.tipo === 'seed-water' || gimnasio.tipo === 'seed-harvest') {
        textoInfo = ''; 
    }

    let htmlImagen = '';
    if (gimnasio.tipo === 'seed-plant' && estaCompletado && datosProgreso.nombreBaya) {
        const nombreImgBaya = datosProgreso.nombreBaya.toLowerCase().replace('baya ', 'baya_').replace(/\s+/g, '_') + '.png';
        const fallback = gimnasio.imagen ? `this.src='../img/${gimnasio.imagen}'` : "this.style.display='none'";
        htmlImagen = `<img src="../img/bayas/${nombreImgBaya}" alt="${datosProgreso.nombreBaya}" class="gym-image" onerror="${fallback}">`;
    } else if (gimnasio.imagen) {
        const claseExtra = gimnasio.tipo === 'seed-plant' ? ' seed-plant-image' : '';
        htmlImagen = `<img src="../img/${gimnasio.imagen}" alt="${gimnasio.ciudad}" class="gym-image${claseExtra}">`;
    }

    let botonPuzzle = '';
    if (gimnasio.lider === 'Sabrina') {
        botonPuzzle = ` <button onclick="event.stopPropagation(); mostrarModalImagen('../img/Sabrina_puzzle.jpg')" style="border: none; background: none; cursor: pointer; font-size: 1.1rem; vertical-align: middle;" title="Ver solución">🧩</button>`;
    }

    const nombreCiudadMostrar = gimnasio.ciudad.replace(" (Morimoto)", "");
    let htmlTitulo = `<h3>${nombreCiudadMostrar}${botonPuzzle}</h3>`;

    if (gimnasio.tipo === 'seed-plant') {
        htmlTitulo = ''; 
    }

    elementoLista.innerHTML = `
        ${htmlImagen}
        <div class="gym-info">
            ${htmlTitulo}
            ${textoInfo}
        </div>
        ${htmlFecha}
    `;

    const imgInterna = elementoLista.querySelector('.gym-image');
    if (imgInterna) {
        if (gimnasio.tipo === 'seed-plant') {
            imgInterna.style.cursor = 'default';
        } else if (gimnasio.tipo === 'seed-water') {
            if (yaTerminado) {
                imgInterna.style.cursor = 'pointer';
            } else {
                imgInterna.style.cursor = 'default';
            }
        } else {
            imgInterna.style.cursor = 'pointer';
        }
        imgInterna.onclick = (e) => {
            e.stopPropagation();
            alternarGimnasio(nombreRegion, gimnasio, elementoLista);
        };
    }
    
    return elementoLista;
}

/**
 * Función principal de renderizado. Limpia el contenedor principal y reconstruye la interfaz
 * basándose en la ruta actual (URL) y los datos cargados.
 * Maneja la vista de Battle Tracker, Huerto o Rotación de Legendarios.
 */
function renderizarAplicacion() {
    const contenedorApp = document.getElementById('app');
    if (!contenedorApp) return; 

    contenedorApp.innerHTML = ''; 

    const ruta = window.location.pathname.toLowerCase();
    let secciones = [];

    if (ruta.includes('rotacionlegendarios')) {
        secciones.push({ datos: datosRotacionLegendarios, maxSlots: 2, ancho: true });
    } else if (ruta.includes('semillas')) {
        secciones.push({ datos: datosHuerto, maxSlots: 1 });
    } else {
        const tablero = document.createElement('div');
        tablero.className = 'battle-dashboard';

        const infoBox = document.createElement('div');
        infoBox.className = 'info-box';
        infoBox.innerHTML = `
            <h3>Funcionamiento</h3>
            <p>Si completas un gimnasio, se rellenará su medalla correspondiente.</p>
            <p>Si completas la Liga Pokémon, se rellenará la Master Ball.</p>
            <p>Selecciona los puntos en el mapa para ver la información del Líder de Gimnasio.</p>
            <p>Haz clic en la imagen del Líder para marcar el gimnasio como completado.</p>
        `;
        tablero.appendChild(infoBox);

        datosGimnasios.forEach(region => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'battle-region-card'; 

            const gimnasiosRequeridos = region.gimnasios.filter(g => g.lider !== 'Alto Mando' && g.id !== 'elite4');
            const regionCompletada = gimnasiosRequeridos.length > 0 && gimnasiosRequeridos.every(g => {
                const idUnico = g.id || g.lider;
                const idGimnasio = obtenerIdGimnasio(region.nombre, idUnico);
                return progresoUsuario[idGimnasio];
            });

            if (regionCompletada) {
                tarjeta.classList.add('region-completed');
            }

            let estaColapsado = true; 
            if (estadoRegiones.hasOwnProperty(region.nombre)) {
                estaColapsado = estadoRegiones[region.nombre];
            } else {
                estadoRegiones[region.nombre] = true;
            }

            if (estaColapsado) {
                tarjeta.classList.add('collapsed');
            }

            const cabecera = document.createElement('div');
            cabecera.className = 'battle-region-header';
            
            const inicialesPorRegion = {
                "Kanto": ["bulbasaur", "charmander", "squirtle"],
                "Johto": ["chikorita", "cyndaquil", "totodile"],
                "Hoenn": ["treecko", "torchic", "mudkip"],
                "Sinnoh": ["turtwig", "chimchar", "piplup"],
                "Teselia": ["snivy", "tepig", "oshawott"]
            };

            let htmlIniciales = '';
            let imagesHtml = [];

            const htmlMedallas = generarHTMLMedallas(region.nombre);
            if (htmlMedallas) {
                imagesHtml.push(htmlMedallas);
            }

            if (inicialesPorRegion[region.nombre]) {
                const medallasActuales = medallasPorRegion[region.nombre] || [];
                const pokeImgs = inicialesPorRegion[region.nombre].map((item, index) => {
                    const nombre = item.charAt(0).toUpperCase() + item.slice(1);
                    const src = `../img/${item}.png`;
                    const zIndexBase = medallasActuales.length;
                    const estilo = `
                        height: 50px; 
                        width: 50px; 
                        object-fit: contain; 
                        margin-left: ${index > 0 ? '-25px' : '0'}; 
                        position: relative; 
                        z-index: ${zIndexBase + index};
                        filter: drop-shadow(2px 0 2px rgba(0,0,0,0.5));
                    `;
                    return `<img src="${src}" alt="${nombre}" style="${estilo}">`;
                }).join('');
                imagesHtml.push(`<div style="display: flex; align-items: center;">${pokeImgs}</div>`);
            }

            if (imagesHtml.length > 0) {
                htmlIniciales = `
                    <div style="display: flex; margin-left: auto; margin-right: 15px; align-items: center; gap: 30px;">
                        ${imagesHtml.join('')}
                    </div>`;
            }

            cabecera.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                    <span>${region.nombre}</span>
                    <div class="header-legend">
                        <div class="legend-item"><div class="dot-legend red"></div> <span>No realizado</span></div>
                        <div class="legend-item"><div class="dot-legend green"></div> <span>Realizado</span></div>
                        <div class="legend-item"><div class="dot-legend blue"></div> <span>Seleccionado</span></div>
                    </div>
                </div>
                ${htmlIniciales}
                <span class="toggle-icon">▼</span>
            `;
            
            cabecera.onclick = () => {
                tarjeta.classList.toggle('collapsed');
                estadoRegiones[region.nombre] = tarjeta.classList.contains('collapsed');
                
                if (!estadoRegiones[region.nombre]) {
                    setTimeout(() => {
                        tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
                    }, 300);
                }
            };

            tarjeta.appendChild(cabecera);

            if (region.nombre === "Kanto" || region.nombre === "Johto" || region.nombre === "Hoenn" || region.nombre === "Sinnoh" || region.nombre === "Teselia") {
                const regionLower = region.nombre.toLowerCase();
                let coordsMap = {};
                let ciudadSeleccionada = null;
                let setCiudadSeleccionada = null;
                let getCiudadSeleccionada = null;
                let imgMapaSrc = `../img/mapas/${regionLower}_mapa.png`;

                if (region.nombre === "Kanto") {
                    coordsMap = coordenadasKanto;
                    ciudadSeleccionada = ciudadSeleccionadaKanto;
                    setCiudadSeleccionada = (c) => ciudadSeleccionadaKanto = c;
                    getCiudadSeleccionada = () => ciudadSeleccionadaKanto;
                } else if (region.nombre === "Johto") {
                    coordsMap = coordenadasJohto;
                    ciudadSeleccionada = ciudadSeleccionadaJohto;
                    setCiudadSeleccionada = (c) => ciudadSeleccionadaJohto = c;
                    getCiudadSeleccionada = () => ciudadSeleccionadaJohto;
                } else if (region.nombre === "Hoenn") {
                    coordsMap = coordenadasHoenn;
                    ciudadSeleccionada = ciudadSeleccionadaHoenn;
                    setCiudadSeleccionada = (c) => ciudadSeleccionadaHoenn = c;
                    getCiudadSeleccionada = () => ciudadSeleccionadaHoenn;
                } else if (region.nombre === "Sinnoh") {
                    coordsMap = coordenadasSinnoh;
                    ciudadSeleccionada = ciudadSeleccionadaSinnoh;
                    setCiudadSeleccionada = (c) => ciudadSeleccionadaSinnoh = c;
                    getCiudadSeleccionada = () => ciudadSeleccionadaSinnoh;
                } else if (region.nombre === "Teselia") {
                    coordsMap = coordenadasTeselia;
                    ciudadSeleccionada = ciudadSeleccionadaTeselia;
                    setCiudadSeleccionada = (c) => ciudadSeleccionadaTeselia = c;
                    getCiudadSeleccionada = () => ciudadSeleccionadaTeselia;
                }

                const contenedorMapa = document.createElement('div');
                contenedorMapa.className = `${regionLower}-map-container`;

                const wrapperMapa = document.createElement('div');
                wrapperMapa.className = `${regionLower}-map-wrapper`;
                
                const innerMapa = document.createElement('div');
                innerMapa.className = `${regionLower}-map-inner`;
                wrapperMapa.appendChild(innerMapa);

                const imgMapa = document.createElement('img');
                imgMapa.src = imgMapaSrc;
                imgMapa.className = `${regionLower}-map-image`;
                imgMapa.alt = `Mapa de ${region.nombre}`;
                innerMapa.appendChild(imgMapa);

                const todosLosPuntos = [...region.gimnasios];
                if (region.entrenadoresEspeciales) {
                    todosLosPuntos.push(...region.entrenadoresEspeciales);
                }
                const ciudadesProcesadas = new Set();

                todosLosPuntos.forEach(gimnasio => {
                    if (ciudadesProcesadas.has(gimnasio.ciudad)) return;

                    const coords = coordsMap[gimnasio.ciudad];
                    if (coords) {
                        ciudadesProcesadas.add(gimnasio.ciudad);
                        const dot = document.createElement('div');
                        dot.className = 'map-city-dot';
                        dot.style.top = coords.top;
                        dot.style.left = coords.left;
                        dot.title = gimnasio.ciudad;
                        if (gimnasio.shape) { dot.classList.add('shape-' + gimnasio.shape); }

                        if (gimnasio.width) { dot.style.width = typeof gimnasio.width === 'number' ? `${gimnasio.width}px` : gimnasio.width; }
                        if (gimnasio.height) { dot.style.height = typeof gimnasio.height === 'number' ? `${gimnasio.height}px` : gimnasio.height; }

                        if (gimnasio.cutX) { dot.style.setProperty('--cut-x', typeof gimnasio.cutX === 'number' ? `${gimnasio.cutX}px` : gimnasio.cutX); }
                        if (gimnasio.cutY) { dot.style.setProperty('--cut-y', typeof gimnasio.cutY === 'number' ? `${gimnasio.cutY}px` : gimnasio.cutY); }

                        const idUnico = gimnasio.id || gimnasio.lider;
                        const idGimnasio = obtenerIdGimnasio(region.nombre, idUnico);
                        if (progresoUsuario[idGimnasio]) {
                            dot.classList.add('completed');
                        }

                        dot.onclick = (e) => {
                            e.stopPropagation();
                            if (getCiudadSeleccionada() === gimnasio.ciudad) {
                                setCiudadSeleccionada(null);
                            } else {
                                setCiudadSeleccionada(gimnasio.ciudad);
                            }
                            actualizarInterfazMapa(region.nombre);
                        };

                        if (ciudadSeleccionada === gimnasio.ciudad) {
                            dot.classList.add('active');
                        }

                        innerMapa.appendChild(dot);
                    }
                });

                const panelDetalles = document.createElement('div');
                panelDetalles.className = `${regionLower}-details-panel`;

                if (ciudadSeleccionada) {
                    let gymSeleccionado = region.gimnasios.find(g => g.ciudad === ciudadSeleccionada);
                    if (!gymSeleccionado && region.entrenadoresEspeciales) {
                        gymSeleccionado = region.entrenadoresEspeciales.find(g => g.ciudad === ciudadSeleccionada);
                    }

                    if (gymSeleccionado) {
                        if (gymSeleccionado.lider === 'Vito y Leti') {
                            const divLider = document.createElement('div');
                            divLider.className = 'leader-model';
                            divLider.style.display = 'flex';
                            divLider.style.justifyContent = 'center';
                            divLider.style.alignItems = 'center';
                            divLider.setAttribute('alt', gymSeleccionado.lider);
                            divLider.style.cursor = 'pointer';
                            divLider.onclick = () => alternarGimnasio(region.nombre, gymSeleccionado, null);

                            const lideres = ['Vito', 'Leti'];
                            lideres.forEach((lider, index) => {
                                const img = document.createElement('img');
                                img.src = `../img/gimnasios_hoenn/${lider}.png`;
                                img.alt = lider;
                                img.style.height = '100%';
                                img.style.width = 'auto';
                                img.style.objectFit = 'contain';
                                if (index === 1) img.style.marginLeft = '-90px'; 
                                img.style.position = 'relative';
                                img.style.zIndex = index;
                                img.style.filter = 'drop-shadow(2px 0 2px rgba(0,0,0,0.5))';
                                divLider.appendChild(img);
                            });
                            panelDetalles.appendChild(divLider);
                        } else if (gymSeleccionado.lider === 'Zeo, Maíz y Millo') {
                            const divLider = document.createElement('div');
                            divLider.className = 'leader-model';
                            divLider.style.display = 'flex';
                            divLider.style.justifyContent = 'center';
                            divLider.style.alignItems = 'center';
                            divLider.setAttribute('alt', gymSeleccionado.lider);
                            divLider.style.cursor = 'pointer';
                            divLider.onclick = () => alternarGimnasio(region.nombre, gymSeleccionado, null);

                            const lideres = ['Zeo', 'Maiz', 'Millo'];
                            lideres.forEach((lider, index) => {
                                const img = document.createElement('img');
                                img.src = `../img/gimnasios_teselia/${lider}.png`;
                                img.alt = lider;
                                img.style.height = '100%';
                                img.style.width = 'auto';
                                img.style.objectFit = 'contain';
                                if (index === 1) img.style.marginLeft = '-115px';
                                if (index === 2) img.style.marginLeft = '-130px';
                                img.style.position = 'relative';
                                img.style.zIndex = index;
                                img.style.filter = 'drop-shadow(2px 0 2px rgba(0,0,0,0.5))';
                                divLider.appendChild(img);
                            });
                            panelDetalles.appendChild(divLider);
                        } else {
                            const nombreArchivo = gymSeleccionado.lider.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\./g, '').replace(/,/g, '').replace(/\s+/g, '_');
                            const imgLider = document.createElement('img');
                            imgLider.className = 'leader-model';
                            imgLider.style.cursor = 'pointer';
                            imgLider.onclick = () => alternarGimnasio(region.nombre, gymSeleccionado, null);
                            if (gymSeleccionado.lider === 'Alto Mando') {
                                imgLider.src = '../img/alto_mando.png';
                            } else {
                                imgLider.src = `../img/gimnasios_${regionLower}/${nombreArchivo}.png`;
                            }
                            imgLider.alt = gymSeleccionado.lider;
                            panelDetalles.appendChild(imgLider);
                        }

                        const listaDetalle = document.createElement('ul');
                        listaDetalle.className = 'gym-list detail-view';
                        listaDetalle.style.width = '100%';
                        listaDetalle.style.background = 'transparent';
                        listaDetalle.appendChild(crearElementoGimnasio(region.nombre, gymSeleccionado));
                        panelDetalles.appendChild(listaDetalle);
                    }
                } else {
                    panelDetalles.innerHTML = `<p style="color: var(--text-muted); text-align: center;">Selecciona una ciudad en el mapa para ver al Líder de Gimnasio.</p>`;
                }

                contenedorMapa.appendChild(wrapperMapa);
                contenedorMapa.appendChild(panelDetalles);
                tarjeta.appendChild(contenedorMapa);
            } else {
                const lista = document.createElement('ul');
                lista.className = 'battle-gym-list';

                region.gimnasios.forEach(gimnasio => {
                    const itemGimnasio = crearElementoGimnasio(region.nombre, gimnasio);
                    itemGimnasio.classList.add('battle-gym-item');
                    itemGimnasio.style.cursor = 'pointer';
                    itemGimnasio.onclick = () => alternarGimnasio(region.nombre, gimnasio, itemGimnasio);
                    
                    const nombreArchivo = gimnasio.lider.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\./g, '').replace(/,/g, '').replace(/\s+/g, '_');
                    
                    if (gimnasio.lider === 'Alto Mando') {
                        itemGimnasio.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../img/alto_mando.png')`;
                    } else {
                        itemGimnasio.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../img/gimnasios_${region.nombre.toLowerCase()}/${nombreArchivo}.png')`;
                    }
                    itemGimnasio.style.backgroundSize = '100% 100%, 100% 100%';
                    itemGimnasio.style.backgroundPosition = 'center';
                    itemGimnasio.style.backgroundRepeat = 'no-repeat';
                    lista.appendChild(itemGimnasio);
                });

                tarjeta.appendChild(lista);
            } 
            tablero.appendChild(tarjeta);
        });

        contenedorApp.appendChild(tablero);
        actualizarTemporizadores();
        return; 
    }

    secciones.forEach(seccion => {
        renderizarConjuntoRegiones(seccion.datos, contenedorApp, seccion.maxSlots, seccion.ancho);
    });

    actualizarTemporizadores();
}

/**
 * Renderiza una lista de regiones (tarjetas) en el contenedor especificado.
 * @param {Array} datos - Array de datos de regiones.
 * @param {HTMLElement} contenedor - Elemento donde insertar las tarjetas.
 * @param {number} maxSlots - Número máximo de slots a mostrar (rellena con placeholders).
 * @param {boolean} esAncho - Si true, aplica estilos de tarjeta ancha (horizontal).
 */
function renderizarConjuntoRegiones(datos, contenedor, maxSlots, esAncho) {
    const ruta = window.location.pathname.toLowerCase();

    datos.forEach(region => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'region-card';

        const esEstatico = region.nombre === "Huerto" || ruta.includes('rotacionlegendarios');

        if (!esEstatico && estadoRegiones[region.nombre]) {
            tarjeta.classList.add('collapsed');
        }

        const cabecera = document.createElement('div');
        cabecera.className = 'region-header';
        
        if (esEstatico) {
            cabecera.innerHTML = `<span style="flex-grow: 1; text-align: center;">${region.nombre}</span>`;
            cabecera.style.cursor = 'default';
        } else {
            cabecera.innerHTML = `<span style="flex-grow: 1; text-align: center;">${region.nombre}</span><span class="toggle-icon" style="transition: transform 0.3s;">▼</span>`;
            cabecera.onclick = () => {
                tarjeta.classList.toggle('collapsed');
                estadoRegiones[region.nombre] = tarjeta.classList.contains('collapsed');
                
                if (!estadoRegiones[region.nombre]) {
                    setTimeout(() => {
                        tarjeta.scrollIntoView({ behavior: 'smooth', block: 'center' }); 
                    }, 300);
                }
            };
        }
        tarjeta.appendChild(cabecera);

        const lista = document.createElement('ul');
        lista.className = 'gym-list';
        
        if (esAncho) {
            lista.classList.add('horizontal-layout');
            tarjeta.classList.add('wide-card');
        }

        region.gimnasios.forEach(gimnasio => {
            if (gimnasio.tipo === 'encounter') {
                lista.appendChild(crearElementoEncuentro(gimnasio));
            } else {
                lista.appendChild(crearElementoGimnasio(region.nombre, gimnasio));
            }
        });

        if (region.gimnasios.length < maxSlots) {
            for (let i = region.gimnasios.length; i < maxSlots; i++) {
                const marcadorPosicion = document.createElement('li');
                marcadorPosicion.className = 'gym-item placeholder';
                marcadorPosicion.innerHTML = `
                    <div class="checkbox-wrapper" style="visibility: hidden;"></div>
                    <div class="gym-info"><h3 style="color: #ddd;">---</h3></div>
                `;
                lista.appendChild(marcadorPosicion);
            }
        }

        tarjeta.appendChild(lista);

        if (region.entrenadoresEspeciales && region.entrenadoresEspeciales.length > 0) {
            const cajaEspecial = document.createElement('div');
            cajaEspecial.className = 'special-trainers-box';
            
            const cabeceraEspecial = document.createElement('div');
            cabeceraEspecial.className = 'special-trainers-header';
            cabeceraEspecial.innerHTML = `Combates Especiales`;
            cajaEspecial.appendChild(cabeceraEspecial);
            
            const listaEspecial = document.createElement('ul');
            listaEspecial.className = 'gym-list';
            
            region.entrenadoresEspeciales.forEach(entrenador => {
                listaEspecial.appendChild(crearElementoGimnasio(region.nombre, entrenador));
            });
            
            cajaEspecial.appendChild(listaEspecial);
            tarjeta.appendChild(cajaEspecial);
        }

        contenedor.appendChild(tarjeta);
    });
}

// --- NAVEGACIÓN ---
/**
 * Carga asíncronamente el archivo `nav.html` e inyecta la barra de navegación en la página.
 */
async function cargarNavegacion() {
    const marcadorPosicion = document.getElementById('nav-placeholder');
    if (!marcadorPosicion) return;

    try {
        const respuesta = await fetch('nav.html');
        if (respuesta.ok) {
            marcadorPosicion.innerHTML = await respuesta.text();
        } else {
            console.error(`Error cargando nav.html: ${respuesta.status}. Verifica si el archivo en Git se llama 'Nav.html' (mayúscula) en lugar de 'nav.html'.`);
        }
    } catch (error) {
        console.error("Error cargando navegación (posiblemente por protocolo file://):", error);
        marcadorPosicion.innerHTML = '<div style="text-align:center; padding:10px; background:#eee;">Menú no cargado (requiere servidor local)</div>';
    }
}

// Funciones del Modal
/**
 * Muestra el modal de confirmación para reiniciar el progreso.
 * @param {string} contexto - Contexto opcional para reiniciar solo una sección ('gyms', etc.).
 */
function mostrarModalReinicio(contexto) {
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('rotacionlegendarios')) return;

    if (typeof contexto === 'string') {
        contextoReinicio = contexto;
    } else {
        contextoReinicio = null;
    }

    const modal = document.getElementById('modal-overlay');
    if (!modal) return;

    modal.classList.add('active');
}
window.mostrarModalReinicio = mostrarModalReinicio;

/**
 * Oculta el modal de reinicio.
 */
function ocultarModalReinicio() {
    document.getElementById('modal-overlay').classList.remove('active');
}

/**
 * Ejecuta el reinicio de progreso confirmado por el usuario.
 * Borra las entradas correspondientes en `progresoUsuario` y recarga la interfaz.
 */
function confirmarReinicio() {
    let conjuntosDatosAReiniciar = [];
    const ruta = window.location.pathname.toLowerCase();
    
    if (contextoReinicio === 'gyms') {
        conjuntosDatosAReiniciar = [datosGimnasios];
    } else if (ruta.includes('semillas')) {
        conjuntosDatosAReiniciar = [datosHuerto];
    } else if (ruta.includes('rotacionlegendarios')) {
        conjuntosDatosAReiniciar = [datosRotacionLegendarios];
    } else {
        conjuntosDatosAReiniciar = [datosGimnasios];
    }

    conjuntosDatosAReiniciar.forEach(conjuntoDatos => {
        conjuntoDatos.forEach(region => {
            region.gimnasios.forEach(item => {
                const idUnico = item.id || item.lider;
                const id = obtenerIdGimnasio(region.nombre, idUnico);
                delete progresoUsuario[id];
            });

            if (region.entrenadoresEspeciales) {
                region.entrenadoresEspeciales.forEach(entrenador => {
                    const idUnico = entrenador.id || entrenador.lider;
                    const id = obtenerIdGimnasio(region.nombre, idUnico);
                    delete progresoUsuario[id];
                });
            }
        });
    });

    guardarProgreso();
    renderizarAplicacion();
    ocultarModalReinicio();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- MODAL DE IMAGEN ---
/**
 * Crea e inserta en el DOM la estructura HTML para el modal de visualización de imágenes.
 * Se ejecuta una sola vez al inicio.
 */
function configurarModalImagen() {
    if (!document.getElementById('img-modal-overlay')) {
        const modal = document.createElement('div');
        modal.id = 'img-modal-overlay';
        modal.className = 'modal-overlay';
        modal.onclick = (e) => {
            if(e.target === modal) modal.classList.remove('active');
        };
        modal.innerHTML = `
            <div class="modal-content" style="background: transparent; border: none; box-shadow: none; max-width: 95%; width: auto; padding: 0; display: flex; flex-direction: column; align-items: center;">
                <img id="img-modal-target" src="" style="max-width: 100%; max-height: 85vh; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <button onclick="document.getElementById('img-modal-overlay').classList.remove('active')" style="margin-top: 15px; padding: 8px 20px; background: white; border: none; border-radius: 20px; cursor: pointer; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

/**
 * Abre el modal de imagen mostrando la imagen especificada.
 * @param {string} src - Ruta de la imagen a mostrar.
 */
window.mostrarModalImagen = function(src) {
    const modal = document.getElementById('img-modal-overlay');
    const img = document.getElementById('img-modal-target');
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
    }
};

// --- GESTIÓN DE DATOS (EXPORTAR/IMPORTAR) ---
/**
 * Configura los botones de Exportar e Importar datos en el encabezado.
 * Crea los elementos del DOM y asigna sus eventos.
 */
function configurarInterfazDatos() {
    const cabecera = document.querySelector('header');
    if (!cabecera) return;

    let contenedorUsuario = document.getElementById('user-auth-container');
    if (!contenedorUsuario) {
        contenedorUsuario = document.createElement('div');
        contenedorUsuario.id = 'user-auth-container';
        contenedorUsuario.style.position = 'absolute';
        contenedorUsuario.style.top = '50%';
        contenedorUsuario.style.right = '20px';
        contenedorUsuario.style.transform = 'translateY(-50%)';
        contenedorUsuario.style.display = 'flex';
        contenedorUsuario.style.gap = '10px';
        cabecera.appendChild(contenedorUsuario);
        cabecera.style.position = 'relative';
    }

    contenedorUsuario.innerHTML = '';

    const botonExportar = document.createElement('button');
    botonExportar.textContent = '💾 Guardar Archivo';
    botonExportar.className = 'btn-data';
    botonExportar.style.padding = '5px 10px';
    botonExportar.style.fontSize = '0.8rem';
    botonExportar.onclick = exportarDatos;

    const botonImportar = document.createElement('button');
    botonImportar.textContent = '📂 Cargar Archivo';
    botonImportar.className = 'btn-data';
    botonImportar.style.padding = '5px 10px';
    botonImportar.style.fontSize = '0.8rem';
    botonImportar.onclick = () => document.getElementById('import-file').click();

    const inputArchivo = document.createElement('input');
    inputArchivo.type = 'file';
    inputArchivo.id = 'import-file';
    inputArchivo.accept = '.json';
    inputArchivo.style.display = 'none';
    inputArchivo.onchange = importarDatos;

    contenedorUsuario.appendChild(botonExportar);
    contenedorUsuario.appendChild(botonImportar);
    contenedorUsuario.appendChild(inputArchivo);
}
