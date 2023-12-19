// Importa la biblioteca 'randomstring' para generar cadenas aleatorias.
import randomstring from 'randomstring';

// Importa la función de validación de esquema desde un archivo de ayuda.
import validateSchema from "../../helpers/validationSchema.helper.js";

// Importa el esquema de validación para la creación de un nuevo usuario desde un archivo.
import newUserSchema from "../../schemas/users/newUser.schema.js";

// Importa la función para registrar un nuevo usuario desde un controlador.
import { newUserRegister } from "../../controllers/users.controller.js";

// Definición del middleware que maneja la solicitud de creación de un nuevo usuario.
const main = async (req,res,next) =>{
    try {
        // VALIDAR DATOS: Valida el cuerpo de la solicitud contra el esquema de nuevo usuario.
        await validateSchema(newUserSchema, req.body);

        // INSERTAR DATOS: Genera un código de registro, luego llama a la función para registrar un nuevo usuario.
        const registrationCode = randomstring.generate(30);
        await newUserRegister(req.body,registrationCode);

        // Devuelve una respuesta con el estado "OK" y un mensaje de éxito.
        res.send({
            status: "OK",
            message: "Usuario creado correctamente"
        });

    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware o manejador de errores.
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;