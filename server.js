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
const lugar_cont = require('./src/controllers/lugar_cont');




const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true })); // OK para formularios normales


app.use('/api/lugares', lugarRoutes);

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

const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('./src/models/MySQL/db'); // Ajusta si está en otra ruta

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tipo = req.body.tipo;
    const folder = tipo === 'documentos' ? 'documentos' : 'multimedia';
    const dir = path.join(__dirname, 'public', 'repositorio', folder);
    fs.mkdirSync(dir, { recursive: true }); // Crea la carpeta si no existe
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}_${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.post('/subir_archivo', upload.single('archivo'), async (req, res) => {
  try {
    const { tipo, id_sitio } = req.body;
    const archivo = req.file;
    const ruta_local = `/repositorio/${tipo}/${archivo.filename}`;
    const id = uuidv4().substring(0, 20);
    const nombre = archivo.originalname;
    const tipoArchivo = path.extname(archivo.originalname).replace('.', '');
    const tamano = `${(archivo.size / 1024).toFixed(2)} KB`;
    const fecha = new Date().toISOString().split('T')[0]; // formato YYYY-MM-DD

    const tabla = tipo === 'documentos' ? 'A_Documentos' : 'A_Multimedia';
    const idCampo = tipo === 'documentos' ? 'id_documento' : 'id_multimedia';

    const sql = `INSERT INTO ${tabla} (${idCampo}, nombre, tipo, tamano, fecha_publicacion, ruta_local, id_sitio)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    await db.query(sql, [id, nombre, tipoArchivo, tamano, fecha, ruta_local, id_sitio]);

    res.json({ message: 'Archivo subido exitosamente', archivo: ruta_local });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ error: 'Error interno al subir archivo' });
  }
});

app.post('/eliminar_archivo', async (req, res) => {
  try {
    const { tipo, ruta_local } = req.body;

    if (!ruta_local || !tipo) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const tabla = tipo === 'documentos' ? 'A_Documentos' : 'A_Multimedia';
    const campoRuta = 'ruta_local';

    // Ruta absoluta del archivo
    const rutaFisica = path.join(__dirname, 'public', ruta_local);

    // Eliminar archivo del sistema de archivos
    if (fs.existsSync(rutaFisica)) {
      fs.unlinkSync(rutaFisica);
    }

    // Eliminar registro de BD
    const sql = `DELETE FROM ${tabla} WHERE ${campoRuta} = ?`;
    await db.query(sql, [ruta_local]);

    res.json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ error: 'Error al eliminar archivo' });
  }
});


app.post('/editar_datos_lugar', lugares_cont.editar_datos_lugar);

app.post('/editar_datos_lugar', lugar_cont.editar_datos_lugar);


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});