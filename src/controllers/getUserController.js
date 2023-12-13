// Importamos modelo para función
import selectUserByIdModel from '../models/selectUserByIdModel.js'; 

// Creamos función para obtener perfil de un usuario
const getUserController = async (req, res, next) => {
		try {
		const  { userId } = req.params; 
			
			const user = await selectUserByIdModel(userId); 
			
			res.send({
				status: 'ok',
				data: {
					user,
			},
		});
		} catch (err) {
			next(err);
		}
		};

//Exportamos la función.
export default getUserController;
