// src/pages/gestor/EditarSitioGestor.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, Chip,
  TextField, Checkbox, FormControlLabel, Button, Box,
  Divider, Stack, Paper, List, ListItem, Avatar
} from '@mui/material';
import { Event, ExpandMore, ExpandLess } from '@mui/icons-material';
import Alerta from '../../components/Alerta/Alerta';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';

// Importa tu imagen de fondo
import fondoOscuro from '../../img/crema2.png';

const EditarSitioGestor = () => {
  const { id } = useParams();
  const [sitio, setSitio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const alertaRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDetalles = async () => {
      try {
        const { data } = await axios.post('http://localhost:3001/get_repositorio_lugar', { id });
        setSitio(data.resultado);
        setFormData({
          descripcion: data.resultado.descripcion || '',
          promociones: data.resultado.promociones || '',
          costos: data.resultado.costos || '',
          tipo: data.resultado.tipo || '',
          h_lunes: data.resultado.h_lunes || '',
          h_martes: data.resultado.h_martes || '',
          h_miercoles: data.resultado.h_miercoles || '',
          h_jueves: data.resultado.h_jueves || '',
          h_viernes: data.resultado.h_viernes || '',
          h_sabado: data.resultado.h_sabado || '',
          h_domingo: data.resultado.h_domingo || '',
          accesibilidadParking: !!data.resultado.accesibilidadParking,
          accesibilidadEntrance: !!data.resultado.accesibilidadEntrance,
          accesibilidadRestroom: !!data.resultado.accesibilidadRestroom,
          accesibilidadSeating: !!data.resultado.accesibilidadSeating,
          petfriendly: !!data.resultado.petfriendly
        });

        const archivos = await axios.post('http://localhost:3001/api/lugares/archivos_bd', { id });
        setSitio(prev => ({
          ...prev,
          archivos_multimedia: archivos.data.multimedia || [],
          archivos_documentos: archivos.data.documentos || []
        }));
      } catch (err) {
        setError('Error al cargar los datos del sitio');
      } finally {
        setCargando(false);
      }
    };
    obtenerDetalles();
  }, [id]);

  if (cargando) return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundImage: `url(${fondoOscuro})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: -1
      }
    }}>
      <Typography variant="h6" sx={{ color: 'white' }}>Cargando...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundImage: `url(${fondoOscuro})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: -1
      }
    }}>
      <Typography variant="h6" sx={{ color: 'white' }}>{error}</Typography>
    </Box>
  );

  if (!sitio) return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundImage: `url(${fondoOscuro})`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: -1
      }
    }}>
      <Typography variant="h6" sx={{ color: 'white' }}>No se encontró el sitio</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${fondoOscuro})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: -1
        }
      }}
    >
      <NavBar esTransparente={false} />

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          flex: 1,
          position: 'relative'
        }}
      >
        {/* Encabezado */}
        <Stack direction='row' sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <AssignmentAddIcon sx={{ fontSize: {md: '2.5rem', sm: '2rem', xs: '1.5rem' } }} />
          <Typography fontWeight='bold' sx= {{fontSize: {md: '2.5rem', sm: '2rem', xs: '1.5rem'}, lineHeight: 1, color: 'black' }}>
            Editar Sitio: {sitio.nombre}
          </Typography>
        </Stack>

        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4
        }}>
          {/* Información básica */}
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Información Básica</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          <Grid container spacing={3}>
            {/* Descripción */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={4}
                value={formData.descripcion}
                onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  },
                  '& .MuiInputBase-input': { color: 'white' }
                }}
              />
            </Grid>

            {/* Tipo */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tipo"
                value={formData.tipo}
                onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  },
                  '& .MuiInputBase-input': { color: 'white' }
                }}
              />
            </Grid>

            {/* Costos y promociones */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Costos"
                value={formData.costos}
                onChange={(e) => setFormData(prev => ({ ...prev, costos: e.target.value }))}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  },
                  '& .MuiInputBase-input': { color: 'white' }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Promociones"
                value={formData.promociones}
                onChange={(e) => setFormData(prev => ({ ...prev, promociones: e.target.value }))}
                sx={{
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                  },
                  '& .MuiInputBase-input': { color: 'white' }
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Horarios */}
        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Horarios</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          <Grid container spacing={2}>
            {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map(dia => (
              <Grid item xs={12} sm={6} md={4} key={dia}>
                <TextField
                  fullWidth
                  label={`Horario ${dia.charAt(0).toUpperCase() + dia.slice(1)}`}
                  value={formData[`h_${dia}`]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [`h_${dia}`]: e.target.value }))}
                  sx={{
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                    },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Accesibilidad */}
        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Accesibilidad</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          <Grid container spacing={2}>
            {[
              { label: 'Estacionamiento accesible', key: 'accesibilidadParking' },
              { label: 'Entrada accesible', key: 'accesibilidadEntrance' },
              { label: 'Baños accesibles', key: 'accesibilidadRestroom' },
              { label: 'Asientos accesibles', key: 'accesibilidadSeating' },
              { label: 'Pet Friendly', key: 'petfriendly' }
            ].map(({ label, key }) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[key]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.checked }))}
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-checked': {
                          color: 'primary.main',
                        },
                      }}
                    />
                  }
                  label={label}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Repositorio */}
        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Repositorio</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          {sitio.categorias_descarga.length > 0 ? (
            <Grid container spacing={2}>
              {sitio.categorias_descarga.map(categoria => (
                <Grid item xs={12} sm={6} key={categoria.tipo}>
                  <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                        {categoria.tipo}
                      </Typography>
                      <List dense>
                        {categoria.archivos.map((archivo, index) => (
                          <ListItem key={index} sx={{ py: 0.5 }}>
                            <Avatar sx={{ 
                              bgcolor: 'primary.main', 
                              mr: 2,
                              width: 32,
                              height: 32
                            }}>
                              <Event fontSize="small" />
                            </Avatar>
                            <a 
                              href={archivo} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}
                            >
                              {archivo.split('/').pop()}
                            </a>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>
              No hay archivos disponibles.
            </Typography>
          )}
        </Box>

        {/* Archivos multimedia y documentos */}
        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Archivos Multimedia</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          {sitio.archivos_multimedia && sitio.archivos_multimedia.length > 0 ? (
            <List dense sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
              {sitio.archivos_multimedia.map((archivo, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    mr: 2,
                    width: 32,
                    height: 32
                  }}>
                    <Event fontSize="small" />
                  </Avatar>
                  <a 
                    href={archivo.ruta_local} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}
                  >
                    {archivo.nombre}
                  </a>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>
              No hay archivos multimedia disponibles.
            </Typography>
          )}

          <Typography variant="h6" sx={{ color: 'white', mt: 4, mb: 2 }}>Documentos</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          {sitio.archivos_documentos && sitio.archivos_documentos.length > 0 ? (
            <List dense sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
              {sitio.archivos_documentos.map((archivo, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <Avatar sx={{ 
                    bgcolor: 'primary.main', 
                    mr: 2,
                    width: 32,
                    height: 32
                  }}>
                    <Event fontSize="small" />
                  </Avatar>
                  <a 
                    href={archivo.ruta_local} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}
                  >
                    {archivo.nombre}
                  </a>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>
              No hay documentos disponibles.
            </Typography>
          )}
        </Box>

        {/* Subir archivos */}
        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.6)', 
          color: 'white',
          p: 4,
          borderRadius: 2,
          mb: 4
        }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>Subir Archivos</Typography>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                Subir multimedia (imágenes/videos)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              >
                Seleccionar archivo
                <input
                  type="file"
                  accept="image/*,video/*"
                  hidden
                  onChange={async (e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;

                    const formData = new FormData();
                    formData.append('archivo', archivo);

                    try {
                      await axios.post(`http://localhost:3001/api/lugares/subir_multimedia/${id}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                      });
                    } catch (err) {
                      console.error('Error al subir multimedia:', err);
                    }
                  }}
                />
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 2 }}>
                Subir documento (PDF, Word, etc.)
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              >
                Seleccionar archivo
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  hidden
                  onChange={async (e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;

                    const formData = new FormData();
                    formData.append('archivo', archivo);

                    try {
                      await axios.post(`http://localhost:3001/api/lugares/subir_documento/${id}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                      });
                    } catch (err) {
                      console.error('Error al subir documento:', err);
                    }
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/gestor')}
            sx={{ 
              color: 'white', 
              borderColor: 'rgba(255, 255, 255, 0.23)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => alertaRef.current.handleClickOpen()}
          >
            Guardar cambios
          </Button>
        </Box>

        <Alerta
          ref={alertaRef}
          titulo="¿Deseas guardar los cambios?"
          mensaje="Esta acción actualizará la información del sitio turístico."
          imagen="/imgs/alert_success.png"
          boton1="Sí, guardar"
          boton2="Cancelar"
          onConfirm={async () => {
            try {
              await axios.put(`http://localhost:3001/api/lugares/editar/${id}`, formData);
              navigate('/gestor');
            } catch (error) {
              console.error('Error al guardar sitio:', error);
            }
          }}
        />
      </Container>

      <Footer esTransparente={false} />
    </Box>
  );
};

export default EditarSitioGestor;