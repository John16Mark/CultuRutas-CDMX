const express = require('express');
const router = express.Router();
const lugar_cont = require('../controllers/lugar_cont');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1. Configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', '..', 'public', 'eventos');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `evento_${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });


// Configurar almacenamiento para multimedia
const storageMultimedia = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', '..', 'public', 'repositorio', 'multimedia');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const nombreUnico = `${Date.now()}_${file.originalname}`;
    cb(null, nombreUnico);
  }
});
const uploadMultimedia = multer({ storage: storageMultimedia });

// Configurar almacenamiento para documentos
const storageDocumentos = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', '..', 'public', 'repositorio', 'documentos');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const nombreUnico = `${Date.now()}_${file.originalname}`;
    cb(null, nombreUnico);
  }
});
const uploadDocumentos = multer({ storage: storageDocumentos });

// Rutas de subida
router.post('/subir_multimedia/:id', uploadMultimedia.single('archivo'), lugar_cont.subirMultimedia);

router.post('/subir_documento/:id', uploadDocumentos.single('archivo'), lugar_cont.subirDocumento);

router.post('/evento', upload.single('imagen'), lugar_cont.crearEvento);

router.post('/archivos_bd', lugar_cont.get_archivos_bd_por_sitio);

router.get('/evento/:id', lugar_cont.get_eventos_lugar);
router.get('/gestor/:id_gestor', lugar_cont.obtenerSitiosPorGestor);
router.put('/evento/:id_evento', upload.single('imagen'), lugar_cont.editarEvento);
router.delete('/evento/:id_evento', lugar_cont.eliminarEvento);

router.put('/editar/:id', lugar_cont.editarSitio);


module.exports = router;
