// Importa la función deletePhoto desde el archivo posts.controller.js en la carpeta controllers/.
import { deletePosts } from '../../controllers/posts.controller.js';

const main = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id; 
    try {
        // Pasa el postId y userId a la función deletePosts.
        const result = await deletePosts(postId, userId); 

        res.json({ 
            message: 'Post eliminado correctamente', 
            result 
        });
    } catch (error) {

        res.status(500).json({ 
            error: 'Error al eliminar el post', 
            message: error.message 
        });
    }
}

export default main;

