import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import imagen from '../../img/banner.png';
import ButtonsMod from '../ButtonsMod';

function Cards({detalles}) {
  console.log(detalles)
  return (
    <Card>
      <CardMedia
        component='img'
        height='194'
        alt='imagen'
        image={detalles.imagen}
      />
      <CardContent>
        <Typography variant='body1' fontWeight='bold'>
          {detalles.nombre}
        </Typography>
        <Typography variant='body2'>
          {detalles.descripcion}
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