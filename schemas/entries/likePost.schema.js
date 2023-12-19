// Importación de la biblioteca Joi para la validación de esquemas.
import joi from 'joi';

// Importación de mensajes personalizados para Joi.
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación para la acción de dar "like" a un post.
const likePostSchema = joi.object({
    // Se especifica que se espera un campo llamado "value" en la solicitud.
    value: joi.number().integer().min(1).max(5).required().messages(joiMsg),
    // El campo "value" debe ser un número entero entre 1 y 5, inclusive.
    // Además, se requiere que este campo esté presente en la solicitud.
    // Se utiliza el método "messages" para personalizar los mensajes de error utilizando los mensajes definidos en "joiMsg".
});

// Exportación del esquema para su uso en otras partes de la aplicación.
export default likePostSchema;
