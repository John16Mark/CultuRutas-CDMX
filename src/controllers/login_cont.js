const login_model = require('../models/MySQL/login_model');

class login_cont{
  static async login(req, res) {
    const { correo, contraseña } = req.body;

    /*const tokenJWT = (id, username, nombre, apellido, correo, imagen) => {
      return jwt.sign({
        id: id, username: username, nombre: nombre, apellido: apellido, correo: correo, imagen: imagen},
      process.env.JWT_SECRET, { expiresIn: '1h' });
    }*/

    try {
      const resultado = await login_model.login_regular(correo);
      console.log("\x1b[94mlogin_controller - resultado\x1b[0m", resultado)
      // Validar contraseña
      /*const passwordMatch = await bcrypt.compare(contraseña, resultado.hashedPassword);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta.' });
      }*/
      // Validar confirmación por correo
      if(resultado.confirmacion == '0') {
        //let error = errorHandler('correo_no_confirmado');
        let error = 'Correo no confirmado'
        return res.status(400).json({ error: error})
      }
      
      //const newToken = tokenJWT(resultado.id, resultado.username, resultado.nombre, resultado.apellido, correo, resultado.imagen);
      const newToken = 2;
      res.json({resultado: resultado, token: newToken});

    } catch (err) {
      if (err.message) {
        //let mensajeError = errorHandler(err.message);
        let mensajeError = 'Correo no confirmado'
        return res.status(400).json({ error: mensajeError });
      }
      res.status(500).json({ error: err });
    }

  }
}

module.exports = login_cont