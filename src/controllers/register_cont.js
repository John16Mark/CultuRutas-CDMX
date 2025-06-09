const register_model = require('../models/MySQL/register_model');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;
    try {

    } catch (err) {
      res.status(500).json({ error: 'Error al encriptar la contraseña' });
    }
  }
}

module.exports = register_cont;