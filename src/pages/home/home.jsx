import { Container, Divider, Grid, Typography, Box, Paper } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Cards from '../../components/Home/Cards';

import './home.css';

const home = () => {
  const cardData = [1, 2, 3, 4, 5, 6];

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

export default home;