// Importación de la biblioteca Joi para la validación de esquemas.
import joi from 'joi';

// Importación de mensajes personalizados para Joi.
import joiMsg from '../joi.error.messages.js';

// Definición del esquema de validación para la acción de dar "like" a un post.
const likePostSchema = joi.object({
    // Se especifica que se espera un campo llamado "value" en la solicitud.
    value: joi.number().integer().min(1).max(5).required().messages(joiMsg),
});

// Exportación del esquema para su uso en otras partes de la aplicación.
export default likePostSchema;
