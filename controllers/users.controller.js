import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userServices from '../services/users.services.js';
import errors from '../helpers/errors.helper.js';

export const newUserRegister = async (body) => {
    const { username, password, email } = body;
    const response = await userServices.newUserRegister(
        username,
        password,
        email,
    );

    if (response.affectedRows !== 1) {
        errors.conflictError(
            'Error al registrar nuevo usuario.',
            'USER_REGISTER_ERROR',
        );
    }
};

export const loginUser = async (email, password) => {
    const user = await userServices.getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        errors.notAuthorizedError(
            'Credenciales inválidas',
            'INVALID_CREDENTIALS',
        );
    }

    const tokenInfo = {
        id: user.id,
        role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
        expiresIn: process.env.EXPIRE,
    });

    return token;
};
