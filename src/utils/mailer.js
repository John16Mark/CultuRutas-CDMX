const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const enviarCorreo = async (destino, token, ruta, asunto, mensajeHTML) => {
  const enlace = `${process.env.BACKEND_URL}${ruta}?token=${token}`;

  const mailOptions = {
    from: `"CultuRutas CDMX" <${process.env.EMAIL_USER}>`,
    to: destino,
    subject: asunto,
    html: `
      <h3>${asunto}</h3>
      <p>${mensajeHTML}</p>
      <p><a href="${enlace}" target="_blank">Haz clic aquí para continuar</a></p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { enviarCorreo };
