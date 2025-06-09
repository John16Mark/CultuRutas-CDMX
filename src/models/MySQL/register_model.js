const db = require('./db');

class register_model {
  
  static async registro_regular(correo, contraseña) {
    const query = 'CALL usuario_registro(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, contraseña], (err, results) => {
        if(err) {
          reject(err);
        }
        console.log("\x1b[94mregister_model - results\x1b[0m", results)
        const resultado = results[0][0] || null;
        console.log("register_model - resultado", resultado)

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