-- Inserciones para la tabla Sitio_turistico_historico

DELETE FROM Sitio_turistico_historico;

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Plaza de la Constitución', 19.432641999999998, -99.1333215,
    'Cuauhtémoc', 'P.za de la Constitución S/N, Centro Histórico de la Cdad. de México, Centro', '06010',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['plaza', 'historical_place', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Con origen en los Aztecas, es la plaza más importante de la ciudad de México y sede de actividades frecuentes.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 311854
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Ex Antigua Aduana', 19.4371075, -99.1335519,
    'Cuauhtémoc', 'República de Brasil 31, Centro Histórico de la Cdad. de México, Centro', '06020',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 32
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Aviario Moctezuma', 19.4223648, -99.1918675,
    'Miguel Hidalgo', 'Zoológico de Chapultepec, Calz. Chivatito 1, Bosque de Chapultepec I Secc', '11580',
    '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['zoo', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 69
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Nacional De San Carlos', 19.438068899999998, -99.1520429,
    'Cuauhtémoc', 'Av. México-Tenochtitlán 50, Tabacalera', '06030',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Edificio neoclásico con una colección de arte europeo que va del siglo\xa0XIV al siglo\xa0XX.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 4795
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Aura Galerías | Juárez', 19.431521999999998, -99.1538108,
    'Cuauhtémoc', 'Atenas 30, Juárez', '06600',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['art_gallery', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 52
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Nacional De Arte (MUNAL)', 19.436202299999998, -99.13939549999999,
    'Cuauhtémoc', 'C. de Tacuba 8, Centro Histórico de la Cdad. de México, Centro', '06000',
    'Cerrado', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Notable museo albergado en un edificio de estilo neoclásico que ofrece una amplia colección de arte mexicano.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 23471
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Antiguo Templo de San Agustín (Ex Biblioteca Nacional)', 19.4303418, -99.1364282,
    'Cuauhtémoc', 'República de Uruguay 67, Centro Histórico de la Cdad. de México, Centro', '06000',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['library', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 30
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Templo de San Felipe Neri (La Profesa)', 19.433606800000003, -99.13634499999999,
    'Cuauhtémoc', 'Isabel La Católica 21, Centro Histórico de la Cdad. de México, Centro', '06000',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['church', 'museum', 'place_of_worship', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 2331
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Estatua Ecuestre de Carlos IV', 19.4362356, -99.13962889999999,
    'Cuauhtémoc', 'C. de Tacuba 5, Centro Histórico de la Cdad. de México, Centro', '06010',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Escultura grande de bronce que muestra al rey Carlos IV de España a caballo y que data del año 1802.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 1462
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo del Templo Mayor', 19.434603799999998, -99.13188099999999,
    'Cuauhtémoc', 'Seminario 8, Centro Histórico de la Cdad. de México, Centro', '06060',
    'Cerrado', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment', 'archaeological_zone']", 'Museo con hallazgos arqueológicos y exposiciones relacionadas con la civilización azteca.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 31913
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Planetario Luis Enrique Erro', 19.496233, -99.13994849999999,
    'Gustavo A. Madero', 'Av. Wilfrido Massieu, Nueva Industrial Vallejo', '07700',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['museum', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 3343
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Antigua Casa del General Porfirio Diaz', 19.431792299999998, -99.1405693,
    'Cuauhtémoc', 'Centro Histórico de la Cdad. de México, Centro', '06000',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 4
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Aguafuerte Galería', 19.4166159, -99.16002669999999,
    'Cuauhtémoc', 'Guanajuato 118, Roma Nte.', '06700',
    '12:00–19:00', '12:00–20:00', '12:00–20:00', '12:00–20:00', '12:00–20:00', '12:00–20:00', '12:00–19:00',
    "['art_gallery', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 188
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Géiser Madero', 19.434707, -99.14223,
    'Cuauhtémoc', 'Av. Juarez 24, Colonia Centro, Centro', '06050',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 5, 1
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Plaza de la República', 19.436043899999998, -99.1538176,
    'Cuauhtémoc', 'Av. de la República S/N, Tabacalera', '06030',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'park', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 63846
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Monumento A San Juan Pablo II', 19.434303699999997, -99.13345009999999,
    'Cuauhtémoc', 'Calle Monte de Piedad 303, Centro Histórico de la Cdad. de México, Centro', '06060',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['monument', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 17
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Manuel Tolsá', 19.435816900000003, -99.1393511,
    'Cuauhtémoc', 'C. de Tacuba 7, Centro Histórico de la Cdad. de México, Centro', '06000',
    'Cerrado', 'Cerrado', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30',
    "['museum', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 42
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Universum, Museo de las Ciencias', 19.3111465, -99.1803998,
    'Coyoacán', 'Circuito Cultural de Ciudad Universitaria S/N, Coyoacán, C.U.', '04510',
    'Cerrado', 'Cerrado', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00',
    "['museum', 'point_of_interest', 'establishment']", 'Museo de exposiciones de ciencia y tecnología que incluye un robot interactivo y rocas lunares.',
    1, 1,
    0, 1, 1,
    '"No disponible"', 4, 24674
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Palacio Nacional', 19.4328868, -99.1313531,
    'Cuauhtémoc', 'P.za de la Constitución S/N, Centro Histórico de la Cdad. de México, Centro', '06066',
    'Cerrado', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00',
    "['historical_landmark', 'tourist_attraction', 'historical_place', 'government_office', 'point_of_interest', 'establishment']", 'Palacio de uso oficial, con un despacho para el presidente de México, y murales de Diego Rivera.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 1796
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Franz Mayer', 19.437117, -99.1431399,
    'Cuauhtémoc', 'Av. Hidalgo 45, Centro Histórico de la Cdad. de México, Guerrero', '06300',
    'Cerrado', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Colección internacional de artes decorativas del siglo\xa0XVI al\xa0XIX que incluye objetos de plata y textiles.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 17603
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Estatua Josefa Ortiz De Domínguez (La Corregidora)', 19.4372754, -99.13379510000001,
    'Cuauhtémoc', 'República de Brasil 31, Centro Histórico de la Cdad. de México, Centro', '06020',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 14
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Palacio de Cultura Banamex - Palacio de Iturbide', 19.4337824, -99.13905129999999,
    'Cuauhtémoc', 'Av Francisco I. Madero 17, Centro Histórico de la Cdad. de México, Centro', '06000',
    '10:00–19:00', '10:00–19:00', '10:00–19:00', '10:00–19:00', '10:00–19:00', '10:00–19:00', '10:00–19:00',
    "['museum', 'cultural_center', 'point_of_interest', 'establishment']", 'Palacio diseñado por el arquitecto barroco Francisco Guerrero y Torres, construido en la década de 1780.',
    0, 1,
    0, 1, 1,
    '"No disponible"', 4, 12959
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Monumento a Cuauhtémoc', 19.431085, -99.1590175,
    'Cuauhtémoc', 'Av. P.º de la Reforma S/N, Juárez', '06600',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['monument', 'tourist_attraction', 'sculpture', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 2252
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Papalote Museo del Niño', 19.411895899999998, -99.19474059999999,
    'Miguel Hidalgo', 'Av Constituyentes 268, Bosque de Chapultepec II Secc', '11100',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–19:00', '10:00–19:00',
    "['tourist_attraction', 'amusement_center', 'museum', 'point_of_interest', 'establishment']", 'Museo infantil con una amplia gama de exhibiciones interactivas, así como un planetario y un cine IMAX.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 26399
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'kurimanzutto', 19.411393, -99.18759969999999,
    'Miguel Hidalgo', 'C. Gobernador Rafael Rebollar 94, San Miguel Chapultepec I Secc', '11850',
    'Cerrado', '11:00–18:00', '11:00–18:00', 'Cerrado', 'Cerrado', 'Cerrado', 'Cerrado',
    "['art_gallery', 'tourist_attraction', 'sculpture', 'point_of_interest', 'establishment']", 'Galería tranquila que exhibe diversas obras de arte de artistas internacionales y locales.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 606
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Centro Histórico CDMX', 19.4343151, -99.13312889999999,
    'Cuauhtémoc', 'Zócalo, Centro Histórico de la Cdad. de México, Centro', '06060',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 113
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Estatua A Totoquihuatzin', 19.4354765, -99.13906060000001,
    'Cuauhtémoc', 'C. de Filomeno Mata 6, Centro Histórico de la Cdad. de México, Centro', '06040',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 3
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Soumaya', 19.4406926, -99.2047001,
    'Miguel Hidalgo', 'Blvd. Miguel de Cervantes Saavedra, Granada', '11529',
    '10:30–18:30', '10:30–18:30', '10:30–18:30', '10:30–18:30', '10:30–18:30', '10:30–18:30', '10:30–18:30',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Museo que alberga una amplia colección de arte, en gran parte europea, en una moderna estructura con curvas.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 61417
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Biblioteca del Banco de México', 19.4306476, -99.13644359999999,
    'Cuauhtémoc', 'República de Uruguay 62, Centro Histórico de la Cdad. de México, Centro', '06000',
    '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', 'Cerrado', 'Cerrado',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 3, 21
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Palacio Postal', 19.435558999999998, -99.1402372,
    'Cuauhtémoc', 'C. de Tacuba 1, Centro Histórico de la Cdad. de México, Centro', '06000',
    '10:00–16:30', '10:00–16:30', '10:00–16:30', '10:00–16:30', '10:00–16:30', '10:00–12:00', 'Cerrado',
    "['post_office', 'tourist_attraction', 'museum', 'government_office', 'point_of_interest', 'finance', 'establishment']", 'Oficina de correos de finales del siglo\xa0XX con interiores palaciegos y un museo naval.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 1165
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Biblioteca Miguel Lerdo de Tejada', 19.4294939, -99.13785109999999,
    'Cuauhtémoc', 'República de El Salvador 49, Centro Histórico de la Cdad. de México, Centro', '06080',
    '9:00–17:30', '9:00–17:30', '9:00–17:30', '9:00–17:30', '9:00–17:30', '10:00–14:00', 'Cerrado',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 255
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Palacio del Marqués del Apartado', 19.4356842, -99.13210250000002,
    'Cuauhtémoc', 'Palacio del Marqués del Apartado, República de Argentina 12, Centro Histórico de la Cdad. de México, Centro', '06020',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'tourist_attraction', 'historical_place', 'point_of_interest', 'establishment']", 'Palacio imperial del siglo\xa0XIX, con visitas guiadas y jardines con los restos de un templo azteca.',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 26
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Biblioteca Pública Sor Juana Inés de la Cruz', 19.4417152, -99.1597317,
    'Cuauhtémoc', 'Av. Ribera de San Cosme 61, Sta María la Ribera', '06400',
    '7:00–21:00', '7:00–21:00', '7:00–21:00', '7:00–21:00', '7:00–21:00', '8:00–20:00', '8:00–20:00',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 3, 38
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Mariposario Chapultepec', 19.4229375, -99.18856249999999,
    'Miguel Hidalgo', 'CRF6+5H, Bosque de Chapultepec I Secc', '11580',
    'Cerrado', '9:00–16:30', '9:00–16:30', '9:00–16:30', '9:00–16:30', '9:00–16:30', '9:00–16:30',
    "['zoo', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 239
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Sala Interactiva de Astronomía', 19.4970039, -99.1392413,
    'Gustavo A. Madero', 'Av. Wilfrido Massieu 253, Nueva Industrial Vallejo', '07738',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 468
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Zoológico San Juan de Aragón', 19.4617214, -99.0826175,
    'Gustavo A. Madero', 'Av. José Loreto Fabela S/N, Zoológico de San Juan de Aragón', '07920',
    'Cerrado', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00',
    "['zoo', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Aviarios, una colección de reptiles y mamíferos africanos, americanos y mexicanos, incluidos jaguares.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 19872
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'MIDE, Museo Interactivo de Economía', 19.4355494, -99.138346,
    'Cuauhtémoc', 'C. de Tacuba 17, Centro Histórico de la Cdad. de México, Centro', '06000',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['museum', 'point_of_interest', 'establishment']", 'Museo contemporáneo con exhibiciones sobre economía, finanzas y desarrollo sustentable.',
    0, 1,
    0, 1, 1,
    '"No disponible"', 4, 13143
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Sendero del Jaguar', 19.462271599999998, -99.0838943,
    'Gustavo A. Madero', 'Zoológico de San Juan de Aragón', '07920',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['zoo', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 15
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Biblioteca General de la Cámara de Diputados del H. Congreso de la Unión', 19.4355463, -99.1378798,
    'Cuauhtémoc', 'Cuauhtémoc, C. de Tacuba 29, Centro Histórico de la Cdad. de México, Centro', '06110',
    '9:30–21:00', '9:30–21:00', '9:30–21:00', '9:30–21:00', '9:30–21:00', '9:30–13:00', 'Cerrado',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 32
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'INBA Museo Nacional de Arquitectura', 19.4354995, -99.14118529999999,
    'Cuauhtémoc', 'Av. Juarez 1, Colonia Centro, Centro', '06050',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 562
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Biblioteca de México', 19.4287673, -99.1495796,
    'Cuauhtémoc', 'De La Ciudadela 4, Colonia Centro, Centro', '06040',
    '8:30–19:30', '8:30–19:30', '8:30–19:30', '8:30–19:30', '8:30–19:30', '8:30–19:30', '8:30–19:30',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 1065
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo de Cera', 19.428528, -99.15716789999999,
    'Cuauhtémoc', 'Londres 6, Juárez', '06600',
    '11:00–19:00', '11:00–19:00', '11:00–19:00', '11:00–19:00', '11:00–19:00', '11:00–19:00', '11:00–19:00',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Museo de cera en una casa centenaria con más de 200\xa0réplicas de íconos culturales y personajes ficticios.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 31372
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Nacional de Historia Castillo de Chapultepec', 19.4204397, -99.181935,
    'Miguel Hidalgo', 'Bosque de Chapultepec I Secc', '11580',
    'Cerrado', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00',
    "['historical_landmark', 'tourist_attraction', 'historical_place', 'museum', 'point_of_interest', 'establishment']", 'Castillo histórico situado en un cerro con vistas a la ciudad de México, sede del Museo Nacional de Historia.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 79993
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Reloj Otomano', 19.4317197, -99.1385485,
    'Cuauhtémoc', 'Calle de Bolívar 37, Centro Histórico de la Cdad. de México, Centro', '06000',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 95
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Monumento a Colón', 19.433093, -99.1547507,
    'Cuauhtémoc', 'Monumento a Cristóbal Colón, Monumento a Cristóbal Colón, Av. P.º de la Reforma 96, Tabacalera', '06600',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['sculpture', 'monument', 'historical_landmark', 'historical_place', 'tourist_attraction', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 2052
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Galería Hilario Galguera', 19.4387091, -99.1616031,
    'Cuauhtémoc', 'C. Francisco Pimentel 3, San Rafael', '06470',
    'Cerrado', '11:00–17:00', '11:00–17:00', '11:00–17:00', '11:00–17:00', '11:00–14:00', 'Cerrado',
    "['art_gallery', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 111
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Palacio Postal', 19.4359573, -99.14037739999999,
    'Cuauhtémoc', 'C. de Tacuba 1, Centro Histórico de la Cdad. de México, Centro', '06000',
    '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '9:00–15:00', 'Cerrado',
    "['historical_place', 'tourist_attraction', 'museum', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 580
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Hemiciclo a Benito Juárez', 19.4351083, -99.1440684,
    'Cuauhtémoc', 'Av. Juarez 50, Colonia Centro, Centro', '06050',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['monument', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Monumento neoclásico de mármol con estatuas que conmemoran al expresidente mexicano Benito Juárez.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 11699
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Casa de los Azulejos', 19.4342214, -99.1401815,
    'Cuauhtémoc', 'Av Francisco I. Madero 4, Centro Histórico de la Cdad. de México, Centro', '06500',
    '7:00–1:00', '7:00–1:00', '7:00–1:00', '7:00–1:00', '7:00–1:00', '7:00–1:00', '7:00–1:00',
    "['historical_place', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Palacio del siglo\xa0XVIII con una fachada azul y blanca que en la actualidad aloja un restaurante conocido.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 42346
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Acuario Interactivo', 19.441613, -99.204668,
    'Miguel Hidalgo', 'C. Lago Zurich 386, Granada', '11529',
    '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['aquarium', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 1237
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo de Arte Popular', 19.433735199999997, -99.1462978,
    'Cuauhtémoc', 'Revillagigedo 11, Colonia Centro, Centro', '06050',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Museo con coloridas obras de arte folclórico y tradicional; cuenta con talleres para niños y adultos.',
    1, 1,
    0, 1, 1,
    '"No disponible"', 4, 10456
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Altar a la Patria', 19.421479899999998, -99.1794044,
    'Miguel Hidalgo', 'Bosque de Chapultepec I, Bosque de Chapultepec I Secc', '11580',
    'Cerrado', '6:00–18:00', '6:00–18:00', '6:00–18:00', '6:00–18:00', '6:00–18:00', '6:00–18:00',
    "['monument', 'tourist_attraction', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 4641
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo del Palacio de Bellas Artes', 19.43523, -99.14128339999999,
    'Cuauhtémoc', 'Av. Juárez s/n esq, Eje Central Lázaro Cárdenas Col, Colonia Centro, Centro', '06050',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['museum', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 1, 1,
    '"No disponible"', 4, 7598
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Casa De Arte', 19.4360702, -99.13776,
    'Cuauhtémoc', 'Ignacio Allende 3, Centro Histórico de la Cdad. de México, Centro', '06010',
    '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–16:00', 'Cerrado',
    "['art_gallery', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 5, 2
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Templo Mayor de México-Tenochtitlan', 19.434928499999998, -99.13135899999999,
    'Cuauhtémoc', 'República de Guatemala 60, Centro Histórico de la Cdad. de México, Centro', '06060',
    'Cerrado', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00',
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment', 'archaeological_zone']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 733
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Tamayo Arte Contemporáneo', 19.42572, -99.181716,
    'Miguel Hidalgo', 'Av. P.º de la Reforma 51, Polanco, Bosque de Chapultepec I Secc', '11580',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Museo tradicional de arte contemporáneo, con pintura, escultura y fotografía.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 10043
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Nacional de Antropología', 19.426003200000004, -99.1862786,
    'Miguel Hidalgo', 'Av. P.º de la Reforma s/n, Polanco, Bosque de Chapultepec I Secc', '11560',
    'Cerrado', '9:00–18:00', '9:00–18:00', '9:00–18:00', '9:00–18:00', '9:00–18:00', '9:00–18:00',
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Popular museo de antropología que exhibe artefactos de la antigua civilización maya.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 79044
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Nacional de las Culturas del Mundo INAH', 19.433158199999998, -99.1304145,
    'Cuauhtémoc', 'Moneda 13, Centro Histórico de la Cdad. de México, Centro', '06000',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Museo en un edificio del siglo\xa0XVIII con exposiciones sobre las culturas del mundo antiguo y contemporáneo.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 14543
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Monumento Por La Paz', 19.4527943, -99.1434761,
    'Cuauhtémoc', 'Av. Ricardo Flores Magón, Tlatelolco', '06900',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['monument', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 87
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Palacio de Bellas Artes', 19.4352, -99.1412,
    'Cuauhtémoc', 'Av. Juarez S/N, Centro Histórico de la Cdad. de México, Centro', '06050',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['tourist_attraction', 'museum', 'point_of_interest', 'establishment']", 'Palacio de mármol con un vestíbulo espectacular y un museo con murales de Diego Rivera y otros artistas.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 175381
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Acuario Michin CDMX', 19.4788116, -99.09945979999999,
    'Gustavo A. Madero', 'Calz. San Juan de Aragón 399, Granjas Modernas', '07460',
    '10:00–20:00', '10:00–20:00', '10:00–20:00', '10:00–20:00', '10:00–21:00', '9:00–22:00', '9:00–22:00',
    "['aquarium', 'playground', 'point_of_interest', 'establishment']", '',
    1, 1,
    0, 1, 1,
    '"No disponible"', 4, 13577
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Cafebrería El Péndulo', 19.418223599999997, -99.1587366,
    'Cuauhtémoc', 'Av. Álvaro Obregón 86, Roma Nte.', '06700',
    '8:00–23:00', '8:00–23:00', '8:00–23:00', '8:00–23:00', '8:00–24:00', '8:00–24:00', '9:00–22:00',
    "['coffee_shop', 'bar_and_grill', 'concert_hall', 'cafeteria', 'auditorium', 'book_store', 'bar', 'performing_arts_theater', 'event_venue', 'restaurant', 'food_store', 'cafe', 'food', 'point_of_interest', 'store', 'establishment']", 'Librería que ofrece café, comida y tragos en un ambiente intelectual con terraza y mesas al aire libre.',
    0, 1,
    0, 0, 1,
    '"200 MXN - 300 MXN"', 4, 10212
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Archivo Histórico / Centro de la Documentación Institucional de la Secretaria de Salud', 19.4363736, -99.13716289999999,
    'Cuauhtémoc', 'Donceles 39, Centro Histórico de la Cdad. de México, Centro', '06010',
    '8:30–18:00', '8:30–14:00', '8:30–18:00', '8:30–14:00', '8:30–18:00', 'Cerrado', 'Cerrado',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 24
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Galerías Castillo', 19.4363237, -99.1400159,
    'Cuauhtémoc', 'Marconi 2-Local 2, Centro Histórico de la Cdad. de México, Centro', '06010',
    '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['art_gallery', 'home_goods_store', 'point_of_interest', 'store', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 33
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Los Arcos. Acueducto', 18.9302863, -99.2340365,
    'Gualupita', 'Calle Melchor Ocampo 100', '62280',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['seafood_restaurant', 'museum', 'restaurant', 'food', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 6
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo de economía', 19.435036600000004, -99.1383901,
    'Cuauhtémoc', 'Simón Bolívar 1, Centro Histórico de la Cdad. de México, Centro', '06000',
    '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', 'Cerrado',
    "['museum', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 49
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Casa de la Malinche', 19.4367708, -99.13424169999999,
    'Cuauhtémoc', 'República de Cuba 95, Centro Histórico de la Cdad. de México, Centro', '06010',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'tourist_attraction', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 35
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Placa del Descubrimiento de la Coatlicue', 19.4317629, -99.1323687,
    'Cuauhtémoc', 'José María Pino Suárez, Centro Histórico de la Cdad. de México, Centro', '06060',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 5, 2
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Monumento Hipsográfico de Enrico Martínez', 19.4339385, -99.1338652,
    'Cuauhtémoc', 'Calle Monte de Piedad 7, Centro Histórico de la Cdad. de México, Centro', '06000',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 11
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Fuente de Cibeles', 19.4200098, -99.16631149999999,
    'Cuauhtémoc', 'Pl. Villa de Madrid, Roma Nte.', '06700',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['historical_landmark', 'tourist_attraction', 'sculpture', 'historical_place', 'park', 'point_of_interest', 'establishment']", 'Réplica de gran tamaño de una fuente histórica de Madrid con la estatua de una diosa romana.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 20936
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Zoológico de Chapultepec', 19.423208499999998, -99.1895256,
    'Miguel Hidalgo', 'Calz. Chivatito s/n, Bosque de Chapultepec I Secc', '11850',
    'Cerrado', '9:00–16:30', '9:00–16:30', '9:00–16:30', '9:00–16:30', '9:00–16:30', '9:00–16:30',
    "['zoo', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Conocido zoológico con más de 2,000 animales, como pandas gigantes y otras especies en peligro de extinción.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 67195
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo del Telégrafo', 19.4363054, -99.1390066,
    'Cuauhtémoc', 'C. de Tacuba 8, Centro Histórico de la Cdad. de México, Centro', '06010',
    'Cerrado', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00', '10:00–17:00',
    "['museum', 'historical_place', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 648
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Art Toys.', 19.434369399999998, -99.1387649,
    'Cuauhtémoc', 'Av. 5 de Mayo # 23, Centro Histórico de la Cdad. de México, Centro', '06010',
    '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '9:00–17:00', '10:00–17:00',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 603
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo de la Ciudad de México', 19.4292369, -99.1321387,
    'Cuauhtémoc', 'José María Pino Suárez 30, Centro Histórico de la Cdad. de México, Centro', '06060',
    'Cerrado', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30', '10:00–17:30',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Gran palacio convertido en museo con visitas al edificio y exposiciones sobre la historia de la ciudad.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 6942
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Museo Mural Diego Rivera', 19.436172, -99.14685639999999,
    'Cuauhtémoc', 'Calle Colón Balderas s/n, Colonia Centro, Centro', '06040',
    'Cerrado', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00', '10:00–18:00',
    "['museum', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Museo de arte famoso por un mural de Diego Rivera que fue rescatado de un hotel tras un terremoto en 1985.',
    0, 1,
    0, 0, 1,
    '"No disponible"', 4, 7074
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Biblioteca Pública "Rubén Darío"', 19.4271368, -99.13163689999999,
    'Cuauhtémoc', 'Regina 111, Centro Histórico de la Cdad. de México, Centro', '06090',
    '8:00–21:00', '8:00–21:00', '8:00–21:00', '8:00–21:00', '1:35–6:40', 'Cerrado', 'Cerrado',
    "['library', 'point_of_interest', 'establishment']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 24
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Monumento A Los Indios Verdes', 19.4913193, -99.1191613,
    'Gustavo A. Madero', 'Prolongación Misterios 129, Santa Isabel Tola', '07010',
    '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59', '00:00 23:59',
    "['sculpture', 'monument', 'tourist_attraction', 'point_of_interest', 'establishment']", 'Estatuas de bronce en honor a los pueblos nativos mexicanos del siglo\xa0XV, creadas por Alejandro Casarín en la década de 1880.',
    1, 1,
    0, 0, 1,
    '"No disponible"', 4, 3575
);

INSERT INTO Sitio_turistico_historico (
    nombre, latitud, longitud,
    municipio_delegacion, calle, codigo_postal,
    h_lunes, h_martes, h_miercoles, h_jueves, h_viernes, h_sabado, h_domingo,
    tipo, descripcion,
    accesibilidadParking, accesibilidadEntrance, accesibilidadRestroom, accesibilidadSeating, petfriendly,
    costos, calificacion, total_calificaciones
) VALUES (
    'Ruinas Palacio de Axayácatl', 19.4345168, -99.13454879999999,
    'Cuauhtémoc', 'C. de la Palma 12, Centro Histórico de la Cdad. de México, Centro', '06000',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL,
    "['historical_landmark', 'historical_place', 'point_of_interest', 'establishment', 'archaeological_zone']", '',
    0, 0,
    0, 0, 1,
    '"No disponible"', 4, 4
);

INSERT INTO Evento (id_sitio, fecha_inicio, fecha_fin, promociones, descripcion, imagen)
VALUES (
  (SELECT id_sitio FROM Sitio_turistico_historico WHERE nombre = 'Palacio de Bellas Artes' LIMIT 1),
  '2025-06-28',
  '2025-06-30',
  'Entrada gratuita los domingos',
  'Exposición temporal de arte contemporáneo.',
  'evento.jpeg'
);
