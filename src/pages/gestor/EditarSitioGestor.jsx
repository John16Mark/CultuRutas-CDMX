import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../../components/Alerta/Alerta';
import NavBar from '../../components/NavBar/NavBar';


const EditarSitioGestor = () => {
    const { id } = useParams();
    const [datosSitio, setDatosSitio] = useState(null);
    const [repositorio, setRepositorio] = useState([]);
    const alertaRef = useRef();
    const [archivo, setArchivo] = useState(null);
    const [tipoArchivo, setTipoArchivo] = useState('multimedia');
    const [archivoAEliminar, setArchivoAEliminar] = useState(null);

    useEffect(() => {
        const obtenerDetalles = async () => {
            try {
            const resp = await axios.post('http://localhost:3001/get_detalles_lugar', { id });
            setDatosSitio(resp.data.resultado);
            } catch (error) {
            console.error('Error al obtener detalles del sitio:', error);
            }
        };

        const obtenerRepositorio = async () => {
            try {
            const resp = await axios.post('http://localhost:3001/get_repositorio_lugar', { id });
            setRepositorio(resp.data.resultado?.categorias_descarga || []);
            } catch (error) {
            console.error('Error al obtener el repositorio:', error);
            }
        };

        obtenerDetalles();
        obtenerRepositorio();
    }, [id]);

    const eliminarArchivo = (tipo, ruta_local) => {
        setArchivoAEliminar({ tipo, ruta_local });
        alertaRef.current.handleClickOpen();
    };

    const handleGuardarCambios = () => {
        alertaRef.current.handleClickOpen();
    };

    const handleSubirArchivo = async (e) => {
        e.preventDefault();
        if (!archivo) {
            alert("Selecciona un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("tipo", tipoArchivo);
        formData.append("id_sitio", id);

        try {
            const res = await axios.post('http://localhost:3001/subir_archivo', formData);
            alert(res.data.message);
            setArchivo(null);
            setTipoArchivo('multimedia');
            document.querySelector('input[type="file"]').value = "";
            // Vuelve a cargar repositorio
            const nuevoRepo = await axios.post('http://localhost:3001/get_repositorio_lugar', { id });
            setRepositorio(nuevoRepo.data.resultado?.categorias_descarga || []);
        } catch (error) {
            console.error("Error al subir archivo:", error);
            alert("Error al subir archivo.");
        }
    };

    const confirmarEliminacionArchivo = async () => {
        try {
            const { tipo, ruta_local } = archivoAEliminar;
            const res = await axios.post('http://localhost:3001/eliminar_archivo', { tipo, ruta_local });
            alert(res.data.message);

            // Actualizar repositorio
            const nuevoRepo = await axios.post('http://localhost:3001/get_repositorio_lugar', { id });
            setRepositorio(nuevoRepo.data.resultado?.categorias_descarga || []);
            setArchivoAEliminar(null);
        } catch (error) {
            console.error("Error al eliminar archivo:", error);
            alert("Error al eliminar archivo.");
        }
    };


    const confirmarGuardado = async () => {
        try {
            await axios.post('http://localhost:3001/editar_datos_lugar', datosSitio);

            const { data } = await axios.post(
            'http://localhost:3001/get_detalles_lugar',
            { id }
            );
            setDatosSitio(data.resultado);          // estado actualizado
            alert('Cambios guardados correctamente.');
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            alert('Hubo un error al guardar los cambios.');
        }
    };





    if (!datosSitio) return <p>Cargando...</p>;

    return (
        <>
            <NavBar esTransparente={false} />
            <div className="contenedor-editar">
                <h2>Editar sitio: {datosSitio.nombre}</h2>

                {/* Formulario de edición */}
                <form className="form-editar-sitio">
                    <label>Horario lunes:
                        <input
                        type="text"
                        value={datosSitio.h_lunes || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_lunes: e.target.value })}
                        />
                    </label>

                    <label>Horario martes:
                        <input
                        type="text"
                        value={datosSitio.h_martes || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_martes: e.target.value })}
                        />
                    </label>

                    <label>Horario miércoles:
                        <input
                        type="text"
                        value={datosSitio.h_miercoles || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_miercoles: e.target.value })}
                        />
                    </label>

                    <label>Horario jueves:
                        <input
                        type="text"
                        value={datosSitio.h_jueves || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_jueves: e.target.value })}
                        />
                    </label>

                    <label>Horario viernes:
                        <input
                        type="text"
                        value={datosSitio.h_viernes || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_viernes: e.target.value })}
                        />
                    </label>


                    <label>Horario sabado:
                        <input
                        type="text"
                        value={datosSitio.h_sabado || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_sabado: e.target.value })}
                        />
                    </label>


                    <label>Horario domingo:
                        <input
                        type="text"
                        value={datosSitio.h_domingo || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, h_domingo: e.target.value })}
                        />
                    </label>

                    <label>Promociones:
                        <input
                        type="text"
                        value={datosSitio.promociones || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, promociones: e.target.value })}
                        />
                    </label>

                    <label>Costos:
                        <input
                        type="text"
                        value={datosSitio.costos || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, costos: e.target.value })}
                        />
                    </label>

                    <label>Tipo:
                        <input
                        type="text"
                        value={datosSitio.tipo || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, tipo: e.target.value })}
                        />
                    </label>

                    <label>Descripción:
                        <textarea
                        value={datosSitio.descripcion || ''}
                        onChange={(e) => setDatosSitio({ ...datosSitio, descripcion: e.target.value })}
                        />
                    </label>

                    {/* Checkboxes de accesibilidad */}
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!datosSitio.accesibilidadParking}
                                onChange={(e) => setDatosSitio({ ...datosSitio, accesibilidadParking: e.target.checked })}
                            />
                            Estacionamiento
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!datosSitio.accesibilidadEntrance}
                                onChange={(e) => setDatosSitio({ ...datosSitio, accesibilidadEntrance: e.target.checked })}
                            />
                            Entrada accesible
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!datosSitio.accesibilidadRestroom}
                                onChange={(e) => setDatosSitio({ ...datosSitio, accesibilidadRestroom: e.target.checked })}
                            />
                            Baño accesible
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!datosSitio.accesibilidadSeating}
                                onChange={(e) => setDatosSitio({ ...datosSitio, accesibilidadSeating: e.target.checked })}
                            />
                            Asientos accesibles
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={!!datosSitio.petfriendly}
                                onChange={(e) => setDatosSitio({ ...datosSitio, petfriendly: e.target.checked })}
                            />
                            Pet Friendly
                        </label>
                    </div>


                </form>

                {/* Repositorio */}
                <div>
                    <h3>Archivos del sitio</h3>
                    {repositorio.map(cat => (
                    <div key={cat.tipo}>
                        <h4>{cat.tipo.toUpperCase()}</h4>
                        <ul>
                            {cat.archivos.map((archivo, idx) => (
                                <li key={idx}>
                                    <a href={archivo} target="_blank" rel="noopener noreferrer">{archivo.split('/').pop()}</a>
                                    <button onClick={() => eliminarArchivo(cat.tipo, archivo)}>Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    ))}
                </div>

                <div className="contenedor-subida">
                    <h3>Subir nuevo archivo</h3>
                    <select value={tipoArchivo} onChange={(e) => setTipoArchivo(e.target.value)}>
                        <option value="multimedia">Multimedia</option>
                        <option value="documentos">Documento</option>
                    </select>
                    <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
                    <button onClick={handleSubirArchivo}>Subir archivo</button>
                </div>


                {/* Botones */}
                <button onClick={handleGuardarCambios}>Guardar cambios</button>

                {/* Modal de confirmación */}
                <Alerta
                    ref={alertaRef}
                    titulo={archivoAEliminar ? "¿Eliminar archivo?" : "¿Guardar cambios?"}
                    mensaje={
                        archivoAEliminar
                            ? "¿Estás seguro de eliminar este archivo del repositorio?"
                            : "¿Estás seguro de guardar los cambios en este sitio?"
                    }
                    boton1="Sí"
                    boton2="Cancelar"
                    onConfirm={archivoAEliminar ? confirmarEliminacionArchivo : confirmarGuardado}
                />
            </div>
        </>
    );
};

export default EditarSitioGestor;