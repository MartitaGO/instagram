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
    const [response] = await pool.query('SELECT p.*, u.username, (SELECT count(postId) FROM likes WHERE postId = p.Id) as likes FROM posts p LEFT JOIN users u ON u.id=p.userId WHERE p.id=?', [
        postId,
    ]);

    // Verificamos si la entrada existe.
    if (response.length < 1) {
        errors.entityNotFound('Entrada');
    }

    return response[0];
};

// Función asincrónica para eliminar un post.
const deletePosts = async (postId) => {
    try {
        const pool = await getPool();

        // Eliminar las filas relacionadas en la tabla 'likes'.
        await pool.query('DELETE FROM likes WHERE postId = ?', [postId]);

        // Eliminar el post.
        const [response] = await pool.query('DELETE FROM posts WHERE id = ?', [
            postId,
        ]);

        return response;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

// Función asincrónica para obtener las publicaciones
const listPosts = async (search, userId) => {
    const pool = await getPool();
    let idUser = parseInt(userId);
    let response;
    let query = 'SELECT p.*, u.username, (SELECT count(postId) FROM likes WHERE postId = p.Id) as likes FROM posts p';
    const ps = [];
    query += ' LEFT JOIN users u ON u.id=p.userId';
    if (search) {
        query += ` WHERE description LIKE ? ${
            isNaN(idUser) ? '' : `AND userId =${idUser}`
        }`;
        ps.push(`%${search}%`);
    } else if (!isNaN(idUser)) {
        query += ` WHERE userId =${idUser}`;
    }
    query += ' ORDER BY createdAt DESC';
    response = await pool.query(query, ps);

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
    deletePosts,
    insertLikePost,
    listPosts,
};
