//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Función que se conecta a la base de datos y crea un post.
const getUserController = async (email, username, password) => {
    //Obtenemos un pool de conexiones.
    const pool = await getPool();

    //Insertamos el post.
    await pool.query(
        'INSERT INTO user (email, username, password) VALUES (?, ?, ?)',
        [email, username, password],
    ); //!!!!!!!!!!!!!!!!!!!!!!!!no lo tengo claro
};

//Exportamos la función
export default getUserController;
