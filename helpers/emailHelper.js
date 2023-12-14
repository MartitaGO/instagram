import nodemailer from 'nodemailer';
import errors from './errors.helper.js';

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendMail = async (email, subject, body) => {
    try {
        const mail = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: body,
        };

        await transport.sendMail(mail);
    } catch (err) {
        console.error(err);
        errors.sendEmailError(
            'Error al enviar el correo electrónico a ' + email,
        );
    }
};

export default sendMail;
