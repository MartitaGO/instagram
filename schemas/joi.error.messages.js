// Mensajes de error generales
const errorMsg = {
    'any.required': 'El campo "{#key}" es requerido',
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'number.base': 'El valor de "{#key}" debe ser un número',
    'number.max': 'El archivo no debe exceder los 50 MB',
    'object.base': 'El valor de "{#key}" debe ser un objeto',
    'any.only': 'Solo se permiten fotos jpeg o png',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.min': 'El campo "{#key}" debe tener al menos {#limit} caracteres',
    'string.max': 'El campo "{#key}" no debe exceder los {#limit} caracteres',
    'object.unknown': 'No se permiten campos adicionales en este objeto',
};

// Mensajes de error específicos para el nombre de usuario
const errorMsgUsername = {
    'string.pattern.base':
        'El campo "{#key}" no debe contener espacios en blanco.',
};

// Mensajes de error específicos para la contraseña
const errorMsgPassword = {
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}"',
};

// Exportación de los mensajes de error personalizados
export default {
    errorMsg,
    errorMsgUsername,
    errorMsgPassword,
};
