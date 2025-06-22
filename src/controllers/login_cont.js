const visitante_model = require('../models/MySQL/visitante_model');

class login_cont {
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resultado = await visitante_model.login_regular(correo);

      if (!resultado.correo_verificado) {
        return res.status(400).json({ error: 'Correo no confirmado' });
      }

      // Aquí podrías usar bcrypt si contraseñas están hasheadas
      if (contraseña !== resultado.contrasena) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      res.json({
        resultado: {
          id: resultado.id,
          correo: correo,
          token: resultado.token
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = login_cont;
