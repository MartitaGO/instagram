import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

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




