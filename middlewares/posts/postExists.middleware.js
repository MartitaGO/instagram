// Importa la función getPostsById desde el archivo posts.controller.js en la carpeta controllers/.
import { getPostsById } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para obtener una entrada (post) por su ID.
const main = async (req, res, next) => {
    try {
        // Intenta obtener el ID de la entrada (post) desde el cuerpo de la solicitud (req.body.id) o los parámetros de la ruta (req.params.postId).
        const postId = req.body?.id || req.params.postId;

        // Llama a la función getPostsById del controlador para obtener la entrada (post) correspondiente al ID proporcionado.
        const post = await getPostsById(postId);

        // Verifica si el post existe
        if (!post) {
            // Si el post no existe, responde con un error 404
            return res.status(404).json({ error: 'El post no existe' });
        }

        // Almacena el resultado en el objeto de solicitud (req.post) para que esté disponible para los middleware subsiguientes.
        req.post = post;

        // Continúa con el siguiente middleware.
        next();
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};

// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;




