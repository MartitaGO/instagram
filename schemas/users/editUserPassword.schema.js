// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación de mensajes de error personalizados definidos en "joi.error.messages.js".
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación "editUserPasswordSchema" utilizando Joi.
const editUserPasswordSchema = joi.object({
    // Validación para el campo "email" que debe ser una cadena de texto válida de formato de correo electrónico.
    email: joi.string().email().required().messages(joiMsg.errorMsg),

    // Validación para el campo "recoverPassCode" que debe ser una cadena de texto requerida.
    recoverPassCode: joi.string().required().messages(joiMsg.errorMsg),

    // Validación para el campo "newPass" que debe ser una cadena de texto con un patrón específico y requerida.
    newPass: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
});

// Exportación del esquema de validación "editUserPasswordSchema" para su uso en otras partes de la aplicación.
export default editUserPasswordSchema;
