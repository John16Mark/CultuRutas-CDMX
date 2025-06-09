const db = require('./db');

class register_model {
  
  static async registro_regular(correo, contraseña) {
    const query = 'CALL usuario_registro(?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, contraseña], (err, results) => {
        if(err) {
          reject(err);
        }
        const resultado = results[0][0] || null;
        
        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        else if(resultado && resultado.warning)
          resolve({ warning: resultado.warning});
        else
          resolve({ id: resultado ? resultado.id : null});
      });
    });
  }
}

module.exports = register_model;