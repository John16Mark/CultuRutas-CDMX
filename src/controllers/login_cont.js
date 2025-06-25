const jwt = require('jsonwebtoken');

const login_model = require('../models/MySQL/login_model');

class login_cont {
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    const tokenJWT = (id, correo_p, esGestor) => {
      return jwt.sign({
        id: id, correo: correo_p, esGestor: esGestor},
      process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    try {
      const resultado = await login_model.login_unificado(correo, contraseña);
      
      let id;
      if(resultado.esGestor == false)
        id = resultado.id_visitante;
      else
        id = resultado.id_gestor;
      const newToken = tokenJWT(id, correo, resultado.esGestor);
      console.log("newToken: ", newToken)
      console.log("\x1b[33m  resultado: \x1b[0m", resultado)
      res.status(201).json({
        mensaje: 'Login exitoso',
        usuario: resultado,
        token_login: newToken,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = login_cont;
