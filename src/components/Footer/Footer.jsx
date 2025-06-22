// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Link as MuiLink } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub, Home, Email, Phone, BoltRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Footer({ showIncorporaLugar }) {
  return (
    <Box component="footer" sx={{ backgroundColor: '#a9825a', color: '#000', pt: 4, pb: 2, mt: 4 }}>
      <Container>
        <Grid container spacing={1.5}>
          <Grid size={{xs: 12, sm: 6, md:3}}>
            <Typography variant="h6" gutterBottom>CultuRutas CDMX</Typography>
            <Typography variant="body2">
              Descubre de historia y arqueología en la CDMX, desde lugares icónicos hasta rincones menos conocidos.
            </Typography>
          </Grid>

          <Grid size={{xs: 12, sm: 6, md:3}}>
            <Typography variant="h6" gutterBottom>Más de nosotros</Typography>
            {showIncorporaLugar && (
              <Typography variant="body2">
                <MuiLink component={Link} to="/register-place-page" color="inherit" underline="hover">
                  Incorpora un Lugar
                </MuiLink>
              </Typography>
            )}
            <Typography variant="body2">
              <MuiLink component={Link} to="/terminos-condiciones" color="inherit" underline="hover">
                Términos y Condiciones
              </MuiLink>
            </Typography>
          </Grid>

          <Grid size={{xs: 12, sm: 6, md:3}}>
            <Typography variant="h6" gutterBottom>Contacto</Typography>
            <Typography variant="body2" display="flex" alignItems="center" gap={1}>
              <Home fontSize="small" /> Ciudad de México, México
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center" gap={1}>
              <Email fontSize="small" /> contacto@culturutas.com
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center" gap={1}>
              <Phone fontSize="small" /> +52 55 5555 5555
            </Typography>
          </Grid>

          <Grid size={{xs: 12, sm: 6, md:3}}>
            <Typography variant="h6" gutterBottom>Síguenos</Typography>
            <Box>
              <IconButton component={Link} to="/" color="inherit"><Facebook /></IconButton>
              <IconButton component={Link} to="/" color="inherit"><Twitter /></IconButton>
              <IconButton component={Link} to="/" color="inherit"><Google /></IconButton>
              <IconButton component={Link} to="/" color="inherit"><Instagram /></IconButton>
              <IconButton component={Link} to="/" color="inherit"><LinkedIn /></IconButton>
              <IconButton component={Link} to="/" color="inherit"><GitHub /></IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box textAlign="center" pt={4} fontSize="0.875rem" color={'#5a3e36'} >
        © {new Date().getFullYear()} CultuRutas CDMX
      </Box>
    </Box>
  );
}

export default Footer;
