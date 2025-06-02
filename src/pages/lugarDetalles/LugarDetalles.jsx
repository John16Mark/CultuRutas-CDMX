import React from "react";


import './LugarDetalles.css';

import DescripcionLugar from './componentes/DescripcionLugar'

const LugarDetalles = () => {
  return (
    <DescripcionLugar
      nombre={'Nombre'}
      resumen={'Resumen'}
    />
  )
}

export default LugarDetalles;