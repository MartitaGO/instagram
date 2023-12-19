// Importa la función para obtener información de un usuario por su ID desde un controlador.
import { getUserById } from "../../controllers/users.controller.js";

// Definición de la función principal (middleware) que maneja la solicitud de obtener información de un usuario por su ID.
const main = async (req, res, next) => {
    try {
        // Obtiene el ID del usuario de la solicitud. Utiliza el ID del usuario autenticado si está presente, 
        // de lo contrario, utiliza el ID proporcionado en los parámetros de la solicitud.
        const userId = req.user?.id || req.params.userId;

        // Llama a la función para obtener información del usuario por su ID.
        const user = await getUserById(userId); 

        // Agrega la información del usuario al objeto de solicitud para que esté disponible en los middleware posteriores.
        req.user = user;

        // Pasa el control al siguiente middleware.
        next();
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware o manejador de errores.
        next(err);
    }
}
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;