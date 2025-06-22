import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./../lugarDetalles/components/HeaderLugar";
import Footer from './../../components/Footer/Footer'

import DescargasGrid from './components/DescargasGrid';

import './LugarRepositorio.css';

import fondo2 from '../../img/fondo_oscuro1.jpg'

const LugarRepositorio = () => {
  const { id, nombre } = useParams();
  const navigate = useNavigate();
  console.log(id)
  console.log(nombre)

  const ir_a_detalles = () => {
    navigate(`/lugar/${id}/${nombre}`);
  };

  let nombreA = "Nombre del lugar"

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
      <Grid container spacing={2}  justifyContent="center">
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
              <h2 style={{marginBottom: 0}}>{nombreA}</h2>
              <p style={{marginTop:0, paddingTop:0}}>Consulta el repositorio informativo disponible para este lugar</p>
            </div>
          </Grid>
        </Grid>

        <Grid container size={{xs:12, md:10}} justifyContent='right'>
          <div>
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
                  boxShadow: '4px 4px 3px rgba(0, 0, 0, 0.75)', // sombra más intensa
                },
                }}
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