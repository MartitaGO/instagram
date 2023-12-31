// Importación de Joi para la validación y los mensajes personalizados de error.
import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

// Esquema de validación para la creación de una nueva publicación.
const newPostSchema = joi.object({

    // Campo "photo" que debe ser un objeto con dos propiedades: "data" y "contentType"
    photo: joi
        .object({
            // Propiedad "data" que debe ser un valor binario (representación binaria de una imagen)
            data: joi.binary().required(),
            // Propiedad "contentType" que debe ser una cadena válida ('image/jpeg' o 'image/png')
            contentType: joi
                .string()
                .valid('image/jpeg', 'image/png')
                .required(),
        })
        .unknown(true)
        .messages(joiMsg),
});

// Exportación del esquema de validación para su uso en otras partes del código.
export default newPostSchema;
