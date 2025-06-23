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
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { validarCorreo, validarContraseña } from './../../utils/validaciones';
import { handleLogin } from './login_handler';
import image from "./../../img/fondo_1.jpg";
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const navigate = useNavigate();

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
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if(!correo || !contraseña) {
      setSnackbar({
        open: true,
        message: 'Por favor completa todos los campos',
        severity: 'error'
      });
      return;
    }

    const correoRules = validarCorreo(correo);
    if(!correoRules.sinEspacios || !correoRules.arrobaCaracteres || !correoRules.dominioConPunto || !correoRules.noVacio) {
      setSnackbar({
        open: true,
        message: 'Por favor ingresa un correo válido',
        severity: 'error'
      });
      return;
    }

    const loginResult = await handleLogin(e, correo, contraseña);
    
    if(loginResult.success) {
      console.log("ACCESO CONCEDIDO", loginResult.resultado);
      
      // Redirección basada en tipo de usuario
      if(loginResult.resultado.esGestor) {
        navigate('/repositorio'); // Ruta para gestores
      } else {
        navigate('/'); // Ruta para visitantes
      }
      
      // Guardar datos de usuario en localStorage
      localStorage.setItem('userData', JSON.stringify(loginResult.resultado));
    } else {
      setSnackbar({
        open: true,
        message: loginResult.error || 'Error al iniciar sesión',
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
            value={correo}
            onChange={handleEmailChange}
            className='text_field'
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.correo && !errors.correo.noVacio}
            helperText={errors.correo && !errors.correo.noVacio ? 'Correo inválido' : ''}
          />

          <TextField
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

          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#415b2a'}}
            className='boton_continuar'
            sx={{ mt: 3 }}
            onClick={handleFormSubmit}
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

export default Login;