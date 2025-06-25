import { useState } from 'react';
import { Grid, Box, Card, CardMedia, Dialog, DialogContent } from '@mui/material';

const ImagenesLugar = ({ imagenes }) => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  if (!imagenes || imagenes.length === 0) return null;

  const primera = imagenes[0];
  const restantes = imagenes.slice(1);

  const abrirModal = (img) => {
    setImagenSeleccionada(img);
  };

  const cerrarModal = () => {
    setImagenSeleccionada(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Imagen principal */}
      <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={() => abrirModal(primera)}>
        <CardMedia
          component="img"
          height="250"
          image={primera}
          alt="Imagen principal del lugar"
          sx={{ objectFit: 'cover', width: '100%' }}
        />
      </Card>

      {/* Galería de imágenes restantes */}
      <Grid container spacing={2} justifyContent="left">
        {restantes.map((img, index) => (
          <Grid item size={{ xs: 12, sm: 6 }} key={index} sx={{ display: 'flex' }}>
            <Card sx={{ width: '100%', cursor: 'pointer' }} onClick={() => abrirModal(img)}>
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

      {/* Modal para mostrar imagen completa */}
      <Dialog
        open={Boolean(imagenSeleccionada)}
        onClose={cerrarModal}
        maxWidth="md"
        fullWidth
        style={{padding:0}}
      >
        <DialogContent sx={{ padding: 0 }}>
          <img
            src={imagenSeleccionada}
            alt="Vista ampliada"
            style={{ width: '100%', height: 'auto', padding:0, margin: 0 }}
          />
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default ImagenesLugar;
