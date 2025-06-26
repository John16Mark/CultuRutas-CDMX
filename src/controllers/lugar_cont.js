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
    //console.log("\n\x1b[93m .: lugar_controller :.\x1b[0m")
    lugar_model
      .get_todos()
      .then((resultado) => {
        //console.log("\x1b[33m  resultado: \x1b[0m", resultado)
        
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
    //const id = req.params.id;
    const { id } = req.body;
    console.log("\n\x1b[93m .: lugar_controller :.\nget_eventos_lugar\x1b[0m")
    console.log("Datos recibidos:\n  \x1b[33mid: \x1b[0m", id)

    try {
      const resultado = await lugar_model.get_eventos_lugar(id);
      //console.log("resultado: ", resultado);
      return res.status(201).json({ resultado: resultado.registro})
    } catch (err) {
      if(err.error) {
        let mensaje = errorHandler(err.message);
        return res.status(400).json({error: mensaje});
      }
      return res.status(500).json({ error: err.message });
    }
  }

  static async obtenerSitiosPorGestor(req, res) {
    const { id_gestor } = req.params;
    try {
      const sitios = await lugar_model.obtenerSitiosPorGestor(id_gestor);
      const sitiosConImagen = sitios.map(sitio => ({
        ...sitio,
        imagen: getPrimeraImagen(sitio.nombre),
        nombre_normalizado: normalizarNombre(sitio.nombre)
      }));
      res.status(200).json({ resultado: sitiosConImagen });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async crearEvento(req, res) {
  try {
      console.log('Datos recibidos:');
      console.log('Body:', req.body);
      console.log('File:', req.file);

      const { id_sitio, fecha_inicio, fecha_fin, descripcion, promociones } = req.body;
      const imagen = req.file ? `/eventos/${req.file.filename}` : null;

      if (!id_sitio) {
        return res.status(400).json({ error: 'Falta el id_sitio' });
      }

      const evento = await lugar_model.crearEvento({
        id_sitio,
        fecha_inicio,
        fecha_fin,
        descripcion,
        promociones,
        imagen
      });

      res.status(201).json({ resultado: evento });
    } catch (error) {
      console.error('Error en crearEvento:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async editarEvento(req, res) {
    try {
      const { fecha_inicio, fecha_fin, descripcion, promociones } = req.body;
      const id_evento = req.params.id_evento;
      const imagen = req.file ? `/eventos/${req.file.filename}` : null;

      // Convertir las fechas a formato YYYY-MM-DD
      const formatoFecha = (iso) => {
        const date = new Date(iso);
        return date.toISOString().split('T')[0]; // "2025-06-27"
      };

      const fecha_inicio_format = formatoFecha(fecha_inicio);
      const fecha_fin_format = formatoFecha(fecha_fin);

      const eventoActualizado = await lugar_model.editarEvento({
        id_evento,
        fecha_inicio: fecha_inicio_format,
        fecha_fin: fecha_fin_format,
        descripcion,
        promociones,
        imagen
      });

      res.status(200).json({ resultado: eventoActualizado });
    } catch (error) {
      console.error('Error al editar evento:', error);
      res.status(500).json({ error: error.message });
    }
  }


  static async eliminarEvento(req, res) {
    try {
      const id_evento = req.params.id_evento;
      const resultado = await lugar_model.eliminarEvento(id_evento);
      res.status(200).json({ resultado });
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      res.status(500).json({ error: error.message });
    }
  }

  static async get_archivos_bd_por_sitio(req, res) {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Falta el ID del sitio' });

    try {
      const archivos_multimedia = await lugar_model.get_multimedia_por_sitio(id);
      const archivos_documentos = await lugar_model.get_documentos_por_sitio(id);
      console.log(archivos_multimedia);
      console.log(archivos_documentos);
      return res.status(200).json({

        multimedia: archivos_multimedia,
        documentos: archivos_documentos
       
      });
    } catch (err) {
      console.error('Error al obtener archivos desde BD:', err);
      return res.status(500).json({ error: err.message });
    }
  }


  static async editarSitio(req, res) {
    const { id } = req.params;
    const datos = req.body;
    try {
      const resultado = await lugar_model.actualizarSitio(id, datos);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async subirMultimedia(req, res) {
    const { id } = req.params;
    const archivo = req.file;
    if (!archivo) return res.status(400).json({ error: 'No se subió ningún archivo.' });

    try {
      console.log("Archivo recibido:", req.file);
      console.log("ID del sitio:", id);

      const nombre = archivo.originalname;
      const tipo = path.extname(nombre).replace('.', '');
      const tamanoKB = (archivo.size / 1024).toFixed(2);
      const ruta_local = `/repositorio/multimedia/${archivo.filename}`;
      const fecha_publicacion = new Date();

      const resultado = await lugar_model.insertarMultimedia({
        nombre, tipo, tamano: `${tamanoKB} kB`, ruta_local, fecha_publicacion, id_sitio: id
      });

      res.status(200).json({ mensaje: 'Multimedia subida correctamente', resultado });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async subirDocumento(req, res) {
    const { id } = req.params;
    const archivo = req.file;
    if (!archivo) return res.status(400).json({ error: 'No se subió ningún archivo.' });

    try {
      console.log("Archivo recibido:", req.file);
      console.log("ID del sitio:", id);

      const nombre = archivo.originalname;
      const tipo = path.extname(nombre).replace('.', '');
      const tamanoKB = (archivo.size / 1024).toFixed(2);
      const ruta_local = `/repositorio/documentos/${archivo.filename}`;
      const fecha_publicacion = new Date();

      const resultado = await lugar_model.insertarDocumento({
        nombre, tipo, tamano: `${tamanoKB} kB`, ruta_local, fecha_publicacion, id_sitio: id
      });

      res.status(200).json({ mensaje: 'Documento subido correctamente', resultado });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async eliminarDocumentoPorNombre(req, res) {
    const nombre = req.params.nombre;
    try {
      const archivo = await lugar_model.getDocumentoPorNombre(nombre);
      if (!archivo) return res.status(404).json({ error: 'Documento no encontrado' });

      const ruta = path.join(__dirname, '..', '..', 'public', archivo.ruta_local);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      await lugar_model.eliminarDocumentoPorNombre(nombre);
      res.status(200).json({ mensaje: 'Documento eliminado correctamente' });
    } catch (err) {
      console.error("Error al eliminar documento por nombre:", err);
      res.status(500).json({ error: err.message });
    }
  }

  static async eliminarMultimediaPorNombre(req, res) {
    const nombre = req.params.nombre;
    try {
      const archivo = await lugar_model.getMultimediaPorNombre(nombre);
      if (!archivo) return res.status(404).json({ error: 'Archivo multimedia no encontrado' });

      const ruta = path.join(__dirname, '..', '..', 'public', archivo.ruta_local);
      if (fs.existsSync(ruta)) fs.unlinkSync(ruta);
      await lugar_model.eliminarMultimediaPorNombre(nombre);
      res.status(200).json({ mensaje: 'Multimedia eliminada correctamente' });
    } catch (err) {
      console.error("Error al eliminar multimedia por nombre:", err);
      res.status(500).json({ error: err.message });
    }
  }



}

module.exports = lugar_cont;