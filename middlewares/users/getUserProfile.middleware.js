// Función principal (middleware) que maneja la solicitud para obtener información simplificada de un usuario.
const main = async (req, res, next) => {
    try {
        // Obtiene la información del usuario desde req.
        const user = req.user;

        // Elimina campos sensibles o innecesarios del objeto del usuario antes de enviar la respuesta.
        delete user.password;
        delete user.modifiedAt;
        delete user.email;
        delete user.active;
        delete user.role;
        delete user.registrationCode;
        delete user.recoverPassCode;
     
        // Devuelve una respuesta con el estado "OK", un mensaje y la información simplificada del usuario.
        res.send({
            status: "OK",
            message: "Usuario encontrado",
            data:{
                user
            }
        });
    }catch (err) {
        // En caso de error, pasa el control al siguiente middleware o manejador de errores.
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;