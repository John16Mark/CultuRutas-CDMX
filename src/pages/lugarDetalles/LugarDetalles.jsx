import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import NavBar from "../../components/NavBar/NavBar";
import HeaderLugar from "./components/HeaderLugar";
import ImagenesLugar from "./components/ImagenesLugar";
import DescripcionLugar from './components/DescripcionLugar'
import Footer from './../../components/Footer/Footer'

import './LugarDetalles.css';

import axios from 'axios';

import fondo1 from '../../img/fondo_1.jpg'
import fondo2 from '../../img/fondo_oscuro1.jpg'

const LugarDetalles = () => {
  const { id, nombre } = useParams();
  const navigate = useNavigate();

  const [detalles, setDetalles] = useState({});  // ← estado para almacenar los lugares

  let imgs = []
  imgs.push(fondo1)
  imgs.push(fondo2)

  useEffect(() => {
    if (!id || !nombre) {
      navigate("/");
      return;
    }
    
    const fetchPlace = async () => {
      const resultado = await axios.post('http://localhost:3001/get_detalles_lugar', {
        id
      });
      if(resultado && resultado.data && resultado.data.resultado) {
        console.log(resultado.data.resultado);
        let nuevo_objeto = resultado.data.resultado;

        // Ubicación
        nuevo_objeto.ubicacion = "";
        if(nuevo_objeto.calle)
          nuevo_objeto.ubicacion += nuevo_objeto.calle;
        if(nuevo_objeto.municipio_delegacion)
          nuevo_objeto.ubicacion += ", " + nuevo_objeto.municipio_delegacion;
        if(nuevo_objeto.codigo_postal)
          nuevo_objeto.ubicacion += ", C.P. " + nuevo_objeto.codigo_postal;

        // Horario
        nuevo_objeto.horario = [];
        if(nuevo_objeto.h_lunes)  nuevo_objeto.horario.push("Lunes: " + nuevo_objeto.h_lunes);
        if(nuevo_objeto.h_martes)  nuevo_objeto.horario.push("Martes: " + nuevo_objeto.h_martes);
        if(nuevo_objeto.h_miercoles)  nuevo_objeto.horario.push("Miércoles: " + nuevo_objeto.h_miercoles);
        if(nuevo_objeto.h_jueves)  nuevo_objeto.horario.push("Jueves: " + nuevo_objeto.h_jueves);
        if(nuevo_objeto.h_viernes)  nuevo_objeto.horario.push("Viernes: " + nuevo_objeto.h_viernes);
        if(nuevo_objeto.h_sabado)  nuevo_objeto.horario.push("Sábado: " + nuevo_objeto.h_sabado);
        if(nuevo_objeto.h_domingo)  nuevo_objeto.horario.push("Domingo: " + nuevo_objeto.h_domingo);

        // Accesibilidad
        nuevo_objeto.accesibilidad = "";
        if(nuevo_objeto.accesibilidadParking === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con estacionamiento accesible"
        }
        if(nuevo_objeto.accesibilidadEntrance === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con entrada accesible"
        }
        if(nuevo_objeto.accesibilidadRestroom === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con baños accesibles"
        }
        if(nuevo_objeto.accesibilidadSeating === 1) {
          if(nuevo_objeto.accesibilidad !== "")
            nuevo_objeto.accesibilidad += ", "
          nuevo_objeto.accesibilidad += "con asientos accesibles"
        }

        setDetalles(nuevo_objeto);
      }
      
      /*if(!resultado) {
        navigate("/");
      }*/
    }

    fetchPlace();
  }, []);
  
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
            imagenes={detalles && detalles.imagenes ? detalles.imagenes : []}
          />
          
        </div>
      </Grid>
      <Grid size={{xs:12, md:6}}>
        <div style={{/*backgroundColor:'#cccccc'*/}}>
          <DescripcionLugar
            nombre={detalles && detalles.nombre ? detalles.nombre : '-'}
            resumen={detalles && detalles.descripcion ? detalles.descripcion : 'Sin descripción.'}
            ubicacion={detalles && detalles.ubicacion ? detalles.ubicacion : '-'}
            costo={detalles && detalles.costos ? detalles.costos : 'Sin información de costos'}
            horario={detalles && detalles.horario ? detalles.horario : ''}
            accesibilidad={detalles && detalles.accesibilidad ? detalles.accesibilidad : ''}
            latitud={detalles && detalles.latitud ? detalles.latitud : 0.0}
            longitud={detalles && detalles.longitud ? detalles.longitud : 0.0}
            nombre_normalizado={nombre}
            id_lugar={id}
          />
        </div>
      </Grid>
    </Grid>}

    <Footer></Footer>
  </div>
  )
}

export default LugarDetalles;