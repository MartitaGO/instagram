// Importa el módulo validateSchema desde el archivo validationSchema.helper.js en la carpeta helpers/.
import validateSchema from "../../helpers/validationSchema.helper.js";

// Importa el esquema editUserAvatarSchema desde el archivo editUserAvatar.schema.js en la carpeta schemas/users/.
import editUserAvatarSchema from "../../schemas/users/editUserAvatar.schema.js";

// Importa la función editUserAvatar desde el archivo users.controller.js en la carpeta controllers/.
import { editUserAvatar } from "../../controllers/users.controller.js";

// Función principal (middleware) que maneja la solicitud de edición de avatar de usuario.
const main = async (req, res, next) => {
    try{
        // Validaciones: Verifica que la solicitud (req.files) cumple con el esquema editUserAvatarSchema.
        await validateSchema(editUserAvatarSchema, req.files || {});

        // Llama al controlador editUserAvatar con el nuevo avatar y el usuario actual (req.user).
        await editUserAvatar(req.files.avatar, req.user);

        res.send({
            status: "OK",
            message: "Avatar del usuario actualizado",
        })
    }catch(err){
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    };
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;