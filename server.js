const axios = require('axios');
const express = require('express');
const cors = require('cors');

const register_cont = require('./src/controllers/register_cont');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post('/register', register_cont.registro_regular);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});