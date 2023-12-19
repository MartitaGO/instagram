// Importa la función validateSchema desde el archivo validationSchema.helper.js en la carpeta helpers/.
import validateSchema from '../../helpers/validationSchema.helper.js';
// Importa el esquema likePostsSchema desde el archivo likePosts.schema.js en la carpeta schemas/entries/.
import likePostSchema from '../../schemas/entries/likePost.schema.js';
// Importa la función likePosts desde el archivo posts.controller.js en la carpeta controllers/.
import { insertLikePost } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para realizar un "like" en una publicación.
const main = async (req, res, next) => {
    try {
        // Valida el cuerpo de la solicitud (req.body) con el esquema definido en likePostsSchema.
        await validateSchema(likePostSchema, req.body);

        // Extrae el valor del "like" del cuerpo de la solicitud (req.body).
        const { value } = req.body;
        // Llama a la función likePosts para registrar el "like" en la publicación indicada por req.posts y el usuario identificado por req.user.id.
        const likesAvg = await insertLikePost(value, req.posts, req.user.id);
        // Envia una respuesta JSON indicando el éxito de la operación y proporcionando información sobre la media de "likes".
        res.send({
            status: 'ok',
            message: 'Like realizado con éxito',
            data: {
                likesAvg,
            },
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
