// Función de error de conflicto, se utiliza cuando hay un conflicto en la solicitud del cliente.
const conflictError = (msg,code = 'CONFLICT')=>{    
    let err = new Error();
    err.code = code;
    err.httpStatus = 409;   // Código HTTP 409 Conflict
    err.message = msg;
    throw err;
}
// Función de error de no encontrado, se utiliza cuando un recurso no se encuentra.
const notFoundError = (msg,code = 'NOT_FOUND') =>{
    let err = new Error();
    err.code = code;
    err.httpStatus = 404;   // Código HTTP 404 Not Found
    err.message = msg;
    throw err;
}
// Función de error de no autorizado, se utiliza cuando el cliente no tiene permiso para acceder al recurso.
const notAuthorizedError = (msg, code = 'UNAUTHORIZED') =>{
    let err = new Error();
    err.code = code;
    err.httpStatus = 401;   // Código HTTP 401 Unauthorized
    err.message = msg;
    throw err;
}
// Función de error prohibido, se utiliza cuando el cliente tiene permiso, pero está intentando realizar una acción prohibida.
const forbiddenError = (msg,code = 'FORBIDDEN') =>{
    let err = new Error();
    err.code = code;
    err.httpStatus = 403;   // Código HTTP 403 Forbidden
    err.message = msg;
    throw err;
}
// Función de error interno del servidor, se utiliza para problemas internos del servidor.
const internalServerError = (msg, code = 'INTERNARL_ERROR') =>{
    let err = new Error();
    err.code = code;
    err.httpStatus = 500;   // Código HTTP 500 Internal Server Error
    err.message = msg;
    throw err;
}
// Función de error al enviar correo electrónico, se utiliza para manejar errores relacionados con el envío de correos electrónicos.
const sendEmailError = (msg = 'Error al enviar el email') => {
    internalServerError(msg,'SEND_EMAIL_ERROR')
}

// Función de error de usuario pendiente de activación, se utiliza cuando un usuario intenta realizar una acción antes de activar su cuenta.
const userPendingActivation = (msg) =>{
    forbiddenError(msg,'PENDING_ACTIVATION')
}

// Función de error de usuario que ya existe, se utiliza cuando se intenta crear un usuario que ya existe.
const userAlreadyExists = (msg = 'El usuario ya existe') =>{
    conflictError(msg,'USER_ALREADY_EXISTS')
}

// Función de error de usuario no autorizado, se utiliza cuando un usuario no tiene permisos para realizar una acción específica.
const unauthorizedUser = (msg = 'El usuario no está autorizado') =>{
    notAuthorizedError(msg)
}

// Función de error de entidad no encontrada, se utiliza cuando una entidad específica no se encuentra.
const entityNotFound = (user = 'Entidad') =>{
    notFoundError(user + " no encontrado/a.", 'ENTITY_NOT_FOUND')
}

// Función de error de no autenticado, se utiliza cuando se requiere autenticación pero no se proporciona un token.
const notAthenticatedError = (msg = 'Debe enviar un token en el header') =>{
    notAuthorizedError(msg, 'NOT_AUTHENTICATED')
}

// Exporta un objeto que contiene todas las funciones de manejo de errores.
export default {
    userAlreadyExists,
    unauthorizedUser,
    conflictError,
    entityNotFound,
    notFoundError,
    notAuthorizedError,
    forbiddenError,
    userPendingActivation,
    notAthenticatedError,
    sendEmailError
}