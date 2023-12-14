// Creamos función que envía un error cuando hay un conflicto
const conflictError = (msg, code = 'CONFLICT') => {
    let err = new Error();
    err.code = code;
    err.httpStatus = 409;
    err.message = msg;
    throw err;
};

// Creamos función que envía un error cuando hay no se encuentra el elemento seleccionado
const notFoundError = (msg, code = 'NOT_FOUND') => {
    let err = new Error();
    err.code = code;
    err.httpStatus = 404;
    err.message = msg;
    throw err;
};

// Creamos función que envía un error cuando hay el usuario no está autorizado a realizar esa acción
const notAuthorizedError = (msg, code = 'UNAUTHORIZED') => {
    let err = new Error();
    err.code = code;
    err.httpStatus = 401;
    err.message = msg;
    throw err;
};

// Creamos función que envía un error cuando no se permite realizar esa acción
const forbiddenError = (msg, code = 'FORBIDDEN') => {
    let err = new Error();
    err.code = code;
    err.httpStatus = 403;
    err.message = msg;
    throw err;
};

// Creamos función que envía un error cuando hay un error interno
const internalServerError = (msg, code = 'INTERNARL_ERROR') => {
    let err = new Error();
    err.code = code;
    err.httpStatus = 500;
    err.message = msg;
    throw err;
};

const sendEmailError = (msg = 'Error al enviar el email') => {
    internalServerError(msg, 'SEND_EMAIL_ERROR');
};

const userPendingActivation = (msg) => {
    forbiddenError(msg, 'PENDING_ACTIVATION');
};

const userAlreadyExists = (msg = 'El usuario ya existe') => {
    conflictError(msg, 'USER_ALREADY_EXISTS');
};

const unauthorizedUser = (msg = 'El usuario no está autorizado') => {
    notAuthorizedError(msg);
};

const entityNotFound = (entity = 'Entidad') => {
    notFoundError(entity + ' no encontrado/a.', 'ENTITY_NOT_FOUND');
};

const notAthenticatedError = (msg = 'Debe enviar un token en el header') => {
    notAuthorizedError(msg, 'NOT_AUTHENTICATED');
};

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
    sendEmailError,
};
