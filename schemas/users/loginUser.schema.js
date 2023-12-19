// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación de mensajes de error personalizados definidos en "joi.error.messages.js".
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación "loginUserSchema" utilizando Joi.
const loginUserSchema = joi.object({
    // Validación para el campo "password" que debe ser una cadena de texto con un patrón específico y requerida.
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
    // Validación para el campo "email" que debe ser una cadena de texto requerida.
    email: joi.string().required().messages(joiMsg.errorMsg),
});

// Exportación del esquema de validación "loginUserSchema" para su uso en otras partes de la aplicación.
export default loginUserSchema;
