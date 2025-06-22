import React from "react";
import { useEffect, useState } from "react";
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

import axios from 'axios';

import NavBar from "../../components/NavBar/NavBar";
import Footer from './../../components/Footer/Footer'
import { Margin } from "@mui/icons-material";

const Lugares = () => {
  const navigate = useNavigate();
  
  const [lugares, setLugares] = useState([]);  // ← estado para almacenar los lugares
 
  const ir_a_home = () => {
    navigate('/');
  };
  const ir_a_detalles = (id, nombre) => {
    //navigate(`/lugar/${id}`);
    navigate(`/lugar/${id}/${nombre}`);
  }
  
  useEffect(() => {
    // Esta función se llama al cargar la página
    
    const fetchLugares = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get_lugares', {
        });
        if(response.data && response.data.resultado){
          console.log(response.data.resultado);
          setLugares(response.data.resultado)
        } else {
          console.error("Error")
        }
      } catch (error) {
        console.error('Error al obtener lugares', error);
      }
    };

    fetchLugares();
  }, []); // ← se ejecuta solo una vez al montar el componente

  let places = [
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
  ]

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
                  paddingY: 1, // equivalente a paddingTop y paddingBottom de 8px
                  paddingX: 3, // equivalente a paddingLeft y paddingRight de 25px aprox
                  marginRight:12,
                  textTransform: 'none',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // sombra normal
                  '&:hover': {
                    backgroundColor: '#32461f', // tono más oscuro para hover
                    boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.75)', // sombra más intensa
                  },
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
      <Grid container justifyContent="flex-end" mt={4} mb={2}
      style={{marginRight: 25}}>
        <Grid item size={{xs: 12, md: 4, lg:3}}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Filtrar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 15,
                backgroundColor: '#ffffff',
                '& fieldset': {
                  borderColor: '#415b2a', // normal
                },
                '&:hover fieldset': {
                  borderColor: '#32461f', // al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2b4a1c', // al hacer foco (click o tab)
                },
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Filtros adicionales */}
      <Grid container justifyContent="center" mb={4}>
        <Grid item size={{xs: 12, md: 10}}>
          <Box
            sx={{
              backgroundColor: '#a9c2a4',
              borderRadius: 2,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // sombra inferior
              overflow: 'hidden',
            }}
          >
            {/* Encabezado */}
            <Box
              sx={{
                backgroundColor: '#789262',
                py: 1,
                px: 2,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <Typography
                variant="subtitle1"
                align="center"
                fontWeight="bold"
                color="white"
              >
                Filtrar por:
              </Typography>
            </Box>

            {/* Cuerpo con filtros */}
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} justifyContent="center">
                {/* Filtro: Categoría */}
                <Grid item size={{xs: 12, md:3, lg: 3}} style={{paddingLeft: 10, paddingRight: 10}}>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      width: '100%', // o un ancho fijo como '220px'
                      backgroundColor: 'white',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#415b2a', // color personalizado del borde
                        },
                        '&:hover fieldset': {
                          borderColor: '#32461f',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2b4a1c',
                        },
                      },
                    }}
                  >
                    <InputLabel
                      sx={{
                        color: '#415b2a',
                        '&.Mui-focused': {
                          color: '#2b4a1c',
                        },
                      }}>Categoría</InputLabel>
                    <Select
                      defaultValue=""
                      label="Categoría"
                      // No renderValue cuando no hay valor
                      renderValue={(selected) =>
                        selected ? (
                          <span
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block',
                            }}
                          >
                            {selected}
                          </span>
                        ) : (
                          // Si no hay valor, no se muestra nada extra — solo el label actúa como placeholder
                          ''
                        )
                      }
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="museo">Museo de Historia Natural y Cultura Ambiental</MenuItem>
                      <MenuItem value="zona_arqueologica">Zona arqueológica</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Filtro: Ubicación */}
                <Grid item size={{xs: 12, md:3, lg: 3}} style={{paddingLeft: 10, paddingRight: 10}}>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      width: '100%', // o un ancho fijo como '220px'
                      backgroundColor: 'white',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#415b2a', // color personalizado del borde
                        },
                        '&:hover fieldset': {
                          borderColor: '#32461f',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2b4a1c',
                        },
                      },
                    }}
                  >
                    <InputLabel
                      sx={{
                        color: '#415b2a',
                        '&.Mui-focused': {
                          color: '#2b4a1c',
                        },
                      }}>
                      Ubicación</InputLabel>
                    <Select
                      defaultValue=""
                      label="Categoría"
                      // No renderValue cuando no hay valor
                      renderValue={(selected) =>
                        selected ? (
                          <span
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block',
                            }}
                          >
                            {selected}
                          </span>
                        ) : (
                          // Si no hay valor, no se muestra nada extra — solo el label actúa como placeholder
                          ''
                        )
                      }
                    >
                      <MenuItem value="">Todas</MenuItem>
                      <MenuItem value="centro">Centro</MenuItem>
                      <MenuItem value="norte">Norte</MenuItem>
                      <MenuItem value="sur">Sur</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Filtro: Orden */}
                <Grid item size={{xs: 12, md:3, lg: 3}} style={{paddingLeft: 10, paddingRight: 10}}>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      width: '100%', // o un ancho fijo como '220px'
                      backgroundColor: 'white',
                      borderRadius: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#415b2a', // color personalizado del borde
                        },
                        '&:hover fieldset': {
                          borderColor: '#32461f',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2b4a1c',
                        },
                      },
                    }}
                  >
                    <InputLabel
                      sx={{
                        color: '#415b2a',
                        '&.Mui-focused': {
                          color: '#2b4a1c',
                        },
                      }}>Orden</InputLabel>
                    <Select

                      defaultValue=""
                      label="Categoría"
                      // No renderValue cuando no hay valor
                      renderValue={(selected) =>
                        selected ? (
                          <span
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'block',
                            }}
                          >
                            {selected}
                          </span>
                        ) : (
                          // Si no hay valor, no se muestra nada extra — solo el label actúa como placeholder
                          ''
                        )
                      }
                    >
                      <MenuItem value="asc">A-Z</MenuItem>
                      <MenuItem value="desc">Z-A</MenuItem>
                      <MenuItem value="pop">Más visitados</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container
        spacing={3}
        size={{xs:12, md: 10}}
        style={{backgroundColor: '#a9825a', padding: 16, marginLeft: 25, marginRight: 25}}
        >
        {lugares.map((lugar, index) => (
          <Grid item size={{xs: 12, md: 6, lg: 4}} key={index}>
            <Card
              sx={{
                display: 'flex',
                height: 160,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '4px 4px 3px rgba(0, 0, 0, 0.5)',
                },
              }}
              onClick={() => ir_a_detalles(lugar.id_sitio, lugar.nombre_normalizado)}>
              {/* Imagen a la izquierda */}
              <CardMedia
                component="img"
                image={lugar.imagen}
                alt={lugar.nombre}
                sx={{ width: '40%', objectFit: 'cover' }}
              />
              {/* Contenido a la derecha */}
              <CardContent
                sx={{
                  width: '60%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
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