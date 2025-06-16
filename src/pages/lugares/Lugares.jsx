import React from "react";
import { useNavigate } from 'react-router-dom';
import { Grid,
  Box,
  Button,
  Typography,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardMedia,
  CardContent,
  MenuItem} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import NavBar from "../../components/NavBar/NavBar";
import Footer from './../../components/Footer/Footer'
import { Margin } from "@mui/icons-material";

const Lugares = () => {
  const navigate = useNavigate();
  const ir_a_home = () => {
    navigate('/');
  };
  const ir_a_detalles = (id) => {
    //navigate(`/lugar/${id}`);
    navigate(`/lugar-detalles/`);
  }

  const lugares = [
  {
    nombre: "Templo Mayor",
    descripcion: "Antiguo centro ceremonial mexica ubicado en el corazón del Centro Histórico.",
    imagen: "/imagenes/templo_mayor.jpg"
  },
  {
    nombre: "Museo Nacional de Antropología",
    descripcion: "Exhibe el legado arqueológico e histórico de los pueblos de México.",
    imagen: "/imagenes/museo_antropologia.jpg"
  },
    {
    nombre: "Templo Mayor",
    descripcion: "Antiguo centro ceremonial mexica ubicado en el corazón del Centro Histórico.",
    imagen: "/imagenes/templo_mayor.jpg"
  },
  {
    nombre: "Museo Nacional de Antropología",
    descripcion: "Exhibe el legado arqueológico e histórico de los pueblos de México.",
    imagen: "/imagenes/museo_antropologia.jpg"
  },
    {
    nombre: "Templo Mayor",
    descripcion: "Antiguo centro ceremonial mexica ubicado en el corazón del Centro Histórico.",
    imagen: "/imagenes/templo_mayor.jpg"
  },
  {
    nombre: "Museo Nacional de Antropología",
    descripcion: "Exhibe el legado arqueológico e histórico de los pueblos de México.",
    imagen: "/imagenes/museo_antropologia.jpg"
  },
];

  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // asegura que ocupe toda la altura de la ventana
    backgroundColor: '#f5f5dc'
  }}>
    <NavBar
      esTransparente={false}
      esEstatica={false}
    />

    <Box sx={{ px: 2, py: 4 }}>
      {/* Título y botón */}
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={10}>
          <Grid container alignItems="center">
            {/* Botón */}
            <Grid item>
              <Button
                sx={{
                  backgroundColor: '#415b2a',
                  color: '#ffffff',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  mr: 2
                }}
                onClick={ir_a_home}
              >
                Regresar
              </Button>
            </Grid>

            {/* Título */}
            <Grid item xs>
              <Typography variant="h4" align="center">
                Catálogo de lugares
              </Typography>
              <Typography variant="subtitle1" align="center">
                ¡Que nuestra galería de opciones te motiven a seguir explorando!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Barra de búsqueda */}
      <Grid container justifyContent="flex-end" mt={4} mb={2}>
        <Grid item size={{xs: 12, md: 4}}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Filtrar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: { borderRadius: '30px', backgroundColor: '#ffffff', }
            }}
          />
        </Grid>
      </Grid>

      {/* Filtros adicionales */}
      <Grid container justifyContent="center" mb={4}>
        <Grid size={{xs:12, md:10}}>
          <Box
            style={{paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              
            }}
            sx={{
              backgroundColor: '#a9c2a4',
              borderRadius: 2,
              p: 2
            }}
          >
            {/* Título de sección */}
            <Typography style={{backgroundColor: '#789262', paddingTop: 6, paddingBottom: 6}} variant="subtitle1" align="center" fontWeight="bold" gutterBottom>
              Filtrar por:
            </Typography>

            {/* Dropdowns */}
            <Grid container spacing={2}>
              <Grid item size={{xs:12, md:4}} >
                <FormControl fullWidth style={{backgroundColor: '#ffffff', borderRadius: 10}}>
                  <InputLabel >Categoría</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Todas</MenuItem>
                    <MenuItem value="museo">Museo</MenuItem>
                    <MenuItem value="zona_arqueologica">Zona arqueológica</MenuItem>
                    {/* Agrega más categorías */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item size={{xs:12, md:4}}>
                <FormControl fullWidth style={{backgroundColor: '#ffffff', borderRadius: 10}}>
                  <InputLabel>Ubicación</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="">Todas</MenuItem>
                    <MenuItem value="centro">Centro</MenuItem>
                    <MenuItem value="norte">Norte</MenuItem>
                    <MenuItem value="sur">Sur</MenuItem>
                    {/* Más ubicaciones */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item size={{xs:12, md:4}}>
                <FormControl fullWidth style={{backgroundColor: '#ffffff', borderRadius: 10}}>
                  <InputLabel>Orden</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="asc">A-Z</MenuItem>
                    <MenuItem value="desc">Z-A</MenuItem>
                    <MenuItem value="pop">Más visitados</MenuItem>
                    {/* Más criterios de ordenamiento */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

       <Grid container spacing={3} size={{xs:12, md: 10}} style={{backgroundColor: '#a9825a', padding: 16}}>
        {lugares.map((lugar, index) => (
          <Grid item size={{xs: 12, md: 6, lg: 4}} key={index}>
            <Card sx={{ display: 'flex', height: 160 }}
            onClick={() => ir_a_detalles(lugar.id)}>
              {/* Imagen a la izquierda */}
              <CardMedia
                component="img"
                image={lugar.imagen}
                alt={lugar.nombre}
                sx={{ width: '40%', objectFit: 'cover' }}
              />
              {/* Contenido a la derecha */}
              <CardContent sx={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6" align="center">
                  {lugar.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {lugar.descripcion}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

    <Footer />
  </div>
  );
}

export default Lugares;