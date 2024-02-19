// Importa el módulo 'posts' que contiene el método 'listPosts'
import { getPostsById } from '../../controllers/posts.controller.js';


// Función asincrónica para listar posts, acepta un parámetro de búsqueda
const main = async (req, res, next) => {
    const postId = req.params.postId;
    console.log('req', req.params)
    try {
        // Llama al método listPosts del servicio de posts, pasando el parámetro de búsqueda
        const post = await getPostsById(postId) ;

        // Imprime en la consola el término de búsqueda para registro y seguimiento
        console.log('postId', postId);

        res.send({
            status: "OK",
            message: "Post encontrado",
            data:{
                post
            }
        });
    } catch (error) {
       
        throw error; // Puedes manejar el error según tus necesidades
    }
};
// Exporta la función listPosts para que pueda ser utilizada en otros archivos
export default main;