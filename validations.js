/**
 * Valida el número de semillas introducido.
 * @param {string} value - El valor del input.
 * @returns {object} - Objeto con propiedad 'valid' (boolean) y 'message' (string).
 */
function validateSeedInput(value) {
    // Convertir a número
    const number = Number(value);
    
    // Validar si está vacío
    if (value === '' || value === null) {
        return { valid: false, message: "El campo no puede estar vacío." };
    }

    // Validar si es un número
    if (isNaN(number)) {
        return { valid: false, message: "Por favor, introduce un número válido." };
    }

    // Validar si es entero
    if (!Number.isInteger(number)) {
        return { valid: false, message: "El número de semillas debe ser un entero." };
    }

    // Validar rango (ej: positivo y no excesivo)
    if (number <= 0) {
        return { valid: false, message: "Debes plantar al menos 1 semilla." };
    }

    if (number > 1000) {
        return { valid: false, message: "La cantidad de semillas no puede superar 1000." };
    }

    return { valid: true };
}