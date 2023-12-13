const [users] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);

import getPool from '../db/getPool.js';
			
		const selectUserByIdModel = async (userId) => {
		const pool = await getPool(); 
		const [users] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);
		}
		if (users.length < 1) {
			const err = new Error('Perfil no encontrado');
			err.httpStatus  = 404;
		throw err;
}

return users[0]; 

export default selectUserByIdModel; 
