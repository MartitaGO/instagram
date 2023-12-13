// Leemos las variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos express.
import express from 'express';

// Creamos un servidor con express.
const app = express();

// Middleare que muestre por consola el método y la tuta
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)

    // Pasamos el control al siguiente Middleware
    next();  
});

// Middleware que me devuelve todas las fotos de la base de datos.
app.get('/lookPhotos', (req, res) => {
    res.send({
        status: 'ok',
        message: 'Aquí tienes el listado de fotos',
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://${process.env.PORT}`);
});