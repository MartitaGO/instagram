//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Función que se conecta a la base de datos y crea un user.
const newUserModel = async (text) => {
    //no tengo claro el (text)!!!!!!!!!!!!!!!!!!
    //Obtenemos un pool de conexiones.
    const pool = await getPool();

    //Insertamos el post.
    await pool.query(
        'INSERT INTO user (email, username, password) VALUES (?, ?, ?)',
        [text],
    ); //!!!!!!!!!no tengo claro el [text]
};

//Exportamos la función
export default newUserModel;
