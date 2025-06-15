import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import imagen from '../../img/banner.png';
import ButtonsMod from '../ButtonsMod';

function Cards() {
  return (
    <Card>
      <CardMedia
        component='img'
        height='194'
        alt='imagen'
        image={imagen}
      />
      <CardContent>
        <Typography variant='body1' fontWeight='bold'>
          Cafebrería el Péndulo
        </Typography>
        <Typography variant='body2'>
          Agradable cafetería/librería con varias áreas para disfrutar de un rico café y una bonita escalera.
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
          <ButtonsMod
            variant='secundario'
            textCont='Eliminar'
            width='auto'
            height='auto'
            type='submit'
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Cards;