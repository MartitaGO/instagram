// Leemos las variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos express y morgan.
import express from 'express';
import morgan from 'morgan';

//Importamos las rutas.
import postRoutes from './src/routes/postRoutes.js';

// Creamos un servidor con express.
const app = express();

// Middleare que muestre por consola el método y la tuta
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    // Pasamos el control al siguiente Middleware
    next();
});

//Middleware que parsea un body en formato JSON.
app.use(express.json());

// Middleware que muestre por consola el método y la ruta (endpoint) de la petición entrante.
app.use(morgan('dev'));

//Esta función queda sustituida por la anterior de morgan.
//app.use((req, res, next) => {
//  console.log(`${req.method} ${req.url}`);
//
// Pasamos el control al siguiente middleware.
//  next();
//});

//Middleware que indica a express dónde están las rutas.
app.use(postRoutes);

//Los dos middleware siguientes son sustituidos por el middleware de arriba que indica a express dónde están las rutas.
// Middleware que me devuelve todos los post de la base de datos.
//app.get('/posts', (req, res) => {
//  res.send({
//    status: 'ok',
//  message: 'Aquí tienes el listado de posts',
//});
//});

// Middleware que crea un post en la base de datos.
app.post('/photo', (req, res) => {
    req.files.foto;
    res.send({
        status: 'ok',
        message: 'Foto subida',
    });
});


// Middleware para dar like
app.post('/like', (req, res) => {
    res.send({
        status: 'ok',
        message: 'Has dado like',
    });
});

//Middleware para dar unlike
app.post('/unlike', (req, res) => {
    res.send({
        status: 'ok',
        message: 'Has hecho unlike',
    });
});

//Middleware de manejo de errores.
//app.use((err, req, res) => {
//console.error(err);

// res.status(err.httpStatus || 500).send({
// status: 'error',
//  message: err.message,
//});
//});

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
