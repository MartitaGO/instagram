//Importamos la función que se conecta a la base de datos para crear un post.
import newUserServices from '../services/newUserServices.js';
import errors from '../helpers/errors.helper.js';

//Función controladora final que crea un user.
const newUserController = async (body) => {
    //Obtenemos los datos necesarios para crear el user.
    const { email, username, password } = body;
    const response = await newUserServices.newUserController(
        email,
        username,
        password,
    );

    if (response.affectedRows !== 1) {
        errors.conflictError(
            'Error al registrar nuevo usuario.',
            'USER_REGISTER_ERROR',
        );
    }

    //Enviamos una respuesta al cliente
    response.status(201).send({
        status: 'ok',
        message: 'User creado',
    });
};

//Exportamos la función.
export default newUserController;
