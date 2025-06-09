import { Container, TextField, Button, Typography, Divider, Box, Paper } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

import './home.css';

const home = () => {

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5dc', // Cambia a tu imagen real
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <Box className='background-home'>
        <Box className='backgroud-home-box'>
          <Typography variant="h5" gutterBottom color='white' sx={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)' }}>
            Infórmate sobre lugares históricos
          </Typography>
          <Typography variant="h2" gutterBottom color='white' sx={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)' }}>
            Ciudad de México
          </Typography>
        </Box>
      </Box>

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

          
          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#415b2a'}}
            className='boton_continuar'
            sx={{ mt: 3 }}
          >
            Iniciar sesión
          </Button>
        </Paper>
      </Container>

      <Footer/>
    </Box>
  );
};

export default home;