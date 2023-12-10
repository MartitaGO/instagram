import getPool from “../db/getPool.js”;
			
		const selectAllPostModel = async () => {
		const pool = await getPool(); 
		const [posts] = await pool.query('SELECT * FROM posts');
		return posts; 

		export default selectAllPostModel; 
