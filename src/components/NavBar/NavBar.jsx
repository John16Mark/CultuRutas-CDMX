import React, { useState, useEffect } from 'react';

import './NavBar.css'

function NavBar({esTransparente, esEstatica}) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg ${esTransparente ? 'position-fixed' : 'bg-light position-initial'} ${esEstatica ? 'position-absolute' : ''}`}>
        <div className="mx-3 container-fluid">
          <a className='titulo'>CultuRutas CDMX</a>
        </div>
      </nav>
    </>
  );
}

export default NavBar;