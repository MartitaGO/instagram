// Leemos las variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos express.
import express from 'express';

// Importamos morgan
import morgan from 'morgan';

// Importamos rutas
import postRoutes from '../src/routes/postRoutes.js';

// Creamos un servidor con express.
const app = express();

app.use(express.json());

// Middleware que muestra por consola la petición y hace uso del next
app.use(morgan('dev'));

// Middleware que activa todas las funciones en routes
app.use(postRoutes);

// Middleware que muestre por consola el método y la ruta (endpoint) de la petición entrante.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    // Pasamos el control al siguiente middleware.
    next();
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Middleware de manejo de errores con 4 parámetros
app.use(error, req, res, next) => {
    console.error(err);
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
