const db = require('./db');

class login_model {
  
  static async login_regular(correo) {
    const query = 'CALL usuario_login(?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo], (err, results) => {
        if(err) {
          reject(err);
        }
        console.log("\x1b[94mlogin_model - results\x1b[0m", results)
        const resultado = results[0][0] || null;
        console.log("login_model - resultado", resultado)

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

module.exports = login_model;