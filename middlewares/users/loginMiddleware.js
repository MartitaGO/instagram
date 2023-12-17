import validateSchema from '../../helpers/validationSchemaHelper.js';
import loginUserSchema from '../../schemas/users/loginUserSchema.js';
import loginController from '../../controllers/loginController.js';

const loginMiddleware = async (req, res, next) => {
    try {
        await validateSchema(loginUserSchema, req.body);

        const token = await loginController(req.body.email, req.body.password);

        res.send({
            status: 'OK',
            message: 'Usuario autenticado correctamente',
            data: {
                token: token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginMiddleware;
