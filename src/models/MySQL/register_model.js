const db = require('./db');

class register_model {
  
  static async registro_regular(correo, contraseña) {
    console.log("\x1b[94m .: register_model :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[96mcorreo: \x1b[0m", correo, "\n  \x1b[96mcontraseña: \x1b[0m", contraseña)
    const query = 'CALL usuario_registro(?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [correo, contraseña], (err, results) => {
        if(err) {
          reject(err);
        }
        console.log("Resultados: ");
        console.log("\x1b[96m  results: \x1b[0m", results)
        const resultado = results[0][0] || null;
        console.log("\x1b[96m  resultado: \x1b[0m", resultado)

        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        else if(resultado && resultado.warning)
          resolve({ warning: resultado.warning});
        else
          resolve({ id: resultado ? resultado.id_visitante : null});
      });
    });
  }
}

module.exports = register_model;