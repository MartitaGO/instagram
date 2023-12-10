import selectAllPostModel from '../models/selectAllPostModel.js'; 
		
		const listPostController = async (req, res, next) => {
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
