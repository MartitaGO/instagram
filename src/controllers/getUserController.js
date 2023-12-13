//Importamos la función que se conecta a la base de datos para crear un post.
import getUserModel from '../models/getUserModel.js';

//Función controladora final que crea un post.
const getUserController = async (req, res, next) => {
    try {
        //Obtenemos los datos necesarios para crear el post.
        const { email, username, password } = req.body;

        //Si faltan campos, lanzamos un error.
        //ESTO DEBE SER SUSTITUIDO POR JOI
        if (!email || !username || !password) {
            const err = new Error('Faltan campos');
            err.httpStatus = 400;
            throw err;
        }

        //Creamos el user.
        await getUserModel(email, username, password);

        //Enviamos una respuesta al cliente
        res.status(201).send({
            status: 'ok',
            message: 'User creado',
        });
    } catch (err) {
        next(err);
    }
};

//Exportamos la función.
export default getUserController;

/*

const getUserController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented',
        });
    } catch (err) {
        next(err);
    }
};

//Exportamos la función.
export default getUserController;
*/
