const visitante_model = require('../models/MySQL/visitante_model');
const enviarCorreoVerificacion = require('../utils/mailer');
const db = require('../models/MySQL/db'); // Mejor moverlo al inicio

class register_cont {
  static async registro_regular(req, res) {
    const { correo, contraseña } = req.body;

    try {
      // 1. Registrar al visitante
      const resultado = await visitante_model.registro_regular(correo, contraseña);
      console.log("Registro exitoso:", resultado);

      // 2. Obtener token generado
      const query = `SELECT token_verificacion FROM Visitante WHERE correo_electronico = ?`;
      
      db.query(query, [correo], async (err, rows) => {
        if (err) {
          console.error("Error en consulta SQL:", err);
          return res.status(500).json({ 
            mensaje: 'Registro exitoso. Error al enviar correo de confirmación.' 
          });
        }

        if (!rows[0]) {
          console.error("No se encontró token para:", correo);
          return res.status(500).json({ 
            mensaje: 'Registro exitoso. Error al enviar correo de confirmación.' 
          });
        }

        const token = rows[0].token_verificacion;
        
        try {
          // 3. Enviar correo de confirmación
          await enviarCorreoVerificacion(
            correo, 
            token,
            '/confirmar-correo',
            'Confirmación de correo electrónico - CultuRutas CDMX',
            'Por favor confirma tu correo electrónico haciendo clic en el siguiente enlace:'
          );
          
          console.log("Correo enviado a:", correo);
          res.status(201).json({ 
            mensaje: 'Registro exitoso. Revisa tu correo para confirmar.',
            correoEnviado: true
          });
          
        } catch (mailError) {
          console.error("Error enviando correo:", mailError);
          res.status(201).json({ 
            mensaje: 'Registro exitoso. Error al enviar correo de confirmación.',
            correoEnviado: false
          });
        }
      });

    } catch (err) {
      console.error("Error en el registro:", err.message);
      res.status(400).json({ 
        error: err.message,
        registroExitoso: false
      });
    }
  }
}

module.exports = register_cont;
