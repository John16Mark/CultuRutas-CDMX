import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useMediaQuery, useTheme, Card, CardMedia, CardContent, Grid, Box, Typography } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./components/HeaderLugar";
import ImagenesLugar from "./components/ImagenesLugar";
import DescripcionLugar from './components/DescripcionLugar'
import Footer from './../../components/Footer/Footer'

import './LugarDetalles.css';

import axios from 'axios';

import fondo1 from '../../img/fondo_1.jpg'
import fondo2 from '../../img/fondo_oscuro1.jpg'

function formatearRangoFechas(inicio, fin) {
  const op = { day: 'numeric', month: 'long', year: 'numeric' };
  const fInicio = new Date(inicio);
  const fFin = new Date(fin);

  const igualMes = fInicio.getMonth() === fFin.getMonth();
  const igualAño = fInicio.getFullYear() === fFin.getFullYear();

  if (igualMes && igualAño) {
    return `${fInicio.getDate()} – ${fFin.getDate()} ${fInicio.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}`;
  }

  return `${fInicio.toLocaleDateString('es-MX', op)} – ${fFin.toLocaleDateString('es-MX', op)}`;
}


const LugarDetalles = () => {
  const { id, nombre } = useParams();
  const navigate = useNavigate();

  const [detalles, setDetalles] = useState({});
  const [ eventos, setEventos ] = useState([])

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    console.log(isSmallScreen)
  }, [isSmallScreen])

  useEffect(() => {
    if (!id || !nombre) {
      navigate("/");
      return;
    }
    
    const fetchPlace = async () => {
      const resultado = await axios.post('http://localhost:3001/get_detalles_lugar', {id});

      if(resultado && resultado.data && resultado.data.resultado) {
        console.log(resultado.data.resultado);
        let nuevo_objeto = resultado.data.resultado;

        // Ubicación
        nuevo_objeto.ubicacion = "";
        if(nuevo_objeto.calle)
          nuevo_objeto.ubicacion += nuevo_objeto.calle;
        if(nuevo_objeto.municipio_delegacion)
          nuevo_objeto.ubicacion += ", " + nuevo_objeto.municipio_delegacion;
        if(nuevo_objeto.codigo_postal)
          nuevo_objeto.ubicacion += ", C.P. " + nuevo_objeto.codigo_postal;

        // Horario
        nuevo_objeto.horario = [];
        if(nuevo_objeto.h_lunes)  nuevo_objeto.horario.push("Lunes: " + nuevo_objeto.h_lunes);
        if(nuevo_objeto.h_martes)  nuevo_objeto.horario.push("Martes: " + nuevo_objeto.h_martes);
        if(nuevo_objeto.h_miercoles)  nuevo_objeto.horario.push("Miércoles: " + nuevo_objeto.h_miercoles);
        if(nuevo_objeto.h_jueves)  nuevo_objeto.horario.push("Jueves: " + nuevo_objeto.h_jueves);
        if(nuevo_objeto.h_viernes)  nuevo_objeto.horario.push("Viernes: " + nuevo_objeto.h_viernes);
        if(nuevo_objeto.h_sabado)  nuevo_objeto.horario.push("Sábado: " + nuevo_objeto.h_sabado);
        if(nuevo_objeto.h_domingo)  nuevo_objeto.horario.push("Domingo: " + nuevo_objeto.h_domingo);

        // Accesibilidad
        nuevo_objeto.accesibilidad = "";
        if(nuevo_objeto.accesibilidadParking === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con estacionamiento accesible"
        }
        if(nuevo_objeto.accesibilidadEntrance === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con entrada accesible"
        }
        if(nuevo_objeto.accesibilidadRestroom === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con baños accesibles"
        }
        if(nuevo_objeto.accesibilidadSeating === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con asientos accesibles"
        }

        setDetalles(nuevo_objeto);
      }
      
    }

    fetchPlace();
    
  }, []);

  useEffect(() => {
    const fetchEventos = async () => {
      const resultado = await axios.post('http://localhost:3001/get_eventos_lugar', {id});
      console.log("resutlado eventos: ",resultado);
      if(resultado && resultado.data && resultado.data.resultado) {
        let eventos = resultado.data.resultado;
        let nuevos_eventos = []
        eventos.forEach(evento => {
          let temp = evento;
          temp.imagen = '/lugares/'+detalles.nombre_normalizado+'/eventos/'+evento.imagen;
          console.log(temp.imagen)
          nuevos_eventos.push(temp);
        });
        console.log(nuevos_eventos)
        setEventos(nuevos_eventos);
      }
    }

    fetchEventos();
  }, [detalles])
  
  const contenido = isSmallScreen ? (
  <>
    {/* DETALLES PRIMERO en XS */}
    <Grid item xs={12}>
      <DescripcionLugar
        nombre={detalles?.nombre || '-'}
        resumen={detalles?.descripcion || 'Sin descripción.'}
        ubicacion={detalles?.ubicacion || '-'}
        costo={detalles?.costos || 'Sin información de costos'}
        horario={detalles?.horario || ''}
        accesibilidad={detalles?.accesibilidad || ''}
        latitud={detalles?.latitud || 0.0}
        longitud={detalles?.longitud || 0.0}
        nombre_normalizado={nombre}
        id_lugar={id}
        eventos={eventos}
      />
    </Grid>

    {/* IMÁGENES SEGUNDO en XS, con título */}
    <Grid item xs={12}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', mb: 1, mt: 3, color: '#5a3e36' }}
      >
        Imágenes del lugar
      </Typography>
      <ImagenesLugar imagenes={detalles?.imagenes || []} />
    </Grid>
  </>
) : (
  <>
    {/* IMÁGENES PRIMERO en MD+ */}
    <Grid size={{sm: 6, md: 6}}>
      <ImagenesLugar imagenes={detalles?.imagenes || []} />
    </Grid>

    {/* DETALLES SEGUNDO en MD+ */}
    <Grid size={{sm: 6, md: 6}}>
      <DescripcionLugar
        nombre={detalles?.nombre || '-'}
        resumen={detalles?.descripcion || 'Sin descripción.'}
        ubicacion={detalles?.ubicacion || '-'}
        costo={detalles?.costos || 'Sin información de costos'}
        horario={detalles?.horario || ''}
        accesibilidad={detalles?.accesibilidad || ''}
        latitud={detalles?.latitud || 0.0}
        longitud={detalles?.longitud || 0.0}
        nombre_normalizado={nombre}
        id_lugar={id}
        eventos={eventos}
      />
    </Grid>
  </>
);

  return (
  <div className='lugDet-bg'>
    <NavBar
      esTransparente={false}
      esEstatica={false}
    />
    <div>
      <HeaderLugar

      />
    </div>
    {<Grid container spacing={2}  justifyContent="center"
      >
      {contenido}
      
    </Grid>}

    <Grid container spacing = {2} justifyContent="center" >
      <Grid size={{ xs: 12, md: 10 }} style={{ marginBottom: '35px' }}>
        {/* Encabezado con línea e ícono */}
        <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
          <Box sx={{ flex: 1, height: 2, backgroundColor: '#5a3e36' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
            <EventAvailableIcon sx={{ color: '#5a3e36', mr: 1 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#5a3e36',
                textAlign: 'center',
              }}
            >
              Eventos disponibles
            </Typography>
          </Box>
          <Box sx={{ flex: 1, height: 2, backgroundColor: '#5a3e36' }} />
        </Box>

        {/* Mostrar mensaje si no hay eventos */}
        {eventos.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              color: '#888',
              fontStyle: 'italic',
              mt: 2,
            }}
          >
            No hay eventos disponibles
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {eventos.map((evento, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={evento.imagen || '/imgs/no_image.jpg'}
                    alt="Evento"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {evento.descripcion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatearRangoFechas(evento.fecha_inicio, evento.fecha_fin)}
                    </Typography>
                    {evento.promociones && (
                      <Typography variant="body2" sx={{ mt: 1 }} color="primary">
                        🎟 {evento.promociones}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
    <Footer></Footer>
  </div>
  )
}



export default LugarDetalles;