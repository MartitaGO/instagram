// Leemos las variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos express.
import express from 'express';

// Creamos un servidor con express.
const app = express();

// Middleware que muestre por consola el método y la ruta (endpoint) de la petición entrante.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    // Pasamos el control al siguiente middleware.
    next();
});

// Middleware que me devuelve todos los post de la base de datos.
app.get('/posts', (req, res) => {
    res.send({
        status: 'ok',
        message: 'Aquí tienes el listado de posts',
    });
});

// Middleware que crea un post en la base de datos.
app.post('/posts', (req, res) => {
    res.status(201).send({
        status: 'ok',
        message: 'Post creado',
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
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
