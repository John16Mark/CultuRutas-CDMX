// src/controllers/login_cont.js

const login_model = require('../models/MySQL/login_model');

class login_cont {
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resultado = await login_model.login_unificado(correo, contraseña);

      res.json({
        mensaje: 'Login exitoso',
        usuario: resultado
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = login_cont;
