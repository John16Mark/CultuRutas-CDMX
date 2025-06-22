DROP DATABASE IF EXISTS CultuRutas;

CREATE DATABASE IF NOT EXISTS CultuRutas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE CultuRutas;


CREATE TABLE Sitio_turistico_historico (
    id_sitio INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    municipio_delegacion VARCHAR(40) NOT NULL,
    calle VARCHAR(150) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL,
    latitud DOUBLE NULL,
    longitud DOUBLE NULL,
    h_lunes VARCHAR(25),
    h_martes VARCHAR(25),
    h_miercoles VARCHAR(25),
    h_jueves VARCHAR(25),
    h_viernes VARCHAR(25),
    h_sabado VARCHAR(25),
    h_domingo VARCHAR(25),
    promociones VARCHAR(150),
    costos VARCHAR(100),
    tipo VARCHAR(250) NOT NULL,
    descripcion VARCHAR(1000),
    accesibilidadParking BOOLEAN NULL DEFAULT '0',
    accesibilidadEntrance BOOLEAN NULL DEFAULT '0',
    accesibilidadRestroom BOOLEAN NULL DEFAULT '0',
    accesibilidadSeating BOOLEAN NULL DEFAULT '0',
    petfriendly BOOLEAN NULL DEFAULT '0',
    calificacion INT DEFAULT 0,
    total_calificaciones INT DEFAULT 0,
    CONSTRAINT chk_calificacion CHECK (calificacion BETWEEN 0 AND 5)
) ENGINE=INNODB;


CREATE TABLE Gestor (
    id_gestor INT AUTO_INCREMENT PRIMARY KEY,
    id_sitio INT,
    nombre VARCHAR(30) NOT NULL,
    apellido_p VARCHAR(20) NOT NULL,
    apellido_m VARCHAR(20) NOT NULL,
    correo_electronico VARCHAR(320) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    numero_telefonico VARCHAR(15),
    rfc VARCHAR(20),
    correo_verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(64),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sitio) REFERENCES Sitio_turistico_historico(id_sitio) ON DELETE SET NULL
) ENGINE=INNODB;


CREATE TABLE Visitante (
    id_visitante INT AUTO_INCREMENT PRIMARY KEY,
    correo_electronico VARCHAR(320) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    correo_verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(64),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_ultimo_login TIMESTAMP NULL
) ENGINE=INNODB;


CREATE TABLE Evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    id_sitio INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    promociones VARCHAR(150),
    descripcion VARCHAR(1000) NOT NULL,
    imagen VARCHAR(1000),
    FOREIGN KEY (id_sitio) REFERENCES Sitio_turistico_historico(id_sitio) ON DELETE CASCADE
) ENGINE=INNODB;


CREATE TABLE A_Multimedia (
    id_multimedia VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    tamano VARCHAR(20) NOT NULL,
    fecha_publicacion VARCHAR(20) NOT NULL,
    almacenamiento LONGBLOB,
    ruta_local VARCHAR(255),
    id_sitio INT,
    FOREIGN KEY (id_sitio) REFERENCES Sitio_turistico_historico(id_sitio) ON DELETE SET NULL
) ENGINE=INNODB;


CREATE TABLE A_Documentos (
    id_documento VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    tipo VARCHAR(10) NOT NULL,
    tamano VARCHAR(20) NOT NULL,
    fecha_publicacion VARCHAR(20) NOT NULL,
    almacenamiento LONGBLOB,
    ruta_local VARCHAR(255),
    id_sitio INT,
    FOREIGN KEY (id_sitio) REFERENCES Sitio_turistico_historico(id_sitio) ON DELETE SET NULL
) ENGINE=INNODB;


CREATE TABLE Repositorio (
    id_repositorio INT AUTO_INCREMENT PRIMARY KEY,
    id_multimedia VARCHAR(20),
    id_documento VARCHAR(20),
    tipo_apartado ENUM('multimedia', 'documentos') NOT NULL,
    FOREIGN KEY (id_multimedia) REFERENCES A_Multimedia(id_multimedia) ON DELETE SET NULL,
    FOREIGN KEY (id_documento) REFERENCES A_Documentos(id_documento) ON DELETE SET NULL
) ENGINE=INNODB;


CREATE TABLE Tokens_Recuperacion (
    id_token INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    token VARCHAR(64) NOT NULL,
    tipo_usuario ENUM('gestor', 'visitante') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT NOW(),
    fecha_expiracion TIMESTAMP NOT NULL DEFAULT NOW(),
    utilizado BOOLEAN DEFAULT FALSE
) ENGINE=INNODB;