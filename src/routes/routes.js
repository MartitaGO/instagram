// Importamos express
import express from 'express';

// Creamos un router 
const router = express.Router();

//Añadimos ruta para acceder a la función
router.get('/posts', listPostsController);

// Añadimos ruta para acceder a la función
router.get('/users/:userId', getUserController);

// Importamos todas las funciones en una sola línea, desde el archivo con todas las funciones
import { getUserController, listPostsController } from '../controllers/indexControllers.js'

// Exportamos el router
export default router;