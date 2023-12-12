//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Crea un useario en la base de datos y devuelve su id
const createUser = async (email, username, password) => {
    try {
        //Obtenemos un pool de conexiones.
        const pool = await getPool();
        //Comprobar que no exista otro usuario con ese email

        //Encriptal password

        //Crear usuario
    } catch (err) {
        next(err);
    }
};

export default createUser;
