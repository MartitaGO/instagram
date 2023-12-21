// Importa la función validateSchema desde el archivo validationSchema.helper.js en la carpeta helpers/.
import validateSchema from '../../helpers/validationSchema.helper.js';

// Importa el esquema de validación newPostsSchema desde el archivo newPost.schema.js en la carpeta schemas/entries/.
import newPostsSchema from '../../schemas/entries/newPost.schema.js';

// Importa la función insertNewPosts desde el archivo posts.controller.js en la carpeta controllers/.
import { insertNewPost } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para insertar una nueva entrada (post).
const main = async (req, res, next) => {
    try {
        // Valida la estructura del cuerpo de la solicitud (req.body) según el esquema newPostsSchema.
        //await validateSchema(newPostsSchema, req.body);

        // Extrae las propiedades necesarias del cuerpo de la solicitud.
        const { description } = req.body;

        const { photo } = req.files;

        console.log(photo);

        res.send('Post subido con exito');
        return 'Exitoso';
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
