import { useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid,
  Box,
  Button,
  Typography,
  InputAdornment,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Stack,
  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FestivalIcon from '@mui/icons-material/Festival';

import axios from 'axios';

import NavBar from "../../components/NavBar/NavBar";
import Footer from './../../components/Footer/Footer'
import Dropdown from './components/Dropdown';

const clasificarUbicacion = (lat) => {
  if (lat >= 19.45) return 'norte';
  if (lat <= 19.35) return 'sur';
  return 'centro';
};

const parsearTipo = (tipoStr) => {
  try {
    const parsed = JSON.parse(tipoStr.replace(/'/g, '"'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const Lugares = () => {
  const navigate = useNavigate();
  
  const [lugares, setLugares] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const [categoria, setCategoria] = useState('');
  const opcionesCategoria = [
    { value: '', label: 'Todas' },
    { value: 'museum', label: 'Museos' },
    { value: 'monument', label: 'Monumentos' },
    { value: 'archaeological_zone', label: 'Zonas arqueológicas' },
  ];

  const [ubicacion, setUbicacion] = useState('');
  const opcionesUbicacion = [
    { value: '', label: 'Todas' },
    { value: 'centro', label: 'Centro' },
    { value: 'norte', label: 'Norte' },
    { value: 'sur', label: 'Sur' },
  ];

  const [orden, setOrden] = useState('az');
  const opcionesOrden = [
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
  ];

  const lugaresFiltrados = useMemo(() => {
    let resultado = [...lugares];

    // Filtro por búsqueda (nombre)
    if (busqueda.trim() !== '') {
      resultado = resultado.filter((lugar) =>
        lugar.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
      );
    }
    // Filtro por categoría
    if (categoria !== '') {
      resultado = resultado.filter((lugar) => {
        const tipos = Array.isArray(lugar.tipo)
          ? lugar.tipo
          : parsearTipo(lugar.tipo);

        return tipos.includes(categoria);
      });
    }
    // Filtro por ubicación (norte/centro/sur)
    if (ubicacion !== '') {
      resultado = resultado.filter(
        (lugar) => clasificarUbicacion(lugar.latitud) === ubicacion
      );
    }
    // Orden alfabético
    if (orden === 'az') {
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === 'za') {
      resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    return resultado;
  }, [busqueda, categoria, ubicacion, orden, lugares]);

  const ir_a_home = () => {
    navigate('/');
  };
  const ir_a_detalles = (id, nombre) => {
    navigate(`/lugar/${id}/${nombre}`);
  }
  
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get_lugares', {
        });
        if(response.data && response.data.resultado){
          //console.log(response.data.resultado);
          setLugares(response.data.resultado)
        } else {
          console.error("Error")
        }
      } catch (error) {
        console.error('Error al obtener lugares', error);
      }
    };

    fetchLugares();
  }, []);

  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', 
    backgroundColor: '#f5f5dc'
  }}>
    <NavBar
      esTransparente={false}
      esEstatica={false}
    />

    <Stack direction='column' sx={{ width: 'auto', display: 'flex', paddingLeft: {md: '10%', xs: '3%'}, paddingRight: {md: '10%', xs: '3%'}, minHeight: '100vh', paddingTop: '3%' }}>
      {/* Botón de regreso ---------------------------------------------------- */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}>
        <Button
            sx={{
              backgroundColor: '#415b2a',
              color: '#ffffff',
              paddingY: 1,
              paddingX: 3,
              textTransform: 'none',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#32461f',
                boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.75)',
              },
              }}
            onClick={ir_a_home}
          >
            Regresar
          </Button>
      </Box>

      {/* Título y texto -------------------------------------------------------- */}
      <Stack direction='row' sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <FestivalIcon sx={{ fontSize: {md: '2.5rem', sm: '2rem', xs: '1.5rem' } }} />
        <Typography fontWeight='bold' sx= {{fontSize: {md: '2.5rem', sm: '2rem', xs: '1.5rem'}, lineHeight: 1 }}>
          Catálogo de lugares
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
        <Typography>
          ¡Que nuestra galería de opciones te motiven a seguir explorando!
        </Typography>
      </Box>

      {/* Barra de búsqueda/filtro ----------------------------------------------------- */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
        <TextField
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
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
                borderColor: '#415b2a',
              },
              '&:hover fieldset': {
                borderColor: '#32461f',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2b4a1c',
              },
            },
          }}
        />
      </Box>
      
      {/* Cajón para filtrar lugares ----------------------------------------------- */}
      <Box
          sx={{
            backgroundColor: '#a9c2a4',
            borderRadius: 2,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            marginTop: '25px',
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
                <Dropdown
                  label="Categoría"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  opciones={opcionesCategoria}
                />
              </Grid>

              {/* Filtro: Ubicación */}
              <Grid item size={{xs: 12, md:3, lg: 3}} style={{paddingLeft: 10, paddingRight: 10}}>
                <Dropdown
                  label="Ubicación"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  opciones={opcionesUbicacion}
                />
              </Grid>

              {/* Filtro: Orden */}
              <Grid item size={{xs: 12, md:3, lg: 3}} style={{paddingLeft: 10, paddingRight: 10}}>
                <Dropdown
                  label="Orden"
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  opciones={opcionesOrden}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Grid container
          spacing={3}
          size={{xs:12, md: 10}}
          style={{backgroundColor: '#a9825a', padding: 16, marginTop: '50px' }}
        >
          {lugaresFiltrados.map((lugar, index) => (
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
    </Stack>

    <Footer />
  </div>
  );
}

export default Lugares;