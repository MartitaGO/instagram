// Controlador de errores que maneja errores en las rutas de Express
const errorController = (err, req, res, next) => {
    // Imprime el error en la consola para su registro y seguimiento
    console.error(err);

    // Establece el código de estado HTTP de la respuesta al código proporcionado en el error
    // Si el error no tiene un código de estado HTTP definido, se establece a 500 (Error interno del servidor)
    res.status(err.httpStatus || 500).send({ ...err, status: 'error' });
};
// Exporta el controlador de errores para que pueda ser utilizado en otros archivos
export default errorController;
