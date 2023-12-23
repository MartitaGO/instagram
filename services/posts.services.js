// Importación de la función que obtiene la conexión de la base de datos.
import getPool from '../db/getPool.js';

// Importación del helper de errores.
import errors from '../helpers/errors.helper.js';

// Función asincrónica para insertar una nueva entrada en la base de datos.
const insertNewPost = async (photo, description, userId) => {
    const pool = await getPool();

    if (!description) {
        description = 'Sin descripción disponible'; // Puedes ajustar este valor predeterminado según tus necesidades
    }

    const [response] = await pool.query(
        'INSERT INTO posts (description, photo, userId) VALUES (?,?,?)',
        [description, JSON.stringify(photo), userId]
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

// Función asincrónica para obtener todos los posts de la base de datos
const getPostsById = async (postsId) => {
    const pool = await getPool();
    const [response] = await pool.query('SELECT * FROM posts WHERE id =?', [
        postsId,
    ]);

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
    const [response] = await pool.query('SELECT * FROM posts WHERE id = ?', [
        postsId,
    ]);

    // Verificamos si la foto existe.
    if (response.length < 1) {
        errors.entityNotFound('photo');
    }

    return response[0];
};

// Función asincrónica para eliminar una foto
const deletePhotoById = async (postsId) => {
    const pool = await getPool();
    const [response] = await pool.query('DELETE FROM posts WHERE id =?', [
        postsId,
    ]);

    // Verificamos si la eliminación fue exitosa.
    if (response.affectedRows < 1) {
        errors.entityNotFound('photo');
    }

    return response;
};

// Función asincrónica para obtener las publicaciones
const listPosts = async (search) => {
    const pool = await getPool();
    const [response] = await pool.query(
        'SELECT * FROM posts WHERE description LIKE ?',
        [`%${search}%`]
    );
    // Verificamos si hay errores al buscar las entradas.
    if (response.length > 0) {
        errors.conflictError('Error al buscar el posts');
    }

    return response;
};
// Función asincrónica para dar like
const insertLikePost = async (value, postsId, userId) => {
    const pool = await getPool();

    // Verificamos si el usuario ya ha dado like a la entrada.
    const [previousLikes] = await pool.query(
        'SELECT * FROM likes WHERE userId = ? AND postsId = ?',
        [userId, postsId]
    );

    if (previousLikes.length > 0) {
        errors.unauthorizedUser(
            'Este usuario ya votó anteriormente esta publicación.'
        );
    }

    // Insertamos el like en la base de datos.
    const [response] = await pool.query(
        'INSERT INTO likes (postsId, userId, value) VALUES (?,?,?)',
        [postsId, userId, value]
    );
    // Verificamos si la inserción fue exitosa.
    if (response.affectedRows !== 1) {
        errors.conflictError('Error al insertar el like', 'LIKE_INSERT_ERROR');
    }

    // Calculamos el promedio de likes para la entrada.
    const [like] = await pool.query(
        'SELECT AVG(value) as voteAvg FROM likes WHERE postsId = ?',
        [postsId]
    );

    // Verificamos si se obtuvo el promedio de likes correctamente.
    if (like.length < 1) {
        errors.entityNotFound('likes');
    }

    return like[0].likeAvg;
};

// Exportación de las funciones como un objeto para su uso en otras partes del código.
export default {
    insertNewPost,
    getPostsById,
    insertPhoto,
    getPhotoById,
    deletePhotoById,
    insertLikePost,
    listPosts,
};

