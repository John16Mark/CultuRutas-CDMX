const axios = require('axios');
const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const register_cont = require('./src/controllers/register_cont');
const login_cont = require('./src/controllers/login_cont');
const lugares_cont = require('./src/controllers/lugar_cont');
const verificacion_cont = require('./src/controllers/verificacion_cont');
const lugarRoutes = require('./src/routes/lugar');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true })); // OK para formularios normales

app.use('/api/lugares', lugarRoutes);

app.use('/repositorio', express.static(path.join(__dirname, 'public', 'repositorio')));


const PORT = 3001;

// ¡Esto es importante! Sirve la carpeta "public"
app.use('/lugares', express.static(path.join(__dirname, 'public', 'lugares')));
app.use('/imgs', express.static(path.join(__dirname, 'public', 'imgs')));

app.post('/register', register_cont.registro_regular);
app.post('/login', login_cont.login);
app.get('/confirmar-correo', verificacion_cont.confirmarCorreo);

app.post('/get_lugares', lugares_cont.get_todos);
app.post('/get_detalles_lugar', lugares_cont.get_detalles_lugar);
app.post('/get_eventos_lugar', lugares_cont.get_eventos_lugar);
app.post('/get_repositorio_lugar', lugares_cont.get_repositorio_lugar);

app.post('/is_logged', (req, res) => {
  // // Recibir el valor de id y de un token, para verificar si el token es válido
  //console.log("is_logged, req: ", req);
  const {id, token} = req.body;
  //console.log("is_logged, token: ", token);
  console.log("is_logged, req.body: ", req.body);
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      res.json({logged: false, decoded: null});
    } else {
      if(decoded)
        res.json({logged: true, decoded});
      else
        res.json({logged: false, decoded: null});
    }
    console.log("decoded", decoded);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});