import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ButtonsMod from '../../../components/ButtonsMod';
import { useNavigate } from 'react-router-dom';

function TarjetaLugar({detalles}) {
  const navigate = useNavigate();
  console.log(detalles)
  const handle_ir = () => {
    navigate(`/lugar/${detalles.id_sitio}/${detalles.nombre_normalizado}`);
  }
  return (
    <Card sx={{ height: 360, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component='img'
        height='194'
        alt='imagen'
        image={detalles.imagen}
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant='body1' fontWeight='bold' noWrap>
            {detalles.nombre}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
            }}
          >
            {detalles.descripcion}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <ButtonsMod
            variant='secundario'
            textCont='Ver detalles'
            width='auto'
            height='auto'
            type='submit'
            clickEvent={handle_ir}
          />
        </Box>
      </CardContent>
    </Card>


  );
}

export default TarjetaLugar;