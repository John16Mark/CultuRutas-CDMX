const register_model = require('../models/MySQL/register_model');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;
    console.log("\n\x1b[93m .: register_controller :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[33mcorreo: \x1b[0m", correo, "\n  \x1b[33mcontraseña: \x1b[0m", contraseña)
    try {
      register_model
        .registro_regular(correo, '123')
        .then((resultado) => {
          console.log("\x1b[33m  resultado: \x1b[0m", resultado)
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