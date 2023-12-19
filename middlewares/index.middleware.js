// Middleware para el registro de nuevos usuarios.
import newUser from './users/newUser.middleware.js';

// Middleware para la validación de usuarios mediante un código de registro.
import validateUser from './users/validateUser.middleware.js';

// Middleware para la autenticación de usuarios.
import loginUser from './users/loginUser.middleware.js';

// Middleware para obtener la lista de usuarios.
import getUsers from './users/getUserList.middleware.js';

// Middleware para la autenticación de usuarios mediante token.
import authUser from './security/authUser.middleware.js';

// Middleware para verificar la existencia de un usuario.
import userExists from './users/userExists.middleware.js';

// Middleware para obtener la información del propio usuario.
import getOwnUser from './users/getOwnUser.middleware.js';

// Middleware para obtener el perfil de un usuario.
import getUserProfile from './users/getUserProfile.middleware.js';

// Middleware para editar el avatar de un usuario.
import editUserAvatar from './users/editUserAvatar.midddleware.js';

// Middleware para la recuperación de contraseña.
import passwordRecover from './security/passwordRecover.middleware.js';

// Middleware para editar la contraseña de un usuario.
import editUserPassword from './security/editUserPassword.middleware.js';

// Middleware para la creación de nuevas publicaciones.
import newPost from './posts/newPost.middleware.js';

// Middleware para verificar la existencia de una publicación.
import postExists from './posts/postExists.middleware.js';

// Middleware para verificar si un usuario puede editar una entrada.
import canEdit from './security/canEdit.middleware.js';

// Middleware para agregar una foto a una publicación.
import addPhoto from './posts/addPhoto.middleware.js';

// Middleware para eliminar una foto de una publicación.
import deletePhoto from './posts/deletePhoto.middleware.js';

// Middleware para obtener la lista de publicaciones.
import listPosts from './posts/listPosts.middleware.js';

// Middleware para dar "like" a una publicación.
import likePost from './posts/likePost.middleware.js';

// Exportación de todos los middlewares.
export {
    newUser,
    validateUser,
    loginUser,
    getUsers,
    authUser,
    userExists,
    getOwnUser,
    getUserProfile,
    editUserAvatar,
    passwordRecover,
    editUserPassword,
    newPost,
    postExists,
    canEdit,
    addPhoto,
    deletePhoto,
    listPosts,
    likePost,
};
