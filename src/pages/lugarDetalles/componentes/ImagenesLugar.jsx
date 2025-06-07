// src/components/ImagenesLugar.jsx
import React from 'react';
import { Grid, Box, Card, CardMedia } from '@mui/material';

const ImagenesLugar = ({ imagenes }) => {
  if (!imagenes || imagenes.length === 0) return null;

  const primera = imagenes[0];
  const restantes = imagenes.slice(1);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Primera imagen en grande */}
      <Card sx={{ mb: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={primera}
          alt="Imagen principal del lugar"
          sx={{ objectFit: 'cover', width: '100%' }}
        />
      </Card>

      {/* Las demás imágenes en 2 columnas */}
      <Grid container spacing={2}>
        {restantes.map((img, index) => (
          <Grid item xs={6} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={img}
                alt={`Imagen secundaria ${index + 1}`}
                sx={{ objectFit: 'cover', width: '100%' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImagenesLugar;
