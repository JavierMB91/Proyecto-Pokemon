# Revisión de código – Proyecto PokeMMO Tracker

Resumen de fallos, redundancias y mejoras detectadas tras revisar el código completo.

---

## 1. Fallos / Bugs

### 1.1 Rotación Legendarios: modal de reinicio ausente
- **Archivo:** `api/rotacionLegendarios.html`
- **Problema:** La página no incluye el `<div id="modal-overlay">` que usa `mostrarModalReinicio()` en `ui.js`. Si en el futuro se añade un botón “Reiniciar encuentros” (o se reutiliza lógica que abre el modal), `document.getElementById('modal-overlay')` será `null` y se producirá un error.
- **Solución:** Añadir el mismo bloque de modal que en `battleTracker.html` y `semillas.html` (con `id="modal-overlay"` y contenido por defecto; en esta página el contenido se sustituye dinámicamente por el de regiones).

### 1.2 Modal de reinicio: `classList.add('active')` duplicado
- **Archivo:** `js/ui.js`, función `mostrarModalReinicio()`
- **Problema:** Se llama dos veces a `modal.classList.add('active')`: una al principio con `document.getElementById('modal-overlay').classList.add('active')` y otra al final con `modal.classList.add('active')` (siendo `modal` el mismo elemento).
- **Solución:** Dejar una sola asignación de `classList.add('active')` al final del flujo.

### 1.3 Encuentros legendarios: sin estado “completado” ni clic
- **Archivo:** `js/legendarios.js`, función `crearElementoEncuentro()`
- **Problema:** Los elementos de encuentro (Kanto/Johto) no leen `progresoUsuario` ni tienen `data-gym-id`, no muestran si el encuentro está completado y no son clicables para marcar/desmarcar. El progreso sí se guarda y se borra con “Reiniciar región”, pero la tarjeta no lo refleja ni permite alternar.
- **Solución (opcional):** Si el diseño es que el usuario pueda marcar encuentros desde la tarjeta, habría que: (1) pasar `nombreRegion` y `gimnasio` para calcular `id` con `obtenerIdGimnasio`, (2) aplicar clase `completed` y estilo según `progresoUsuario[id]`, (3) añadir `onclick` que alterne el estado y llame a `guardarProgreso()` y `renderizarAplicacion()`.

### 1.4 Importar datos: sin validación de estructura
- **Archivo:** `js/state.js`, función `importarDatos()`
- **Problema:** Se hace `progresoUsuario = JSON.parse(...)` directamente. Un JSON con estructura incorrecta (objeto anidado, arrays, etc.) puede romper el resto de la app que espera un objeto plano de IDs.
- **Solución:** Comprobar que el parseado sea un objeto y, si se quiere ser estricto, que las claves/valores sigan el formato esperado antes de asignar a `progresoUsuario`.

---

## 2. Redundancias

### 2.1 Lógica de líderes “Vito y Leti” y “Zeo, Maíz y Millo” duplicada
- **Archivos:** `js/ui.js` (aprox. líneas 364–416) y `js/gyms.js` (aprox. 205–273).
- **Problema:** El mismo bloque que crea el `<div>` con varias imágenes para “Vito y Leti” y “Zeo, Maíz y Millo” está copiado en ambos sitios (render inicial en `ui.js` y actualización del panel del mapa en `gyms.js`).
- **Solución:** Extraer una función común, por ejemplo `crearElementoLiderPanel(gymSeleccionado, nombreRegion)` en `gyms.js` (o en un módulo compartido), que devuelva el nodo (div con imágenes), y usarla desde `ui.js` y desde `actualizarInterfazMapa()` en `gyms.js`.

### 2.2 Validaciones muy similares
- **Archivo:** `js/validaciones.js`
- **Problema:** `validateSeedInput` y `validateEncounterInput` son casi idénticas (vacío, NaN, entero, > 0, y un máximo distinto). Código duplicado.
- **Solución:** Crear una función genérica, por ejemplo `validarEnteroPositivo(valor, { min, max, mensajeVacio, mensajeNoNumero, mensajeNoEntero, mensajeRango })`, y que ambas la llamen con opciones distintas.

### 2.3 Función `validateEncounterInput` no usada
- **Archivo:** `js/validaciones.js`
- **Problema:** `validateEncounterInput` está definida pero no se usa en ningún otro archivo. Código muerto si no hay inputs de “encuentros” en la UI.
- **Solución:** O bien se implementa la funcionalidad de “número de encuentros” y se usa esta validación, o se elimina la función para evitar confusión.

---

## 3. Mejoras menores / Limpieza

### 3.1 Comentario con ruta local
- **Archivo:** `js/transiciones.js`, línea 10
- **Problema:** Comentario con ruta absoluta de un PC concreto: `// c:\Users\thafl\Desktop\Proyecto Pokemon\transitions.js`
- **Solución:** Eliminar o sustituir por un comentario genérico (ej. “Transiciones y efectos de página”).

### 3.2 Funciones `async` que no usan `await`
- **Archivo:** `js/state.js`
- **Problema:** `cargarProgreso()` y `guardarProgreso()` están declaradas como `async` pero no usan `await`. No es un error, pero puede inducir a pensar que hay operaciones asíncronas.
- **Solución:** Quitar `async` y devolver una promesa solo si en el futuro se usa algo asíncrono (ej. API), o dejar `async` y documentar que se reserva para futuras extensiones.

### 3.3 Carga de datos: comportamiento ante error
- **Archivo:** `js/script.js`
- **Problema:** Si `cargarDatos()` falla, se hace `alert` y `console.error`, pero el flujo sigue: `configurarInterfazAuth()`, `cargarProgreso()`, `renderizarAplicacion()`, etc. Con `datosBayas` o `datosGimnasios` vacíos, la UI puede quedar vacía o dar errores al interactuar.
- **Solución:** En el `catch` de `cargarDatos()`, hacer `return` (o no llamar a `renderizarAplicacion()` / `renderizarInfoBayas()`) para no seguir con datos incompletos, o mostrar un mensaje/bloque de error en la página.

### 3.4 Reproducción de sonido sin feedback
- **Archivo:** `js/logic.js`, `reproducirSonido(tipo)`
- **Problema:** Si `tipo` no es `'water'` ni `'harvest'`, `rutaAudio` queda `''` y no se reproduce nada. No hay log ni mensaje.
- **Solución:** Opcional: `console.warn('Tipo de sonido no reconocido:', tipo)` o definir un sonido por defecto para depuración.

---

## 4. Orden de scripts en HTML

- **semillas.html:** Incluye `validaciones.js`, `transiciones.js`, `semillas.js`, `state.js`, `logic.js`, `ui.js`, `script.js`. No carga `gyms.js` ni `legendarios.js`, coherente con esa página.
- **battleTracker.html:** No incluye `validaciones.js` ni `semillas.js` ni `legendarios.js`. Correcto para solo gimnasios.
- **rotacionLegendarios.html:** Incluye `legendarios.js` pero no `gyms.js` ni `validaciones.js`. Correcto para solo rotación de legendarios.

No se detectan errores de orden que impidan que las dependencias estén definidas cuando se usan.

---

## 5. Resumen de acciones recomendadas

| Prioridad | Acción |
|----------|--------|
| Alta     | Añadir modal overlay en `rotacionLegendarios.html`. |
| Alta     | Eliminar `classList.add('active')` duplicado en `mostrarModalReinicio()`. |
| Media    | Extraer función común para el panel de líderes (Vito y Leti / Zeo, Maíz y Millo). |
| Media    | Unificar validaciones en `validaciones.js` o eliminar `validateEncounterInput` si no se usa. |
| Baja     | Quitar comentario con ruta local en `transiciones.js`. |
| Baja     | Opcional: validar estructura en `importarDatos()` y/o early return en `script.js` si falla `cargarDatos()`. |
| Opcional | Implementar estado “completado” y clic en tarjetas de encuentros legendarios si el diseño lo requiere. |
