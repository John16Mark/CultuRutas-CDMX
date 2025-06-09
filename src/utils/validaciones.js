// archivo validarCorreo.js
const validarCorreo = (correo) => {
  const rules = {
    sinEspacios: /^[^\s]+$/.test(correo),
    arrobaCaracteres: /^[^@]+@[^@]+$/.test(correo),
    dominioConPunto: /@[^@]+\.[^@]+$/.test(correo),
    noVacio: correo.length > 0,
  };
  return rules;
};

// Validaciones de la contraseña
const validarContraseña = (contraseña) => {
  const rules = {
    longitudValida: /^(?=.{8,32}$)/.test(contraseña), // Longitud mínima de 8 y máxima de 32 caracteres
    mayuscula: /[A-Z]/.test(contraseña), // Al menos una mayúscula
    minuscula: /[a-z]/.test(contraseña), // Al menos una minúscula
    numero: /\d/.test(contraseña), // Al menos un número
    noVacio: contraseña.length > 0, // La contraseña no puede estar vacía
  };
  return rules;
};

const validarConfirmarContraseña = (contraseña, confirmacion) => {
  return contraseña === confirmacion;
};

export { validarCorreo, validarContraseña, validarConfirmarContraseña };