// Importa la función listPosts desde el archivo listPosts.controller.js en la carpeta controllers/.
import { listPosts } from '../../controllers/listPosts.controller.js';

// Función principal (middleware) que maneja la lógica para obtener un listado de fotos publicadas.
const main = async (req, res, next) => {
    try {
        // Llama a la función listPosts para obtener un listado de fotos basado en el parámetro de búsqueda proporcionado en req.query.search.
        const photos = await listPosts(req.query.search);

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

// Objeto simulado req (solicitud) que podría recibir la función main. En este caso, se proporciona un cuerpo con un campo de texto ('texto').
const req = {
    body: {
        texto: 'lista de fotos', // Simula un parámetro de búsqueda en la consulta.
    },
};

// Llama a la función main con el objeto req simulado, un objeto vacío res (respuesta) y una función vacía next (siguiente middleware).
await main(req, {}, () => {});

// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
