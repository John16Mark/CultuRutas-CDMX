import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validarCorreo } from '../../utils/validaciones';

import './recuperar.css';

const Recuperar = () => {
  const [correo, setCorreo] = useState('');
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      correo: validarCorreo(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar correo
    const correoRules = validarCorreo(correo);
    if(!correoRules.sinEspacios || !correoRules.arrobaCaracteres || !correoRules.dominioConPunto || !correoRules.noVacio) {
      setErrors({ correo: correoRules });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/solicitar-recuperacion', { correo });
      setMensaje('Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Ocurrió un error al procesar tu solicitud');
      setMensaje('');
    }
  };

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
            Recuperar Contraseña
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
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </Typography>

          <TextField
            label="Correo electrónico"
            value={correo}
            onChange={handleEmailChange}
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            error={errors.correo && !errors.correo.noVacio}
            helperText={
              errors.correo && !errors.correo.noVacio 
                ? 'Por favor ingresa un correo válido'
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
            Enviar Instrucciones
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            ¿Recordaste tu contraseña?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#415b2a' }}>
              Iniciar sesión
            </Link>
          </Typography>
        </Paper>
      </Container>

      <Footer/>
    </Box>
  );
};

export default Recuperar;