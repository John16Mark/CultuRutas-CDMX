import React, { useEffect, useState, useMemo } from 'react';

import { Container, Divider, Grid, Typography, Box } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Cards from '../../components/Home/Cards';

import './home.css';

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

const RecentrarMapa = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return null;
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

// ------------------------------------------------
//                     Lugares
// ------------------------------------------------

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function obtenerAleatorios(array, cantidad) {
  const copia = [...array];
  const seleccionados = [];

  while (seleccionados.length < cantidad && copia.length > 0) {
    const index = Math.floor(Math.random() * copia.length);
    seleccionados.push(copia.splice(index, 1)[0]);
  }

  return seleccionados;
}

// ------------------------------------------------
//                   Componente
// ------------------------------------------------

const Home = () => {
  const [latitud, setLatitud] = useState(19.504879996863785);
  const [longitud, setLongitud] = useState(-99.14628598505446)
  const [lugares, setLugares] = useState([]);
  const [lugaresCercanos, setLugaresCercanos] = useState([]);

  const cardData = [1, 2, 3, 4, 5, 6];
  let nombre = "¡Estás Aquí!"

  useEffect(() => {
    const geoLocalizacion = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitud(position.coords.latitude);
            setLongitud(position.coords.longitude);
            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
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
          setLugares(response.data.resultado)
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

  useEffect(() => {
    if (latitud !== 0.0 && longitud !== 0.0 && lugares.length > 0) {
      const lugaresConDistancia = lugares.map(lugar => {
        const distancia = calcularDistancia(latitud, longitud, lugar.latitud, lugar.longitud);
        return { ...lugar, distancia };
      });

      const lugaresOrdenados = lugaresConDistancia.sort((a, b) => a.distancia - b.distancia);
      console.log("lugaresOrdenados", lugaresOrdenados)
      setLugaresCercanos(lugaresOrdenados.slice(0, 10));
    }
  }, [latitud, longitud, lugares]);

  const tarjetasParaMostrar = useMemo(() => {
    const maxCercanos = Math.min(3, lugaresCercanos.length);
    const cercanosSeleccionados = obtenerAleatorios(lugaresCercanos, maxCercanos);

    console.log("cercanosSeleccionados", cercanosSeleccionados)

    // Excluir los lugares ya seleccionados
    const idsCercanos = new Set(cercanosSeleccionados.map(l => l.id_sitio)); // Suponiendo que cada lugar tiene un id único

    const lugaresRestantes = lugares.filter(l => !idsCercanos.has(l.id_sitio));
    const restantesSeleccionados = obtenerAleatorios(lugaresRestantes, 9 - maxCercanos);

    return [...cercanosSeleccionados, ...restantesSeleccionados];
  }, [lugares, lugaresCercanos]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5dc', // Cambia a tu imagen real
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <Box className='background-home'>
        <Box className='backgroud-home-box'>
          <Typography variant="h5" gutterBottom color='white' sx={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)' }}>
            Infórmate sobre lugares históricos
          </Typography>
          <Typography variant="h2" gutterBottom color='white' sx={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.7)' }}>
            Ciudad de México
          </Typography>
        </Box>
      </Box>

      <Container>
        <section className='home-sections'>
          <Typography variant='h5' marginBottom={'50px'} fontWeight='bold'>
            ¡Lugares cercanos a ti!
          </Typography>
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

                {/* Tu ubicación */}
                <Marker position={[latitud, longitud]} icon={iconoRojo}>
                  <Popup>Tú estás aquí</Popup>
                </Marker>

                {/* Marcadores de los 10 lugares más cercanos */}
                {lugaresCercanos.map((lugar, index) => (
                  <Marker key={index} position={[lugar.latitud, lugar.longitud]}>
                    <Popup>{lugar.nombre}</Popup>
                  </Marker>
                ))}

                {/* Para centrar el mapa con todos los marcadores visibles */}
                <AjustarVista markers={[[latitud, longitud], ...lugaresCercanos.map(l => [l.latitud, l.longitud])]} />
              </MapContainer>

            )}
          </Box>
        </section>

        <section className='home-sections'>   
          <Typography variant='h5' marginBottom={'20px'} fontWeight='bold'>
            Explora lugares
          </Typography>
          <Divider sx={{ width: '100%' }}/>
          <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
            <Grid container spacing={2}>
              {tarjetasParaMostrar.map((item, index) => (
                <Grid size={{ md: 4, xs: 6}}>
                  <Cards
                    detalles={item}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </section>
      </Container>
      

      <Footer/>
    </Box>
  );
};

export default Home;