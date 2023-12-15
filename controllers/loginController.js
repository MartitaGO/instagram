import loginServices from '../services/loginServices.js';
import errors from '../helpers/errors.helper.js';

const loginController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implemented',
        });
    } catch (err) {
        next(err);
    }
};

//Exportamos la función.
export default loginController;
