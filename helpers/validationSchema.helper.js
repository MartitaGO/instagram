// Función asincrónica para validar un objeto (body) según un esquema específico.
const validateSchema = async (schema, body) =>{
    try {
        // Utiliza el método validateAsync del esquema para validar el objeto body.
        await schema.validateAsync(body);
    } catch (error) {
        // En caso de error durante la validación, establece el código y el estado HTTP adecuados.
        error.httpStatus = 400;          // Código HTTP 400 Bad Request
        error.code = 'Invalid schema';   // Código personalizado para indicar un error de esquema no válido.
        throw error;                     // Lanza el error para ser manejado por el código que llama a esta función.
    }
}

// Exporta la función para que pueda ser utilizada en otros archivos.
export default validateSchema;