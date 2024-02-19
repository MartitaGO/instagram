// Importa el servicio que maneja las operaciones relacionadas con los archivos
import filesServices from '../services/files.services.js';
// Importa el servicio que maneja las operaciones relacionadas con los posts
import postsServices from '../services/posts.services.js';
// Importa un módulo de ayuda para manejar errores
import errors from '../helpers/errors.helper.js';

// Función para insertar un nuevo post
export const insertNewPost = async (description, photo, userId) => {
    // Llama al servicio para insertar un nuevo post con los parámetros proporcionados
    const response = await postsServices.insertNewPost(
        description,
        photo,
        userId
    );

    // Retorna la respuesta del servicio
    return response;
};

// Función para obtener un post por su ID
export const getPostsById = async (postId) => {
    // Llama al servicio para obtener un post por su ID
    const post = await postsServices.getPostsById(postId);
    return post;
   
};

// Función para eliminar un post por su ID
export const deletePosts = async (postsId, userId) => {
    console.log('ID del post a eliminar:', postsId);

    try {
        // Elimina el post usando el servicio de posts
        await postsServices.deletePosts(postsId);

        console.log('Post eliminado correctamente');
        return { message: 'Post eliminado correctamente' };
    } catch (error) {
        console.error('Error en deletePosts:', error);
        throw error;
    }
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
    await postsServices.listPostsByI(postsId);
};

// Función para dar "like" o "dislike" a un post por su ID
export const insertLikePost = async (post, userId) => {
    // Comprueba si el usuario es el autor del post, si es así, lanza un error
    if (userId == post.userId) {
        errors.unauthorizedUser(
            'El usuario no puede dar like a su propio post'
        );
    }

    // Inserta el "like" o "dislike" y obtiene el promedio de likes
    const numLikes = await postsServices.insertLikePost(post.id, userId);
    // Retorna el promedio de likes
    return numLikes;
};
