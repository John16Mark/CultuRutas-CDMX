const register_model = require('../models/MySQL/register_model');
const { enviarCorreo } = require('../utils/mailer');
const { errorHandler } = require('../utils/errorHandler');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resultado = await register_model.registro_regular(correo, contraseña);

      // Enviar correo de verificación
      const correoResultado = await enviarCorreo(
        correo,
        resultado.token,
        '/confirmar-correo',
        'Verifica tu cuenta en CultuRutas CDMX',
        'Gracias por registrarte. Haz clic para verificar tu cuenta.'
      );

      console.log('correoResultado: ', correoResultado)
      if (!correoResultado.success) {
        return res.status(500).json({ error: 'No se pudo enviar el correo.' });
      }

      return res.status(201).json({
        mensaje: 'Registro exitoso. Verifica tu correo electrónico.',
        emailSent: true
      });
    } catch (err) {
      if(err.message) {
        let mensaje = errorHandler(err.message);
        return res.status(400).json({error: mensaje});
      }
      return res.status(400).json({ error: err });
    }
  }
}

module.exports = register_cont;
