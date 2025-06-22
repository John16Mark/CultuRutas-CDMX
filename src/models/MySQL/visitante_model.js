const db = require('./db');

class visitante_model {

  static async registro_regular(correo, contrasena) {
    const query = 'CALL visitante_registro(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, contrasena], (err, results) => {
        if (err) return reject(err);
        const resultado = results[0][0];
        if (resultado?.error) return reject(new Error(resultado.error));
        resolve({ mensaje: resultado.mensaje });
      });
    });
  }

  static async login_regular(correo) {
    const query = 'CALL visitante_login(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo], (err, results) => {
        if (err) return reject(err);
        const resultado = results[0][0];
        if (resultado?.error) return reject(new Error(resultado.error));
        resolve(resultado);  // contiene id, contrasena, correo_verificado, etc.
      });
    });
  }
}

module.exports = visitante_model;
