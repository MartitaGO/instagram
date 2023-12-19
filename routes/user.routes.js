// Importación del framework Express.
import express from 'express';

// Importación de middlewares para gestionar diversas funcionalidades relacionadas con usuarios.
import {
    newUser,
    validateUser,
    loginUser,
    authUser,
    userExists,
    getOwnUser,
    getUserProfile,
    editUserAvatar,
    passwordRecover,
    editUserPassword,
} from '../middlewares/index.middleware.js';

// Creación de un router de Express.
const router = express.Router();

// Ruta para registrar un nuevo usuario.
router.post('/users/register', newUser);

// Ruta para validar un usuario mediante un código de registro.
router.get('/users/validate/:registrationCode', validateUser);

// Ruta para iniciar sesión de un usuario.
router.post('/users/login', loginUser);

// Ruta para obtener los detalles del propio usuario autenticado.
router.get('/users', authUser, userExists, getOwnUser);

// Ruta para obtener el perfil de un usuario por su ID.
router.get('/users/:userId', userExists, getUserProfile);

// Ruta para actualizar el avatar del usuario autenticado.
router.put('/users/avatar', authUser, userExists, editUserAvatar);

// Ruta para solicitar la recuperación de contraseña.
router.post('/users/password/recover', passwordRecover);

// Ruta para actualizar la contraseña de un usuario.
router.put('/users/password', editUserPassword);

// Exportación del router para su uso en otras partes de la aplicación.
export default router;
