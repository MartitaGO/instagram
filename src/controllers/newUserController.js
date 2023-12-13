//Importamos la función que se conecta a la base de datos para crear un post.
import newUserModel from '../models/newUserModel.js';

//Función controladora final que crea un post.
const newUserController = async (req, res, next) => {
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
        await newUserModel(email, username, password);

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
export default newUserController;
