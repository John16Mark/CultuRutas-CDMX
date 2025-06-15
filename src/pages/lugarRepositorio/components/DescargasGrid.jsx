import { Grid, Box, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function DescargasGrid({ categorias }) {
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      <Grid item xs={12} md={10}>
        {categorias.map((categoria, index) => (
          <Box key={index} mb={3}>
            {/* Título tipo "marcador verde" */}
            <Box
              sx={{
                backgroundColor: '#415b2a',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              {categoria.tipo}
            </Box>

            {/* Lista de archivos */}
            <Box mt={1} pl={2}>
              {categoria.archivos.map((archivo, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ mt: 1, textTransform: 'none' }}
                  // Aquí iría el link real del archivo
                  href={`#`} // ← Esto deberás reemplazar con el link real
                  download
                >
                  {archivo}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}


export default DescargasGrid;