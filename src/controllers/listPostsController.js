// Importamos modelo que selecciona todas las publicaciones
import selectAllPostModel from '../models/selectAllPostModel.js'; 

// Creamos función que lista todas las publicaciones
		const listPostsController = async (req, res, next) => {
		try {
			const posts = await selectAllPostModel(); 
			
			res.send({
				status: 'ok',
				data: {
					posts,
			},
		});
		} catch (err) {
			next(err);
		}
		};

export default listPostsController;
