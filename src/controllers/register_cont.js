const visitante_model = require('../models/MySQL/visitante_model');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resultado = await visitante_model.registro_regular(correo, contraseña);
      console.log("✅ Registro exitoso:", resultado);
      res.status(201).json({ resultado });
    } catch (err) {
      console.log("❌ Error en el registro:", err.message);
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = register_cont;
