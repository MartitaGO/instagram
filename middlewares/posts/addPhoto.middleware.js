// Importa la función de validación de esquema desde el archivo validationSchema.helper.js.
import validateSchema from '../../helpers/validationSchema.helper.js';

// Importa el esquema addPhotosSchema desde el archivo addPhotos.schema.js en la carpeta schemas/entries/.
import addPhotosSchema from '../../schemas/entries/addPhotos.schema.js';

// Importa la función insertNewPosts desde el archivo posts.controller.js en la carpeta controllers/.
import { insertNewPost } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para agregar fotos a las publicaciones.
const main = async (req, res, next) => {
    try {
        // Valida el objeto req.files según el esquema addPhotosSchema utilizando la función de validación de esquema.
        await validateSchema(addPhotosSchema, req.files || {});
        // Llama a la función insertNewPosts para agregar las fotos y obtener la respuesta.
        const posts = await insertNewPost(req.posts, req.files.posts);

        // Envia una respuesta JSON indicando el éxito y devolviendo los datos relevantes.
        res.send({
            status: 'OK',
            message: 'Foto agregada con éxito.',
            data: {
                posts,
            },
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
