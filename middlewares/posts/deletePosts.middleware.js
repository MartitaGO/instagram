// Importa la función deletePhoto desde el archivo posts.controller.js en la carpeta controllers/.
import { deletePosts } from '../../controllers/posts.controller.js';

const main = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id; // Asegúrate de obtener el userId de tu sistema de autenticación.

    try {
        console.log('Entrando en deletePosts.middleware.js con postId:', postId);

        // Pasa el postId y userId a la función deletePosts.
        const result = await deletePosts(postId, userId);

        console.log('Resultado de deletePosts en deletePosts.middleware.js:', result);

        res.json({ 
            message: 'Post eliminado correctamente', 
            result 
        });
    } catch (error) {
        console.error('Error en deletePosts.middleware.js:', error);

        res.status(500).json({ 
            error: 'Error al eliminar el post', 
            message: error.message 
        });
    }
}

export default main;




/*
// Función principal (middleware) que maneja la lógica para eliminar una foto de una publicación.
const main = async (req, res, next) => {
    try {
        // Llama a la función deletePhoto para eliminar la foto correspondiente a la publicación indicada por req.params.postsId.
       await deletePosts(req.posts, req.params.postsId);
        // Envia una respuesta JSON indicando el éxito de la operación.
        res.send({
            status: 'ok',
            message: 'Post eliminado',
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.*/