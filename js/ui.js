// Alternar estado del gimnasio (Controlador)
function alternarGimnasio(nombreRegion, datosGimnasio, elemento) {
    const idUnico = datosGimnasio.id || datosGimnasio.lider;
    const id = obtenerIdGimnasio(nombreRegion, idUnico);
    
    if (datosGimnasio.tipo === 'seed-plant') {
        return;
    } else if (datosGimnasio.tipo === 'seed-water') {
        const timer = elemento.querySelector('.gym-timer');
        if (timer && !timer.classList.contains('ready')) {
            return; 
        }
        progresoUsuario[id] = { timestamp: new Date().toISOString() };
    } else if (datosGimnasio.tipo === 'seed-harvest') {
        const idRaiz = obtenerIdGimnasio(nombreRegion, datosGimnasio.idRaiz); 
        const idRiego = obtenerIdGimnasio(nombreRegion, datosGimnasio.idAnterior); 
        
        if (progresoUsuario[id]) delete progresoUsuario[id];
        if (progresoUsuario[idRaiz]) delete progresoUsuario[idRaiz];
        if (progresoUsuario[idRiego]) delete progresoUsuario[idRiego];
        
        guardarProgreso();
        renderizarAplicacion();
        return;
    } else {
        if (progresoUsuario[id]) {
            return;
        } else {
            progresoUsuario[id] = {
                timestamp: new Date().toISOString()
            };
        }
    }
    
    guardarProgreso();
    
    const ruta = window.location.pathname.toLowerCase();
    const regionesConMapa = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Teselia'];
    if (ruta.includes('battletracker') && regionesConMapa.includes(nombreRegion)) {
        actualizarInterfazMapa(nombreRegion);
    } else {
        renderizarAplicacion(); 
    }
}

// Actualizar temporizadores en el DOM
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

// Helper para crear el elemento HTML de un gimnasio/entrenador
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
            const cadenaHoraFin = formatearFecha(horaFin);
            htmlFecha = `
                <div class="gym-status-right">
                    <p class="${claseTimer}" data-timestamp="${timestampAUsar}" data-cooldown="${enfriamiento}" data-gym-id="${idGimnasio}"
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
                <div class="seed-plant-controls" onclick="event.stopPropagation()">
                    <div class="control-group">
                        <label class="input-label">Seleccionar Baya</label>
                        <select class="gym-berry-select">${opciones}</select>
                    </div>
                    <div class="control-group">
                        <label class="input-label">Nº Semillas</label>
                        <input type="number" class="seed-count-input" placeholder="Cantidad" min="1">
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

// Helper para crear el elemento de Encuentros
function crearElementoEncuentro(nombreRegion, gimnasio) {
    const elementoLista = document.createElement('li');
    elementoLista.className = 'gym-item';
    
    let gifPokemon = '';
    const legendarios = ['Zapdos', 'Moltres', 'Articuno', 'Entei', 'Suicune', 'Raikou'];
    if (legendarios.includes(gimnasio.lider)) {
        gifPokemon = `<div style="margin-top: 5px;"><img src="../img/${gimnasio.lider.toLowerCase()}.gif" alt="${gimnasio.lider}" style="height: 90px;" onerror="this.style.display='none'"></div>`;
    }

    elementoLista.innerHTML = `
        <div class="gym-info">
            <h3>${gimnasio.lider}</h3>
            ${gifPokemon}
            <p>Región: ${gimnasio.ciudad}</p>
        </div>
    `;
    
    return elementoLista;
}

function generarHTMLMedallas(nombreRegion) {
    if (!medallasPorRegion[nombreRegion]) return '';

    const regionData = datosGimnasios.find(r => r.nombre === nombreRegion);
    if (!regionData) return '';

    const medallas = medallasPorRegion[nombreRegion];
    const regionFolder = `gimnasios_${nombreRegion.toLowerCase()}`;
    
    const gimnasiosBadge = regionData.gimnasios.filter(g => g.lider !== 'Alto Mando' && g.id !== 'elite4');

    let htmlPepitas = '';
    let zIndexOffset = 0;
    if (nombreRegion === 'Teselia' && regionData.entrenadoresEspeciales) {
        const specialTrainers = regionData.entrenadoresEspeciales;
        zIndexOffset = specialTrainers.length; 

        htmlPepitas = specialTrainers.map((trainer, idx) => {
            const idUnico = trainer.id || trainer.lider;
            const idTrainer = obtenerIdGimnasio(nombreRegion, idUnico);
            const isCompleted = !!progresoUsuario[idTrainer];

            const filterStyle = isCompleted 
                ? 'drop-shadow(2px 0 2px rgba(0,0,0,0.5))' 
                : 'grayscale(100%) brightness(30%) opacity(0.7)';

            const estiloPepita = `
                height: 40px; width: 40px; object-fit: contain; 
                margin-left: ${idx > 0 ? '-20px' : '0'}; 
                position: relative; z-index: ${idx};
                filter: ${filterStyle}; transition: filter 0.3s ease;
            `;
            return `<img src="../img/pepita.png" alt="${trainer.lider}" style="${estiloPepita}" title="${isCompleted ? 'Vencido: ' + trainer.lider : 'No vencido: ' + trainer.lider}">`;
        }).join('');
    }

    const badgeImgs = medallas.map((item, index) => {
        let isObtained = false;
        if (index < gimnasiosBadge.length) {
            const gym = gimnasiosBadge[index];
            const idUnico = gym.id || gym.lider;
            const idGimnasio = obtenerIdGimnasio(nombreRegion, idUnico);
            if (progresoUsuario[idGimnasio]) {
                isObtained = true;
            }
        }

        const nombre = `Medalla ${item.charAt(0).toUpperCase() + item.slice(1)}`;
        const src = `../img/${regionFolder}/medalla_${item}.png`;
        
        const filterStyle = isObtained 
            ? 'drop-shadow(2px 0 2px rgba(0,0,0,0.5))' 
            : 'grayscale(100%) brightness(30%) opacity(0.7)';

        const estilo = `
            height: 40px; 
            width: 40px; 
            object-fit: contain; 
            margin-left: ${index > 0 ? '-20px' : (nombreRegion === 'Teselia' ? '15px' : '0')}; 
            position: relative; 
            z-index: ${index + zIndexOffset};
            filter: ${filterStyle};
            transition: filter 0.3s ease;
        `;
        return `<img src="${src}" alt="${nombre}" style="${estilo}" title="${isObtained ? 'Obtenida' : 'No obtenida'}">`;
    }).join('');

    let htmlMasterBall = '';
    const elite4Gym = regionData.gimnasios.find(g => g.lider === 'Alto Mando' || g.id === 'elite4');
    
    if (elite4Gym) {
        const idUnico = elite4Gym.id || elite4Gym.lider;
        const idGimnasio = obtenerIdGimnasio(nombreRegion, idUnico);
        const isElite4Completed = !!progresoUsuario[idGimnasio];
        
        const filterStyleMB = isElite4Completed 
            ? 'drop-shadow(2px 0 2px rgba(0,0,0,0.5))' 
            : 'grayscale(100%) brightness(30%) opacity(0.7)';

        htmlMasterBall = `<img src="../img/master_ball.png" alt="Liga Pokémon" style="
            height: 40px; width: 40px; object-fit: contain; margin-left: 10px; position: relative; z-index: ${medallas.length + zIndexOffset};
            filter: ${filterStyleMB}; transition: filter 0.3s ease;" title="${isElite4Completed ? 'Liga Pokémon Completada' : 'Liga Pokémon No Completada'}">`;
    }

    return `<div class="region-badges" style="display: flex; align-items: center;">${htmlPepitas}${badgeImgs}${htmlMasterBall}</div>`;
}

// Función para actualizar solo la interfaz del mapa (sin re-renderizar todo)
function actualizarInterfazMapa(nombreRegion) {
    const regionLower = nombreRegion.toLowerCase();
    const container = document.querySelector(`.${regionLower}-map-container`);
    if (!container) return;

    const regionData = datosGimnasios.find(r => r.nombre === nombreRegion);
    if (!regionData) return;
    
    const tarjeta = container.closest('.battle-region-card');
    if (tarjeta) {
        const gimnasiosRequeridos = regionData.gimnasios.filter(g => g.lider !== 'Alto Mando' && g.id !== 'elite4');
        const regionCompletada = gimnasiosRequeridos.length > 0 && gimnasiosRequeridos.every(g => {
            const idUnico = g.id || g.lider;
            const idGimnasio = obtenerIdGimnasio(nombreRegion, idUnico);
            return progresoUsuario[idGimnasio];
        });

        if (regionCompletada) {
            tarjeta.classList.add('region-completed');
        } else {
            tarjeta.classList.remove('region-completed');
        }

        const badgesContainer = tarjeta.querySelector('.region-badges');
        if (badgesContainer) {
            badgesContainer.outerHTML = generarHTMLMedallas(nombreRegion);
        }
    }

    let ciudadSeleccionada = null;
    
    switch (nombreRegion) {
        case 'Kanto': ciudadSeleccionada = ciudadSeleccionadaKanto; break;
        case 'Johto': ciudadSeleccionada = ciudadSeleccionadaJohto; break;
        case 'Hoenn': ciudadSeleccionada = ciudadSeleccionadaHoenn; break;
        case 'Sinnoh': ciudadSeleccionada = ciudadSeleccionadaSinnoh; break;
        case 'Teselia': ciudadSeleccionada = ciudadSeleccionadaTeselia; break;
    }

    const dots = container.querySelectorAll('.map-city-dot');
    dots.forEach(dot => {
        const ciudad = dot.title;
        let gimnasio = regionData.gimnasios.find(g => g.ciudad === ciudad);
        if (!gimnasio && regionData.entrenadoresEspeciales) {
            gimnasio = regionData.entrenadoresEspeciales.find(g => g.ciudad === ciudad);
        }
        
        if (ciudad === ciudadSeleccionada) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }

        if (gimnasio) {
            const idUnico = gimnasio.id || gimnasio.lider;
            const idGimnasio = obtenerIdGimnasio(nombreRegion, idUnico);
            if (progresoUsuario[idGimnasio]) {
                dot.classList.add('completed');
            } else {
                dot.classList.remove('completed');
            }
        }
    });

    const panelDetalles = container.querySelector(`.${regionLower}-details-panel`);
    if (!panelDetalles) return;
    
    const currentImg = panelDetalles.querySelector('.leader-model');
    const currentAlt = currentImg ? (currentImg.alt || currentImg.getAttribute('alt')) : null;
    
    let gymSeleccionado = null;
    if (ciudadSeleccionada) {
        gymSeleccionado = regionData.gimnasios.find(g => g.ciudad === ciudadSeleccionada);
        if (!gymSeleccionado && regionData.entrenadoresEspeciales) {
            gymSeleccionado = regionData.entrenadoresEspeciales.find(g => g.ciudad === ciudadSeleccionada);
        }
    }

    if (gymSeleccionado && currentAlt === gymSeleccionado.lider) {
        const listaDetalle = panelDetalles.querySelector('.gym-list');
        if (listaDetalle) {
            listaDetalle.innerHTML = '';
            listaDetalle.appendChild(crearElementoGimnasio(nombreRegion, gymSeleccionado));
        }
    } else {
        panelDetalles.innerHTML = '';

        if (gymSeleccionado) {
            if (gymSeleccionado.lider === 'Vito y Leti') {
                const divLider = document.createElement('div');
                divLider.className = 'leader-model';
                divLider.style.display = 'flex';
                divLider.style.justifyContent = 'center';
                divLider.style.alignItems = 'center';
                divLider.setAttribute('alt', gymSeleccionado.lider);
                divLider.style.cursor = 'pointer';
                divLider.onclick = () => alternarGimnasio(nombreRegion, gymSeleccionado, null);

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
                divLider.onclick = () => alternarGimnasio(nombreRegion, gymSeleccionado, null);

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
                imgLider.onclick = () => alternarGimnasio(nombreRegion, gymSeleccionado, null);
                            
                if (gymSeleccionado.imagen) {
                    imgLider.src = `../img/${gymSeleccionado.imagen}`;
                } else if (gymSeleccionado.lider === 'Alto Mando') {
                    imgLider.src = '../img/alto_mando.png';
                } else {
                    imgLider.src = `../img/gimnasios_${regionLower}/${nombreArchivo}.png`;
                }

                if (gymSeleccionado.lider === 'Cintia') {
                    imgLider.onerror = function() {
                        this.onerror = null;
                        this.src = `../img/gimnasios_sinnoh/${nombreArchivo}.png`;
                    };
                }
                imgLider.alt = gymSeleccionado.lider;
                panelDetalles.appendChild(imgLider);
            }

            const listaDetalle = document.createElement('ul');
            listaDetalle.className = 'gym-list detail-view';
            listaDetalle.style.width = '100%';
            listaDetalle.style.background = 'transparent';
            listaDetalle.appendChild(crearElementoGimnasio(nombreRegion, gymSeleccionado));
            panelDetalles.appendChild(listaDetalle);
        } else {
            panelDetalles.innerHTML = `<p style="color: var(--text-muted); text-align: center;">Selecciona una ciudad en el mapa para ver al Líder de Gimnasio.</p>`;
        }
    }
    
    actualizarTemporizadores();
}

// Renderizar la interfaz
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

// Función auxiliar para renderizar un conjunto de regiones
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
                lista.appendChild(crearElementoEncuentro(region.nombre, gimnasio));
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

// Renderizar la información de las bayas
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

// --- NAVEGACIÓN ---
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
function mostrarModalReinicio(contexto) {
    if (typeof contexto === 'string') {
        contextoReinicio = contexto;
    } else {
        contextoReinicio = null;
    }

    document.getElementById('modal-overlay').classList.add('active');
    const modal = document.getElementById('modal-overlay');
    
    const ruta = window.location.pathname.toLowerCase();
    if (ruta.includes('rotacionlegendarios')) {
        const contenido = modal.querySelector('.modal-content');
        
        let htmlBotones = '';
        datosRotacionLegendarios.forEach(region => {
            const idSeguro = region.nombre.replace(/\s+/g, '-').toLowerCase();
            htmlBotones += `<button class="btn-modal btn-confirm" id="reset-${idSeguro}">${region.nombre}</button>`;
        });

        contenido.innerHTML = `
            <h3>Reiniciar Encuentros</h3>
            <p>Selecciona la región a reiniciar:</p>
            <div class="modal-actions" style="flex-wrap: wrap; gap: 10px;">
                <button class="btn-modal btn-cancel" id="modal-cancel-dynamic">Cancelar</button>
                ${htmlBotones}
            </div>
        `;
        
        document.getElementById('modal-cancel-dynamic').onclick = ocultarModalReinicio;
        datosRotacionLegendarios.forEach(region => {
            const idSeguro = region.nombre.replace(/\s+/g, '-').toLowerCase();
            const boton = document.getElementById(`reset-${idSeguro}`);
            if (boton) boton.onclick = () => reiniciarRegionEspecifica(region.nombre);
        });
    }
    
    modal.classList.add('active');
}
window.mostrarModalReinicio = mostrarModalReinicio;

function ocultarModalReinicio() {
    document.getElementById('modal-overlay').classList.remove('active');
}

function reiniciarRegionEspecifica(nombreRegion) {
    const region = datosRotacionLegendarios.find(r => r.nombre === nombreRegion);
    if (region) {
        region.gimnasios.forEach(item => {
            const idUnico = item.id || item.lider;
            const id = obtenerIdGimnasio(region.nombre, idUnico);
            delete progresoUsuario[id];
        });
        guardarProgreso();
        renderizarAplicacion();
    }
    ocultarModalReinicio();
}

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

window.mostrarModalImagen = function(src) {
    const modal = document.getElementById('img-modal-overlay');
    const img = document.getElementById('img-modal-target');
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
    }
};

// --- FUNCIÓN PLANTAR EN LÍNEA ---
window.manejarPlantadoEnLinea = function(nombreRegion, idUnico, elementoBoton) {
    const contenedor = elementoBoton.parentElement;
    const selector = contenedor.querySelector('.gym-berry-select');
    const inputCantidad = contenedor.querySelector('.seed-count-input');

    const nombreBaya = selector.value;

    if (!nombreBaya) {
        alert("Por favor, selecciona una baya.");
        return;
    }

    const validacion = validateSeedInput(inputCantidad.value);
    if (!validacion.valid) {
        alert(validacion.message);
        return;
    }

    const cantidad = parseInt(inputCantidad.value);

    const baya = datosBayas.find(b => b.nombre === nombreBaya);
    const horasCosecha = analizarHorasBaya(baya.tiempoCosecha);
    const horasRiego = analizarHorasBaya(baya.tiempoRiego);

    const id = obtenerIdGimnasio(nombreRegion, idUnico);
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

// --- GESTIÓN DE DATOS (EXPORTAR/IMPORTAR) ---
function configurarInterfazAuth() {
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
