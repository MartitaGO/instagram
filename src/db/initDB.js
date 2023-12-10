import getPool from './getPool.js';

const initDb = async () = {
try {
    const pool = await getPool();

    console.log('Borrando tablas…');

    await pool.query(“DROP TABLE IF EXISTS posts”);

    console.log('Creando tablas…');

    await pool.query(
        CREATE TABLE IF NOT EXISTS posts (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        ))
};
console.log('¡Tablas creadas!')
} catch (err) {
console.error(err)
}
}
