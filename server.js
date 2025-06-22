require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const register_cont = require('./src/controllers/register_cont');
const login_cont = require('./src/controllers/login_cont');
const recuperacion_cont = require('./src/controllers/recuperacion_cont'); // <- NUEVO
const db = require('./src/models/MySQL/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Rutas principales
app.post('/register', register_cont.registro_regular);
app.post('/login', login_cont.login);

// Ruta de verificación de correo
app.get('/confirmar-correo', (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(400).send('Token faltante en la URL');
  }

  const query = `
    UPDATE Visitante
    SET correo_verificado = TRUE, token_verificacion = NULL
    WHERE token_verificacion = ?;
  `;

  db.query(query, [token], (err, result) => {
    if (err) {
      console.error("Error al confirmar correo:", err);
      return res.status(500).send('Error interno del servidor');
    }

    if (result.affectedRows === 0) {
      return res.send('Token inválido o ya utilizado.');
    }

    res.send('¡Correo confirmado con éxito! Ya puedes iniciar sesión.');
  });
});

// Rutas de recuperación de contraseña
app.post('/solicitar-recuperacion', recuperacion_cont.solicitar_recuperacion);
app.post('/restablecer-contrasena', recuperacion_cont.restablecer_contrasena);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
