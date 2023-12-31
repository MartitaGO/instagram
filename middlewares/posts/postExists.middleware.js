// Importa la función getPostsById desde el archivo posts.controller.js en la carpeta controllers/.
import { getPostsById } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para obtener una entrada (post) por su ID.
const main = async (req, res, next) => {
    try {
        // Intenta obtener el ID de la entrada (post) desde el cuerpo de la solicitud (req.posts.id) o los parámetros de la ruta (req.params.postsId).
        const postId = req.posts?.id || req.params.postId;

        // Llama a la función getPostsById del controlador para obtener la entrada (post) correspondiente al ID proporcionado.
        const post = await getPostsById(postId);

        // Almacena el resultado en el objeto de solicitud (req.post) para que esté disponible para los middleware subsiguientes.
        req.post = post;

        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next();
    } catch (err) {
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
