// Importamos la función que retorna un pool de conexiones.
import getPool from './getPool.js';

//Función que genera las tablas de la base de datos.
const initDb = async () => {
    try {
        // Obtenemos un pool de conexiones.
        const pool = await getPool();

        console.log('Borrando tablas...');

        //Eliminamos las tablas si existen.
        await pool.query('DROP TABLES IF EXISTS posts');

        console.log('Creando tablas...');

        //Creamos la base de datos de posts.
        //await pool.query(`
        //  CREATE TABLE IF NOT EXISTS posts (
        //    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        //  text VARCHAR(255) NOT NULL,
        // createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        //)
        //`);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR (100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT USNGINED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                place VARCHAR(30) NOT NULL,
                description TEXT NOT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS entryLikes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value TINYINT UNSINGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                entryId INT UNSINGED NOT NULL,
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
        `);

        console.log('Tablas creadas');

        //Cerramos el proceso indicando que todo ha ido bien con código 0.
        process.exit(0);
    } catch (err) {
        console.error(err);

        //Cerramos el proceso indicando que hay un error con código 1.
        process.exit(1);
    }
};

// Llamamos a la función
initDb();
