//Importamos la función que retorna un pool de conexiones.
import getPool from '../db/getPool.js';

//Función que se conecta a la base de datos y crea un post.
const selectAllPostService = async () => {
    //Obtenemos un pool de conexiones.
    const pool = await getPool();

    //Obtenemos el listado.
    const [posts] = await pool.query('SELECT * FROM posts');

    //Retornamos los posts.
    return posts;
};

//Exportamos la función
export default selectAllPostService;
