// src/models/MySQL/login_model.js

const db = require('./db');
const bcrypt = require('bcrypt');

class login_model {
  static async login_unificado(correo, contraseña) {
    try {
      // Primero buscar en Visitante
      const visitante = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Visitante WHERE correo_electronico = ?';
        db.query(query, [correo], (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        });
      });

      if (visitante) {
        const match = await bcrypt.compare(contraseña, visitante.contrasena);
        if (!match) throw new Error('Contraseña incorrecta');
        if (!visitante.correo_verificado) throw new Error('Correo no verificado');

        delete visitante.contrasena;
        return { ...visitante, esGestor: false };
      }

      // Luego buscar en Gestor
      const gestor = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Gestor WHERE correo_electronico = ?';
        db.query(query, [correo], (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
        });
      });

      if (gestor) {
        const match = await bcrypt.compare(contraseña, gestor.contrasena);
        if (!match) throw new Error('Contraseña incorrecta');
        if (!gestor.correo_verificado) throw new Error('Correo no verificado');

        delete gestor.contrasena;
        return { ...gestor, esGestor: true };
      }

      throw new Error('Correo no registrado');
    } catch (err) {
      throw err;
    }
  }
}

module.exports = login_model;
