//Importamos la función que se conecta a la base de datos y me retorna los posts.
import selectAllPostServices from '../services/selectAllPostServices.js';

//Función controladora final que retorna el listado de posts.
const listPostsController = async (req, res, next) => {
    try {
        //Obtenemos el listado de posts.
        const posts = await selectAllPostServices();

        //Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

//Exportamos la función
export default listPostsController;