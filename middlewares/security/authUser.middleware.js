// Importa la librería jwt (JSON Web Token) para manejar tokens de autorización.
import jwt from 'jsonwebtoken';

// Importa el módulo errors desde el archivo errors.helper.js en la carpeta helpers/.
import errors from '../../helpers/errors.helper.js';

// Función principal (middleware) que maneja la autenticación mediante token.
const main = async (req, res, next) => {
    try {
        // Extrae el encabezado "Authorization" de la solicitud.
        const { authorization } = req.headers;

        // Verifica si no se proporcionó un token de autorización en el encabezado.
        if (!authorization){
            // Lanza un error indicando que el usuario no está autenticado.
           errors.notAthenticatedError();
        }
        // Variable para almacenar la información extraída del token.
        let tokenInfo;

         // Intenta verificar y decodificar el token utilizando la clave secreta definida en el entorno.
        try {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            // Si hay un error en la verificación del token, se lanza un error indicando que el usuario no está autorizado.
            errors.unauthorizedUser();
        }

        // Almacena la información del usuario extraída del token en el objeto de solicitud (req.user).
        req.user = tokenInfo;

        // Llama al siguiente middleware en la cadena.
        next();
        
    } catch (err) {
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;