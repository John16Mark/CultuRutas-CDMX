import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Paper,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  FormControl,
  AppBar,
  Toolbar,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Collapse,
  Avatar,
  Badge
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Search, 
  Clear, 
  Event, 
  ExpandMore, 
  ExpandLess 
} from '@mui/icons-material';

// Importa tu imagen de fondo
import fondoOscuro from '../../img/crema2.png';

import NavBar from '../../components/NavBar/NavBar';
import Footer from './../../components/Footer/Footer';
import BarraFiltros from './components/BarraFiltros';

import { useNavigate } from 'react-router-dom';

const PlacesCRUD = () => {
  const [places, setPlaces] = useState([]);
  const [expandedPlaceId, setExpandedPlaceId] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    id_evento: null,
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    file: null
  });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: ''
  });

  // Tipos y categorías disponibles
  const tipos = [
    { value: '', label: 'Todas' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'historico', label: 'Histórico' },
    { value: 'natural', label: 'Natural' },
    { value: 'religioso', label: 'Religioso'}
  ];
  const categorias = [
    { value: '', label: 'Todas' },
    { value: 'museum', label: 'Museos' },
    { value: 'monument', label: 'Monumentos' },
    { value: 'archaeological_zone', label: 'Zonas arqueológicas' },
  ];
  
  //Evento click en las tarjetas.
  const navigate = useNavigate();

  const handleClick = (id_sitio) => {
    navigate(`/gestor/sitio/${id_sitio}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario?.id_gestor) return;

      try {
        const { data } = await axios.get(`http://localhost:3001/api/lugares/gestor/${usuario.id_gestor}`);
        const sitios = data.resultado;

        const sitiosConEventos = await Promise.all(
          sitios.map(async sitio => {
            // Buscar los eventos del sitio
            let id = sitio.id_sitio;
            const eventosRes = await axios.post('http://localhost:3001/get_eventos_lugar', {id});
            console.log("eventosRes", eventosRes)
            return { 
              ...sitio, 
              events: eventosRes.data.resultado || [],
              type: sitio.tipo || 'Cultural', // Asignar un tipo por defecto
              categories: [sitio.tipo || 'Cultural'] // Usar el tipo como categoría por defecto
            };
          })
        );

        setPlaces(sitiosConEventos);
      } catch (error) {
        console.error('Error cargando sitios:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrado de lugares
  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || 
                          (place.categories && place.categories.includes(filters.category));
    
    const matchesType = !filters.type || place.type === filters.type;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleExpandPlace = (placeId) => {
    setExpandedPlaceId(expandedPlaceId === placeId ? null : placeId);
  };

  const handleAddEvent = (placeId) => {
    setCurrentPlaceId(placeId);
    setCurrentEvent({ id_evento: null, title: '', startDate: '', endDate: '', description: '', file: null });
    setEventDialogOpen(true);
  };

  const handleEditEvent = (placeId, event) => {
    setCurrentPlaceId(placeId);
    setCurrentEvent({
      id_evento: event.id_evento,
      title: event.promociones,
      startDate: event.fecha_inicio,
      endDate: event.fecha_fin,
      description: event.descripcion,
      file: null
    });
    setEventDialogOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3001/api/lugares/evento/${eventId}`);
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const { data } = await axios.get(`http://localhost:3001/api/lugares/gestor/${usuario.id_gestor}`);
      const sitiosConEventos = await Promise.all(
        data.resultado.map(async sitio => {
          const eventosRes = await axios.get(`http://localhost:3001/api/lugares/evento/${sitio.id_sitio}`);
          return { ...sitio, events: eventosRes.data.resultado || [] };
        })
      );
      setPlaces(sitiosConEventos);
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  const handleFileChange = (e) => {
    setCurrentEvent(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSaveEvent = async () => {
    try {
      const formData = new FormData();
      formData.append('id_sitio', currentPlaceId);
      formData.append('fecha_inicio', currentEvent.startDate);
      formData.append('fecha_fin', currentEvent.endDate);
      formData.append('descripcion', currentEvent.description);
      formData.append('promociones', currentEvent.title);
      if (currentEvent.file) {
        formData.append('imagen', currentEvent.file);
      }

      if (currentEvent.id_evento) {
        // Edición
        await axios.put(
          `http://localhost:3001/api/lugares/evento/${currentEvent.id_evento}`,
          formData
        );
      } else {
        // Creación
        await axios.post('http://localhost:3001/api/lugares/evento', formData);
      }

      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const updated = await axios.get(`http://localhost:3001/api/lugares/gestor/${usuario.id_gestor}`);
      const sitiosConEventos = await Promise.all(
        updated.data.resultado.map(async sitio => {
          const eventosRes = await axios.get(`http://localhost:3001/api/lugares/evento/${sitio.id_sitio}`);
          return { ...sitio, events: eventosRes.data.resultado || [] };
        })
      );
      setPlaces(sitiosConEventos);
      setEventDialogOpen(false);
    } catch (error) {
      console.error('Error al guardar evento:', error);
    }
  };

  // Manejadores de filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ category: '', type: '' });
  };

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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
          color: 'white'
        }}>
          
          <Typography variant="h4" component="h1" color="black" style={{ textAlign: 'center', width: '100%' }}>
            Panel de Sitios Turísticos
          </Typography>
        </Box>

        {/* Filtros */}
        <BarraFiltros
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          handleFilterChange={handleFilterChange}
          clearFilters={clearFilters}
          filteredCount={filteredPlaces.length}
          totalCount={places.length}
          categorias={categorias}
          tipos={tipos}
        />

        {/* Listado de lugares */}
        {filteredPlaces.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredPlaces.map((place) => (
              <Grid size={{xs:12, sm:6, md:4}} key={place.id_sitio}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(49, 26, 26, 0.68)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => handleClick(place.id_sitio)}
              >
                  <CardMedia
                    component="img"
                    height="130"
                    image={place.imagen || '/imgs/no_image.jpg'}
                    alt={place.nombre}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {place.nombre}
                      </Typography>
                      <IconButton 
                        onClick={() => toggleExpandPlace(place.id_sitio)}
                        size="small"
                        sx={{ color: 'white' }}
                      >
                        {expandedPlaceId === place.id_sitio ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>
                    <Chip 
                      label={place.type} 
                      size="small" 
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                      {place.descripcion}
                    </Typography>
                  </CardContent>
                  
                  {/* Sección de eventos colapsable */}
                  <Collapse in={expandedPlaceId === place.id_sitio} timeout="auto" unmountOnExit>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <Box sx={{ p: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 2
                      }}>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                          Eventos
                        </Typography>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          startIcon={<Add />}
                          onClick={() => handleAddEvent(place.id_sitio)}
                          sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.23)' }}
                        >
                          Agregar
                        </Button>
                      </Box>
                      
                      {place.events.length > 0 ? (
                        <List dense sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 1
                        }}>
                          {place.events.map((event) => (
                            <ListItem key={event.id_evento} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                              <Avatar sx={{ 
                                bgcolor: 'primary.main', 
                                mr: 2,
                                width: 32,
                                height: 32
                              }}>
                                <Event fontSize="small" />
                              </Avatar>
                              <ListItemText
                                primary={event.promociones}
                                secondary={`Del ${event.fecha_inicio} al ${event.fecha_fin} - ${event.descripcion}`}
                                primaryTypographyProps={{ color: 'white' }}
                                secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}
                              />
                              <ListItemSecondaryAction>
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleEditEvent(place.id_sitio, event)}
                                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleDeleteEvent(event.id_evento)}
                                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255, 255, 255, 0.5)', 
                          textAlign: 'center',
                          py: 2
                        }}>
                          No hay eventos programados
                        </Typography>
                      )}
                    </Box>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white'
          }}>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              No se encontraron lugares con los filtros aplicados
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<Clear />}
              onClick={clearFilters}
              sx={{ 
                mt: 2,
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.23)'
              }}
            >
              Limpiar filtros
            </Button>
          </Paper>
        )}

        {/* Diálogo para agregar/editar eventos */}
        <Dialog 
          open={eventDialogOpen} 
          onClose={() => setEventDialogOpen(false)} 
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white'
            }
          }}
        >
          <DialogTitle>
            {currentEvent.id_evento ? 'Editar Evento' : 'Agregar Nuevo Evento'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid size={{xs: 12}}>
                <TextField
                  fullWidth
                  label="Título o Promoción"
                  value={currentEvent.title}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                  margin="normal"
                  required
                  sx={{
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                      '& input': { color: 'white' }
                    }
                  }}
                />
              </Grid>
              <Grid item size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Fecha de inicio"
                  type="date"
                  value={currentEvent.startDate}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, startDate: e.target.value })}
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                      '& input': { color: 'white' }
                    }
                  }}
                />
              </Grid>
              <Grid item size={{xs:12, md:6}}>
                <TextField
                  fullWidth
                  label="Fecha de fin"
                  type="date"
                  value={currentEvent.endDate}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, endDate: e.target.value })}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                      '& input': { color: 'white' }
                    }
                  }}
                />
              </Grid>
              <Grid item size={{xs:12}}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  value={currentEvent.description}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                  margin="normal"
                  sx={{
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                      '& textarea': { color: 'white' }
                    }
                  }}
                />
              </Grid>
              <Grid item size={{xs:12}}>
                <InputLabel sx={{ color: 'white' }}>Imagen del evento</InputLabel>
                <Button 
                  variant="contained" 
                  component="label" 
                  fullWidth
                  sx={{ 
                    mt: 1,
                    backgroundColor: 'primary.main'
                  }}
                >
                  Subir Imagen
                  <input 
                    type="file" 
                    hidden 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setEventDialogOpen(false)}
              sx={{ color: 'white' }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveEvent} 
              variant="contained"
              disabled={!currentEvent.title || !currentEvent.startDate}
              sx={{ backgroundColor: 'primary.main' }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <Footer esTransparente={false} />
    </Box>
  );
};

export default PlacesCRUD;