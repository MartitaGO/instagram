// Importación del framework Express.
import express from 'express';

// Importación de middlewares para gestionar la autenticación de usuarios, verificar la existencia de usuarios, y otras funciones relacionadas con publicaciones.
import {
    authUser,
    userExists,
    newPost,
    postExists,
    canEdit,
    deletePosts,
    likePost,
    listPosts,
    getPostsById
} from '../middlewares/index.middleware.js';


// Creación de un router de Express.
const router = express.Router();

//Ruta para nueva publicacion
router.post('/posts', 
    authUser, 
    userExists,
    newPost
    );

// Ruta para eliminar un posts.
router.delete('/posts/:postId', 
    authUser,
    userExists,
    postExists,
    canEdit,
    deletePosts
    );

// Ruta para dar "like" a una publicación.
router.post('/posts/:postId/like',
    authUser,
    userExists, 
    postExists, 
    likePost
    );

// Ruta para obtener el listado de posts de un usuario
router.get(
    '/posts/:userId', 
    authUser,
    userExists,
    postExists,
    listPosts 
    );

// Ruta para obtener el listado general de publicaciones.
router.get('/posts', 
    listPosts
    );


router.get('/posts/detail/:postId', 
    postExists,
    getPostsById
    );
// Exportación del router para su uso en otras partes de la aplicación.
export default router;
