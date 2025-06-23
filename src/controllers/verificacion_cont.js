// src/controllers/verificacion_cont.js

const db = require('../models/MySQL/db');

class verificacion_cont {
  static async confirmarCorreo(req, res) {
    const { token } = req.query;

    if (!token) return res.status(400).send('Token faltante.');

    const query = 'UPDATE Visitante SET correo_verificado = TRUE, token_verificacion = NULL WHERE token_verificacion = ?';

    db.query(query, [token], (err, result) => {
      if (err) return res.status(500).send('Error interno del servidor.');

      if (result.affectedRows === 0) {
        return res.status(400).send('Token inválido o ya utilizado.');
      }

      res.send('¡Cuenta verificada exitosamente! Ya puedes iniciar sesión.');
    });
  }
}

module.exports = verificacion_cont;
