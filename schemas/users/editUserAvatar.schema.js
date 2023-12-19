// Importación de la biblioteca de validación Joi.
import joi from 'joi';

// Importación del esquema de validación para imágenes llamado "imgSchema".
import imgSchema from '../imgSchema.js';

// Definición del esquema de validación "editUserAvatarSchema" utilizando Joi.
const editUserAvatarSchema = joi.object({
    // Validación para el campo "avatar" que debe cumplir con el esquema de validación de imágenes definido en "imgSchema".
    avatar: imgSchema.required(),
});

// Exportación del esquema de validación "editUserAvatarSchema" para su uso en otras partes de la aplicación.
export default editUserAvatarSchema;
