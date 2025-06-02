import React, { useEffect, useState } from 'react';

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
      Botones
      </div>

    </div>
  );
}

export default HeaderLugar;