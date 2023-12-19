// Importa el módulo validateSchema desde el archivo validationSchema.helper.js en la carpeta helpers/.
import validateSchema from "../../helpers/validationSchema.helper.js";

// Importa el esquema passwordRecoverSchema desde el archivo passwordRecover.schema.js en la carpeta schemas/users/.
import passwordRecoverSchema from "../../schemas/users/passwordRecover.schema.js";

// Importa la función passwordRecover desde el archivo users.controller.js en la carpeta controllers/.
import { passwordRecover } from "../../controllers/users.controller.js";

// Función principal (middleware) que maneja la solicitud de recuperación de contraseña.
const main = async (req, res, next) =>{
    try {
        // Validaciones: Verifica que la solicitud (req.body) cumple con el esquema passwordRecoverSchema.
        await validateSchema(passwordRecoverSchema, req.body);
        // Extrae el correo electrónico (email) de la solicitud
        const { email } = req.body;
        // Llama al controlador para iniciar el proceso de recuperación de contraseña.
        await passwordRecover(email);
        // Envía una respuesta indicando que el email de recuperación de contraseña se ha enviado correctamente.
        res.send({
            status: "OK",
            message: "Email de recuperación de contraseña enviado correctamente"
        })

    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
}
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;