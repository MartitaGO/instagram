// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación de mensajes de error personalizados definidos en "joi.error.messages.js".
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación "passwordRecoverSchema" utilizando Joi.
const passwordRecoverSchema = joi.object({
    // Validación para el campo "email" que debe ser una cadena de texto con formato de dirección de correo electrónico y requerida.
    email: joi.string().email().required().messages(joiMsg.errorMsg),
});

// Exportación del esquema de validación "passwordRecoverSchema" para su uso en otras partes de la aplicación.
export default passwordRecoverSchema;
