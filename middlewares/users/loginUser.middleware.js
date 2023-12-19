// Importa la función de validación de esquema desde un archivo de ayuda.
import validateSchema from "../../helpers/validationSchema.helper.js";

// Importa el esquema de validación para el inicio de sesión de usuario desde un archivo.
import loginUserSchema from "../../schemas/users/loginUser.schema.js";

// Importa la función para autenticar al usuario desde un controlador.
import { loginUser } from "../../controllers/users.controller.js";

// Definición de la función principal (middleware) que maneja la solicitud de inicio de sesión.
const main = async (req, res, next) => {
    try {
        // Valida el cuerpo de la solicitud contra el esquema de inicio de sesión.
        await validateSchema(loginUserSchema, req.body);

        // Llama a la función para autenticar al usuario con las credenciales proporcionadas.
        const token = await loginUser(req.body.email, req.body.password);

        // Devuelve una respuesta con el estado "OK", un mensaje y el token de autenticación.
        res.send({
            status: "OK",
            message: "Usuario autenticado correctamente",
            data:{
                token: token
            }
        });

    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware o manejador de errores.
        next(err);
    }

};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;