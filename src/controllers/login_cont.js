const visitante_model = require('../models/MySQL/visitante_model');
const gestor_model = require('../models/MySQL/gestor_model'); // Asegúrate de tener este modelo

class login_cont {
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    try {
      // Primero intenta como visitante
      let resultado = await visitante_model.login_regular(correo);
      let esGestor = false;

      // Si no es visitante, intenta como gestor
      if (resultado?.error === 'correo_no_registrado') {
        resultado = await gestor_model.login_gestor(correo);
        esGestor = true;
      }

      if (!resultado.correo_verificado) {
        return res.status(400).json({ error: 'Correo no confirmado' });
      }

      
      if (contraseña !== resultado.contrasena) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
      }

      res.json({
        resultado: {
          id: resultado.id,
          correo: correo,
          token: resultado.token,
          esGestor: esGestor 
        }
      });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = login_cont;