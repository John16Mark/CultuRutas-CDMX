import React from "react";
import {Rating, ImageList, ImageListItem, useMediaQuery, Button } from '@mui/material';

import './DescripcionLugar.css'

import mapa from "./../../../img/maps.webp";

function DescripcionLugar({nombre, resumen}) {
  let isLogged = false
  let value = "2.0"
  let Rating = "2.0"
  let isClickedDeseados = false
  let isClickedFavoritos = false
  const handleButtonDeseadosClick = () => {}
  const handleButtonFavoritosClick = () => {}

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
          <p>
            {resumen}
          </p>
          {/*Detalles del lugar*/}
          <div className='DesLug-datos'>
            
            <div
              className='DesLug-mapa'
              style={{
                backgroundImage: `url(${mapa})`,
                }}>
            </div>

            <p>Contenido
              contenido</p>
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