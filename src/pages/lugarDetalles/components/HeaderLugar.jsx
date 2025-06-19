import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import './HeaderLugar.css'

import image from "./../../../img/banner.png";

function HeaderLugar({  }) {
  const navigate = useNavigate();
  const handleHomePageClick = () => {
    
  }
  const regresar = () => {
    navigate('/lugares');
  };

  return(
    <div className='pp-header-img'
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        //minHeight: 140,
      }}
    >

      <div className='pp-header-btn'>
      {/*<ButtonsMod
        variant='principal'
        textCont='Regresar'
        clickEvent={handleHomePageClick}
        startIcon={<ArrowBackIcon />}
      />      */}
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
            boxShadow: '4px 4px 2px rgba(0, 0, 0, 0.75)', // sombra más intensa
          },
          }}
        onClick={regresar}>
          Regresar
      </Button>
      </div>

    </div>
  );
}

export default HeaderLugar;