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
            nombre="Biblioteca de México"
            resumen="Desde su fundación, a comienzos de 1990, la revista Biblioteca de México ha publicado 172 números impresos y 4 números digitales. A lo largo de más de 30 años, ha dado espacio a trabajos de creación, investigación y crítica a autores de habla hispana y de otros idiomas. Pensada originalmente como una revista de letras en el sentido clásico y más generoso del término, que busca dar relieve y difusión a obras inasequibles de los acervos de la biblioteca misma, en esta nueva etapa digital también se tiene el propósito de acercarse a las nuevas generaciones de lectores, publicando a jóvenes escritores e ilustradores. Se trata, así, de sostener un esfuerzo de divulgación literaria que, de la manera más incluyente, brinde hospitalidad a la belleza y la inteligencia de la creación."
            ubicacion='De La Ciudadela 4, Colonia Centro, Centro, Cuauhtémoc, 06040 Ciudad de México, CDMX'
            costo='Sin costo'
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