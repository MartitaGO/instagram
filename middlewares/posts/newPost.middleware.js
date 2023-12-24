// Importa la función insertNewPosts desde el archivo posts.controller.js en la carpeta controllers/.
import { insertNewPost } from '../../controllers/posts.controller.js';

// Función principal (middleware) que maneja la lógica para insertar una nueva entrada (post).
const main = async (req, res, next) => {
    try {
        // Extrae las propiedades necesarias del cuerpo de la solicitud.
        const { description } = req.body; 
        const photo = req.files.photo;

        // Llama a la función insertNewPosts del controlador, proporcionando los datos de la nueva entrada y el ID del usuario actual.
        const response = await insertNewPost(description, photo, req.user.id);

        // Responde con un mensaje JSON indicando el éxito de la operación y proporcionando información sobre la nueva entrada creada.
        res.send({
            status: 'OK',
            message: 'Post generado con éxito.',
            data: {
                entry: {
                    id: response.insertId,
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
