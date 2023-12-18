//Importamos express
import express from 'express';

//Creamos un router
const router = express.Router();

//Importamos las funciones controladoras finales de forma optimizada.
import newUserMiddleware from '../middlewares/users/newUserMiddleware.js';
import loginMiddleware from '../middlewares/users/loginMiddleware.js';

import { getUserController, listPostsController, loginController, newPostController, newUserController, postsController } from '../controllers/indexControllers.js'

//Middleware que permite crear un post.
router.post('/posts', newPostController);

//Middleware que retorna el listado de posts
router.get('/posts', listPostsController);
router.get('/photos', postsController);

//Middleware que crea un usuario
router.post('/user', newUserMiddleware);
router.post('/user/:create', newUserController);
router.get('/user/:id', getUserController);

//Middlewate que hace login
router.post('/user/login', loginMiddleware);
router.post('/user/authentification', loginController);

//Exportamos el router.
export default router;
