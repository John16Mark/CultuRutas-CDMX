import React from "react";

import { Container, Grid } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./componentes/HeaderLugar";
import DescripcionLugar from './componentes/DescripcionLugar'

import './LugarDetalles.css';

const LugarDetalles = () => {
  return (
  <div className='lugDet-bg'>
    <NavBar
      esTransparente={false}
      esEstatica={false}
    />
    <div>
      <HeaderLugar

      />
    </div>
    {<Grid container spacing={2}>
      <Grid size={{xs:12, md:4}}>
        <div>Hola</div>
      </Grid>
      <Grid size={{xs:12, md:8}}>
        <div style={{backgroundColor:'#cccccc'}}>
          <DescripcionLugar
            nombre="Nombre del lugar"
            resumen="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tincidunt ex, eu tincidunt nulla. Nam congue cursus diam sed commodo. Nam elit turpis, tempor eu blandit at, convallis vitae ipsum. Duis vel placerat turpis. Etiam ut sem ut turpis tincidunt posuere. Proin non luctus sem. Nullam sed tortor sed lorem hendrerit vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut eu dignissim elit. Suspendisse tempus lobortis turpis quis euismod. Ut congue euismod felis, a posuere neque auctor tristique. Nullam ut elit tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;."
          />
        </div>
      </Grid>
    </Grid>}

  </div>
  )
}

export default LugarDetalles;