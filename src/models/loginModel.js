//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Función que se conecta a la base de datos y crea un post.
const loginController = async (email, password) => {
    //Obtenemos un pool de conexiones.
    const pool = await getPool();

    //Insertamos el user y password.
    await pool.query('INSERT INTO user (email, password) VALUES (?, ?)', [
        email,
        password,
    ]);
};

//Exportamos la función
export default loginController;
