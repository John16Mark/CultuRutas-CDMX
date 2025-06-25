import axios from 'axios';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/login', { correo, contraseña });
    console.log("Respuesta completa del backend:", response.data); // Para depuración

    // Asegurarnos de que la respuesta tiene la estructura esperada

    if (response.data && response.data.usuario) {
    console.log("Inicio de sesión exitoso:", response.data.usuario);
    return {
      success: true,
      usuario: response.data.usuario,
      token_login: response.data.token_login,
    };
  }
  else {
      // Si el backend devuelve un mensaje de error en la estructura esperada
      
      const errorMessage = response.data?.error || 'La respuesta del servidor no contiene datos válidos';
      return {
        success: false,
        error: errorMessage
      };
    }
  } catch (error) {
    console.error("Error en handleLogin:", error);
    
    // Manejo detallado de errores
    let errorMessage = 'Error al iniciar sesión';
    
    if (error.response) {
      // El servidor respondió con un código de error
      errorMessage = error.response.data?.error || 
                    error.response.data?.message || 
                    `Error del servidor: ${error.response.status}`;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage = 'No se recibió respuesta del servidor';
    } else {
      // Error al configurar la solicitud
      errorMessage = error.message || errorMessage;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};

export { handleLogin };