// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Divider, IconButton, InputAdornment, Box, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

import image from "./../../img/fondo_oscuro1.jpg";

import './Register.css'

import { validarCorreo, validarContraseña, validarConfirmarContraseña } from './../../utils/validaciones';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const [errors, setErrors] = useState({});

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
      console.log("Favor de completar todos los campos")
      setErrors((prevErrors) => ({
        ...prevErrors,
        camposObligatorios: true, // Añadir error para campos vacíos
      }));
      return
    }

    // Validar correo
    const correoRules = validarCorreo(correo);
    if(!correoRules.sinEspacios || !correoRules.arrobaCaracteres || !correoRules.dominioConPunto || !correoRules.noVacio) {
      console.log("Correo inválido")
      setErrors((prevErrors) => ({
        ...prevErrors,
        correo: correoRules,
      }));
      //setAlertContentError('Por favor, verifique correctamente su correo electrónico.');
      //handleClickOpenError();
      return;
    }

    // Validar contraseñas
    const passwordRules = validarContraseña(contraseña);
    const passwordsMatch = validarConfirmarContraseña(contraseña, contraseña2);
    // Si la contraseña no cumple las reglas
    if (!passwordRules.longitudValida || !passwordRules.mayuscula || !passwordRules.minuscula || !passwordRules.numero || !passwordRules.noVacio) {
      console.log("La contraseña no cumple los requisitos")
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña: passwordRules,
      }));
      //setAlertContentError('Por favor, verifique correctamente su contraseña.');
      //handleClickOpenError();
      return;
    }
    
    // Si las contraseñas no coinciden
    if (!passwordsMatch) {
      console.log("Las contraseñas no coinciden")
      setErrors((prevErrors) => ({
        ...prevErrors,
        contraseña2: false, // Marcar error en confirmar contraseña
      }));
      //setAlertContentError('Por favor, verifique que las contraseñas coinciden.');
      //handleClickOpenError();
      return;
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${image})`, // Cambia a tu imagen real
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
    </Box>
  );
};

export default Register;