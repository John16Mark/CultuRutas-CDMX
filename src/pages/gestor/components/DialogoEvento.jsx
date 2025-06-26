import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Grid, InputLabel, Button
} from '@mui/material';

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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white'
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
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  '& input': { color: 'white' }
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Fecha de inicio"
              type="date"
              value={eventData.startDate}
              onChange={(e) => setEventData({ ...eventData, startDate: e.target.value })}
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

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Fecha de fin"
              type="date"
              value={eventData.endDate}
              onChange={(e) => setEventData({ ...eventData, endDate: e.target.value })}
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
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                  '& textarea': { color: 'white' }
                }
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
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
          sx={{ backgroundColor: 'primary.main' }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogoEvento;
