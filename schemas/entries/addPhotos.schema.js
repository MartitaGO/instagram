// Importación de la biblioteca Joi para la validación de esquemas.
import joi from 'joi';

// Importación del esquema para la validación de imágenes.
import imgSchema from '../imgSchema.js';

// Definición del esquema de validación para la adición de fotos.
const addPhotosSchema = joi.object({
    // Se especifica que se espera un campo llamado "photo" en la solicitud.
    photo: imgSchema.required(),
});

// Exportación del esquema para su uso en otras partes de la aplicación.
export default addPhotosSchema;
