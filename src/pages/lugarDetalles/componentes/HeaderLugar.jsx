import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';

import './HeaderLugar.css'

import image from "./../../../img/banner.png";

function HeaderLugar({  }) {

  const handleHomePageClick = () => {
    
  }

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
      style={{
        backgroundColor: '#415b2a',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#ffffff',
        textTransform: 'none'}}>
          Regresar
      </Button>
      </div>

    </div>
  );
}

export default HeaderLugar;