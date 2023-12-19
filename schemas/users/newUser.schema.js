// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación de mensajes de error personalizados definidos en "joi.error.messages.js".
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación "newUserSchema" utilizando Joi.
const newUserSchema = joi.object({
    // Validación para el campo "username" que debe ser una cadena de texto con ciertas restricciones y requerida.
    username: joi
        .string()
        .min(3) // Mínimo de 3 caracteres.
        .max(30) // Máximo de 30 caracteres.
        .required() // Campo requerido.
        .pattern(/^\S*$/) // Restricción de espacios en blanco al principio o al final.
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgUsername }),

    // Validación para el campo "password" que debe ser una cadena de texto con un patrón específico y requerida.

    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
    // Validación para el campo "email" que debe ser una cadena de texto con formato de dirección de correo electrónico y requerida.
    email: joi.string().email().required().messages(joiMsg.errorMsg),
});

// Exportación del esquema de validación "newUserSchema" para su uso en otras partes de la aplicación.
export default newUserSchema;
