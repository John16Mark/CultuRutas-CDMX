import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FiltroDropdown = ({ name, label, value, onChange, opciones, sx }) => {
  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
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
        },
        ...sx, // permite sobreescribir estilos si lo necesitas
      }}
    >
      <InputLabel
        sx={{
          color: '#415b2a',
          '&.Mui-focused': {
            color: '#2b4a1c',
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        renderValue={(selected) => {
          const opcionSeleccionada = opciones.find(op => op.value === selected);
          return opcionSeleccionada ? opcionSeleccionada.label : '';
        }}
      >
        {opciones.map((opcion, idx) => (
          <MenuItem key={idx} value={opcion.value}>
            {opcion.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FiltroDropdown;
