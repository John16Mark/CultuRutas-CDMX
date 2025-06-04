// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Divider, IconButton, InputAdornment, Box, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

import image from "./../../img/fondo_1.jpg";

import './Login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            Iniciar sesión
          </Typography>

          <Button
            fullWidth
            variant="contained"
           style={{backgroundColor: '#a9825a', color: 'rgb(20,20,20)'}}
            sx={{ mt: 1, mb: 3 }}
          >
            Iniciar sesión con Google
          </Button>

          <Divider sx={{ mb: 3 }}>o inicia sesión con un correo personal</Divider>

          <TextField
            label="Correo electrónico"
            className='text_field'
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Contraseña"
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
          >
            Iniciar sesión
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            ¿No tienes cuenta?{' '}
            <Link to="/Register" style={{ textDecoration: 'none'}} className='link_cafe'>
              Registrarse
            </Link>
          </Typography>
        </Paper>
      </Container>

      <Footer/>
    </Box>
  );
};

export default Login;