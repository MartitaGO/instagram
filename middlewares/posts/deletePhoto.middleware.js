// Importa la función deletePhoto desde el archivo posts.controller.js en la carpeta controllers/.
import { deletePhoto } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para eliminar una foto de una publicación.
const main = async (req, res, next) => {
    try {
        // Llama a la función deletePhoto para eliminar la foto correspondiente a la publicación indicada por req.params.postsId.
       await deletePhoto(req.posts, req.params.postsId);
        // Envia una respuesta JSON indicando el éxito de la operación.
        res.send({
            status: 'ok',
            message: 'Foto eliminada',
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
