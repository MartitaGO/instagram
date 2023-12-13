import getPool from "./getPool.js";

const main = async () => {
    // Variable que alamacenará una conexión con la base de datos.
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas....');

        await pool.query(
            'DROP TABLE IF EXISTS entryLikes, entryPhotos, posts, users'
        );

        console.log('creando tablas...');
            
        // Creamos la tabla de Usuarios.
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

        // Creamos la tabla de Post.
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

     // Creamos la tabla de fotos.
     await pool.query(`
     CREATE TABLE IF NOT EXISTS entryPhotos (
         id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(100) NOT NULL,
         entryId INT UNSIGNED NOT NULL,
         FOREIGN KEY (entryId) REFERENCES entries(id),
         createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
     )
 `);

        // Creamos la tabla de likes.
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
    } catch (err) {
    console.error(err);
    } finally {
        // Cerramos el proceso.
    process.exit();
    }
};

// Ejecutamos la función anterior.
main();