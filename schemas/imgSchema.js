// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación de mensajes de error personalizados definidos en "joi.error.messages.js".
import joiErrorMessages from './joi.error.messages.js';

// Definición del esquema de validación "imgSchema" utilizando Joi.
const imgSchema = joi
    .object({
        // Validación para el campo "name" que debe ser una cadena de texto y es obligatorio.
        name: joi.string().required().messages(joiErrorMessages),

        // Validación para el campo "mimetype" que debe ser una cadena de texto y coincidir con los valores permitidos ('image/png', 'image/jpeg').
        mimetype: joi
            .string()
            .valid('image/jpeg', 'image/png')
            .required()
            .messages(joiErrorMessages),

        // Validación para el campo "size" que debe ser un número y no exceder el límite de 5000000.
        size: joi.number().max(5000000).required().messages(joiErrorMessages),

        // Validación para el campo "foto" que debe ser una cadena de texto y es opcional.
        photo: joi.string().optional().messages(joiErrorMessages),
    })
    .unknown(true);

// Exportación del esquema de validación "imgSchema" para su uso en otras partes de la aplicación.
export default imgSchema;