// Importa el módulo 'posts' que contiene el método 'listPosts'
import postsService from '../services/posts.services.js';

// Función asincrónica para listar posts, acepta un parámetro de búsqueda
export const listPosts = async (search) => {
    try {
        // Llama al método listPosts del servicio de posts, pasando el parámetro de búsqueda
        const resultado = await postsService.listPosts(search);

        // Imprime en la consola el término de búsqueda para registro y seguimiento
        console.log('Search', search);

        // Retorna el resultado obtenido
        return resultado;
    } catch (error) {
        // Captura y maneja cualquier error que ocurra durante la ejecución
        console.error('Error al buscar el post', error);
        // Relanza el error para que pueda ser manejado según necesidad
        throw error; // Puedes manejar el error según tus necesidades
    }
};
// Exporta la función listPosts para que pueda ser utilizada en otros archivos
export default listPosts;
