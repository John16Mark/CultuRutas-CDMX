import React, { useEffect, useState }from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./../lugarDetalles/components/HeaderLugar";
import Footer from './../../components/Footer/Footer'

import DescargasGrid from './components/DescargasGrid';

import './LugarRepositorio.css';

import axios from 'axios';

import fondo2 from '../../img/fondo_oscuro1.jpg'

const LugarRepositorio = () => {
  const { id, nombre } = useParams();
  const navigate = useNavigate();

  const [detalles, setDetalles] = useState([]);
  const [imagenFondo, setImagenFondo] = useState(null);

  const ir_a_detalles = () => {
    navigate(`/lugar/${id}/${nombre}`);
  };
  
  useEffect(() => {
    if (!id || !nombre) {
      navigate("/");
      return;
    }
    
    const fetchPlace = async () => {
      const resultado = await axios.post('http://localhost:3001/get_repositorio_lugar', {
        id
      });
      if(resultado && resultado.data && resultado.data.resultado) {
        console.log(resultado.data.resultado);
        let nuevo_objeto = resultado.data.resultado;
        setDetalles(nuevo_objeto);

        // Calcular la imagen más ancha
        if (nuevo_objeto.imagenes && nuevo_objeto.imagenes.length > 0) {
          let imagenes = nuevo_objeto.imagenes;
          
          const promesas = imagenes.map(src =>
            new Promise(resolve => {
              const img = new Image();
              img.onload = () => resolve({ src, width: img.width });
              img.onerror = () => resolve(null); // Si hay error al cargar
              img.src = src;
            })
          );

          const resultados = await Promise.all(promesas);
          const imagenMasAncha = resultados
            .filter(Boolean)
            .sort((a, b) => b.width - a.width)[0];

          if (imagenMasAncha) {
            setImagenFondo(imagenMasAncha.src);
          }
        }
      }
    }

    fetchPlace();
  }, []);

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
        <Grid container size={{xs:12, md:9}}
          style={{marginTop: 30}}>
        
            <div
              style={{
                backgroundImage: `url(${imagenFondo || fondo2})`,
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div style={{marginLeft: 20, textShadow: '2.5px 2.5px 1px rgba(0,0,0, 0.9)', color: 'white'}} >
                <h2 style={{marginBottom: 0}}>{detalles.nombre}</h2>
                <p style={{marginTop:0, paddingTop:0}}>Consulta el repositorio informativo disponible para este lugar</p>
              </div>
            </div>
        </Grid>

        <Grid container size={{xs:12, md:9}} justifyContent='right'>
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
            categorias={detalles && detalles.categorias_descarga ? detalles.categorias_descarga : []}></DescargasGrid>
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