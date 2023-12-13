//Leemos las variables de entorno del fichero ".env".
import 'dotenv/config';

// Importamos la versión promesas de "mysql2".
import mysql from 'mysql2/promise';

// Importamos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un grupo de conexiones.
let pool;

// Función que genera un pool de conexiones y/o lo retorna.
const getPool = async () => {
    try {
        //Si la variable "pool" contiene un valor falso, creamos el pool.
        if (!pool) {
            // Creamos una conexión con la base de datos para crear la base de datos si no existe.
            const connection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z',
            });

            //Creamos la base de datos si no existe.
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }
        return pool;
    } catch (err) {
        console.error(err);
    }
};

// Exportamos la función.
export default getPool;
