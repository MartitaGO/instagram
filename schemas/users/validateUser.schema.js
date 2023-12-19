// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación de mensajes de error personalizados definidos en "joi.error.messages.js".
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación "validateUserSchema" utilizando Joi.
const validateUserSchema = joi.object({
    // Validación para el campo "registrationCode" que debe ser una cadena de texto sin espacios y es obligatorio.
    registrationCode: joi
        .string()
        .required()
        .pattern(/^\S*$/)
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgUsername }),
});

// Exportación del esquema de validación "validateUserSchema" para su uso en otras partes de la aplicación.
export default validateUserSchema;
