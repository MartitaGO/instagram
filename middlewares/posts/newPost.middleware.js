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
        await validateSchema(newPostsSchema, req.body);
        // Extrae las propiedades necesarias del cuerpo de la solicitud.
        const { description } = req.body;
        const { photo } = req.files;
        console.log(photo);
        // Convierte el objeto photo a un objeto Post.
        const post = {
        description,
        photo: photo.filename,
        userId,
        createdAt: new Date(),
    };

    // Inserta el nuevo post en la base de datos.
    const response = await postsServices.insertNewPost(post);

    // Responde con un mensaje JSON indicando el éxito de la operación y proporcionando información sobre la nueva entrada creada.
    res.send({
        status: 'OK',
        message: 'Post generado con éxito.',
        data: {
            entry: {
                id: response.insertId,
                description,
                photo,
                userId: req.user.id,
                createdAt: new Date(),
            },
        },
    });
} catch (err) {
    // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
    next(err);
}
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;

// ANTERIOR CÓDIGO //
/* const main = async (req, res, next) => {
    try {
        // Valida la estructura del cuerpo de la solicitud (req.body) según el esquema newPostsSchema.
       // await validateSchema(newPostsSchema, req.body);
        await validateSchema(newPostsSchema, req.files || {});

        // Extrae las propiedades necesarias del cuerpo de la solicitud.
        const { description, photo } = req.body; // CAMBIO FILES POR BODY

        // Llama a la función insertNewPosts del controlador, proporcionando los datos de la nueva entrada y el ID del usuario actual.
        const response = await insertNewPost(
            description,
            photo,
            req.user.id
        );

        // Responde con un mensaje JSON indicando el éxito de la operación y proporcionando información sobre la nueva entrada creada.
        res.send({
            status: 'OK',
            message: 'Post generado con éxito.',
            data: {
                entry: {
                    id: response.insertId,  
    
                    description,
                    photo,
                    userId: req.user.id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main; */

