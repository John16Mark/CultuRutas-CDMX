import axios from 'axios';

const handleRegistro = async (e, correo, contraseña) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/register', {
      correo,
      contraseña,
    });
    //console.log("handleRegistro response.data: ", response.data);
    if(response.data.resultado.id) {
      return response.data;
      /*const responseCorreo = await enviarCorreoVerificacion(nombre, correo);
      if(responseCorreo)
        return response.data;
      else
        throw({error: 'Error mandando el correo de confirmación. Favor de reintentar'});*/
    } else if(response.data.resultado.warning) {
      //console.log("Aún no se confirma el correo")
      return response.data;
      /*const responseCorreo = await enviarCorreoVerificacion(nombre, correo);
      if(responseCorreo)
        return response.data;
      else
        throw({error: 'Error mandando el correo de confirmación. Favor de reintentar'});*/
    } else {
      throw(new Error('Algo falló en la solicitud'));
    }

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    } else if(error.error) {
      return error.error;
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      return 'Algo falló en la solicitud';
    }
  }
};

export {
  handleRegistro
};