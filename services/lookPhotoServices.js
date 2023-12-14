import getPool from '../db/getPool.js'
//import errors from '../helpers/errorsHelper.js

const lookPhoto = async (texto) => {
    const pool = await getPool()
    const [response] = await pool.query (
        'WHERE desciption LIKE ('%texto%') ',
        [texto]
    )
    if (response.length > 0) {  
       // errors.conflictError('Error al buscar la foto') 
} 
return response
}
export default {
    lookPhoto
}