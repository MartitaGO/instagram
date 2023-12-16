//Importamos la función que se conecta a la base de datos para crear un post.
import insertPostServices from '../services/insertPostServices.js';

//Función controladora final que crea un post.
const newPostController = async (req, res, next) => {
    try {
        //Obtenemos los datos necesarios para crear el post.
        const { text } = req.body;

        //Si faltan campos, lanzamos un error.
        if (!text) {
            const err = new Error('Faltan campos');
            err.httpStatus = 400;
            throw err;
        }

        //Creamos el post.
        await insertPostServices(text);

        //Enviamos una respuesta al cliente
        res.status(201).send({
            status: 'ok',
            message: 'Post creado',
        });
    } catch (err) {
        next(err);
    }
};

//Exportamos la función.
export default newPostController;
