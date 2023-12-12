import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Configurar multer para gestionar la subida de archivos.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint para subir fotos.
app.post('/upload', upload.single('photo'), (req, res) => {
    try {
        // Validar que se haya subido un archivo.
        if (!req.file) {
            throw new Error('No se ha subido ninguna foto');
        }

        // El archivo se encuentra en req.file.buffer.
        // Aquí puedes realizar las operaciones necesarias, como guardar la foto en la base de datos.

        res.status(201).send({
            status: 'ok',
            message: 'Foto subida correctamente',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al subir la foto',
        });
    }
});

// Variable para almacenar el estado de los likes (esto es solo un ejemplo, deberías usar una base de datos).
let likesCount = 0;

// Endpoint para dar like.
app.post('/like', (req, res) => {
    try {
        likesCount++;
        res.send({
            status: 'ok',
            message: 'Like añadido',
            likesCount: likesCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al dar like',
        });
    }
});

// Endpoint para quitar like.
app.post('/unlike', (req, res) => {
    try {
        if (likesCount > 0) {
            likesCount--;
        }
        res.send({
            status: 'ok',
            message: 'Like eliminado',
            likesCount: likesCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al quitar like',
        });
    }
});

// Manejo de errores global
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send({
        status: 'error',
        message: 'Algo salió mal en el servidor',
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
