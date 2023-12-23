// Importa la función getPool desde el archivo getPool.js
import getPool from './getPool.js';

// Define la función asincrónica main
const main = async () => {
    // Variable que almacenará una conexión con la base de datos
    let pool;

    try {
        // Obtiene una conexión al pool de MySQL utilizando la función getPool
        pool = await getPool();

        console.log('Borrando tablas...');

        // Ejecuta consultas SQL para borrar las tablas si existen
        await pool.query('DROP TABLE IF EXISTS likes, posts, users');

        console.log('Creando tablas...');

        // Crea la tabla de usuarios (users)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )	
        `);

        // Crea la tabla de posts
        await pool.query(`
            CREATE TABLE IF NOT EXISTS posts (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                description TEXT NOT NULL,
                userId INT UNSIGNED NOT NULL,
                imagenURL VARCHAR(255) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                FOREIGN KEY (userId) REFERENCES users(id)
            )
        `);

        // Crea la tabla de likes
        await pool.query(`
        CREATE TABLE IF NOT EXISTS likes (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            userId INT UNSIGNED NOT NULL,
            postId INT UNSIGNED NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (postId) REFERENCES posts(id)  
        )
    `);

        /*Creamos la tabla de comentarios. (opcional)
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
      */

        console.log('¡Tablas creadas!');
    } catch (err) {
        console.error(err); // Muestra errores en la consola si ocurren durante la ejecución
    } finally {
        // Cerramos el proceso de Node.js
        process.exit();
    }
};

// Ejecuta la función main
main();
