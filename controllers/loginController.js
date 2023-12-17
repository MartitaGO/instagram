import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import errors from '../helpers/errorsHelper.js';
import loginServices from '../services/loginServices.js';

const loginControlller = async (email, password) => {
    const user = await loginServices(email);

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

export default loginControlller;
