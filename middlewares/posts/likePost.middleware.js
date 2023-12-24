// Importa la función likePosts desde el archivo posts.controller.js en la carpeta controllers/.
import { insertLikePost } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para realizar un "like" en una publicación.
const main = async (req, res, next) => {
    try {

        // Llama a la función likePosts para registrar el "like" en la publicación indicada por req.posts y el usuario identificado por req.user.id.
        const numLikes = await insertLikePost(req.post, req.user.id);
        // Envia una respuesta JSON indicando el éxito de la operación y proporcionando información sobre la media de "likes".
        res.send({
            status: 'ok',
            message: 'Like realizado con éxito',
            data: {
                numLikes,
            },
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
