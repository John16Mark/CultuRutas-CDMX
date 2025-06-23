import React from "react";

import { Grid, Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Link as MuiLink } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

function getTitulo(titulo) {
  switch (titulo) {
    case 'imagenes':
      return 'Imágenes'
    case 'documentos':
      return 'Documentos'
    default:
      return 'Otros'
  }
} 

function DescargasGrid({ categorias }) {

  // Función para elegir el ícono según la extensión
  const getIconByExtension = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'pdf') return <PictureAsPdfIcon color="error" />;
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(ext)) return <ImageIcon color="primary" />;
    if (['doc', 'docx', 'txt', 'rtf'].includes(ext)) return <DescriptionIcon color="action" />;
    return <InsertDriveFileIcon color="disabled" />;
  };

  return (
    <div style={{width: '100%', /*backgroundColor: '#aaaa00'*/}}>
      
      <Grid container spacing={2} justifyContent="flex-start">
        <Grid container size={{xs: 12}}>
          {categorias.map((categoria, index) => (
            <Grid size={{xs: 12}} style={{marginTop: 5, marginBottom: 2}} >
              <Box key={index} mb={3}>
                {/* Título tipo "marcador verde" */}
                <Box
                  sx={{
                    backgroundColor: '#415b2a',
                    color: 'white',
                    paddingTop: '8px',
                    paddingLeft: '16px',
                    paddingBottom: '8px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                  
                >
                  {getTitulo(categoria.tipo)}
                </Box>

                <Box mt={1} pl={2}>
                  <List dense>
                    {categoria.archivos.map((archivo, i) => (
                      <ListItem key={i}>
                        <ListItemIcon
                          style={{paddingRight: 0, marginRight: -25}}>
                          {getIconByExtension(archivo)}
                        </ListItemIcon>
                        <ListItemText
                          style={{paddingLeft: 0, marginLeft: 0, }}
                          primary={
                            <MuiLink
                              href={archivo}
                              underline="hover"
                              color="inherit"
                              download
                            >
                              {archivo.split('/').pop()}
                            </MuiLink>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

              </Box>
            </Grid>
            
          ))}
        </Grid>
      </Grid>
    </div>

  );
}


export default DescargasGrid;

/*
*/