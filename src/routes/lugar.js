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

// 2. Ruta POST /evento con multer
router.post('/evento', upload.single('imagen'), lugar_cont.crearEvento);

// ✅ IMPORTANTE: esta ruta debe venir ANTES de usar `express.json()` en server.js
router.get('/evento/:id', lugar_cont.get_eventos_lugar);
router.get('/gestor/:id_gestor', lugar_cont.obtenerSitiosPorGestor);
router.put('/evento/:id_evento', upload.single('imagen'), lugar_cont.editarEvento);
router.delete('/evento/:id_evento', lugar_cont.eliminarEvento);


module.exports = router;
