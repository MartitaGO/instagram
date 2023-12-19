// Función principal (middleware) que maneja la solicitud para obtener la información del usuario.
const main = async (req, res, next) => {
    try {
        // Obtiene la información del usuario desde el objeto de solicitud (req.user).
        const userInfo = req.user;
        
        // Crea un objeto de transferencia de datos (DTO) con la información esencial del usuario.
        const user = {
            id: userInfo.id,
            username: userInfo.username,
            email: userInfo.email,
            avatar: userInfo.avatar,
            createdAt: userInfo.createdAt
        };

        // Envía una respuesta con el estado "OK", un mensaje y los datos del usuario.
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