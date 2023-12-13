// Leemos las variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos dependencias.
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

//Importamos las rutas.
import routes from './src/routes/routes.js';
//import postRouter from './routes/posts.routes.js';

// Creamos un servidor con express.
const app = express();

app.use(cors());

app.use(express.static(process.env.UPLOADS_DIR));

app.use(fileUpload());

//Middleware que parsea un body en formato JSON.
app.use(express.json());

// Middleware que muestre por consola el método y la ruta (endpoint) de la petición entrante.
app.use(morgan('dev'));

//Middleware que indica a express dónde están las rutas.
app.use(routes);

// Middleware que me devuelve todas las fotos de la base de datos.
/*
app.get('/lookPhotos', (req, res) => {
    res.send({
        status: 'ok',
        message: 'Aquí tienes el listado de fotos'})});
*/

//Middleware de manejo de errores.
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
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
