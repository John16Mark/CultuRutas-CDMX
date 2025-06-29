import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import axios from 'axios';

// ------------------------------------------------
//                      Mapa
// ------------------------------------------------

const iconoRojo = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const iconoMuseo = new L.Icon({
  iconUrl: '/icons/museum.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [37, 61],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const iconoMonumento = new L.Icon({
  iconUrl: '/icons/monument.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [37, 61],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const iconoZonaArq = new L.Icon({
  iconUrl: '/icons/archaeological_zone.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [37, 61],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const iconoDefault = new L.Icon({
  iconUrl: '/icons/default.png',
  shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getIconByTipo = (tipos) => {
  if (!tipos || !Array.isArray(tipos)) return iconoDefault;

  const lowerTipos = tipos.map(t => t.toLowerCase());

  if (lowerTipos.some(t => t.includes('museum'))) return iconoMuseo;
  if (lowerTipos.some(t => t.includes('monument'))) return iconoMonumento;
  if (lowerTipos.some(t => t.includes('archaeological_zone'))) return iconoZonaArq;

  return iconoDefault;
};

const parsearTipo = (tipoStr) => {
  try {
    const parsed = JSON.parse(tipoStr.replace(/'/g, '"'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const AjustarVista = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = markers.map(([lat, lng]) => [lat, lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
};

const Mapa = () => {
  const navigate = useNavigate();

  const [latitud, setLatitud] = useState(19.504879996863785);
  const [longitud, setLongitud] = useState(-99.14628598505446)
  const [lugares, setLugares] = useState([]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState({});

  useEffect(() => {
    console.log("lugar seleccionado", lugarSeleccionado)
  }, [lugarSeleccionado])

  useEffect(() => {
    const geoLocalizacion = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitud(position.coords.latitude);
            setLongitud(position.coords.longitude);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              default:
                console.error("An unknown error occurred.");
                break;
            }
          },
          {
            enableHighAccuracy: false, // Cambia a true si quieres más precisión (más propenso a fallar)
            timeout: 10000,            // Espera hasta 10 segundos
            maximumAge: 60000          // Usa cache si es reciente (1 minuto)
          }
        );
      }
    }

    const fetchLugares = async () => {
      try {
        const response = await axios.post('http://localhost:3001/get_lugares', {
        });
        if(response.data && response.data.resultado){
          //console.log(response.data.resultado);
          let lugares = []
          response.data.resultado.forEach(element => {
            let tipo = parsearTipo(element.tipo);
            let nuevo_lugar = element; 
            nuevo_lugar.tipo = tipo;
            if(!(nuevo_lugar?.descripcion))
              nuevo_lugar.descripcion = 'Sin descripción.'
            lugares.push(nuevo_lugar)
          });
          setLugares(lugares)
        } else {
          console.error("Error")
        }
      } catch (error) {
        console.error('Error al obtener lugares', error);
      }
    };

    geoLocalizacion();
    fetchLugares();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh', // asegura que ocupe toda la altura de la ventana
    }}>
      <div style={{backgroundColor: '#f5f5dc'}}>

        <NavBar
          esTransparente={false}
          esEstatica={false}
        />

        <Grid container spacing={2}  justifyContent="center">
          <Grid container size={{xs: 12, md: 11}} style={{ marginTop: '40px'}}>
            <Grid size={{xs:12}} style={{}}>
              <Typography variant="h4" align="center">
                Mapa de Lugares Interactivo
              </Typography>
              <Typography variant="subtitle1" align="center">
                ¡Descubre lugares llenos de historia!
              </Typography>
            </Grid>
            <Grid size={{xs:12, md:8}} style={{backgroundColor: 'blue'}} >
              <div style={{backgroundColor: '#789262', padding: 20}}>
                <Box className='home-first-section-background'>
                  {latitud !== 0.0 && longitud !== 0.0 && (
                    <MapContainer
                      center={[latitud, longitud]}
                      zoom={14}
                      scrollWheelZoom={true}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                      />
                      <Marker position={[latitud, longitud]} icon={iconoRojo}>
                        <Popup>Tú estás aquí</Popup>
                      </Marker>
                      {lugares.map((lugar, index) => (
                        <Marker
                          key={index}
                          position={[lugar.latitud, lugar.longitud]}
                          icon={getIconByTipo(lugar.tipo)}  // <- lugar.tipo debe ser arreglo
                          eventHandlers={{
                            click: () => {
                              setLugarSeleccionado(lugar);
                            }
                          }}
                        >
                          <Popup
                          >
                            {lugar.nombre}
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>

                  )}
                </Box>
              </div>
            </Grid>
            <Grid size={{xs:12, md:4}}>
              <Card
                sx={{
                  backgroundColor: '#a9825a',
                  width: '100%',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Imagen arriba */}
                <CardMedia
                  component="img"
                  image={lugarSeleccionado?.imagen || 'logo_stretched.png'}
                  alt={lugarSeleccionado?.nombre || 'Lugar'}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />

                {/* Contenido debajo de la imagen */}
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    padding: 2,
                  }}
                >
                  {/* Nombre centrado */}
                  <Typography variant="h6" align="center">
                    {lugarSeleccionado?.nombre || 'Busca lugares'}
                  </Typography>

                  {/* Descripción alineada a la izquierda */}
                  <Typography variant="body2" color="text.primary" align="left">
                    {lugarSeleccionado?.descripcion || 'Haz clic en alguno de los marcadores de lugar para obtener información de él.'}
                  </Typography>

                  {/* Botón alineado a la derecha */}
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    {lugarSeleccionado.id_sitio ?                     <Button
                      sx={{
                        backgroundColor: '#415b2a',
                        color: '#ffffff',
                        paddingY: 1, // equivalente a paddingTop y paddingBottom de 8px
                        paddingX: 3, // equivalente a paddingLeft y paddingRight de 25px aprox
                        textTransform: 'none',
                        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // sombra normal
                        '&:hover': {
                          backgroundColor: '#32461f', // tono más oscuro para hover
                          boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.75)', // sombra más intensa
                        },
                      }}
                      onClick={() =>
                        navigate(`/lugar/${lugarSeleccionado.id_sitio}/${lugarSeleccionado.nombre_normalizado}`)
                      }
                    >
                      Ver más
                    </Button> : <></>}

                  </Box>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        </Grid>
        
      </div>
      <div style={{ flex: 1, backgroundColor: '#f5f5dc', margin:0 }}>

      </div>
      <Footer></Footer>
    </div>

  );
}

export default Mapa;