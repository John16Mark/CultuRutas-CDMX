const db = require('./db');

class recuperacion_model {

  static generarTokenRecuperacion(correo, tipo_usuario) {
    const query = 'CALL generar_token_recuperacion(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, tipo_usuario], (err, results) => {
        if (err) return reject(err);
        const resultado = results[0][0];
        if (resultado?.error) return reject(new Error(resultado.error));
        resolve(resultado.token);
      });
    });
  }

  static async actualizarContrasenaVisitante(nuevaContrasena, token) {
    const query = `
      UPDATE Visitante
      JOIN Tokens_Recuperacion ON Visitante.id_visitante = Tokens_Recuperacion.id_usuario
      SET Visitante.contrasena = ?, Tokens_Recuperacion.utilizado = TRUE
      WHERE Tokens_Recuperacion.token = ? AND Tokens_Recuperacion.tipo_usuario = 'visitante'
        AND Tokens_Recuperacion.utilizado = FALSE
        AND Tokens_Recuperacion.fecha_expiracion > NOW();
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [nuevaContrasena, token], (err, result) => {
        if (err) return reject(err);
        if (result.affectedRows === 0) {
          return reject(new Error('Token inválido o expirado'));
        }
        resolve();
      });
    });
  }

}

module.exports = recuperacion_model;
