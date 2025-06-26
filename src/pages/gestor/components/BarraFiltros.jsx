import {
  Paper, Box, TextField, InputAdornment, Typography,
  Button, Grid
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import Dropdown from './../../../components/Dropdown';

const BarraFiltros = ({
  searchTerm,
  setSearchTerm,
  filters,
  handleFilterChange,
  clearFilters,
  filteredCount,
  totalCount,
  categorias,
  tipos
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 4,
        backgroundColor: '#789262',
        color: 'white'
      }}
    >
      <Grid container spacing={2}>
        {/* Fila 1: buscador */}
        <Grid size={{ xs: 12 }}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Filtrar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 15,
                backgroundColor: '#ffffff',
                '& fieldset': {
                  borderColor: '#415b2a',
                },
                '&:hover fieldset': {
                  borderColor: '#32461f',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2b4a1c',
                },
              },
            }}
          />
        </Grid>

        {/* Fila 2: dropdowns */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Dropdown
            name="category"
            label="Categoría"
            value={filters.category}
            onChange={handleFilterChange}
            opciones={categorias}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Dropdown
            name="type"
            label="Tipo"
            value={filters.type}
            onChange={handleFilterChange}
            opciones={tipos}
          />
        </Grid>

        {/* Fila 3: texto y botón */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Mostrando {filteredCount} de {totalCount} lugares
            </Typography>

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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BarraFiltros;
