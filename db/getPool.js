// Importa las bibliotecas necesarias
import mysql from 'mysql2/promise'; // Importa la biblioteca MySQL2 para el manejo de conexiones con MySQL
import dotenv from 'dotenv'; // Importa dotenv para cargar las variables de entorno desde un archivo .env

dotenv.config(); // Configura las variables de entorno desde el archivo .env

// Extrae las variables de entorno relacionadas con la conexión a MySQL
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool; // Declara una variable para almacenar el pool de conexiones MySQL

// Define la función asincrónica getPool
const getPool = async () => {
    try {
        // Inicia un bloque try-catch para manejar errores
        if (!pool) {
            // Verifica si el pool no está inicializado anteriormente

            // Crea un pool temporal para dar de alta la Base de Datos si no existe
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST, //envio el host para la conexión
                user: MYSQL_USER, //envio el user
                password: MYSQL_PASS, //envio el password
            });

            // Ejecuta una consulta para crear la base de datos si no existe
            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Crea el pool de conexiones MySQL
            pool = mysql.createPool({
                //Comienzo a crear el pool mediante MYSQL y le envío un objeto
                host: MYSQL_HOST, //envio el host para la conexión
                user: MYSQL_USER, //envio el user
                password: MYSQL_PASS, //envio el password
                connectionLimit: 10, //determino la cantidad máxima de conexiones (10 por poner 10)
                database: MYSQL_DB, //determino la base a la cual conectarme
                timezone: 'Z', //Z para horario UTC (horario global)
            }); //cierro el createPool
        } //cierro el if donde valido si no está inicializado el pool

        return pool; // Devuelve el pool de conexiones MySQL
    } catch (error) {
        // Captura y maneja errores si ocurren durante la ejecución
        console.error(error); // Muestra el error en la consola
    }
};
// Exporta la función getPool como el valor predeterminado del módulo
export default getPool;
