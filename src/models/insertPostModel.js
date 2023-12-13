//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Función que se conecta a la base de datos y crea un post.
const insertPostModel = async (text) => {
    //Obtenemos un pool de conexiones.
    const pool = await getPool();

    //Insertamos el post.
    await pool.query('INSERT INTO posts (text) VALUES (?)', [text]);
};

//Exportamos la función
export default insertPostModel;
