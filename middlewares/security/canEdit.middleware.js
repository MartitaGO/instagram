// Importa el módulo de errores.
import errors from '../../helpers/errors.helper.js';

// Función principal (middleware) que verifica si el usuario está autorizado para editar la entrada.
const main = async (req, res, next) => {
    try {
        // Verifica si el post existe
        if (!req.post) {
            // Si el post no existe, responde con un error 404
            console.log('Post no encontrado en canEdit.middleware.js');
            return res.status(404).json({ error: 'El post no existe' });
        }

        // Agrega logs para verificar la existencia y estructura de req.post
        console.log('Post en canEdit.middleware.js:', req.post);

        // Imprime información adicional para depuración
        console.log('ID del usuario en la solicitud:', req.user.id);
        console.log('ID del usuario asociado al post:', req.post.userId);

        // Comprueba si el ID del usuario en la solicitud no coincide con el ID del usuario asociado al post.
        if (req.user.id !== req.post.userId) {
            // Lanza un error indicando que el usuario no está autorizado para editar esta entrada.
            console.log('Usuario no autorizado en canEdit.middleware.js');
            errors.notAuthorizedError("No está autorizado para editar esta entrada", "NOT_AUTHORIZED");
        }

        // Llama al siguiente middleware en la cadena.
        next();
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        console.error('Error en canEdit.middleware.js:', err);
        next(err);
    }
}

// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;






/*
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
export default main;*/