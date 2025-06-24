const fs = require('fs');
const path = require('path');

const lugar_model = require('../models/MySQL/lugar_model');
const { errorHandler } = require('../utils/errorHandler');

function asegurarDirectorioExiste(ruta) {
  if (!fs.existsSync(ruta)) {
    fs.mkdirSync(ruta, { recursive: true });
  }
}

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
  
  asegurarDirectorioExiste(dirPath);
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

function getTodasLasImagenes(nombreLugar) {
  const nombreNormalizado = normalizarNombre(nombreLugar);
  const dirPath = path.join(__dirname, '..', '..', 'public', 'lugares', nombreNormalizado, 'imagenes');

  asegurarDirectorioExiste(dirPath);
  try {
    const archivos = fs.readdirSync(dirPath).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    return archivos.map(file => `/lugares/${nombreNormalizado}/imagenes/${file}`);
  } catch (err) {
    return [];
  }
}

function getArchivosPorCategoria(nombreLugar) {
  const nombreNormalizado = normalizarNombre(nombreLugar);
  const baseDir = path.join(__dirname, '..', '..', 'public', 'lugares', nombreNormalizado);

  const categorias = [];

  try {
    const carpetas = fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    for (const carpeta of carpetas) {
      if(carpeta.name == 'eventos') continue;
      const carpetaPath = path.join(baseDir, carpeta.name);
      const archivos = fs.readdirSync(carpetaPath)
        .filter(file => fs.statSync(path.join(carpetaPath, file)).isFile());

      categorias.push({
        tipo: carpeta.name,
        archivos: archivos.map(nombreArchivo =>
          `/lugares/${nombreNormalizado}/${carpeta.name}/${nombreArchivo}`)
      });
    }

    return categorias;

  } catch (error) {
    console.error("Error al leer carpetas del lugar:", error);
    return [];  // Devuelve vacío si hay algún error
  }
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
              imagen: getPrimeraImagen(lugar.nombre),
              nombre_normalizado: normalizarNombre(lugar.nombre)
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

  static async get_detalles_lugar(req, res) {
    const { id } = req.body;
    console.log("\n\x1b[93m .: lugar_controller :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[33mid: \x1b[0m", id)
    lugar_model
      .get_detalles_lugar(id)
      .then((resultado) => {
        console.log("\x1b[33m  resultado: \x1b[0m", resultado)
        
        if (resultado.registro) {
          let lugar_imagenes = { ...resultado.registro }
          lugar_imagenes.imagenes = getTodasLasImagenes(resultado.registro.nombre)
          lugar_imagenes.nombre_normalizado = normalizarNombre(resultado.registro.nombre);

          return res.status(200).json({ resultado: lugar_imagenes });
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

  static async get_repositorio_lugar(req, res) {
    const { id } = req.body;
    console.log("\n\x1b[93m .: lugar_controller :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[33mid: \x1b[0m", id)
    lugar_model
      .get_detalles_lugar(id)
      .then((resultado) => {
        console.log("\x1b[33m  resultado: \x1b[0m", resultado)
        
        if (resultado.registro) {
          const lugar = { ...resultado.registro };
          lugar.imagenes = getTodasLasImagenes(lugar.nombre);
          lugar.nombre_normalizado = normalizarNombre(lugar.nombre);
          lugar.categorias_descarga = getArchivosPorCategoria(lugar.nombre);  // ⬅️ nuevo campo


          return res.status(200).json({ resultado: lugar });
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

  static async get_eventos_lugar(req, res) {
    const { id } = req.body;
    console.log("\n\x1b[93m .: lugar_controller :.\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[33mid: \x1b[0m", id)

    try {
      const resultado = await lugar_model.get_eventos_lugar(id);
      console.log("resultado: ", resultado);
      return res.status(201).json({ resultado: resultado.registro})
    } catch (err) {
      if(err.error) {
        let mensaje = errorHandler(err.message);
        return res.status(400).json({error: mensaje});
      }
      return res.status(500).json({ error: err.message });
    }
  }
}


module.exports = lugar_cont;