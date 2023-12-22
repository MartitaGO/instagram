// Importaciones de las bibliotecas necesarias para manipular archivos y procesar imágenes.
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import randomstring from 'randomstring';

// Función asincrónica para eliminar una foto
const deletePhoto = async (imgName) => {
    try {
        // Construcción de la ruta completa de la imagen.
        const imgPath = path.join(
            process.cwd(),
            '.',
            process.env.UPLOADS_DIR,
            imgName
        );

        // Intentamos acceder a la imagen, y si no se puede, asumimos que no existe y salimos.
        try {
            await fs.access(imgPath);
        } catch {
            return;
        }
        // Eliminación efectiva de la imagen.
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        // Se maneja el error con un mensaje de consola y se podría usar un helper de manejo de errores de archivos.
    }
};

// Función asincrónica para subir una foto
const savePhoto = async (img, ancho) => {
    try {
        // Definición de la carpeta de subida para las imágenes.
        const uploadsDir = path.join(
            process.cwd(),
            '..',
            process.env.UPLOADS_DIR
        );

        // Intentamos acceder a la carpeta, y si no existe, la creamos.
        try {
            await fs.access(uploadsDir);
        } catch {
            await fs.mkdir(uploadsDir);
        }
        // Procesamiento de la imagen con Sharp y asignación de un nombre aleatorio.
        const sharpImg = sharp(img.data);
        sharpImg.resize(ancho);

        const imgNameRandom = randomstring.generate(20) + '.jpg';
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

// Función asincrónica para obtener todos los posts
const listPosts = async (imgName) => {
    try {
        // Construcción de la ruta completa de la imagen.
        const imgPath = path.join(
            process.cwd(),
            '..',
            process.env.UPLOADS_DIR,
            imgName
        );

        // Verificamos si la imagen existe intentando acceder a ella.
        try {
            await fs.access(imgPath);
        } catch {
            return null; // La imagen no existe
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
    deletePhoto,
    savePhoto,
    listPosts,
};
