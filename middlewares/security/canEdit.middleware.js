// Importa el módulo de errores.
import errors from '../../helpers/errors.helper.js';

// Función principal (middleware) que verifica si el usuario está autorizado para editar la entrada.
const main = async (req, res, next) => {
    try {
        // Verifica si el post existe
        if (!req.post) {
            return res.status(404).json({ error: 'El post no existe' });
        }

        // Comprueba si el ID del usuario en la solicitud no coincide con el ID del usuario asociado al post.
        if (req.user.id !== req.post.userId) {
            // Lanza un error indicando que el usuario no está autorizado para editar esta entrada.
            errors.notAuthorizedError(
                'No está autorizado para editar esta entrada',
                'NOT_AUTHORIZED'
            );
        }

        // Llama al siguiente middleware en la cadena.
        next();
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware (o manejador de errores).
        console.error('Error en canEdit.middleware.js:', err);
        next(err);
    }
};

// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;
