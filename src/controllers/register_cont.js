const register_model = require('../models/MySQL/register_model');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;
    try {
      register_model
        .registro_regular(correo, contraseña)
        .then((resultado) => {
          console.log("\x1b[94mregister_controller - resultado\x1b[0m", resultado)
          res.status(201).json({resultado: resultado});
        })
        .catch((err) => {
          if(err.message) {
            let mensajeError = err.message;
            return res.status(400).json({error: mensajeError});
          }
          return res.status(500).json({error: err.message});
        })
    } catch (err) {
      res.status(500).json({ error: 'Error al encriptar la contraseña' });
    }
  }
}

module.exports = register_cont;