import axios from 'axios';

const handleRegistro = async (e, correo, contraseña) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:3001/register', {
      correo,
      contraseña,
    });
    
    // Respuesta esperada ahora es { mensaje: string, correoEnviado?: boolean }
    if (response.data.mensaje) {
      return {
        success: true,
        message: response.data.mensaje,
        emailSent: response.data.correoEnviado || false
      };
    } else {
      throw new Error('La respuesta del servidor no contiene los datos esperados');
    }

  } catch (error) {
    console.error("Error en handleRegistro:", error);
    
    // Manejo mejorado de errores
    if (error.response) {
      // El servidor respondió con un status code fuera del rango 2xx
      if (error.response.data && error.response.data.error) {
        return {
          success: false,
          error: error.response.data.error
        };
      }
      return {
        success: false,
        error: `Error en la solicitud: ${error.response.status} - ${error.response.statusText}`
      };
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      return {
        success: false,
        error: 'No se recibió respuesta del servidor'
      };
    } else {
      // Error al configurar la solicitud
      return {
        success: false,
        error: error.message || 'Error al configurar la solicitud'
      };
    }
  }
};

export { handleRegistro };