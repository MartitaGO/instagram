// Importamos modelo para función
import selectUserByIdServices from '../services/selectUserByIdServices.js'; 

// Creamos función para obtener perfil de un usuario
const getUserController = async (req, res, next) => {
		try {
		const  { userId } = req.params; 
			
			const user = await selectUserByIdServices(userId); 
			
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

		export default getUserController;
		

