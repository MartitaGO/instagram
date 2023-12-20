// Importa las bibliotecas y servicios necesarios
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userServices from '../services/users.services.js';
import errors from '../helpers/errors.helper.js';
import filesServices from '../services/files.services.js';
import sendMail from '../helpers/email.helper.js';

// Función para editar la contraseña del usuario
export const editUserPassword = async (email, recoverPassCode, newPass) => {
    // Obtiene el usuario por su email
    const user = await userServices.getUserByEmailOrUsername(email);

    // Comprueba si el usuario solicitó una recuperación de contraseña
    if (!user.recoverPassCode) {
        errors.conflictError(
            'El usuario no solicitó una recuperación de contraseña.',
            'INVALID_RECOVER_PASS_ERROR'
        );
    }
    // Comprueba si el código de recuperación es correcto
    if (user.recoverPassCode !== recoverPassCode) {
        errors.conflictError(
            'El código de recuperación es incorrecto.',
            'PASSWORD_RECOVER_CODE_ERROR'
        );
    }
    // Actualiza la contraseña del usuario
    await userServices.updateUserPassword(user, newPass);
};
// Función para solicitar la recuperación de contraseña
export const passwordRecover = async (email) => {
    // Obtiene el usuario por su email
    const user = await userServices.getUserByEmailOrUsername(email);
    // Genera un nuevo código de recuperación y lo actualiza en la base de datos
    const recoverPassCode = await userServices.updatePasswordRecover(user);

    // Crea el cuerpo del email con el código de recuperación

    const emailBody = `
        Se ha solicitado la recuperación de contraseña para este email en Instagram. 
                    
        Utiliza el siguiente código para crear una nueva contraseña: ${recoverPassCode}

        Si no has sido tú ignora este email.
     `;
    // Envía el email de recuperación
    await sendMail(email, 'Recuperación de contraseña', emailBody);
};

// Función para registrar un nuevo usuario
export const newUserRegister = async (body, registrationCode) => {
    // Extrae los datos del cuerpo de la solicitud
    const { username, password, email } = body;
    // Registra un nuevo usuario en la base de datos
    const response = await userServices.newUserRegister(
        username,
        password,
        email,
        registrationCode
    );
    // Comprueba si el registro fue exitoso
    if (response.affectedRows !== 1) {
        errors.conflictError(
            'Error al registrar nuevo usuario.',
            'USER_REGISTER_ERROR'
        );
    }

    // Crea el cuerpo del email de bienvenida

    const emailBody = `
        <h1>Bienvenido ${username}</h1>
        Gracias por registrarte en Instagram. Para activar tu cuenta, haz clic en el siguiente enlace:

        
        <a href="http://localhost:3000/users/validate/${registrationCode}">Activar mi cuenta</a>
     `;
    // Envía el email de activación
    await sendMail(email, 'Activa tu usuario', emailBody);
};
// Función para validar un usuario por su código de registro
export const validateUser = async (registrationCode) => {
    // Valida al usuario por su código de registro
    const response = await userServices.validateUser(registrationCode);
    // Comprueba si la validación fue exitosa
    if (response.affectedRows !== 1) {
        errors.conflictError(
            'Error al validar el correo electrónico.',
            'USER_VALIDATED_ERROR'
        );
    }
};
// Función para iniciar sesión de un usuario
export const loginUser = async (email, password) => {
    // Obtiene el usuario por su email
    const user = await userServices.getUserByEmailOrUsername(email);
    // Comprueba la validez de la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    // Lanza un error si las credenciales no son válidas
    if (!validPassword) {
        errors.notAuthorizedError(
            'Credenciales inválidas',
            'INVALID_CREDENTIALS'
        );
    }
    // Lanza un error si el usuario no está activo
    if (!user.active) {
        errors.userPendingActivation(
            'Usuario pendiente de activar. Verifique su correo electrónico para validar su cuenta.'
        );
    }
    // Crea un token de autenticación
    const tokenInfo = {
        id: user.id,
        role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
        expiresIn: process.env.EXPIRE,
    });
    // Retorna el token
    return token;
};
// Función para obtener todos los usuarios
export const getUsers = async () => {
    const users = await userServices.getUsers();
    return users;
};
// Función para obtener un usuario por su ID
export const getUserById = async (userId) => {
    const user = await userServices.getUserById(userId);
    return user;
};
// Función para editar el avatar de un usuario
export const editUserAvatar = async (avatar, user) => {
    if (user.avatar) {
        //tendriamos que eliminar el avatar actual
        await filesServices.deletePhoto(user.avatar);
    }

    // Guarda el nuevo avatar y obtiene su nombre
    const newAvatarName = await filesServices.savePhoto(avatar, 100);

    // Actualiza el avatar del usuario en la base de datos
    await userServices.updateAvatar(user.id, newAvatarName);
};
