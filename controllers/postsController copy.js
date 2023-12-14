export const lookPhotos = async (texto) => {
    //llamar servicio de busqueda en la base de datos usando como parámetro el texto
    const photo = await photo.lookPhotos(texto);
    // WHERE desciption LIKE '%texto%' desde servicios

    //Luego de obtener el listado por el servicio devolverlo con un return
    return texto
}