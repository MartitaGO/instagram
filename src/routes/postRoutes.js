//Importamos express
import express from 'express';

//Creamos un router
const router = express.Router();

//Importamos las funciones controladoras finales.
import newPostController from '../controllers/newPostController.js';
import listPostsController from '../controllers/listPostsController.js';
import newUserController from '../controllers/newUserController.js';
import getUserController from '../controllers/getUserController.js';
import loginController from '../controllers/loginController.js';

//Middleware que permite crear un post.
router.post('/posts', newPostController);

//Middleware que retorna el listado de posts
router.get('/posts', listPostsController);

//Middleware que crea un usuario
router.post('/user', newUserController);
router.get('/user/:id', getUserController);
router.post('/login', loginController);

//Exportamos el router.
export default router;
