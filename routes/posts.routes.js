// Importación del framework Express.
import express from 'express';

// Importación de middlewares para gestionar la autenticación de usuarios, verificar la existencia de usuarios, y otras funciones relacionadas con publicaciones.
import {
    authUser,
    userExists,
    newPost,
    postExists,
    canEdit,
    addPhoto,
    deletePhoto,
    likePost,
    listPosts,
} from '../middlewares/index.middleware.js';

// Creación de un router de Express.
const router = express.Router();

//Ruta para nueva publicacion
router.post('/posts', authUser, userExists, newPost);

// Ruta para agregar una foto a una publicación existente.
router.post(
    '/posts/:entryId/photos',
    authUser,
    userExists,
    postExists,
    canEdit,
    addPhoto
);

// Ruta para eliminar una foto de una publicación.
router.delete(
    '/posts/:entryId/photos/:photoId',
    authUser,
    userExists,
    postExists,
    canEdit,
    deletePhoto
);

// Ruta para dar "like" a una publicación.
router.post('/posts/:postId/like', authUser, userExists, postExists, likePost);

// Ruta para obtener el listado de fotos de una publicación.
router.get(
    '/posts/:postId/photos',
    authUser,
    userExists,
    postExists,
    listPosts
);

// Ruta para obtener el listado general de publicaciones.
router.get('/posts', listPosts);

// Exportación del router para su uso en otras partes de la aplicación.
export default router;
