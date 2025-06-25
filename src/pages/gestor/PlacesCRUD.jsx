import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
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

// Componente Navbar
const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
          CultuRutas
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link href="/" color="inherit" underline="hover" sx={{ color: 'white' }}>Inicio</Link>
          <Link href="/gestor" color="inherit" underline="hover" sx={{ color: 'white', fontWeight: 'bold' }}>Gestor</Link>
          <Link href="/lugares" color="inherit" underline="hover" sx={{ color: 'white' }}>Lugares</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: 'white',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              CultuRutas
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Descubre los lugares históricos de la Ciudad de México
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Enlaces
            </Typography>
            <Link href="/" color="inherit" display="block" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Inicio</Link>
            <Link href="/gestor" color="inherit" display="block" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Gestor</Link>
            <Link href="/lugares" color="inherit" display="block" underline="hover" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Lugares</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>contacto@culturutas.com</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>+52 55 1234 5678</Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} CultuRutas - Todos los derechos reservados
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const PlacesCRUD = () => {
  // Datos iniciales con eventos
  const initialPlaces = [
    {
      id: 1,
      name: 'Biblioteca de México',
      description: 'Biblioteca pública ubicada en el centro de la Ciudad de México.',
      categories: ['Biblioteca', 'Cultural'],
      type: 'Cultural',
      image: '/imagenes/biblioteca_mexico.png',
      events: [
        {
          id: 1,
          title: 'Lectura de poesía',
          date: '2023-11-15',
          description: 'Lectura de poesía contemporánea',
          attendees: 25
        },
        {
          id: 2,
          title: 'Taller de escritura',
          date: '2023-11-20',
          description: 'Taller para principiantes',
          attendees: 15
        }
      ]
    },
    {
      id: 2,
      name: 'Ángel de la Independencia',
      description: 'Monumento emblemático de la Ciudad de México.',
      categories: ['Monumento', 'Histórico'],
      type: 'Histórico',
      image: '/imagenes/angel.png',
      events: []
    },
    {
      id: 3,
      name: 'Castillo de Chapultepec',
      description: 'Único castillo real en América del Norte.',
      categories: ['Museo', 'Histórico'],
      type: 'Histórico',
      image: '/imagenes/castillo.png',
      events: []
    },
    {
      id: 4,
      name: 'Lago de Xochimilco',
      description: 'Red de canales y chinampas declaradas Patrimonio de la Humanidad.',
      categories: ['Naturaleza', 'Paseo'],
      type: 'Natural',
      image: '/imagenes/lago.png',
      events: []
    }
  ];

  // Estados para lugares
  const [places, setPlaces] = useState(initialPlaces);
  const [filteredPlaces, setFilteredPlaces] = useState(initialPlaces);
  const [editingPlace, setEditingPlace] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    type: ''
  });

  // Estados para eventos
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [expandedPlaceId, setExpandedPlaceId] = useState(null);

  // Tipos y categorías disponibles
  const placeTypes = ['Cultural', 'Histórico', 'Natural', 'Religioso'];
  const allCategories = ['Biblioteca', 'Monumento', 'Museo', 'Naturaleza', 'Paseo', 'Histórico', 'Cultural'];

  // Filtrado de lugares
  useEffect(() => {
    let results = places;
    
    if (searchTerm) {
      results = results.filter(place =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.category) {
      results = results.filter(place => 
        place.categories.includes(filters.category)
      );
    }
    
    if (filters.type) {
      results = results.filter(place => place.type === filters.type);
    }
    
    setFilteredPlaces(results);
  }, [searchTerm, filters, places]);

  // Manejadores para lugares
  const handleAddPlace = () => {
    setEditingPlace({
      id: null,
      name: '',
      description: '',
      categories: [],
      type: '',
      image: null,
      events: []
    });
    setOpenDialog(true);
  };

  const handleEditPlace = (place) => {
    setEditingPlace({ ...place });
    setOpenDialog(true);
  };

  const handleDeletePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  const handleSavePlace = () => {
    if (editingPlace.id) {
      setPlaces(places.map(place => 
        place.id === editingPlace.id ? editingPlace : place
      ));
    } else {
      const newId = Math.max(...places.map(p => p.id), 0) + 1;
      setPlaces([...places, { ...editingPlace, id: newId }]);
    }
    setOpenDialog(false);
  };

  // Manejadores para categorías
  const addCategory = () => {
    if (newCategory && !editingPlace.categories.includes(newCategory)) {
      setEditingPlace(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory]
      }));
      setNewCategory('');
    }
  };

  const removeCategory = (category) => {
    setEditingPlace(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };

  // Manejadores para eventos
  const handleAddEvent = (placeId) => {
    setCurrentPlaceId(placeId);
    setCurrentEvent({
      id: null,
      title: '',
      date: '',
      description: '',
      attendees: 0
    });
    setEventDialogOpen(true);
  };

  const handleEditEvent = (placeId, event) => {
    setCurrentPlaceId(placeId);
    setCurrentEvent({ ...event });
    setEventDialogOpen(true);
  };

  const handleDeleteEvent = (placeId, eventId) => {
    setPlaces(places.map(place => {
      if (place.id === placeId) {
        return {
          ...place,
          events: place.events.filter(event => event.id !== eventId)
        };
      }
      return place;
    }));
  };

  const handleSaveEvent = () => {
    setPlaces(places.map(place => {
      if (place.id === currentPlaceId) {
        if (currentEvent.id) {
          // Editar evento existente
          return {
            ...place,
            events: place.events.map(event => 
              event.id === currentEvent.id ? currentEvent : event
            )
          };
        } else {
          // Agregar nuevo evento
          const newId = Math.max(...place.events.map(e => e.id), 0) + 1;
          return {
            ...place,
            events: [...place.events, { ...currentEvent, id: newId }]
          };
        }
      }
      return place;
    }));
    setEventDialogOpen(false);
  };

  const toggleExpandPlace = (placeId) => {
    setExpandedPlaceId(expandedPlaceId === placeId ? null : placeId);
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
      <Navbar />

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
          <Typography variant="h4" component="h1" color="black">
            Gestor de Lugares Turísticos
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={handleAddPlace}
            sx={{ ml: 'auto' }}
          >
            Agregar Lugar
          </Button>
        </Box>

        {/* Filtros */}
        <Paper elevation={2} sx={{ 
          p: 3, 
          mb: 4,
          backgroundColor: 'rgba(49, 112, 33, 0.79)',
          color: 'white'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            mb: 2,
            flexWrap: 'wrap'
          }}>
            <TextField
              label="Buscar lugares"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
                sx: { color: 'white' }
              }}
              sx={{ 
                minWidth: 250,
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' }
                }
              }}
            />
            
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={{ color: 'white' }}>Categoría</InputLabel>
              <Select
                name="category"
                value={filters.category}
                label="Categoría"
                onChange={handleFilterChange}
                sx={{ 
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value=""><em>Todas</em></MenuItem>
                {allCategories.map((cat, index) => (
                  <MenuItem key={index} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={{ color: 'white' }}>Tipo</InputLabel>
              <Select
                name="type"
                value={filters.type}
                label="Tipo"
                onChange={handleFilterChange}
                sx={{ 
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)'
                  },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                <MenuItem value=""><em>Todos</em></MenuItem>
                {placeTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button 
              variant="outlined" 
              startIcon={<Clear />}
              onClick={clearFilters}
              disabled={!searchTerm && !filters.category && !filters.type}
              sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.95)' }}
            >
              Limpiar
            </Button>
          </Box>
          
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Mostrando {filteredPlaces.length} de {places.length} lugares
          </Typography>
        </Paper>

        {/* Listado de lugares */}
        {filteredPlaces.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPlaces.map((place) => (
              <Grid item xs={12} sm={6} md={4} key={place.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 4px 20px rgba(49, 26, 26, 0.68)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="130"
                    image={place.image}
                    alt={place.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {place.name}
                      </Typography>
                      <IconButton 
                        onClick={() => toggleExpandPlace(place.id)}
                        size="small"
                        sx={{ color: 'white' }}
                      >
                        {expandedPlaceId === place.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>
                    <Chip 
                      label={place.type} 
                      size="small" 
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.7)' }}>
                      {place.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {place.categories.map((category, index) => (
                        <Chip 
                          key={index} 
                          label={category} 
                          size="small" 
                          variant="outlined"
                          sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.23)' }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  
                  {/* Sección de eventos colapsable */}
                  <Collapse in={expandedPlaceId === place.id} timeout="auto" unmountOnExit>
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
                          onClick={() => handleAddEvent(place.id)}
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
                            <ListItem key={event.id} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                              <Avatar sx={{ 
                                bgcolor: 'primary.main', 
                                mr: 2,
                                width: 32,
                                height: 32
                              }}>
                                <Event fontSize="small" />
                              </Avatar>
                              <ListItemText
                                primary={event.title}
                                secondary={`${event.date} - ${event.attendees} asistentes`}
                                primaryTypographyProps={{ color: 'white' }}
                                secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}
                              />
                              <ListItemSecondaryAction>
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleEditEvent(place.id, event)}
                                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  edge="end" 
                                  onClick={() => handleDeleteEvent(place.id, event.id)}
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
                  
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton 
                      aria-label="editar"
                      onClick={() => handleEditPlace(place)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      aria-label="eliminar"
                      onClick={() => handleDeletePlace(place.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
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

        {/* Diálogo para agregar/editar lugares */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)} 
          maxWidth="md" 
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white'
            }
          }}
        >
          <DialogTitle>
            {editingPlace?.id ? 'Editar Lugar' : 'Agregar Nuevo Lugar'}
          </DialogTitle>
          <DialogContent dividers>
            {editingPlace && (
              <Grid container spacing={3} sx={{ pt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre del lugar"
                    value={editingPlace.name}
                    onChange={(e) => setEditingPlace({...editingPlace, name: e.target.value})}
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
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Descripción"
                    value={editingPlace.description}
                    onChange={(e) => setEditingPlace({...editingPlace, description: e.target.value})}
                    margin="normal"
                    required
                    sx={{
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                        '& textarea': { color: 'white' }
                      }
                    }}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel sx={{ color: 'white' }}>Tipo *</InputLabel>
                    <Select
                      label="Tipo *"
                      value={editingPlace.type}
                      onChange={(e) => setEditingPlace({...editingPlace, type: e.target.value})}
                      required
                      sx={{
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.23)'
                        },
                        '& .MuiSvgIcon-root': { color: 'white' }
                      }}
                    >
                      {placeTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ mb: 1, color: 'white' }}>Imagen</InputLabel>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                      variant="contained" 
                      component="label" 
                      fullWidth
                      sx={{ backgroundColor: 'primary.main' }}
                    >
                      Subir Imagen
                      <input 
                        type="file" 
                        hidden 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const imageUrl = URL.createObjectURL(file);
                            setEditingPlace({...editingPlace, image: imageUrl});
                          }
                        }}
                      />
                    </Button>
                    {editingPlace.image && (
                      <Box sx={{ 
                        border: '1px dashed rgba(255, 255, 255, 0.23)', 
                        p: 1, 
                        display: 'flex', 
                        justifyContent: 'center',
                        borderRadius: 1
                      }}>
                        <img 
                          src={editingPlace.image} 
                          alt="Preview" 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '200px',
                            borderRadius: 4
                          }} 
                        />
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
                    Categorías
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: 'white' }}>Categoría</InputLabel>
                      <Select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        label="Categoría"
                        sx={{
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.23)'
                          },
                          '& .MuiSvgIcon-root': { color: 'white' }
                        }}
                      >
                        {allCategories.map((cat, index) => (
                          <MenuItem key={index} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button 
                      variant="outlined" 
                      onClick={addCategory}
                      disabled={!newCategory}
                      sx={{ 
                        minWidth: 120,
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.23)'
                      }}
                    >
                      Agregar
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {editingPlace.categories.map((category, index) => (
                      <Chip
                        key={index}
                        label={category}
                        onDelete={() => removeCategory(category)}
                        sx={{ 
                          color: 'white',
                          '& .MuiChip-deleteIcon': { color: 'rgba(255, 255, 255, 0.7)' }
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setOpenDialog(false)}
              sx={{ color: 'white' }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSavePlace} 
              variant="contained"
              disabled={!editingPlace?.name || !editingPlace?.description || !editingPlace?.type}
              sx={{ backgroundColor: 'primary.main' }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

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
            {currentEvent?.id ? 'Editar Evento' : 'Agregar Nuevo Evento'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del evento"
                  value={currentEvent?.title || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Fecha"
                  type="date"
                  value={currentEvent?.date || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, date: e.target.value})}
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Asistentes"
                  type="number"
                  value={currentEvent?.attendees || 0}
                  onChange={(e) => setCurrentEvent({...currentEvent, attendees: parseInt(e.target.value) || 0})}
                  margin="normal"
                  sx={{
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                      '& input': { color: 'white' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  value={currentEvent?.description || ''}
                  onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
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
              disabled={!currentEvent?.title || !currentEvent?.date}
              sx={{ backgroundColor: 'primary.main' }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>

      <Footer />
    </Box>
  );
};

export default PlacesCRUD;