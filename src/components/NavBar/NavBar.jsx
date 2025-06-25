import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import axios from 'axios';

function NavBar({ esTransparente, esEstatica }) {
  const navigate = useNavigate();

  const [logged, setLogged] = useState(false)
  const [correo, setCorreo] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(()=> {
    const fetchLogged = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const id = localStorage.getItem('id');
        console.log("navbar token: ", token);
        console.log("navbar id: ", id);

        if(token && id) {
          const response = await axios.post('http://localhost:3001/is_logged', {id, token});
          console.log('response is logged', response);
          if(response.data.logged) {
            setLogged(true);
            setCorreo(response.data.decoded.correo);
          } else {
            setLogged(false);
          }
        } else {
          setLogged(false);
        }
      } catch (error) {
        console.log('El usuario no ha iniciado sesión', error)
        setLogged(false);
      }
    }
    fetchLogged();
    
    // Agregar un listener para detectar cambios en el token
    const handleStorageChange = () => {
      fetchLogged();
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <AppBar
      position={esTransparente ? 'fixed' : esEstatica ? 'absolute' : 'static'}
      color={esTransparente ? 'transparent' : '#f5f5dc'}
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
            <>
              <Button
                onClick={handleOpen}
                color="inherit"
                size="small"
                endIcon={<ArrowDropDownIcon />} // 👈 Aquí se añade la flechita
                sx={{ textTransform: 'none' }}
                style={{fontSize: 16, color: '#5a3e36'}}
              >
                {correo}
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem
                  component={RouterLink}
                  to="/logout"
                  onClick={handleLogout}
                  sx={{ color: '#415b2a' }}
                >
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
