// Importamos función para listar todas las publicaciones
import listPostsController from '../controllers/listPostsController.js';

// Añadimos ruta para acceder a la función
router.get('/posts', listPostsController);

// Importamos función para obtener el perfil de un usuario
import getUserController from '../controllers/getPostController.js'; 

// Añadimos ruta para acceder a la función
router.get('/users/:userId', getUserController);