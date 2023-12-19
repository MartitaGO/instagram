// Importa el módulo errors desde el archivo errors.helper.js en la carpeta helpers/.
import errors from '../../helpers/errors.helper.js';

// Función principal (middleware) que verifica si el usuario está autorizado para editar la entrada.
const main = async (req, res, next) => {
    try {
        // Comprueba si el ID del usuario en la solicitud no coincide con el ID del usuario asociado a la entrada.
        if(req.user.id !== req.entry.userId){
            // Lanza un error indicando que el usuario no está autorizado para editar esta entrada.
            errors.notAuthorizedError("No está autorizado para editar esta entrada","NOT_AUTHORIZED");
        }
        // Llama al siguiente middleware en la cadena.
        next();
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        next(err);
    }
}
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;