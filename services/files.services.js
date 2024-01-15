// Importaciones de las bibliotecas necesarias para manipular archivos y procesar imágenes.
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import randomstring from 'randomstring';

// Importación de la función que obtiene la conexión de la base de datos.
import getPool from '../db/getPool.js';

// Importación del helper de errores.
import errors from '../helpers/errors.helper.js';

// Función para eliminar un post por su nombre
// Función asincrónica para eliminar un post por su ID.
const deletePostsById = async (postId) => {
    try {
        const pool = await getPool();
        
        // Verificar si el post existe antes de intentar eliminarlo.
        const postExistsQuery = 'SELECT * FROM posts WHERE id = ?';
        const [postExists] = await pool.query(postExistsQuery, [postId]);

        if (postExists.length === 0) {
            // El post no existe, puedes manejarlo de la manera que desees.
            console.log(`Post con ID ${postId} no encontrado.`);
            return; // O puedes lanzar un error si prefieres.
        }

        // Si el post existe, proceder con la eliminación.
        const deleteQuery = 'DELETE FROM posts WHERE id = ?';
        const [response] = await pool.query(deleteQuery, [postId]);

        // Verificamos si la eliminación fue exitosa.
        if (response.affectedRows < 1) {
            errors.entityNotFound('posts');
        }

        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// Función asincrónica para subir una foto.
const savePhoto = async (img, ancho) => {
    try {
        // Definición de la carpeta de subida para las imágenes.
        const uploadsDir = path.join(process.cwd(), process.env.UPLOADS_DIR);

        // Intentamos acceder a la carpeta, y si no existe, la creamos.
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }

        // Procesamiento de la imagen con Sharp y asignación de un nombre aleatorio.
        const sharpImg = sharp(img.data);

        sharpImg.resize(ancho);

        const imgNameRandom = randomstring.generate(20) + '.jpeg';
        const imgPath = path.join(uploadsDir, imgNameRandom);

        // Guardado efectivo de la imagen.
        await sharpImg.toFile(imgPath);

        // Devolvemos el nombre aleatorio asignado a la imagen.
        return imgNameRandom;
    } catch (err) {
        console.error(err);
        // Se maneja el error con un mensaje de consola.
    }
};

// Función asincrónica para obtener todos los posts.
const listPosts = async (imgName) => {
    try {
        // Construcción de la ruta completa de la imagen.
        const imgPath = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            imgName
        );

        // Verificamos si la imagen existe intentando acceder a ella.
        try {
            await fs.access(imgPath);
        } catch {
            return null; 
        }

        // Devolvemos la ruta completa de la imagen.
        return imgPath;
    } catch (err) {
        console.error(err);
        return null;
    }
};


// Exportación de las funciones como un objeto para su uso en otras partes del código.
export default {
    deletePostsById,
    savePhoto,
    listPosts,
};
