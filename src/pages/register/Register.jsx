import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Divider, 
  IconButton, 
  InputAdornment, 
  Box, 
  Paper,
  Snackbar,
  Alert 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

import image from "./../../img/fondo_oscuro1.jpg";
import './Register.css'
import { validarCorreo, validarContraseña, validarConfirmarContraseña } from './../../utils/validaciones';
import { handleRegistro } from './register_handler';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      correo: validarCorreo(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setContraseña(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contraseña: validarContraseña(value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setContraseña2(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contraseña2: validarConfirmarContraseña(contraseña, value),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validar si los campos no están vacíos
    if(!correo || !contraseña || !contraseña2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        camposObligatorios: true,
      }));
      setSnackbar({
        open: true,
        message: 'Por favor completa todos los campos',
        severity: 'error'
      });
      return;
    }

    // Validar correo
    const correoRules = validarCorreo(correo);
    if(!correoRules.sinEspacios || !correoRules.arrobaCaracteres || !correoRules.dominioConPunto || !correoRules.noVacio) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        correo: correoRules,
      }));
      setSnackbar({
        open: true,
        message: 'Por favor ingresa un correo electrónico válido',
        severity: 'error'
      });
      return;
    }

    // Validar contraseñas
    const passwordRules = validarContraseña(contraseña);
    const passwordsMatch = validarConfirmarContraseña(contraseña, contraseña2);
    
    if (!passwordRules.longitudValida || !passwordRules.mayuscula || 
        !passwordRules.minuscula || !passwordRules.numero || !passwordRules.noVacio) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña: passwordRules,
      }));
      setSnackbar({
        open: true,
        message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
        severity: 'error'
      });
      return;
    }
    
    if (!passwordsMatch) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña2: false,
      }));
      setSnackbar({
        open: true,
        message: 'Las contraseñas no coinciden',
        severity: 'error'
      });
      return;
    }

    try {
      const resultado = await handleRegistro(e, correo, contraseña);
      
      if (resultado.success) {
        setSnackbar({
          open: true,
          message: resultado.message,
          severity: resultado.emailSent ? 'success' : 'warning'
        });
        
        // Opcional: Redirigir después de registro exitoso
        // if (resultado.emailSent) {
        //   setTimeout(() => navigate('/login'), 3000);
        // }
      } else {
        setSnackbar({
          open: true,
          message: resultado.error || 'Error en el registro',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setSnackbar({
        open: true,
        message: 'Ocurrió un error inesperado. Por favor intenta nuevamente.',
        severity: 'error'
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <Container
        component="main"
        maxWidth="sm"
        style={{paddingTop:100, paddingBottom:100}}
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={6} sx={{ p: 6, width: '100%', maxWidth: 500 }} className='div_central'>
          <Typography variant="h5" align="center" gutterBottom>
            Registro
          </Typography>

          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#a9825a', color: 'rgb(20,20,20)'}}
            sx={{ mt: 1, mb: 3 }}
          >
            Registrarse con Google
          </Button>

          <Divider sx={{ mb: 3 }}>o regístrate con un correo personal</Divider>

          <TextField
            label="Correo electrónico"
            className='text_field'
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={correo}
            onChange={handleEmailChange}
            error={!!errors.correo && !errors.correo.noVacio}
            helperText={errors.correo && !errors.correo.noVacio ? 'Correo inválido' : ''}
          />

          <TextField
            style={{marginTop: 50}}
            label="Contraseña"
            value={contraseña}
            onChange={handlePasswordChange}
            className='text_field'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.contraseña && !errors.contraseña.noVacio}
            helperText={errors.contraseña && !errors.contraseña.noVacio ? 
              'Mínimo 8 caracteres con mayúscula, minúscula y número' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Confirmar Contraseña"
            value={contraseña2}
            onChange={handleConfirmPasswordChange}
            className='text_field'
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            error={errors.contraseña2 === false}
            helperText={errors.contraseña2 === false ? 'Las contraseñas no coinciden' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#415b2a'}}
            className='boton_continuar'
            sx={{ mt: 3 }}
            onClick={handleFormSubmit}
          >
            Registrarse
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{ textDecoration: 'none'}} className='link_cafe'>
              Iniciar sesión
            </Link>
          </Typography>
        </Paper>
      </Container>

      <Footer/>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;