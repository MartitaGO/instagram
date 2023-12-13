//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Función que se conecta a la base de datos y crea un post.
const loginController = async (text) => {
    //Obtenemos un pool de conexiones.
    const pool = await getPool();

    //Insertamos el post.
    await pool.query('INSERT INTO user (text) VALUES (?)', [text]); //!!!!!!!!!!!!NO LO TENGO CLARO
};

//Exportamos la función
export default loginController;
