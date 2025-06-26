// src/pages/gestor/EditarSitioGestor.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container, Typography, Grid, Card, CardContent, Chip,
  TextField, Checkbox, FormControlLabel, Button
} from '@mui/material';
import Alerta from '../../components/Alerta/Alerta';
//import alert_success from '../../../public/imgs/alert_success.png'; // o usa el path relativo correcto





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

  if (cargando) return <Typography>Cargando...</Typography>;
  if (error) return <Typography>{error}</Typography>;
  if (!sitio) return <Typography>No se encontró el sitio</Typography>;

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>{sitio.nombre}</Typography>
      {/*Descripcion*/}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Descripción"
          multiline
          rows={3}
          value={formData.descripcion}
          onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
        />
      </Grid>
      
      <Grid container spacing={2}>
        {/* Horarios */}
        <Grid item xs={12}>
          <Typography variant="h6">Horarios</Typography>
          {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map(dia => (
            <TextField
              key={dia}
              fullWidth
              label={`Horario ${dia}`}
              value={formData[`h_${dia}`]}
              onChange={(e) => setFormData(prev => ({ ...prev, [`h_${dia}`]: e.target.value }))}
              sx={{ mb: 1 }}
            />
          ))}
        </Grid>

        {/* Costos y promociones */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Costos"
            value={formData.costos}
            onChange={(e) => setFormData(prev => ({ ...prev, costos: e.target.value }))}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Promociones"
            value={formData.promociones}
            onChange={(e) => setFormData(prev => ({ ...prev, promociones: e.target.value }))}
          />
        </Grid>

        {/* Tipo */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Tipo"
            value={formData.tipo}
            onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
          />
        </Grid>

        {/* Accesibilidad */}
        <Grid item xs={12}>
          <Typography variant="h6">Accesibilidad</Typography>
          {[
            { label: 'Estacionamiento', key: 'accesibilidadParking' },
            { label: 'Entrada', key: 'accesibilidadEntrance' },
            { label: 'Baños', key: 'accesibilidadRestroom' },
            { label: 'Asientos', key: 'accesibilidadSeating' },
            { label: 'Pet Friendly', key: 'petfriendly' }
          ].map(({ label, key }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={formData[key]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.checked }))}
                />
              }
              label={label}
            />
          ))}
        </Grid>


        {/* Repositorio */}
        <Grid item xs={12}>
          <Typography variant="h6">Repositorio</Typography>
          {sitio.categorias_descarga.length > 0 ? sitio.categorias_descarga.map(categoria => (
            <Card key={categoria.tipo} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">{categoria.tipo}</Typography>
                <ul>
                  {categoria.archivos.map(archivo => (
                    <li key={archivo}><a href={archivo} target="_blank" rel="noreferrer">{archivo}</a></li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )) : <Typography>No hay archivos disponibles.</Typography>}
        </Grid>

        {/* Multimedia desde base de datos */}
        <Grid item xs={12}>
          <Typography variant="h6">Archivos Multimedia desde Base de Datos</Typography>
          {sitio.archivos_multimedia && sitio.archivos_multimedia.length > 0 ? (
            <ul>
              {sitio.archivos_multimedia.map((archivo, index) => (
                <li key={index}>
                  <a href={archivo.ruta_local} target="_blank" rel="noopener noreferrer">
                    {archivo.nombre}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2">No hay archivos multimedia disponibles.</Typography>
          )}
        </Grid>

        {/* Documentos desde base de datos */}
        <Grid item xs={12}>
          <Typography variant="h6">Documentos desde Base de Datos</Typography>
          {sitio.archivos_documentos && sitio.archivos_documentos.length > 0 ? (
            <ul>
              {sitio.archivos_documentos.map((archivo, index) => (
                <li key={index}>
                  <a href={archivo.ruta_local} target="_blank" rel="noopener noreferrer">
                    {archivo.nombre}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2">No hay documentos disponibles.</Typography>
          )}
        </Grid>


        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/gestor')}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={() => alertaRef.current.handleClickOpen()}>
            Guardar cambios
          </Button>
        </Grid>


      </Grid>
      <Alerta
        ref={alertaRef}
        titulo="¿Deseas guardar los cambios?"
        mensaje="Esta acción actualizará la información del sitio turístico."
        imagen="/imgs/alert_success.png" // o usa la ruta correcta
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
  );
};

export default EditarSitioGestor;
