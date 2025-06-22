const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Cambia según tu proveedor: 'hotmail', 'outlook', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Envía un correo electrónico con un enlace personalizado.
 * 
 * @param {string} correo - Dirección de correo del destinatario.
 * @param {string} token - Token único generado para el enlace.
 * @param {string} urlDestino - Ruta base del enlace de acción (por ejemplo: '/confirmar-correo' o '/restablecer-contrasena').
 * @param {string} asunto - Asunto del correo (ej. "Confirmación de cuenta").
 * @param {string} mensajeHTML - Mensaje HTML personalizado para el cuerpo del correo.
 */
const enviarCorreo = async (correo, token, urlDestino, asunto, mensajeHTML) => {
  const url = `http://localhost:3001${urlDestino}?token=${token}`;
  const mailOptions = {
    from: `"CultuRutas CDMX" <${process.env.EMAIL_USER}>`,
    to: correo,
    subject: asunto,
    html: `
      <h3>${mensajeHTML}</h3>
      <a href="${url}" target="_blank">Haz clic aquí para continuar</a>
      <p>Si tú no realizaste esta solicitud, puedes ignorar este mensaje.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = enviarCorreo;
