// Configuración de variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Importación de módulos y configuración de Express
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import routes from './routes/index.routes.js';
import errorController from './controllers/errors.controller.js';

// Creación de la aplicación Express
const app = express();
app.use(cors()); // Configuración de CORS
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.static(process.env.UPLOADS_DIR)); // Middleware para servir archivos estáticos
app.use(fileUpload()); // Middleware para el manejo de archivos en las solicitudes

// Middleware para mostrar por consola el método y la ruta de cada solicitud
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    // Pasamos el control al siguiente Middleware
    next();
});

// Configuración de las rutas principales de la aplicación
app.use(routes);

// Middleware para manejar solicitudes a rutas no encontradas
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Recurso no encontrado',
    });
});

// Middleware para manejar errores generales de la aplicación
app.use(errorController);

// Inicio del servidor en el puerto especificado en las variables de entorno
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
