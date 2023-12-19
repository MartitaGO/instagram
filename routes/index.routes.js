// Importación del framework Express.
import express from 'express';

// Importación de las rutas relacionadas con usuarios.
import userRoutes from './user.routes.js';

// Importación de las rutas relacionadas con publicaciones (posts).
import postsRoutes from './posts.routes.js';

// Creación de un router de Express.
const router = express.Router();

// Uso de las rutas relacionadas con usuarios.
router.use(userRoutes);

// Uso de las rutas relacionadas con publicaciones.
router.use(postsRoutes);

// Exportación del router para su uso en otras partes de la aplicación.
export default router;
