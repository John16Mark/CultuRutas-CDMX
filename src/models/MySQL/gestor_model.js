const db = require('./db');

class gestor_model {
  static async login_gestor(correo) {
    const query = 'CALL gestor_login(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo], (err, results) => {
        if (err) return reject(err);
        const resultado = results[0][0];
        if (resultado?.error) return reject(new Error(resultado.error));
        resolve(resultado);
      });
    });
  }

  static async obtenerSitios(id_gestor) {
    const query = 'CALL obtener_sitios_gestor(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [id_gestor], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
}

module.exports = gestor_model;