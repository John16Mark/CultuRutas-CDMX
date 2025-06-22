import React, { useEffect, useState } from 'react';

import { Container, Divider, Grid, Typography, Box } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Cards from '../../components/Home/Cards';

import './home.css';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

  const RecentrarMapa = ({ lat, lng }) => {
    const map = useMap();

    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], map.getZoom());
      }
    }, [lat, lng, map]);

    return null;
  };

const Home = () => {

  const [latitud, setLatitud] = useState(19.504879996863785);
  const [longitud, setLongitud] = useState(-99.14628598505446)


  const cardData = [1, 2, 3, 4, 5, 6];

  let nombre = "¡Estás Aquí!"

  useEffect(() => {
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
  }, []);
/*
  useEffect(() => {
    if (latitud && longitud) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`)
        .then((res) => res.json())
        .then((data) => {
          const lugar = data.address.city || data.address.town || data.address.village || data.address.county || data.address.municipality;
          console.log("Ubicación aproximada:", lugar);
        });
    }
  }, [latitud, longitud]);
*/
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
                zoom={18}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitud, longitud]}>
                  <Popup>{nombre}</Popup>
                </Marker>

                {/* Este componente actualizará la vista del mapa */}
                <RecentrarMapa lat={latitud} lng={longitud} />
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
              {cardData.map((item, index) => (
                <Grid size={{ md: 4, xs: 6}}>
                  <Cards />
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