/**
 * gyms.js
 * 
 * Este módulo maneja la lógica central relacionada con los Gimnasios Pokémon y los Mapas interactivos.
 * Se encarga de procesar las interacciones del usuario (marcar gimnasios como completados),
 * calcular el progreso, generar el HTML visual de las medallas obtenidas y actualizar
 * el estado de los puntos e indicadores en los mapas de cada región.
 */

// Lógica específica de Gimnasios y Mapas

/**
 * Maneja la lógica al hacer clic en un gimnasio o entrenador.
 * Marca o desmarca el gimnasio como completado en `progresoUsuario` y guarda los datos.
 * Si está en la vista de mapa, actualiza solo el mapa; si no, renderiza toda la app.
 */
function procesarClickGimnasio(nombreRegion, datosGimnasio, elemento) {
    const idUnico = datosGimnasio.id || datosGimnasio.lider;
    const id = obtenerIdGimnasio(nombreRegion, idUnico);
    
    if (progresoUsuario[id]) {
        delete progresoUsuario[id];
    } else {
        progresoUsuario[id] = {
            timestamp: new Date().toISOString()
        };
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

/**
 * Genera el HTML de las medallas obtenidas para una región específica.
 * Verifica el progreso del usuario y aplica filtros (color o escala de grises) a las imágenes.
 * @param {string} nombreRegion - Nombre de la región.
 * @returns {string} HTML string con las imágenes de las medallas.
 */
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

/**
 * Actualiza visualmente el mapa interactivo y el panel de detalles de una región.
 * Refresca el estado de los puntos (dots) en el mapa y la información del líder seleccionado
 * sin necesidad de recargar toda la página, mejorando el rendimiento.
 * @param {string} nombreRegion - Nombre de la región a actualizar.
 */
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
    
    // Actualizar el panel de detalles lateral
    const panelDetalles = container.querySelector(`.${regionLower}-details-panel`);
    if (panelDetalles) {
        let gymSeleccionado = null;
        if (ciudadSeleccionada) {
            gymSeleccionado = regionData.gimnasios.find(g => g.ciudad === ciudadSeleccionada);
            if (!gymSeleccionado && regionData.entrenadoresEspeciales) {
                gymSeleccionado = regionData.entrenadoresEspeciales.find(g => g.ciudad === ciudadSeleccionada);
            }
        }

        panelDetalles.innerHTML = '';

        if (gymSeleccionado) {
            // Lógica para mostrar la imagen del líder (copiada y adaptada de ui.js)
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