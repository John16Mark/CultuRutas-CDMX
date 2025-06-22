import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validarContraseña, validarConfirmarContraseña } from '../../utils/validaciones';

import './restablecer.css';

const Restablecer = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [showPassword, setShowPassword] = useState(false);
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [tokenValido, setTokenValido] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Token no válido o faltante');
    } else {
      setTokenValido(true);
    }
  }, [token]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNuevaContrasena(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      contrasena: validarContraseña(value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmarContrasena(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmacion: validarConfirmarContraseña(nuevaContrasena, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar contraseñas
    const passwordRules = validarContraseña(nuevaContrasena);
    if (!passwordRules.longitudValida || !passwordRules.mayuscula || 
        !passwordRules.minuscula || !passwordRules.numero || !passwordRules.noVacio) {
      setErrors({ contrasena: passwordRules });
      return;
    }

    if (!validarConfirmarContraseña(nuevaContrasena, confirmarContrasena)) {
      setErrors({ confirmacion: false });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/restablecer-contrasena', {
        token,
        nuevaContrasena
      });
      setMensaje('Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Ocurrió un error al restablecer tu contraseña');
      setMensaje('');
    }
  };

  if (!tokenValido) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(../../img/fondo_oscuro1.jpg)',
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
          style={{paddingTop: 100, paddingBottom: 100}}
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper elevation={6} sx={{ p: 6, width: '100%', maxWidth: 500 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Error en el enlace
            </Typography>
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error || 'El enlace de recuperación no es válido o ha expirado.'}
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              <Link to="/recuperar" style={{ textDecoration: 'none', color: '#415b2a' }}>
                Solicitar nuevo enlace de recuperación
              </Link>
            </Typography>
          </Paper>
        </Container>
        <Footer/>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(../../img/fondo_oscuro1.jpg)',
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
        style={{paddingTop: 100, paddingBottom: 100}}
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={6} sx={{ p: 6, width: '100%', maxWidth: 500 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Restablecer Contraseña
          </Typography>

          {mensaje && (
            <Typography color="success.main" align="center" sx={{ mb: 2 }}>
              {mensaje}
            </Typography>
          )}

          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Ingresa tu nueva contraseña
          </Typography>

          <TextField
            label="Nueva Contraseña"
            value={nuevaContrasena}
            onChange={handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            error={errors.contrasena && !errors.contrasena.noVacio}
            helperText={
              errors.contrasena && !errors.contrasena.noVacio 
                ? 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
                : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Confirmar Nueva Contraseña"
            value={confirmarContrasena}
            onChange={handleConfirmPasswordChange}
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            variant="outlined"
            error={errors.confirmacion === false}
            helperText={
              errors.confirmacion === false 
                ? 'Las contraseñas no coinciden'
                : ''
            }
          />

          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#415b2a'}}
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Restablecer Contraseña
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            <Link to="/login" style={{ textDecoration: 'none', color: '#415b2a' }}>
              Volver a Iniciar sesión
            </Link>
          </Typography>
        </Paper>
      </Container>

      <Footer/>
    </Box>
  );
};

export default Restablecer;