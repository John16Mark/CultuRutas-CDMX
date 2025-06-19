import React from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Rating, ImageList, ImageListItem, useMediaQuery, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessibleIcon from '@mui/icons-material/Accessible';

import './DescripcionLugar.css'

import mapa from "./../../../img/maps.webp";

function DescripcionLugar({nombre,
  resumen,
  ubicacion,
  costo,
  horario,
  accesibilidad,
  ma,
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
    { icon: <LocationOnIcon />, texto: ubicacion },
    { icon: <AttachMoneyIcon />, texto: costo },
    { icon: <AccessTimeIcon />, texto: horario },
    { icon: <AccessibleIcon />, texto: accesibilidad },
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
            
            <div
              className='DesLug-mapa'
              style={{
                backgroundImage: `url(${mapa})`,
                }}>
            </div>
            
            <ul className='DesLug-lista-detalles'>
              {detalles.map((item, index) =>
                item.texto ? (
                  <li key={index} className='DesLug-detalle-item'>
                    {item.icon}
                    <span>{item.texto}</span>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          
          {/* Impagenes del lugar */}
          <div className='pp-informacion-principal-imagenes'>
            {/*galeria()*/}
          </div>
        </div>

      </div>
    </section>
  );
}

export default DescripcionLugar;