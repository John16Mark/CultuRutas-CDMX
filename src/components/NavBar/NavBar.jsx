import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NavBar({ esTransparente, esEstatica, logged }) {
  return (
    <AppBar
      position={esTransparente ? 'fixed' : esEstatica ? 'absolute' : 'static'}
      color={esTransparente ? 'transparent' : '#f5f5dc'}
      backgroundColor={esTransparente ? 'transparent' : '#f5f5dc'}
      style={esTransparente ? {backgroundColor: 'none'} : {backgroundColor: '#f5f5dc'}}
      elevation={esTransparente ? 0 : 4}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}
        >
        {/* Lado izquierdo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton component={RouterLink} to="/" edge="start" color="inherit">
            <img src="/logo.png" alt="logo" style={{ height: '36px' }} />
            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
              style={{marginLeft: 10, color: '#5A3E36'}}
            >
              CultuRutas CDMX
            </Typography>
          </IconButton>

          <Button component={RouterLink} to="/mapa" style={{color: '#5A3E36'}}>
            Ir al mapa
          </Button>
          <Button component={RouterLink} to="/lugares" style={{color: '#5A3E36'}}>
            Ver lugares
          </Button>
        </Box>

        {/* Lado derecho */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!logged ? (
            <>
              <Button component={RouterLink} to="/registro" variant="outlined" size="small"              sx={{
                borderColor: '#415b2a',
                color: '#415b2a',
                '&:hover': {
                  borderColor: '#32461f',
                  color: '#32461f',
                },
              }}>
                Registrarse
              </Button>
              <Button component={RouterLink} to="/login" variant="contained" size="small"
              sx={{
                backgroundColor: '#415b2a',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#32461f',
                },
              }}>
                Iniciar sesión
              </Button>
            </>
          ) : (
            <Button component={RouterLink} to="/logout" color="error" size="small">
              Cerrar sesión
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
