/**
 * Format validation error messages to be more user-friendly
 * @param {string|Array} errorMessage - The error message from the API
 * @returns {string} - Formatted error message
 */
export const formatValidationMessage = (errorMessage) => {
    // Handle array of messages
    if (Array.isArray(errorMessage)) {
        return errorMessage.map(msg => formatSingleMessage(msg)).join('. ');
    }

    return formatSingleMessage(errorMessage);
};

/**
 * Format a single error message
 * @param {string} message - Single error message
 * @returns {string} - Formatted message
 */
const formatSingleMessage = (message) => {
    if (!message || typeof message !== 'string') {
        return 'Ha ocurrido un error. Por favor, intenta de nuevo.';
    }

    // Handle throttle/rate limit errors
    if (message.includes('ThrottlerException') || message.includes('Too Many Requests')) {
        return 'Has realizado demasiados intentos. Por favor, espera un momento antes de intentar nuevamente.';
    }

    // Handle authentication errors
    if (message.toLowerCase().includes('unauthorized') || message.toLowerCase().includes('invalid credentials')) {
        return 'Usuario o contraseña incorrectos.';
    }

    // Common field validation patterns
    const validationPatterns = [
        {
            pattern: /must be longer than or equal to (\d+) characters/i,
            format: (match, field) => `${getFieldName(field)} debe tener al menos ${match[1]} caracteres`
        },
        {
            pattern: /must be shorter than or equal to (\d+) characters/i,
            format: (match, field) => `${getFieldName(field)} debe tener máximo ${match[1]} caracteres`
        },
        {
            pattern: /must be a valid email/i,
            format: (match, field) => 'El correo electrónico no es válido'
        },
        {
            pattern: /should not be empty/i,
            format: (match, field) => `${getFieldName(field)} es requerido`
        },
        {
            pattern: /must be a number/i,
            format: (match, field) => `${getFieldName(field)} debe ser un número`
        }
    ];

    // Try to match validation patterns
    for (const { pattern, format } of validationPatterns) {
        const match = message.match(pattern);
        if (match) {
            const field = extractFieldName(message);
            return format(match, field);
        }
    }

    // If no pattern matched, return a cleaned version
    return cleanMessage(message);
};

/**
 * Extract field name from error message
 * @param {string} message - Error message
 * @returns {string} - Field name
 */
const extractFieldName = (message) => {
    const parts = message.split(' ');
    return parts[0] || '';
};

/**
 * Get user-friendly field name
 * @param {string} field - Field name from API
 * @returns {string} - User-friendly field name
 */
const getFieldName = (field) => {
    const fieldNames = {
        'numeroTelefono': 'El número de teléfono',
        'email': 'El correo electrónico',
        'nombre': 'El nombre',
        'apellidos': 'Los apellidos',
        'municipio': 'El municipio',
        'colonia': 'La colonia',
        'codigoPostal': 'El código postal',
        'porQueMeInteresa': 'El motivo de interés',
        'username': 'El usuario',
        'password': 'La contraseña'
    };

    return fieldNames[field] || 'Este campo';
};

/**
 * Clean technical error messages
 * @param {string} message - Error message
 * @returns {string} - Cleaned message
 */
const cleanMessage = (message) => {
    // Remove technical prefixes
    let cleaned = message
        .replace(/^Error:\s*/i, '')
        .replace(/^ValidationError:\s*/i, '')
        .replace(/^BadRequestException:\s*/i, '');

    // If message is still too technical, return generic message
    if (cleaned.includes('Exception') || cleaned.includes('Error:')) {
        return 'Ha ocurrido un error. Por favor, verifica los datos e intenta nuevamente.';
    }

    return cleaned;
};
