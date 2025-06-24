
const db = require('./db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

class register_model {
  static async registro_regular(correo, contraseña) {
    console.log("\x1b[94m .: lugar_model :.\x1b[0m")

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const token = uuidv4(); // ← token de verificación

    const query = 'CALL visitante_registro(?, ?, ?);'; // Asegúrate de modificar tu procedimiento
    return new Promise((resolve, reject) => {
      db.query(query, [correo, hashedPassword, token], (err, results) => {
        if (err) return reject(err);
        const resultado = results[0][0] || null;

        if (resultado?.error)
          return reject(new Error(resultado.error));
        else
          resolve({ id: resultado?.id_visitante || null, correo, token });
      });
    });
  }
}

module.exports = register_model;
