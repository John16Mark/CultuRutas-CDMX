const axios = require('axios');
const express = require('express');
const cors = require('cors');

const register_cont = require('./src/controllers/register_cont');
const login_cont = require('./src/controllers/login_cont');
const lugares_cont = require('./src/controllers/lugar_cont');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post('/register', register_cont.registro_regular);
app.post('/login', login_cont.login);

app.post('/get_lugares', lugares_cont.get_todos)

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});