import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

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