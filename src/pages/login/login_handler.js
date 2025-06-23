import axios from 'axios';

const handleLogin = async (e, correo, contraseña) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/login', { correo, contraseña });
    
    if (response.data.resultado?.id) {
      return {
        success: true,
        resultado: response.data.resultado
      };
    } else {
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    console.error("Error en handleLogin:", error);
    return {
      success: false,
      error: error.response?.data?.error || 'Error al iniciar sesión'
    };
  }
};

export { handleLogin };