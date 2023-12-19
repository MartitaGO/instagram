// Importa la función de controlador para validar un usuario.
import { validateUser } from "../../controllers/users.controller.js";

// Importa la función de validación de esquema.
import validateSchema from "../../helpers/validationSchema.helper.js";

// Importa el esquema de validación específico para la validación de usuario.
import validateUserSchema from "../../schemas/users/validateUser.schema.js";

// Define la función principal (middleware) para validar un usuario utilizando un código de registro.
const main = async (req,res,next) => {
    try {
        // Extrae el código de registro de los parámetros de la solicitud.
        const { registrationCode } = req.params;

        // Realiza la validación del esquema para el código de registro utilizando el esquema específico.
        // Podríamos validar que el registrationCode no esté vacío.
        await validateSchema(validateUserSchema, {registrationCode});

        // Llama a la función de controlador para validar el usuario utilizando el código de registro.
        await validateUser(registrationCode);

        // Envía una respuesta indicando que la validación del usuario se ha realizado correctamente.
        res.send({
            status: "OK",
            message: "Usuario validado correctamente"
        });
        
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware o manejador de errores.
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;