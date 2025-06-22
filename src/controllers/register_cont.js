const visitante_model = require('../models/MySQL/visitante_model');
const enviarCorreoVerificacion = require('../utils/mailer');

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;

    try {
      const resultado = await visitante_model.registro_regular(correo, contraseña);
      console.log("Registro exitoso:", resultado);

      // Consulta el token generado
      const query = `SELECT token_verificacion FROM Visitante WHERE correo_electronico = ?`;
      const db = require('../models/MySQL/db');
      db.query(query, [correo], async (err, rows) => {
        if (err || !rows[0]) {
          return res.status(500).json({ error: 'Error al recuperar token de verificación' });
        }

        const token = rows[0].token_verificacion;
        await enviarCorreoVerificacion(correo, token);
        res.status(201).json({ mensaje: 'Registro exitoso. Revisa tu correo para confirmar.' });
      });

    } catch (err) {
      console.log("Error en el registro:", err.message);
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = register_cont;
