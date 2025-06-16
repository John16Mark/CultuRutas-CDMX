import React from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Button } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./../lugarDetalles/components/HeaderLugar";
import Footer from './../../components/Footer/Footer'

import DescargasGrid from './components/DescargasGrid';

import './LugarRepositorio.css';

import fondo1 from '../../img/fondo_1.jpg'
import fondo2 from '../../img/fondo_oscuro1.jpg'
import mapa from "./../../img/maps.webp";
import { blue, red } from "@mui/material/colors";

const LugarRepositorio = () => {
  const navigate = useNavigate();
    const ir_a_detalles = () => {
      navigate('/lugar-detalles');
    };
  let nombre = "Nombre del lugar"

  const categorias = [
    {
      tipo: "Documentos Oficiales",
      archivos: ["reglamento.pdf", "convocatoria.docx"]
    },
    {
      tipo: "Imágenes del Evento",
      archivos: ["foto1.png", "foto2.jpg"]
    }
  ];

  return (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh' // asegura que ocupe toda la altura de la ventana
  }}>
    <div className='lugDet-bg'>
      <NavBar
        esTransparente={false}
        esEstatica={false}
      />
      <div>
        <HeaderLugar/>
      </div>
      {
      <Grid container spacing={2}  justifyContent="center"
        >
        <Grid container size={{xs:12, md:10}}>
          <Grid style={{marginTop: 30, marginBottom: 30, backgroundColor: '#cccccc'}} size={{xs:12, md:4}}>
            <div
              style={{backgroundImage: `url(${fondo2})`}}
              className="imagen"
              >
            </div>
          </Grid>
          <Grid size={{xs:12, md:8}} style={{marginTop: 30, marginBottom: 30}}>
            <div
              style={{}}
              >
              <h2 style={{marginBottom: 0}}>{nombre}</h2>
              <p style={{marginTop:0, paddingTop:0}}>Consulta el repositorio informativo disponible para este lugar</p>
            </div>
          </Grid>
        </Grid>

        <Grid container size={{xs:12, md:10}} justifyContent='right'>
          <div>
            <Button
              style={{
                backgroundColor: '#415b2a',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                color: '#ffffff',
                textTransform: 'none'}}
              onClick={ir_a_detalles}>
                Regresar a detalles
            </Button>
          </div>
        </Grid>

        <Grid container size={{xs:12, md:9}} justifyContent='left'>
          <DescargasGrid
            categorias={categorias}></DescargasGrid>
        </Grid>
      </Grid>}



      <div style={{ flex: 1 }}>

      </div>
      <Footer />
    </div>
  </div>
  )
}

export default LugarRepositorio;