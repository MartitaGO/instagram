// Importa el módulo validateSchema desde el archivo validationSchema.helper.js en la carpeta helpers/.
import validateSchema from "../../helpers/validationSchema.helper.js";

// Importa el esquema editUserPasswordSchema desde el archivo editUserPassword.schema.js en la carpeta schemas/users/.
import editUserPasswordSchema from '../../schemas/users/editUserPassword.schema.js';

// Importa la función editUserPassword desde el archivo users.controller.js en la carpeta controllers/.
import { editUserPassword } from "../../controllers/users.controller.js";

// Función principal (middleware) que maneja la actualización de la contraseña del usuario.
const main = async(req,res,next)=>{
    try {
        // Validaciones: Verifica que la solicitud (req.body) cumple con el esquema editUserPasswordSchema.
        await validateSchema(editUserPasswordSchema,req.body);
        // Extrae los datos necesarios (email, recoverPassCode, newPass) de la solicitud.
        const { email, recoverPassCode, newPass } = req.body;
        // Llama al controlador para realizar la actualización de la contraseña.
        await editUserPassword(email, recoverPassCode, newPass);

        // Envía una respuesta indicando que la contraseña se ha actualizado con éxito.
        res.send({
            status: 'OK',
            message: 'Contraseña actualizada',
        });
        
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;