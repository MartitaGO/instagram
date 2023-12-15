//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Importamos dependencia encriptación.
import bcrypt from 'bcrypt';

import errors from '../helpers/errorsHelper.js';

//Función que se conecta a la base de datos y crea un user.
const newUserServices = async (username, password, email) => {
    const pool = await getPool();

    let [users] = await pool.query(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [username, email],
    );

    if (users.length > 0) {
        errors.userAlreadyExists();
    }

    try {
        const sqlQuery =
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';

        const hashPassword = await bcrypt.hash(password, 5);

        const values = [username, hashPassword, email];
        const [response] = await pool.query(sqlQuery, values);
        return response;
    } catch (err) {
        errors.conflictError(
            'Error al intentar registrar el usuario',
            'USER_REGISTER_ERROR',
        );
    }
};

//Exportamos la función
export default newUserServices;
