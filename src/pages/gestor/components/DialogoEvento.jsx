import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, InputLabel, Button
} from '@mui/material';

const formatDateForInput = (isoString) => {
  if (!isoString) return '';
  return isoString.split('T')[0]; // se queda con 'YYYY-MM-DD'
};

const DialogoEvento = ({
  open,
  onClose,
  eventData,
  setEventData,
  onSave,
  onFileChange
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          color: '#5a3e36'
        }
      }}
    >
      <DialogTitle>
        {eventData.id_evento ? 'Editar Evento' : 'Agregar Nuevo Evento'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ pt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Título o Promoción"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              margin="normal"
              required
              sx={{
                '& .MuiInputLabel-root': { color: '#415b2a' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#415b2a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#32461f',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2b4a1c',
                  },
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Fecha de inicio"
              type="date"
              value={formatDateForInput(eventData.startDate)}
              onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiInputLabel-root': { color: '#415b2a' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#415b2a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#32461f',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2b4a1c',
                  },
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Fecha de fin"
              type="date"
              value={formatDateForInput(eventData.endDate)}
              onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiInputLabel-root': { color: '#415b2a' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#415b2a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#32461f',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2b4a1c',
                  },
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descripción"
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              margin="normal"
              sx={{
                '& .MuiInputLabel-root': { color: '#415b2a' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#415b2a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#32461f',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2b4a1c',
                  },
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel sx={{ color: '#5a3e36' }}>Imagen del evento</InputLabel>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                backgroundColor: '#415b2a',
                color: '#ffffff',
                paddingY: 1, // equivalente a paddingTop y paddingBottom de 8px
                paddingX: 3, // equivalente a paddingLeft y paddingRight de 25px aprox
                textTransform: 'none',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // sombra normal
                '&:hover': {
                  backgroundColor: '#32461f', // tono más oscuro para hover
                  boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.75)', // sombra más intensa
                },
              }}
            >
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onFileChange}
              />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: 'white' }}>
          Cancelar
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          disabled={!eventData.title || !eventData.startDate}
          sx={{
            backgroundColor: '#a9825a',
            color: '#ffffff',
            paddingY: 1, // equivalente a paddingTop y paddingBottom de 8px
            paddingX: 3, // equivalente a paddingLeft y paddingRight de 25px aprox
            textTransform: 'none',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // sombra normal
            '&:hover': {
              backgroundColor: '#32461f', // tono más oscuro para hover
              boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.75)', // sombra más intensa
            },
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogoEvento;
