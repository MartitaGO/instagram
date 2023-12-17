import validateSchema from '../../helpers/validationSchemaHelper.js';
import newUserSchema from '../../schemas/users/newUserSchema.js';
import newUserController from '../../controllers/newUserController.js';

const newUserMiddleware = async (req, res, next) => {
    try {
        //VALIDAR DATOS
        await validateSchema(newUserSchema, req.body);
        //INSERT DATOS
        await newUserController(req.body);

        res.send({
            status: 'OK',
            message: 'Usuario creado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserMiddleware;
