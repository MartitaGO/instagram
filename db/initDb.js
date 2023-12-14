// Importamos la función que retorna un pool de conexiones.
import getPool from './getPool.js';

//Función que genera las tablas de la base de datos.
const initDb = async () => {
    let pool;

    try {
   //Función que genera las tablas de la base de datos.

        pool = await getPool();

        console.log('Borrando tablas...');

        //Eliminamos las tablas si existen.
        await pool.query('DROP TABLES IF EXISTS posts');

        console.log('Creando tablas...');

        // Creamos la tabla de Usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
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

        // Creamos la tabla de Post.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT USNGINED PRIMARY KEY AUTO_INCREMENT,
                fileName VARCHAR(50) NOT NULL,
                description TEXT NULL,
                userId INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);


        // Creamos la tabla de likes.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS postLikes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                value TINYINT UNSINGNED NOT NULL,
                userId INT UNSIGNED NOT NULL,
                postId INT UNSINGED NOT NULL,
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
        `);

          // Creamos la tabla de comentarios. (opcional)
         await pool.query(`
          CREATE TABLE IF NOT EXISTS postComents (
              id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
              comments TINYINT UNSINGNED NOT NULL,
              userId INT UNSIGNED NOT NULL,
              postId INT UNSINGED NOT NULL,
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
