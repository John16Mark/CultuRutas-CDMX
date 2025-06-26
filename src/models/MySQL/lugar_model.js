const db = require('./db');

class lugar_model {
  
  static async get_todos() {
    console.log("\x1b[94m .: lugar_model :.\x1b[0m")
    //console.log("Datos recibidos:\n  \x1b[96mcorreo: \x1b[0m", correo, "\n  \x1b[96mcontraseña: \x1b[0m", contraseña)
    const query = 'SELECT id_sitio, nombre, descripcion, latitud, longitud, tipo FROM Sitio_turistico_historico;';
    return new Promise((resolve, reject) => {
      db.query(query, [], (err, results) => {
        if(err) {
          reject(err);
        }
        //console.log("Resultados: ");
        //console.log("\x1b[96m  results: \x1b[0m", results)
        const resultado = results || null;
        //console.log("\x1b[96m  resultado: \x1b[0m", resultado)

        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        else if(resultado && resultado.warning)
          resolve({ warning: resultado.warning});
        else
          resolve({ registros: resultado ? resultado : null});
      });
    });
  }

  static async get_detalles_lugar(id) {
    console.log("\x1b[94m .: lugar_model :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[96mid: \x1b[0m", id)
    const query = 'SELECT * FROM Sitio_turistico_historico WHERE id_sitio = ?;';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if(err) {
          reject(err);
        }
        //console.log("Resultados: ");
        //console.log("\x1b[96m  results: \x1b[0m", results)
        const resultado = results[0] || null;
        //console.log("\x1b[96m  resultado: \x1b[0m", resultado)

        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        else if(resultado && resultado.warning)
          resolve({ warning: resultado.warning});
        else
          resolve({ registro: resultado ? resultado : null});
      });
    });
  }

  static async get_eventos_lugar(id) {
    console.log("\x1b[94m .: lugar_model :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[96mid: \x1b[0m", id)
    const query = 'SELECT * FROM Evento WHERE id_sitio = ?;';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if(err) {
          reject(err);
        }
        console.log("Resultados eventos lugar: ");
        console.log("\x1b[96m  results: \x1b[0m", results)
        const resultado = results || null;
        console.log("\x1b[96m  resultado: \x1b[0m", resultado)

        if(resultado && resultado.error)
          return reject(new Error(resultado.error));
        else if(resultado && resultado.warning)
          resolve({ warning: resultado.warning});
        else
          resolve({ registro: resultado ? resultado : null});
      });
    });
  }

  static async obtenerSitiosPorGestor(id_gestor) {
    const query = 'SELECT * FROM Sitio_turistico_historico WHERE id_gestor = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id_gestor], (err, results) => {
        if (err) return reject(err);
        resolve(results || []);
      });
    });
  }

  static async crearEvento(evento) {
    const { id_sitio, fecha_inicio, fecha_fin, descripcion, promociones, imagen } = evento;
    const query = `INSERT INTO Evento (id_sitio, fecha_inicio, fecha_fin, descripcion, promociones, imagen)
                  VALUES (?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      db.query(query, [id_sitio, fecha_inicio, fecha_fin, descripcion, promociones, imagen], (err, results) => {
        if (err) return reject(err);
        resolve({ id_evento: results.insertId });
      });
    });
  }

  static async editarEvento(evento) {
    const { id_evento, fecha_inicio, fecha_fin, descripcion, promociones, imagen } = evento;
    const query = `
      UPDATE Evento
      SET fecha_inicio = ?, fecha_fin = ?, descripcion = ?, promociones = ?, imagen = COALESCE(?, imagen)
      WHERE id_evento = ?;
    `;

    return new Promise((resolve, reject) => {
      db.query(query, [fecha_inicio, fecha_fin, descripcion, promociones, imagen, id_evento], (err, results) => {
        if (err) return reject(err);
        resolve({ updated: results.affectedRows });
      });
    });
  }

  static async eliminarEvento(id_evento) {
    const query = 'DELETE FROM Evento WHERE id_evento = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id_evento], (err, results) => {
        if (err) return reject(err);
        resolve({ deleted: results.affectedRows });
      });
    });
  }

  // Obtener multimedia por sitio
  static async get_multimedia_por_sitio(id_sitio) {
    const query = 'SELECT nombre, ruta_local FROM A_Multimedia WHERE id_sitio = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id_sitio], (err, results) => {
        if (err) return reject(err);
        resolve(results || []);
      });
    });
  }

  // Obtener documentos por sitio
  static async get_documentos_por_sitio(id_sitio) {
    const query = 'SELECT nombre, ruta_local FROM A_Documentos WHERE id_sitio = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id_sitio], (err, results) => {
        if (err) return reject(err);
        resolve(results || []);
      });
    });
  }



  static async actualizarSitio(id, datos) {
    const query = `
      UPDATE Sitio_turistico_historico SET
        descripcion = ?, promociones = ?, costos = ?, tipo = ?,
        h_lunes = ?, h_martes = ?, h_miercoles = ?, h_jueves = ?,
        h_viernes = ?, h_sabado = ?, h_domingo = ?,
        accesibilidadParking = ?, accesibilidadEntrance = ?, accesibilidadRestroom = ?,
        accesibilidadSeating = ?, petfriendly = ?
      WHERE id_sitio = ?
    `;
    const valores = [
      datos.descripcion, datos.promociones, datos.costos, datos.tipo,
      datos.h_lunes, datos.h_martes, datos.h_miercoles, datos.h_jueves,
      datos.h_viernes, datos.h_sabado, datos.h_domingo,
      datos.accesibilidadParking, datos.accesibilidadEntrance, datos.accesibilidadRestroom,
      datos.accesibilidadSeating, datos.petfriendly,
      id
    ];

    return new Promise((resolve, reject) => {
      db.query(query, valores, (err, result) => {
        if (err) return reject(err);
        resolve({ actualizado: result.affectedRows });
      });
    });
  }

}


module.exports = lugar_model;