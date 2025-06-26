ALTER TABLE Repositorio DROP FOREIGN KEY repositorio_ibfk_1;
ALTER TABLE Repositorio DROP FOREIGN KEY repositorio_ibfk_2;

ALTER TABLE A_Multimedia 
MODIFY id_multimedia VARCHAR(50),
MODIFY nombre VARCHAR(100),
MODIFY tamano VARCHAR(100),
MODIFY fecha_publicacion VARCHAR(100);

ALTER TABLE A_Documentos 
MODIFY id_documento VARCHAR(50),
MODIFY nombre VARCHAR(100),
MODIFY tamano VARCHAR(100),
MODIFY fecha_publicacion VARCHAR(100);

ALTER TABLE Repositorio ADD CONSTRAINT repositorio_ibfk_1 
    FOREIGN KEY (id_multimedia) REFERENCES A_Multimedia(id_multimedia) 
    ON DELETE SET NULL;
    
ALTER TABLE Repositorio ADD CONSTRAINT repositorio_ibfk_2 
    FOREIGN KEY (id_documento) REFERENCES A_Documentos(id_documento) 
    ON DELETE SET NULL;