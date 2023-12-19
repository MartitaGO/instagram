// Importa el módulo Nodemailer y el helper de errores
import nodemailer from 'nodemailer';
import errors from './errors.helper.js';

// Crea un objeto de transporte para enviar correos electrónicos
const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,        // Host del servidor SMTP
    port: process.env.SMTP_PORT,        // Puerto del servidor SMTP
    auth: {
        user: process.env.SMTP_USER,    // Usuario para autenticación SMTP
        pass: process.env.SMTP_PASS     // Contraseña para autenticación SMTP
    }
});

// Define una función asincrónica para enviar correos electrónicos
const sendMail = async (email, subject, body) => {
    try {
        // Configura los detalles del correo electrónico
        const mail = {
            from: process.env.SMTP_USER,     // Dirección de correo del remitente
            to: email,                      // Dirección de correo del destinatario
            subject: subject,               // Asunto del correo electrónico
            text: body                      // Cuerpo del correo electrónico en formato de texto
        }

        // Envía el correo electrónico utilizando el objeto de transporte
        await transport.sendMail(mail);

    } catch (err) {
        console.error(err);
        // Maneja errores relacionados con el envío de correos electrónicos
        errors.sendEmailError('Error al enviar el correo electrónico a ' + email);
    }
}
// Exporta la función sendMail como predeterminada para que pueda ser utilizada en otros archivos
export default sendMail;