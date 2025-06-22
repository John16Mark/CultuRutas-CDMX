const recuperacion_model = require('../models/MySQL/recuperacion_model');
const enviarCorreoVerificacion = require('../utils/mailer');

class recuperacion_cont {

  static async solicitar_recuperacion(req, res) {
    const { correo } = req.body;

    try {
      const token = await recuperacion_model.generarTokenRecuperacion(correo, 'visitante');

      const link = `http://localhost:3001/restablecer-contrasena?token=${token}`;

      await enviarCorreoVerificacion(correo, token, link, 'Recuperación de contraseña',
        'Haz clic en el enlace para restablecer tu contraseña');

      res.status(200).json({ mensaje: 'Se envió el correo de recuperación' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async restablecer_contrasena(req, res) {
    const { token, nuevaContrasena } = req.body;

    try {
      await recuperacion_model.actualizarContrasenaVisitante(nuevaContrasena, token);
      res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = recuperacion_cont;
