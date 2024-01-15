// Importación de la función que obtiene la conexión de la base de datos.
import getPool from '../db/getPool.js';

// Importación del helper de errores.
import errors from '../helpers/errors.helper.js';

//importamos filesServices
import filesServices from './files.services.js';

// Función asincrónica para insertar una nueva entrada en la base de datos.
const insertNewPost = async (description, photo, userId) => {
    const pool = await getPool();

    if (!description) {
        description = 'Sin descripción disponible'; 
    }

    // Guarda la img y obtiene su nombre
    const newImgName = await filesServices.savePhoto(photo, 200);

    const [response] = await pool.query(
        'INSERT INTO posts (description, imagenURL, userId) VALUES (?,?,?)',
        [description, newImgName, userId]
    );

    // Verificamos si la inserción fue exitosa.
    if (response.affectedRows !== 1) {
        errors.conflictError(
            'Error al insertar la entrada',
            'ENTRY_INSERT_ERROR'
        );
    }

    return response;
};

const getPostsById = async (postId) => {
    const pool = await getPool();
    const [response] = await pool.query('SELECT * FROM posts WHERE id =?', 
    [postId]
    );

    console.log(response, postId);

    // Verificamos si la entrada existe.
    if (response.length < 1) {
        errors.entityNotFound('Entrada');
    }

    return response[0];
};

// Función asincrónica para insertar una foto
const insertPhoto = async (posts, photoName) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'INSERT INTO posts (postsId, name) VALUES (?,?)',
        [posts.id, photoName]
    );

    // Verificamos si la inserción de la foto fue exitosa.
    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar la foto', 'PHOTO_INSERT_ERROR');
    }
    return response.insertId;
};

// Función asincrónica para obtener una foto
const getPhotoById = async (postsId) => {
    const pool = await getPool();
    const [response] = await pool.query('SELECT * FROM posts WHERE id = ?', 
    [postsId]
    );

    // Verificamos si la foto existe.
    if (response.length < 1) {
        errors.entityNotFound('photo');
    }

    return response[0];
};


// Función asincrónica para eliminar un post.
const deletePosts = async (postId, userId) => {
    try {
        const pool = await getPool();

        // Verificar si el post pertenece al usuario que intenta eliminarlo.
        const post = await getPostsById(postId);
        if (!post || post.userId !== userId) {
            throw new Error('Este post no pertenece al usuario que intenta eliminarlo.');
        }

        // Eliminar las filas relacionadas en la tabla 'likes'.
        await pool.query('DELETE FROM likes WHERE postId = ?', [postId]);

        // Eliminar el post.
        const [response] = await postsServices.deletePostsById(postId);

        if (response.affectedRows < 1) {
            throw new Error('No se encontró el post con el ID proporcionado.');
        }

        return response;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};

// Función asincrónica para obtener las publicaciones
const listPosts = async (search, userId) => {
    const pool = await getPool();
    let idUser = parseInt(userId);
    let response;
    let query = "SELECT * FROM posts"
    const ps = []
    if (search) {
        query += ` WHERE description LIKE ? ${isNaN(idUser)? "": `AND userId =${idUser}`}`
        ps.push(`%${search}%`);
    }else if(!isNaN(idUser)){
        query += ` WHERE userId =${idUser}`
    }
    query += " ORDER BY createdAt DESC"
    response = await pool.query(query,ps);

    return response[0];
};

// Función asincrónica para dar like
const insertLikePost = async (postId, userId) => {
    const pool = await getPool();

    const [previousLikes] = await pool.query(
        'SELECT * FROM likes WHERE userId = ? AND postId = ?',
        [userId, postId]
    );

    let response;
    if (previousLikes.length > 0) {

        // Eliminamos el like en la base de datos.
        [response] = await pool.query(
            'DELETE FROM likes WHERE postId=? AND userId=?',
            [postId, userId]
        );
    } else {
        // Insertamos el like en la base de datos.
        [response] = await pool.query(
            'INSERT INTO likes (postId, userId) VALUES (?,?)',
            [postId, userId]
        );
    }

    // Verificamos si la inserción fue exitosa.
    if (response.affectedRows !== 1) {
        errors.conflictError('Error en like', 'LIKE_INSERT_ERROR');
    }

    // Calculamos el promedio de likes para la entrada.
    const [like] = await pool.query(
        'SELECT count(*) as numLikes FROM likes WHERE postId = ?',
        [postId]
    );

    return like[0].numLikes;
};

// Exportación de las funciones como un objeto para su uso en otras partes del código.
export default {
    insertNewPost,
    getPostsById,
    insertPhoto,
    getPhotoById,
    deletePosts,
    insertLikePost,
    listPosts,
};



/*
// Uso de la función:
const postId = 2; // Reemplaza con el ID del post que deseas eliminar.
deletePosts(postId)
    .then(result => {
        console.log("Post eliminado:", result);
    })
    .catch(error => {
        console.error("Error al eliminar el post:", error);
    }); */




/* ORIGINAL

// Función asincrónica para eliminar un posts
const deletePosts = async (postsId) => {
    const pool = await getPool();
    const [response] = await pool.query('DELETE FROM posts WHERE id =?', 
    [postsId]
    );

    // Verificamos si la eliminación fue exitosa.
    if (response.affectedRows < 1) {
        errors.entityNotFound('posts');
    }

    return response;
};*/