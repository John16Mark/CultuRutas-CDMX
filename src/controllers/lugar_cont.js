const fs = require('fs');
const path = require('path');

const lugar_model = require('../models/MySQL/lugar_model');

function normalizarNombre(nombre) {
  return nombre
    .normalize("NFD")                      // Quita acentos
    .replace(/[\u0300-\u036f]/g, "")      // Elimina diacríticos
    .trim()                               // Quita espacios al inicio y final
    .replace(/\s+/g, "_")                 // Espacios a guiones bajos
    .replace(/[^a-zA-Z0-9_]/g, "")        // Quita caracteres no alfanuméricos ni "_"
    .toLowerCase();                       // Minúsculas opcional (para consistencia)
}

function getPrimeraImagen(nombreLugar) {
  const nombreNormalizado = normalizarNombre(nombreLugar);
  const dirPath = path.join(__dirname, '..', '..', 'public', 'lugares', nombreNormalizado, 'imagenes');
  console.log(dirPath)
  try {
    const archivos = fs.readdirSync(dirPath).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    
    if (archivos.length > 0) {
      return `/lugares/${nombreNormalizado}/imagenes/${archivos[0]}`;
    }
  } catch (err) {
    console.log("No existe carpeta o está vacía para ", nombreNormalizado)
  }
  return '/imgs/no_image.jpg';
}

class lugar_cont {
  static async get_todos(req, res) {
    console.log("\n\x1b[93m .: lugar_controller :.\x1b[0m")
    lugar_model
      .get_todos()
      .then((resultado) => {
        console.log("\x1b[33m  resultado: \x1b[0m", resultado)
        
        if (resultado.registros) {
          // Mapear los lugares para agregar la ruta de la imagen
          const lugaresConImagen = resultado.registros.map(lugar => {
            return {
              ...lugar,
              imagen: getPrimeraImagen(lugar.nombre)  // ← nueva propiedad
            };
          });

          // Enviar al frontend
          return res.status(200).json({ resultado: lugaresConImagen });
        } else {
          return res.status(500).json({ error: 'Error desconocido' });
        }
      })
      .catch((err) => {
        if (err.message) {
          let mensajeError = err.message;
          return res.status(400).json({ error: mensajeError });
        }
        return res.status(500).json({ error: err.message });
      });
  }
}


module.exports = lugar_cont;