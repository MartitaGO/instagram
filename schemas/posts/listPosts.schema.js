// Importación del esquema de validación "listPostsSchema".
import listPostsSchema from './ruta/del/esquema/listPostsSchema.js';

// Definición de la función "listPosts" que recibe un parámetro llamado "texto".
const listPosts = async (texto) => {
    try {
        // Intenta validar el parámetro "texto" utilizando el esquema de validación "listPostsSchema".
        await listPostsSchema.Async(texto);
        // Si la validación es exitosa, imprime un mensaje indicando que los datos son válidos.

        console.log('Datos válidos:', texto);
    } catch (error) {
        // Si hay un error en la validación, imprime un mensaje de error indicando que ocurrió un error de validación.
        console.error('Error de validación:', error);
    }
};

// Exportación de la función "listPosts" para su uso en otras partes de la aplicación.
export default listPosts;
