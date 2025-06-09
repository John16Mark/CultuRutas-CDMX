import axios from 'axios';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/login', { correo, contraseña });
    if (response.data.resultado.id) {
      console.log("Inicio de sesión exitoso. ID de usuario:", response.data.resultado.id);
      return response.data;
    } else {
      throw(new Error('Algo falló en la solicitud'));
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error
    } else {
      console.error("Error al intentar iniciar sesión:", error);
      return 'Algo falló en la solicitud';
    }
  }
};

export {handleLogin}