//Importamos express
import express from 'express';

//Creamos un router
const router = express.Router();

//Importamos las funciones controladoras finales.
import newPostController from '../controllers/newPostController.js';
import listPostsController from '../controllers/listPostsController.js';
import newUserMiddleware from '../middlewares/users/newUserMiddleware.js';
import getUserController from '../controllers/getUserController.js';
import loginMiddleware from '../middlewares/users/loginMiddleware.js';

//Middleware que permite crear un post.
router.post('/posts', newPostController);

//Middleware que retorna el listado de posts
router.get('/posts', listPostsController);

//Middleware que crea un usuario
router.post('/user', newUserMiddleware);
router.get('/user/:id', getUserController);
router.post('/login', loginMiddleware);

//Exportamos el router.
export default router;
