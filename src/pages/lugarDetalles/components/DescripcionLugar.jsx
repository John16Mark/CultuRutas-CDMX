import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Rating, ImageList, ImageListItem, useMediaQuery, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessibleIcon from '@mui/icons-material/Accessible';


import {APIProvider, Map} from '@vis.gl/react-google-maps';

import './DescripcionLugar.css'

import mapa from "./../../../img/maps.webp";

function DescripcionLugar({nombre,
  resumen,
  ubicacion,
  costo,
  horario,
  accesibilidad,
  ma,
  latitud,
  longitud
}){
  const navigate = useNavigate();
  const ir_a_repositorio = () => {
    navigate('/lugar-repositorio');
  };

  let isLogged = false
  let value = "2.0"
  let Rating = "2.0"
  let isClickedDeseados = false
  let isClickedFavoritos = false
  const handleButtonDeseadosClick = () => {}
  const handleButtonFavoritosClick = () => {}

  const detalles = [
    { icon: <LocationOnIcon />, titulo: 'Ubicación', texto: ubicacion },
    { icon: <AttachMoneyIcon />, titulo: 'Costos', texto: costo },
    { icon: <AccessTimeIcon />, titulo: 'Horarios', texto: horario },
    { icon: <AccessibleIcon />, titulo: 'Accesibilidad', texto: accesibilidad },
    // Puedes añadir más campos aquí si lo deseas
  ];

  return (
    <section className='pp-descripcion-lugar container-fluid'>

      <div className='pp-descripcion-lugar-row'>

        {/* Sección - Información Principal: Nombre lugar, Calificación, Drescripción, Imágenes */}
        <div className='pp-informacion-principal'>
          { /* Nombre del lugar */}
          <h1 className='pp-informacion-principal-nombre-lugar'>
            {nombre}
          </h1>
          { /* Calificación del lugar */}
          <div className='pp-informacion-principal-calificacion'>
            { /* Guardar en Favoritos y Deseados */}
            <div className='pp-informacion-principal-btns'>
              {isLogged ?
              <>
                {/* Botón agregar a Favoritos */}
                <Button
                  variant='outlined'
                  onClick={handleButtonFavoritosClick}
                  size='small' 
                  sx={{
                    borderColor:'red',
                    color: 'red',
                    backgroundColor: 'white',
                    marginLeft: '5px',
                    '&:hover': {
                      color: 'red',
                    },
                    minWidth: '40px', 
                    minHeight: '40px', 

                  }}
                >
                  {/*
                  {isClickedFavoritos ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  */}
                </Button>
              </>
              :
                ''
              }
            </div>
          </div>
          {/* Descripción del lugar */}
          <p style={{marginBottom:20}}>
            {resumen}
          </p>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              sx={{
                backgroundColor: '#415b2a',
                color: '#ffffff',
                paddingY: 1, // equivalente a paddingTop y paddingBottom de 8px
                paddingX: 3, // equivalente a paddingLeft y paddingRight de 25px aprox
                textTransform: 'none',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // sombra normal
                '&:hover': {
                  backgroundColor: '#32461f', // tono más oscuro para hover
                  boxShadow: '4px 4px 3px rgba(0, 0, 0, 0.75)', // sombra más intensa
                },
                }}
              onClick={ir_a_repositorio}
            >
              Ir al repositorio
            </Button>
          </Box>

          <div style={{justifyContent: 'right'}} >
            
          </div>

          {/*Detalles del lugar*/}
          <div className='DesLug-datos'
            style={{marginTop:30}}>
            
            <div>

              <div id="map" className='pp-informacion-lugar-card-mapa' style={{height: '300px', margin: 0, padding: 0, backgroundColor: '#cccccc'}}>
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY} onLoad={() => console.log('Maps API has loaded.')}style={{height: '100%', margin: 0, padding: 0, backgroundColor: '#cccccc'}}> 
                  <Map defaultZoom={18} defaultCenter={ { lat: latitud, lng: longitud } } style={{height: '100%', margin: 0, padding: 0}}>
                  </Map>
                </APIProvider>
              </div>
              <a className="pp-informacion-lugar-card-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nombre)}`} >Ver en GoogleMaps</a>
            </div>
            
            <table className='DesLug-tabla-detalles'>
              <tbody>
                {detalles.map((item, index) => {
                  const esVacio =
                    item.texto === null ||
                    item.texto === undefined ||
                    item.texto === '' ||
                    (Array.isArray(item.texto) && item.texto.length === 0);

                  return (
                    <React.Fragment key={index}>
                      {/* Encabezado */}
                      <tr className='DesLug-encabezado' style={{/*backgroundColor: '#415b2a'*/}}>
                        <td>
                          <span className='DesLug-encabezado-contenido'>
                            {item.icon}
                            <strong style={{ marginLeft: 8 }}>{item.titulo}</strong>
                          </span>
                        </td>
                      </tr>
                      {/* Contenido */}
                      <tr className='DesLug-detalle'>
                        <td>
                          {esVacio ? (
                            <span>Datos desconocidos</span>
                          ) : Array.isArray(item.texto) ? (
                            item.texto.map((linea, i) => <div key={i}>{linea}</div>)
                          ) : (
                            item.texto
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>


          </div>
          
        </div>

      </div>
    </section>
  );
}

export default DescripcionLugar;