const register_model = require('../models/MySQL/register_model');
const { enviarCorreo } = require('../utils/mailer');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resultado = await register_model.registro_regular(correo, contraseña);

      // Enviar correo de verificación
      await enviarCorreo(
        correo,
        resultado.token,
        '/confirmar-correo',
        'Verifica tu cuenta en CultuRutas CDMX',
        'Gracias por registrarte. Haz clic para verificar tu cuenta.'
      );

      res.status(201).json({ mensaje: 'Registro exitoso. Verifica tu correo electrónico.' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = register_cont;
