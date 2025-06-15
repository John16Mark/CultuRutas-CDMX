import React from "react";

import { Container, Grid } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./components/HeaderLugar";
import ImagenesLugar from "./components/ImagenesLugar";
import DescripcionLugar from './components/DescripcionLugar'
import Footer from './../../components/Footer/Footer'

import './LugarDetalles.css';

import fondo1 from '../../img/fondo_1.jpg'
import fondo2 from '../../img/fondo_oscuro1.jpg'
import mapa from "./../../img/maps.webp";

const LugarDetalles = () => {

  let imgs = []
  imgs.push(fondo1)
  imgs.push(fondo2)

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
    {<Grid container spacing={2}  justifyContent="center"
      >
      <Grid size={{xs:12, md:4}}>
        <div>
          <ImagenesLugar
            imagenes={imgs}
          />
          
        </div>
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <div style={{/*backgroundColor:'#cccccc'*/}}>
          <DescripcionLugar
            nombre="Nombre del lugar"
            resumen="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at tincidunt ex, eu tincidunt nulla. Nam congue cursus diam sed commodo. Nam elit turpis, tempor eu blandit at, convallis vitae ipsum. Duis vel placerat turpis. Etiam ut sem ut turpis tincidunt posuere. Proin non luctus sem. Nullam sed tortor sed lorem hendrerit vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut eu dignissim elit. Suspendisse tempus lobortis turpis quis euismod. Ut congue euismod felis, a posuere neque auctor tristique. Nullam ut elit tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;."
            ubicacion='hola'
            costo='hola'
            horario='hola'
            accesibilidad='hola'
            ma={mapa}
          />
        </div>
      </Grid>
    </Grid>}

    <Footer></Footer>
  </div>
  )
}

export default LugarDetalles;