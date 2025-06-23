const axios = require('axios');
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const register_cont = require('./src/controllers/register_cont');
const login_cont = require('./src/controllers/login_cont');
const lugares_cont = require('./src/controllers/lugar_cont');
const verificacion_cont = require('./src/controllers/verificacion_cont');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// ¡Esto es importante! Sirve la carpeta "public"
app.use('/lugares', express.static(path.join(__dirname, 'public', 'lugares')));
app.use('/imgs', express.static(path.join(__dirname, 'public', 'imgs')));

app.post('/register', register_cont.registro_regular);
app.post('/login', login_cont.login);
// Confirmar correo
app.get('/confirmar-correo', verificacion_cont.confirmarCorreo);

app.post('/get_lugares', lugares_cont.get_todos);
app.post('/get_detalles_lugar', lugares_cont.get_detalles_lugar);
app.post('/get_repositorio_lugar', lugares_cont.get_repositorio_lugar);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});