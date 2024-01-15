// Importa la función listPosts desde el archivo listPosts.controller.js en la carpeta controllers/.
import { listPosts } from '../../controllers/listPosts.controller.js';

// Función principal (middleware) que maneja la lógica para obtener un listado de fotos publicadas.
const main = async (req, res, next) => {
    try {
        // Llama a la función listPosts para obtener un listado de fotos basado en el parámetro de búsqueda proporcionado en req.query.search.
        const photos = await listPosts(req.query.search, req.query.user);

        console.log(photos);

        // Envia una respuesta JSON indicando el éxito de la operación y proporcionando el listado de fotos.
        res.send({
            status: 'ok',
            message: 'Aquí tienes el listado de fotos',
            data: { photos },
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};

// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
