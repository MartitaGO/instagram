// Importa la función getUsers desde el controlador de usuarios.
import { getUsers } from "../../controllers/users.controller.js";

// Función principal (middleware) que maneja la solicitud para obtener el listado de usuarios.
const main = async (req, res, next) =>{
    try {
        // Validar si es necesario; en este caso, no hay datos en req para validar.

        // Consumir el servicio para obtener el listado de usuarios.
        const users = await getUsers();

        // Devolver una respuesta con el estado "OK", un mensaje y el listado de usuarios.
        res.send({
            status: "OK",
            message: "Listado de usuarios",
            data:{
                users
            }
        });
    } catch (err) {
        // En caso de error, pasa el control al siguiente middleware o manejador de errores.
        next(err);
    }
};
// Exporta la función main para que pueda ser utilizada en otros archivos.
export default main;