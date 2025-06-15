import React from "react";
import {Rating, ImageList, ImageListItem, useMediaQuery, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessibleIcon from '@mui/icons-material/Accessible';

//import './../lugarDetalles'

import mapa from "./../../img/maps.webp";

function LugarRepositorio({nombre,
  resumen,
  ubicacion,
  costo,
  horario,
  accesibilidad,
  ma,
}){
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
          <h2 className='pp-informacion-principal-nombre-lugar'>
            {nombre}
          </h2>
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
          
          <div>
            <Button
              style={{
                backgroundColor: '#415b2a',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                color: '#ffffff',
                textTransform: 'none'}}>
                Ir al repositorio
            </Button>
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

export default LugarRepositorio;