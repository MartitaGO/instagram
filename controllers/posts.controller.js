// Importa el servicio que maneja las operaciones relacionadas con los archivos
import filesServices from '../services/files.services.js';
// Importa el servicio que maneja las operaciones relacionadas con los posts
import postsServices from '../services/posts.services.js';
// Importa un módulo de ayuda para manejar errores
import errors from '../helpers/errors.helper.js';

export const insertNewPost = async (description, photo, userId) => {
const post = {
    description,
    photo: photo.filename,
    userId,
    createdAt: new Date(),
};

const response = await postsServices.insertNewPost(post);
};

// ANTIGUA FUNCION // 
/* Función para insertar un nuevo post
export const insertNewPost = async (description, photo, userId) => {
    // Llama al servicio para insertar un nuevo post con los parámetros proporcionados
    const response = await postsServices.insertNewPost(
        description,
        photo,
        userId
    );

    // Retorna la respuesta del servicio
    return response;
};*/

// Función para obtener un post por su ID
export const getPostsById = async (postsId) => {
    // Llama al servicio para obtener un post por su ID
    const posts = await postsServices.getPostsById(postsId);
    // Retorna el post obtenido
    return posts;
};

// Función para insertar una foto en un post
export const insertPhoto = async (posts) => {
    // Guarda la foto usando el servicio de archivos y obtiene el nombre de la foto
    const postsName = await filesServices.savePhoto(posts, 500);
    // Inserta la foto usando el servicio de posts y obtiene el ID del post
    const postsId = await postsServices.insertPhoto(posts, postsName);
    // Retorna un objeto con el ID del post y el nombre de la foto
    return {
        id: postsId,
        name: postsName,
    };
};

// Función para eliminar una foto de un post por su ID
export const deletePhoto = async (postsId) => {
    // Obtiene el post por su ID
    const post = await postsServices.getPostsById(postsId);

    // Comprueba si la foto pertenece al post seleccionado, si no, lanza un error
    if (post.postsId !== post.id) {
        errors.notAuthorizedError(
            'Esta foto no pertenece a la publicación seleccionada',
            'ENTRY_DELETE_PHOTO_ERROR'
        );
    }

    // Elimina la foto usando el servicio de archivos
    await filesServices.deletePhoto(post.name);

    // Elimina la foto del post usando el servicio de posts
    await postsServices.deletePhotoById(postsId);

    await filesServices.updatePhoto(postsId, postsName); // AGREGO ESTA LINEA DE USERCONTROLLER

};

// Función para listar un post por su ID
export const listPost = async (postsId) => {
    // Obtiene el post por su ID
    const post = await postsServices.getPostsById(postsId);

    // Comprueba si el post existe, si no, lanza un error
    if (post.postsId !== post.id) {
        errors.notAuthorizedError(
            'Este post no se encuentra',
            'ENTRY_DELETE_POST_ERROR'
        );
    }

    // Lista los posts usando el servicio de archivos
    await filesServices.listPosts(post.name);
    // Actualiza la visualización del post usando el servicio de posts
    await postsServices.lookPostsById(postsId);
};

// Función para dar "like" o "dislike" a un post por su ID
export const insertLikePost = async (value, postsId, userId) => {
    // Obtiene el post por su ID
    const post = await postsServices.getPostsById(postsId);

    // Comprueba si el usuario es el autor del post, si es así, lanza un error
    if (userId == post.userId) {
        errors.unauthorizedUser('El usuario no puede dar like');
    }

    // Inserta el "like" o "dislike" y obtiene el promedio de likes
    const likesAvg = await postsServices.insertLikePost(value, post.id, userId);
    // Retorna el promedio de likes
    return likesAvg;
};
